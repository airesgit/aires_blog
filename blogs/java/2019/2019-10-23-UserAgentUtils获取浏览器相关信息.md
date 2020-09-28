---
title: UserAgentUtils获取浏览器相关信息
date: 2019-10-23
tags:
 - java 
 - web
categories: 
 - java
---

## UserAgentUtils获取浏览器相关信息

引入相关依赖
```xml
<dependency>
    <groupId>eu.bitwalker</groupId>
    <artifactId>UserAgentUtils</artifactId>
    <version>1.20</version>
</dependency>
```

代码示例
```text
UserAgent userAgent = UserAgent.parseUserAgentString(request.getHeader("User-Agent")); // 1
Version version = userAgent.getBrowserVersion(); // 2 
String browserVersion = null;
browserVersion = Objects.isNull(version)? "orther" : version.getVersion(); // 3
String browserName = userAgent.getBrowser().getName(); // 4
String os = userAgent.getOperatingSystem().getName(); // 5
```
步骤解释
```text
1： 	通过request 的 User-Agent 请求头获取浏览器相关信息
2、3；  获取浏览器版本
4： 	获取流浪器名称
5： 	获取操作系统名称
```

---
**作者：aires的收藏馆**  
**出处：[www.aires.net.cn](http://www.aires.net.cn)**   
**版权所有，欢迎保留原文链接进行转载** 

