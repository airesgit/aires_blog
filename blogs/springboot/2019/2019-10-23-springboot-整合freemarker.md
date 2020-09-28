---
title: SpringBoot (二) springboot与静态模板整合
date: 2019-10-23
tags:
 - springBoot
categories: 
 - springBoot
---

## springboot与静态模板整合

---

springboot的提供了4个静态目录：
```text
resources：
static
WEB-INF/resources
public
作用：用于存放静态资源，在访问静态资源的时候，springBoot 会去静态文件夹找对应的文件
（访问路径，直接写静态文件，不需要写静态文件夹）
```

---
#### freemark整合

引入freemarker 依赖
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-freemarker</artifactId>
</dependency>
```

以上引入依赖就会springboot自动整合好了，如需要更改些配置，如下

相关配置
```text
########################################################
###FREEMARKER (FreeMarkerAutoConfiguration)
########################################################
spring.freemarker.allow-request-override=false
spring.freemarker.cache=true
spring.freemarker.check-template-location=true
spring.freemarker.charset=UTF-8
spring.freemarker.content-type=text/html
spring.freemarker.expose-request-attributes=false
spring.freemarker.expose-session-attributes=false
spring.freemarker.expose-spring-macro-helpers=false
#spring.freemarker.prefix=
#spring.freemarker.request-context-attribute=
#spring.freemarker.settings.*=
spring.freemarker.suffix=.ftl
spring.freemarker.template-loader-path=classpath:/templates/
#comma-separated list
#spring.freemarker.view-names= # whitelist of view names that can be resolved
```

---
#### Thymeleaf整合

---

**作者：aires的收藏馆**  
**出处：[www.aires.net.cn](http://www.aires.net.cn)**   
**版权所有，欢迎保留原文链接进行转载** 

