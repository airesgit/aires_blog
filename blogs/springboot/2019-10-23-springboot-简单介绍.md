---
layout: post
title:  SpringBoot (一) 简单介绍
category: springBoot 
tags: [springBoot]
copyright: java
---

## 简单介绍
Spring 诞生时是 Java 企业版（Java Enterprise Edition，JEE，也称 J2EE）的轻量级代替品。无需开发重量级的 Enterprise JavaBean（EJB），Spring 为企业级Java 开发提供了一种相对简单的方法，通过依赖注入和面向切面编程，用简单的Java 对象（Plain Old Java Object，POJO）实现了 EJB 的功能。
虽然 Spring 的组件代码是轻量级的，但它的配置却是重量级的。

#### Spring 的历史发展
- 第一阶段 Spring 1.X：xml配置
- 第二阶段 Spring 2.X：注解配置
- 第三阶段 Spring 3.0：java配置

Spring Boot其设计目的是用来简化Spring应用的初始搭建以及开发采用约定优于配置，只需要“run”就能创建一个独立的、生产级别的Spring应用。Spring Boot为Spring平台及第三方库提供开箱即用的设置（提供默认设置），这样我们就可以简单的开始。多数Spring Boot应用只需要很少的Spring配置。

#### Spring Boot主要特点：
- 创建独立的Spring应用程序
- 嵌入的Tomcat，无需部署WAR文件		（可以很好的配置微服务）
- 简化Maven配置
- 自动配置Spring	(已经配置好了Spring 容器了)
- 提供生产就绪型功能，如指标，健康检查和外部配置
- 绝对没有代码生成和对XML没有要求配置

---
简单springboot示例Demo

```java
@SpringBootApplication 
public class Application {
	
	public static void main(String[] args) {
		SpringApplication springApplication = new SpringApplication(Application.class);
		/** 设置横幅模式(设置关闭) */
		springApplication.setBannerMode(Banner.Mode.OFF);
		/** 运行 */
		springApplication.run(args);
	}
}
```
@SpringBootApplication 代表springboot应用，它包含了三个注解
- @Configuration：用于定义一个配置类
- @EnableAutoConfiguration：开启springboot的自动配置
- @ComponentScan： 指定spring扫描的目录

SpringApplication类
- run方法：启动springboot应用

---

**作者：aires的收藏馆**  
**出处：[www.aires.net.cn](http://www.aires.net.cn)**   
**版权所有，欢迎保留原文链接进行转载** 

