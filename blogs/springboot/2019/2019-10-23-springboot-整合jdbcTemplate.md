---
title: SpringBoot (四) springboot整合jdbcTemplate
date: 2019-10-23
tags:
 - springBoot
categories: 
 - springBoot
---

## springboot整合jdbcTemplate

---

引入jdbcTemplate依赖
```xml
<dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-jdbc</artifactId>
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

