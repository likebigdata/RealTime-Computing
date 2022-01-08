package mysql_kafka2;

import com.alibaba.fastjson.JSON;
import com.github.shyiko.mysql.binlog.BinaryLogClient;
import com.github.shyiko.mysql.binlog.event.DeleteRowsEventData;
import com.github.shyiko.mysql.binlog.event.EventData;
import com.github.shyiko.mysql.binlog.event.TableMapEventData;
import com.github.shyiko.mysql.binlog.event.UpdateRowsEventData;
import com.github.shyiko.mysql.binlog.event.WriteRowsEventData;

import java.io.IOException;
import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.List;
import java.util.Map.Entry;
import java.util.Properties;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerRecord;


public class MysqlToKafka {
	public static String sche;
	public static List<Serializable> entries;
	public static void main(String[] args) {
		//自定义方法创建Kafka的Producer对象
		Producer<String, String> Producer = create_producer();
		//连接MySQL的binlog日志
	    BinaryLogClient client = new BinaryLogClient("192.168.30.1", 3306, "root", "123456");
	    client.setServerId(1);
	    //下面设置读取哪一次的binlog日志，若没有设置则读取
	    //client.setBinlogFilename("DESKTOP-6SG6PN3-bin.000010");
	    
	    //对binlog日志开始监听
	    client.registerEventListener(event -> {
        EventData data = event.getData();
	        if (data instanceof TableMapEventData) {            
	            TableMapEventData tableMapEventData = (TableMapEventData) data;
	            //tableMapEventData.getTableId()
	            sche = tableMapEventData.getDatabase() + "-" + tableMapEventData.getTable();
	            System.out.println("Table:"+sche);
	        }
	    //参考博客https://www.cnblogs.com/suizhikuo/p/15254009.html
	        //当数据库中存在“更新”的变化
	         if(data instanceof UpdateRowsEventData) {
	            System.out.println("Update:");
	            UpdateRowsEventData updateRowsEventData = (UpdateRowsEventData) data;
	            for(Entry<Serializable[], Serializable[]> row : updateRowsEventData.getRows()) {
	                entries = Arrays.asList(row.getValue());
	                System.out.println(entries);              
	                try {
	                	PaymentInfo info = gain_info(sche, entries);
			            Producer.send(new ProducerRecord<String, String>("test", JSON.toJSONString(info)));
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
	            }
	         //当数据库中存在“新增”的变化
	        }else if (data instanceof WriteRowsEventData) {
	            System.out.println("Insert:");
	            WriteRowsEventData writeRowsEventData = (WriteRowsEventData) data;
	            for(Serializable[] row : writeRowsEventData.getRows()){
	                entries = Arrays.asList(row);
	                System.out.println(entries);
	                try {
	                	PaymentInfo info = gain_info(sche, entries);
				        System.out.println(JSON.toJSONString(info));
			            Producer.send(new ProducerRecord<String, String>("test", JSON.toJSONString(info)));
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
	            }
	        } 	    
	    });
	    try {
	        client.connect();           
	    } catch (IOException e) {
	        e.printStackTrace();
	    }	    
	}
	public static Producer<String , String> create_producer() {
		// 1、准备配置文件
        Properties props = new Properties();
        
        props.put("bootstrap.servers", "192.168.30.141:9092,192.168.30.142:9092,192.168.30.143:9092");
         //当生产者将ack设置为“全部”（或“-1”）时，min.insync.replicas指定必须确认写入被认为成功的最小副本数。
        props.put("acks", "all");
         //设置一个大于零的值,将导致客户端重新发送任何失败的记录
        props.put("retries", 0);
        //只要有多个记录被发送到同一个分区，生产者就会尝试将记录一起分成更少的请求。
        //这有助于客户端和服务器的性能。该配置以字节为单位控制默认的批量大小。
        props.put("batch.size", 16384);
        //在某些情况下，即使在中等负载下，客户端也可能希望减少请求的数量。
        //这个设置通过添加少量的人工延迟来实现这一点，即不是立即发出一个记录，
        //而是等待达到给定延迟的记录，以允许发送其他记录，以便发送可以一起批量发送
        props.put("linger.ms", 1);
        //生产者可用于缓冲等待发送到服务器的记录的总字节数。
        //如果记录的发送速度比发送给服务器的速度快，那么生产者将会阻塞，max.block.ms之后会抛出异常。
        //这个设置应该大致对应于生产者将使用的总内存，但不是硬性限制，
        //因为不是所有生产者使用的内存都用于缓冲。
        //一些额外的内存将被用于压缩（如果压缩被启用）以及用于维护正在进行的请求。
        props.put("buffer.memory", 33554432);
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

        
        // 2、创建KafkaProducer
        KafkaProducer<String, String> kafkaProducer = new KafkaProducer<String, String>(props);
        
        return kafkaProducer;
	}
	
    public static PaymentInfo gain_info(String sche, List<Serializable> rs) throws UnsupportedEncodingException{
    	//POLO对象，但这里没有使用反射机制
        PaymentInfo info = new PaymentInfo();   	
        if(sche.equals("bookorder-order")) {
	        info.setOrder_id((String) rs.get(0));
	        info.setBook_id((String) rs.get(1));
	        info.setBook_name((String) rs.get(2));
	        info.setBook_type((String) rs.get(3));
	        info.setBook_num((Integer)rs.get(4));
	        info.setBook_price((float) rs.get(5));
	        info.setBook_press((String) rs.get(6));
	        info.setId((Integer) rs.get(7));
        }
        else if(sche.equals("bookorder-orderdetail")) {
	        info.setOrderdetailid((String) rs.get(0));
	        info.setOrderid((String) rs.get(1));
	        info.setSender((String) rs.get(2));
	        info.setSendplace((String) rs.get(3));
	        info.setRecipient((String) rs.get(4));
	        info.setReceiveplace((String) rs.get(5));
	        info.setMethodofpayment((String) rs.get(6));
	        info.setPaytime((String) rs.get(7));
	        info.setFreight((float) rs.get(8));
	        info.setTotal((float) rs.get(9));
        }
        return info;
    }
}

