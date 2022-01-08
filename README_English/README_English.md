# Catalogue

1.Installation environment

2.Environment start command and method of running code

3.Description of code directory structure

4.Frequently asked questions

## 1. Installation environment
### Virtual machine environment
```
Scala	2.11.5
Kafka_2.11	2.4.1
Flink-bin-Scala_2.11	1.12.5
```
### Local environment
```
MySQL	8.0.27
Redis	4.0.14
```
#### [Native Python environment]
```
python	3.8
flask	1.1.2
flask-cors	3.0.10
```
### Import jar package locally
```
fasyjson	1.2.78
flink-connector-kafka_2.11	1.12.0
flink-connector-redis_2.11	1.0
jedis	2.9.0
commons-pool2	2.6.0
```
### A classified jar package folder is attached：（Import is also required）
```
Flink libs（All jar packages about Flink）
Kafka libs（All jar packages about Kafka）
Scala libs（All jar packages related to Scala）
MySQL-Kafka（All java files related to Kafka reading MySQL binlog logs）
```
## 2. Environment start command and method of running code

数据产生器 -> MysqlToKafka.java -> KafkaToFlink.java -> Flask.py

（See the documents at the same level for details

项目报告.docx）


## 3. Description of code directory structure
```
│  项目报告.docx
│  Dashboard实时大屏展示.mp4
│  README.txt
│  项目整体过程展示.mp4
│
├─README_English
│      README_English.txt
│  
├─作业项目要求
│      大作业要求.pdf
│      软件说明文档-v0.5.pdf
│
├─数据模拟生产器
│      allbook.csv
│      dist.zip
│      place.json
│      read.exe
│
├─相关配置文件
│  ├─本地导入jar包
│  │  │  commons-pool2-2.6.0.jar
│  │  │  fastjson-1.2.78.jar
│  │  │  flink-connector-kafka_2.11-1.12.0.jar
│  │  │  flink-connector-redis_2.11-1.0.jar
│  │  │  jedis-2.9.0.jar
│  │  │  
│  │  ├─Flink libs
│  │  │      
│  │  ├─Kafka libs
│  │  │      
│  │  ├─MySQL-Kafka
│  │  │  │  mysql-binlog-connector-java-master.zip
│  │  │  │  本目录说明和MySQl配置说明.txt
│  │  │  │  
│  │  │  └─com
│  │  │      └─github
│  │  │          └─shyiko
│  │  │              └─mysql
│  │  │                  └─binlog
│  │  │                                      
│  │  └─Scala libs
│  │          
│  ├─本地环境
│  │  │  本地相关python环境安装.txt
│  │  │  
│  │  ├─MySQL
│  │  │      mysql-8.0.27-winx64.msi
│  │  │      mysql-workbench-community-8.0.27-winx64.msi
│  │  │      
│  │  └─Redis
│  │          Redis 安装教程及使用命令.txt
│  │          Redis-x64-4.0.14.msi
│  │          
│  └─虚拟机环境
│          flink-1.12.5-bin-scala_2.11.tgz
│          flink安装教程.txt
│          kafka_2.11-2.4.1.tgz
│          kafka安装教程.txt
│          scala-2.11.5.tgz
│          scala安装教程.txt
│          
└─项目实现代码
    ├─Flask至可视化（Pycharm）
    │  │  Flask.py
    │  │  
    │  ├─static
    │  │  ├─css
    │  │  │      comon0.css
    │  │  │      index.html
    │  │  │      
    │  │  ├─font
    │  │  │      DS-DIGIT.TTF
    │  │  │      
    │  │  ├─images
    │  │  │      bg.jpg
    │  │  │      head_bg.png
    │  │  │      line(1).png
    │  │  │      
    │  │  ├─js
    │  │  │      area_echarts.js
    │  │  │      china.js
    │  │  │      echarts.min.js
    │  │  │      echarts1.js
    │  │  │      echarts2.js
    │  │  │      echarts3.js
    │  │  │      echarts4.js
    │  │  │      echarts5.js
    │  │  │      echarts6.js
    │  │  │      jquery.js
    │  │  │      
    │  │  └─picture
    │  │          jt.png
    │  │          lbx.png
    │  │          loading.gif
    │  │          map.png
    │  │          nchu.png
    │  │          weather.png
    │  │          
    │  └─templates
    │          Dashboard.html
    │          
    └─MySQL至Flink
            Java_Redis.java
            KafkaToFlink.java
            MysqlToKafka.java
            PaymentInfo.java
```
## 4. Frequently asked questions
1 Unable to connect to MySQL's binlog. After connecting to binlog, the corresponding data cannot be accurately proposed from the log.

2 In Flink framework, data in datastream data stream cannot be extracted, classified and processed

3 Real time chart refresh problem (data cannot be refreshed in time, refresh screen, etc.)

4 The front-end display process becomes stuck with the increase of data (using redis, memory storage occupation) over time

5 ......

（See the documents at the same level for details

项目报告.docx）

