---
title: SpringBoot (六) springboot整合pageHelper
date: 2019-10-23
tags:
 - springBoot
categories: 
 - springBoot
---

## springboot整合pageHelper

---

PageHelper 是一款好用的开源免费的 Mybatis 第三方物理分页插件
物理分页
支持常见的 12 种数据库。Oracle,MySql,MariaDB,SQLite,DB2,PostgreSQL,SqlServer 等
支持多种分页方式
支持常见的 RowBounds(PageRowBounds)，PageHelper.startPage 方法调用，Mapper 接口参数调用

引入pageHelper依赖
```xml
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>1.2.5</version>
</dependency>
```
相关配置
```text
spring.datasource.url=jdbc:mysql://localhost:3306/test
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
 
logging.level.com.example.demo.dao=DEBUG
pagehelper.helperDialect=mysql
pagehelper.reasonable=true   #第一页前都是第一页，最大一页后都是最大页
pagehelper.supportMethodsArguments=true
pagehelper.params=count=countSql
pagehelper.page-size-zero=true
```

---
**作者：aires的收藏馆**  
**出处：[www.aires.net.cn](http://www.aires.net.cn)**   
**版权所有，欢迎保留原文链接进行转载** 

