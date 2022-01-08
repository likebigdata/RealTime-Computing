package mysql_kafka2;
import java.util.Properties;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.api.datastream.DataStreamSource;
import org.apache.flink.streaming.connectors.kafka.FlinkKafkaConsumer;
import org.apache.flink.streaming.api.CheckpointingMode;
import org.apache.flink.streaming.api.TimeCharacteristic;
import org.apache.flink.streaming.api.datastream.DataStream;

import com.alibaba.fastjson.JSON;
import redis.clients.jedis.Jedis;

import org.apache.flink.api.common.serialization.SimpleStringSchema;

@SuppressWarnings("deprecation")
public class KafkaToFlink {
	//Topic名字指定
    private static final String TOPIC = "test";
    //定义POLO类
    public static PaymentInfo parseObject = new PaymentInfo();
    public static void main(String[] args) throws Exception {
        final StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
        env.setStreamTimeCharacteristic(TimeCharacteristic.ProcessingTime);
        env.enableCheckpointing(60 * 1000, CheckpointingMode.EXACTLY_ONCE);
        env.getCheckpointConfig().setCheckpointTimeout(30 * 1000);
        //properties配置文件
        Properties props = new Properties();
        props.put("bootstrap.servers", "192.168.30.141:9092,192.168.30.142:9092,192.168.30.143:9092");
        props.put("zookeeper.connect", "192.168.30.141:2181,192.168.30.142:2181,192.168.30.143:2181");
        props.put("group.id", "student-group");
        props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("auto.offset.reset", "latest");
        //创建DataStream，配置数据流源头(Topic)
		DataStreamSource<String> work =  (DataStreamSource<String>) env.addSource(new FlinkKafkaConsumer<>(
                TOPIC,
                new SimpleStringSchema(), //反序列优化器
                props))
			.setParallelism(1)//partition_counts
			//后两者在本次作业中用处不大
			.name("source_kafka_" + TOPIC)
			.uid("source_kafka_" + TOPIC);
		//查看DataStream流信息
        work.print();
        @SuppressWarnings("unused")
		DataStream<String> orderStream = work
      		  .map(message->{ //重写定义函数
      			//Java反射到POLO类
      			parseObject = JSON.parseObject(message, PaymentInfo.class);  
      			//连接Redis
      			Jedis conn = Java_Redis.getConn();
      			
      	        // 总销售金额(total)
      	        conn.incrBy("total_price",(long)parseObject.getTotal());
      	        // 订单数量(order)
      	        if((long)parseObject.getTotal() != 0) {
      	        	conn.incrBy("order_num",1);
      	        }     	        	
      	        // 下单客户数(custom)
      	        conn.incrBy("custom"+parseObject.getRecipient(), 1);
      	        //conn.zincrby("custom", 1, parseObject.getRecipient());
      	        // 全国各地下单的图书的累计数量（按省份）(city)
      	        String city = parseObject.getReceiveplace();
      	        conn.incrBy("city "+city, parseObject.getBook_num());
      	        // 每个出版社(press)的总销量
      	        //conn.incrBy("press_num"+parseObject.getBook_press(), parseObject.getBook_num());
      	        if(parseObject.getBook_press() != null) {
          	        conn.zincrby("press_num", parseObject.getBook_num(), parseObject.getBook_press());
      	        }
      	        // 每本图书(book)的销售数量
      	        if(parseObject.getBook_name() != null) {
      	        	conn.zincrby("book_num", parseObject.getBook_num(), parseObject.getBook_name());
      	        }
      	        //conn.incrBy("book_num"+parseObject.getBook_name(), parseObject.getBook_num());
      	        // 图书类型销量(type)
      	        conn.incrBy("type_num"+parseObject.getBook_type(), parseObject.getBook_num());
      	        // 全国各地发货的订单的累计数量（按省份）(source)
      	        String source = parseObject.getReceiveplace();
      	        conn.incrBy("source"+source, 1);
      	        //conn.zincrby("source", 1, source);
      	        // 每个出版社(press)的总销量
      	        conn.incrBy("payment_type"+parseObject.getMethodofpayment(), 1);
      	        conn.close();
      	        
      	        return "数据成功输入到redis";
      		  })
      		  .name("map_sub_order_detail").uid("map_sub_order_detail");
        env.execute();
        //conn.close();
    }
}
