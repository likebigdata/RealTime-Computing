# 实时计算[**(English Version)**](README_English/README_English.md)
运用实时计算技术、Web 技术构建一个大数据看板来解决问题。其中实用技术包括Mysql、Kafka、Flink、Redis、Flask和echarts

## 目录

[1.安装环境](#1.安装环境)

[2.环境启动命令和运行代码的方法](#2.环境启动命令和运行代码的方法)

[3.代码目录结构说明](#3.代码目录结构说明)

[4.常见问题说明](#4.常见问题说明)


## 1.安装环境

### 虚拟机环境
```
Scala	2.11.5
Kafka_2.11	2.4.1
Flink-bin-Scala_2.11	1.12.5
```
### 本地环境
```
MySQL	8.0.27
Redis	4.0.14
```
#### (本地python环境)
```
python	3.8
flask	1.1.2
flask-cors	3.0.10
```
### 本地导入jar包
```
fasyjson	1.2.78
flink-connector-kafka_2.11	1.12.0
flink-connector-redis_2.11	1.0
jedis	2.9.0
commons-pool2	2.6.0
```
### 另附带分类好的jar包文件夹：（也需要导入）

```
Flink libs（有关Flink所有jar包）
Kafka libs（有关Kafka所有jar包）
Scala libs（有关Scala所有jar包）
MySQL-Kafka（有关Kafka读取MySQL binlog日志所有java文件）
```
## 2.环境启动命令和运行代码的方法

数据产生器 -> MysqlToKafka.java -> KafkaToFlink.java -> Flask.py

详见同级文件

项目报告.docx

## 3.代码目录结构说明
```
│  项目报告.docx
│  Dashboard实时大屏展示.mp4
│  README.md
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
## 4.常见问题说明
1）无法连接到MySQL的Binlog日志，连接到Binlog后却无法从日志种准确提出对应的数据。

2）在Flink框架中无法对DataStream数据流中的数据进行提取并分类和处理

3）实时图表刷新问题（数据无法及时刷新、刷新闪屏等）

4）前端展示过程随时间推移，数据增多（使用Redis，内存储存占用）而变得卡顿

5）......

具体问题说明详见同级文件

项目报告.docx


