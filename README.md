# 实时计算[**(English Version)**](README_English/README_English.md)
运用实时计算技术、Web 技术构建一个大数据看板来解决问题。其中实用技术包括Mysql、Kafka、Flink、Redis、Flask和Echarts

## 目录

[1.问题需求](#1问题需求)

[2.方案分析](#2方案分析)

[3.安装环境](#3安装环境)

[4.环境启动命令和运行代码的方法](#4环境启动命令和运行代码的方法)

[5.代码目录结构说明](#5代码目录结构说明)

[6.常见问题说明](#6常见问题说明)

[7.作者](#7作者)

## 1.问题需求

通过模拟对电子图书平台订单信息的实时处理，使用实时计算相关技术和分布式集群思想处理海量订单信息，最后通过Dashboard可视化大屏来展示数据分析结果。

- 界面每 3 秒刷新一次，如果能做到 2 秒或 1 秒刷新一次；
- 展示当前订单的已处理速度，单位为“条/秒”；
- 大数据看板界面应简洁大气，有特点；
- 展示截止当前时间的总销售金额、订单数量、下单客户数基本信息；
- 展示截止当前时间销量排名前 10 的图书排行榜；
- 展示截止当前时间销量排名前 10 的出版社排行榜；
- 展示全国各地下单客户的累计数量（按省份），在地图上直观展示；
- 数据统计误差（数据丢失、统计错误）不超过 1%，应设计实验计算数据误差率；
- 展示的数据延迟应不超过 30 秒，每次刷新时应显示获取的数据最新时间；


## 2.方案分析

订单数据模拟器生成数据后存入MySQL中，通过根据读取MySQL的二进制日志binlog(记录了所有的 DDL 和 DML 语句（除了数据查询语句select、show等），以事件形式记录，还包含语句所执行的消耗的时间，MySQL的二进制日志是事务安全型的.)实时获取MySQL的更新的数据，然后通过Kafka再传输到Flink的DataStream中，针对DataStream中的流数据提取主要信息后按照反射机制变成Key-Value存入Redis，利用Python 的Flask框架获取数据并进行数据处理再通过JSON的数据格式发送到定义的前端页面中（URL），最后使用Echarts框架获得需求的对应URL中的数据进行DashBoard可视化数据大屏展示。
![Scheme specific structure](/picture/Scheme_structure.png)


## 3.安装环境

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


## 4.环境启动命令和运行代码的方法

数据产生器 -> MysqlToKafka.java -> KafkaToFlink.java -> Flask.py

具体启动步骤
```
    1). 先开启MySQL数据库服务和Redis数据库服务
        (如果在此前已经运行过此项目，则需要先使用“Flushall”命令以清空Redis数据库中的所有数据。)
    2). 运行项目我们还需要打开虚拟机中的Zookeeper、Kafka分布式集群框架
    3). 首先重新加载MySQL数据库中相应table，设置线程数，开启数据模拟生成器。
    4). 紧接着要运行MysqlToKafka.java、KafkaToFlink.java和Flask.py三个程序。他们的启动顺序没有硬性要求，但在这里建议我们按照整体实现过程的顺序来运行代码程序：先运行MysqlToKafka.java，再运行KafkaToFlink.java，最后运行Flask.py。
    5). 以上程序全部运行后，启动HTML页面，这里使用Pycharm中带有可以直接打开对应html的方法。当然也可以使用Flask框架中已经定义好了“127.0.0.1/”IP页面打开。
    
    注：在同一目录下有项目的详细代码文件、配置文件以及项目启动/运行结果的视频文件提供使用和参考：
            代码文件位置及目录命名格式：./项目实现代码
            配置文件目录：./相关配置文件
            运行过程见：./Dashboard实时大屏展示.mp4；
            运行界面见：./项目整体过程展示.mp4。
```
    
    
## 5.代码目录结构说明

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

## 6.常见问题说明

1）无法连接到MySQL的Binlog日志，连接到Binlog后却无法从日志种准确提出对应的数据。

```
    问题产生原因：一个是找不到Binlog的相关设置，另一个是在MySQL数据库中对用户权限开放还不够全面。
    解决方式：打开MySQl的Binlog相关设置文件并不是伴随我们安装的位置的，如果我们需要寻找到相关文件的位置，我们可以通过相关命令从MySQL中查询到配置文件的位置。我们还可以通过相关查看用户权限的命令查看我们是否已经对用户打开了所有的权限。请一定要主要这些配置的做法，因为在Java本地连接MySQL的binlog过程中，这些jar包不是通过正常的官方提供的，所以可能做的不太全面。它会使一些遇到的错误没有提示，但是就是连不上，让你无处可找错。
```

2）在Flink框架中无法对DataStream数据流中的数据进行提取并分类和处理

```
    问题产生原因：在本次项目实验中，使用DataStream的map方法来对DataStream数据流的数据进行提取和分类处理的。但是刚接触map的方法，不能完全使用好这个方法。通过官方案例仅仅能了解到局限目的下的map用法，它不适用于本项目实验要求。
    解决方式：在多次跌倒，多次查看原jar包中的类方法和官方一些说明后，才慢慢领会到使用map方法可以让用户自定义出适合用户使用的方法。它类似于scala语言中的map，或者换句话说，它就是scala语言中的map方法。
```

3）实时图表刷新问题（数据无法及时刷新、刷新闪屏等）

```
    问题产生原因：起先没有在意var、let、const关键字定义变量的区别，在for循环中定义了let变量导致for循环外无法使用变量，数据自然无法得到实时的更新。在出现数据无法更新的问题后尝试利用JQuery进行局部刷新，例如“$("#echart1").load(location.href+" #echart1", "");”，但使用这种方式不知为何会导致所有<script>标签的代码重新运行导致页面卡顿以及闪屏。
    解决方式：最后放弃了使用jQuery进行局部刷新的方法，并发现了let变量作用域以及未设置定时器Timer仅设置了间隔Interval等问题，最终解决了实时刷新的问题。
```

4）前端展示过程随时间推移，数据增多（使用Redis，内存储存占用）而变得卡顿

```
    问题产生原因：起初并不知道为什么获取数据处理数据都可以很高速的完成，后来通过一个一个的测试点的设置，发现有几个点是需要注意的，他可能影响了最后可视化前端的卡顿。一个是因为Redis是基于内存存储的，是否我多分配内存给Redis就可以解决问题；另一个是从前端F12查看获取数据毫秒延迟发现部分数据获取耗费了大量的时间，原因尚不明确。
    解决方式：最后两个怀疑的原因经合并分析后，感觉两个原因是互相影响的，主要原因还是Redis内存存储，而导致整体本机系统运行变得卡顿缓慢。所以尝试了存储方式的改变，使得利用内存存储的过程尽量少增加Key-Value的数据进去，而在原Key上的进行改动数据，最后的确获得了解决。虽然Redis大量的提高了查询和存储的速度，但是也在另一个方面影响了整体机器的运行效率。
```

5）......


## 7.作者

nono （王泽川）

指导教师：杨丰玉

南昌航空大学

