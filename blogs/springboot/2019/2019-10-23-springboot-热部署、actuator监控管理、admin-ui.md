---
title: SpringBoot (十二) springboot-热部署、actuator监控管理、admin-ui
date: 2019-10-23
tags:
 - springBoot
categories: 
 - springBoot
---

## springboot-热部署、actuator监控管理、admin-ui

---

#### 热部署
引入Devtools依赖集成即可
```xml
<dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-devtools</artifactId>
      <optional>true</optional>
      <scope>true</scope>
</dependency>
```

---
#### actuator监控
- 导入依赖
- 配置相关信息

```xml
<dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

配置监控端点
```text
###通过下面的配置启用所有的监控端点，默认情况下，这些端点是禁用的；
management:
  endpoints:
    web:
      exposure:
        include: "*"      ## 代表监控所有，默认是info 和health
```

Actuator访问路径

通过actuator/+端点名就可以获取相应的信息

路径 | 作用
---|---
/actuator/beans | 显示应用程序中所有Spring bean的完整列表
/actuator/configprops | 显示所有配置信息
/actuator/env | 陈列所有的环境变量
/actuator/mappings | 显示所有@RequestMapping的url整理列表
/actuator/health | 显示应用程序运行状况信息 up表示成功 down失败
/actuator/info | 查看自定义应用信息

---
#### admin-ui-server 服务端
```text
步骤： 
    导入依赖
    启动类配置 支持admin服务端注解  @EnableAdminServer
```
引入依赖
```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.0.3.RELEASE</version>
</parent>
<dependencies>
    <dependency>
          <groupId>de.codecentric</groupId>
          <artifactId>spring-boot-admin-starter-server</artifactId>
          <version>2.0.0</version>
    </dependency>
    <dependency>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-starter-webflux</artifactId>
    </dependency>
    <!-- Spring Boot Actuator对外暴露应用的监控信息，Jolokia提供使用HTTP接口获取JSON格式 的数据 -->
    <dependency>
          <groupId>org.jolokia</groupId>
          <artifactId>jolokia-core</artifactId>
    </dependency>
    <dependency>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
    <dependency>
          <groupId>com.googlecode.json-simple</groupId>
          <artifactId>json-simple</artifactId>
          <version>1.1</version>
    </dependency>
</dependencies>
```

#### admin-ui-client 客户端
```text
步骤：
    导入依赖
    配置yml
```
引入依赖
```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.0.0.RELEASE</version>
</parent>
<dependencies>
    <dependency>
          <groupId>de.codecentric</groupId>
          <artifactId>spring-boot-admin-starter-client</artifactId>
          <version>2.0.0</version>
    </dependency>
    <dependency>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
    <dependency>
          <groupId>org.jolokia</groupId>
          <artifactId>jolokia-core</artifactId>
    </dependency>
    <dependency>
          <groupId>com.googlecode.json-simple</groupId>
          <artifactId>json-simple</artifactId>
          <version>1.1</version>
    </dependency>
    <dependency>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```
客户端配置
```text
spring:
  boot:
    admin:
      client:
        url: http://localhost:8080
server:
  port: 8081
 
management:
  endpoints:
    web:
      exposure:
        include: "*"
  endpoint:
    health:
      show-details: ALWAYS
```

---
**作者：aires的收藏馆**  
**出处：[www.aires.net.cn](http://www.aires.net.cn)**   
**版权所有，欢迎保留原文链接进行转载** 

