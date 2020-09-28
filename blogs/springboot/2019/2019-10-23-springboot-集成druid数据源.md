---
title: SpringBoot (十四) springboot-集成druid数据源
date: 2019-10-23
tags:
 - springBoot
categories: 
 - springBoot
---

## springboot-集成druid数据源

---

引入依赖
```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.1.10</version>
</dependency>
```
相关配置
```text
datasource:
  druid:
    initial-size: 50
    min-idle: 20
    max-active: 100
    pool-prepared-statements: true
    max-pool-prepared-statement-per-connection-size: 20
    validation-query: SELECT 1
    test-while-idle: true
    
## 配置可视化，可视化会拦截所有的sql，并对sql的执行时间进行统计分析
    web-stat-filter:  ## 配置 filter 过滤器
        enabled: true
        url-pattern: /*   ## 拦截所有地址
        exclusions: /druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico   ## 放行路径 ，其中 / druid/* 是访问路径
        session-stat-enable: true
        session-stat-max-count: 10
    stat-view-servlet:  ## 配置 servlet
        enabled: true
        url-pattern: /druid/*  ## 访问地址
        reset-enable: true
        login-username: admin   ## 用户名
        login-password: 123     ## 密码
```

---
**作者：aires的收藏馆**  
**出处：[www.aires.net.cn](http://www.aires.net.cn)**   
**版权所有，欢迎保留原文链接进行转载** 

