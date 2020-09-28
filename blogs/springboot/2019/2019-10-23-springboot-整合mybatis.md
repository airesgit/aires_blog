---
title: SpringBoot (五) springboot整合mybatis
date: 2019-10-23
tags:
 - springBoot
categories: 
 - springBoot
---

## springboot整合mybatis

---

引入相关依赖
```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>1.3.2</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
```

因为已经整合好了，所以jdbcTemplate直接注入即可使用
```java
@Service
public class UserServiceImpl implements UserService {
      @Autowired
      private JdbcTemplate jdbcTemplate;
      public void createUser(String name, Integer age) {
            jdbcTemplate.update("insert into users values(null,?,?);", name, age);
      }
}
```

---
**作者：aires的收藏馆**  
**出处：[www.aires.net.cn](http://www.aires.net.cn)**   
**版权所有，欢迎保留原文链接进行转载** 

