---
title: Spring (七) spring数据源配置
date: 2019-10-14
tags:
 - spring
categories: 
 - spring
---

## spring数据源配置
常用的数据源一般是spring内置数据源，C3P0,DBCP,Druid，它们的配置都大同小异，只不过引入的数据源不同而已

spring内置数据源
```xml
<!-- 配置数据源对象 -->
    <bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        // 此处省略链接数据库配置
    </bean>
```
C3P0
```xml
<!-- 配置数据源对象 -->
    <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        // 此处省略链接数据库配置
    </bean>
```
DBCP
```xml
<!-- 配置数据源对象 -->
    <bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource">
        // 此处省略链接数据库配置
    </bean>
```
Druid
```xml
<!-- 配置数据源对象 -->
    <bean id="dataSource" class="">
        // 此处省略链接数据库配置
    </bean>
```

---
**作者：aires的收藏馆**  
**出处：[www.aires.net.cn](http://www.aires.net.cn)**   
**版权所有，欢迎保留原文链接进行转载** 

