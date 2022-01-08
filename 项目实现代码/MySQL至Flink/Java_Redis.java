package mysql_kafka2;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

public class Java_Redis {	
	//public Java_Redis() {}
    private static JedisPool pool = null;
    /**
     * 获取jedis连接池
     * */
    public static JedisPool getPool(){
        if(pool == null){
            //创建jedis连接池配置
            JedisPoolConfig config = new JedisPoolConfig();
            //最大连接数
            config.setMaxTotal(20);
            //最大空闲连接
            config.setMaxIdle(5);
            //创建redis连接池
            // 使用jedisPool的时候，timeout一定要给出来，如果不给，redis很大概率会报错，超时
            pool = new JedisPool(config,"127.0.0.1",6379,3000);
        }
        return pool;
    }

    /**
     * 获取jedis连接
     * */
    public static Jedis getConn(){
        return getPool().getResource();
    }

    /**
     * 测试连接
     * @param args
     */
    public static void main(String[] args) {
        Jedis jedis = getPool().getResource();
        System.out.println("服务正在运行: "+jedis.ping());
        jedis.close();
    }


}

