---
title: Spring (四) spring整合junit单元测试
date: 2019-10-11
tags:
 - spring
categories: 
 - spring
---

## spring整合junit单元测试
单元测试是程序开发必不可少的，我们在没有使用spring的时候，直接可以通过引入junit依赖，使用相关注解即可。
如今使用了spring维护对象我们必须需要整合才能使用

---

基于xml配置的整合示例

> xml 配置相关bean省略，可参考之前文章

> 测试类，涉及到的两个注解说明

@RunWith
```text
作用：把junit的测试类，替换成spring提供的测试类（SpringJunit4ClassRunner）
```

@ContextConfiguration
```text
作用：指定加载spring的配置类
```

```java
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import cn.itmyself.config.SpringConfiguration;
import cn.itmyself.po.Customer;
import cn.itmyself.service.CustomerService;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(value={"classpath:bean.xml"})
public class springJunitTest {
	
	// 自动注入客户service对象
	@Autowired
	private CustomerService customerService;

	@Test
	public void findAllCustomersTest(){
		
		List<Customer> list = customerService.findAllCustomers();
		for(Customer c:list){
			System.out.println(c);
		}
		
	}
}

```

基于注解配置

```java
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import cn.itmyself.config.SpringConfiguration;
import cn.itmyself.po.Customer;
import cn.itmyself.service.CustomerService;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes={SpringConfiguration.class})
public class springJunitTest {
	
	// 自动注入客户service对象
	@Autowired
	private CustomerService customerService;

	@Test
	public void findAllCustomersTest(){
		
		List<Customer> list = customerService.findAllCustomers();
		for(Customer c:list){
			System.out.println(c);
		}
		
	}
}

```

xml与注解整合的不同，在于@ContextConfiguration是加载配置文件还是加载注解类

---
**作者：aires的收藏馆**  
**出处：[www.aires.net.cn](http://www.aires.net.cn)**   
**版权所有，欢迎保留原文链接进行转载** 

