---
layout: post
title:  SpringBoot (七) springboot整合jpa
category: springBoot 
tags: [springBoot]
copyright: java
---

## springboot整合jpa

---

引入相关依赖
```xml
<dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
</dependency>
<dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```
相关配置
```text
jpa:  //可以查看源码配置信息
  database: MySQL
  show-sql: true
  generate-ddl: true
```
实体配置
```java
@Entity(name = "users")
public class UserEntity {
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Integer id;
      @Column(name = "name")
      private String name;
      @Column(name = "age")
      private Integer age;
}
```
Dao层接口继承JpaRepository接口
```java
public interface UserDao extends JpaRepository<User, Integer> {
}
```

---
**作者：aires的收藏馆**  
**出处：[www.aires.net.cn](http://www.aires.net.cn)**   
**版权所有，欢迎保留原文链接进行转载** 

