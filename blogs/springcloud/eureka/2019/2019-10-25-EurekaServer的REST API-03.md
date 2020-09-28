---
title: EurekaServer的REST API
date: 2019-10-25
tags:
 - springcloud 
 - eureka
categories: 
 - springcloud
---

## EurekaServer的REST API
前面已经介绍过最基本的Eureka Server 及 Eureka Client的java语言搭建，但是Eureka Server提供了 REST API,
允许非Java语言的应用服务通过HTTP REST的方式接入Eureka的服务发现中。

---
### REST API 列表

![EUREKA REST API](/aires_blog/assets/images/springcloud/eureka/rest-api.png)

---
如果我们要查询所有实例，我们访问提供的api地址即可：

http://ip:port/eureka/apps

![EUREKA REST API](/aires_blog/assets/images/springcloud/eureka/rest-api-02.png)

我们也可以通过eureka提供的api去查询某个服务

![EUREKA REST API](/aires_blog/assets/images/springcloud/eureka/rest-api-03.png)

其余的自己去使用这里不一一列举了。

---
**作者：aires的生活日记**  
**出处：[www.aires.net.cn](http://www.aires.net.cn)**   
**版权所有，欢迎保留原文链接进行转载** 

