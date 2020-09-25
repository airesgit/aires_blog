---
title: Spring (六) JdbcTemplate
date: 2019-10-13
tags:
 - spring
categories: 
 - spring
---

## JdbcTemplate

#### 前置
spring框架中提供的一个持久层操作对象，是对jdbc API的封装。如下是持久层总图
![image](http://www.aires.net.cn/assets/images/spring/jdbcTemplate-持久层总图.png)

对于持久层的操作，spring提供了一系列的模板
![image](http://www.aires.net.cn/assets/images/spring/jdbcTemplate-模板图.png)

---
示例
```java
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

public class JdbcTemplateDemo {

	public static void main(String[] args) {
		/**
		 * 新增一条记录到account表中
		 */
		// 1.创建数据源对象
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		// 设置连接数据库的四个基本要素
		dataSource.setDriverClassName("com.mysql.jdbc.Driver");
		dataSource.setUrl("jdbc:mysql://127.0.0.1:3308/spring");
		dataSource.setUsername("root");
		dataSource.setPassword("root");
		
		// 2.创建JdbcTemplate对象
		JdbcTemplate template = new JdbcTemplate();
		// 设置数据源对象
		template.setDataSource(dataSource);
		
		// 新增记录
		template.update("insert into account(name,money) values('张无忌',2000)");
	}
}
```

我们可以将上面的示例改造一下交由spring来控制

xml配置
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans 
    http://www.springframework.org/schema/beans/spring-beans-4.0.xsd">

    <!-- 配置JdbcTemplate -->
    <bean id="template" class="org.springframework.jdbc.core.JdbcTemplate">
    	<!-- 注入数据源对象 -->
    	<property name="dataSource" ref="dataSource"/>
    </bean>
    
    <!-- 配置dataSource对象 -->
    <bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
    	<!-- 注入连接数据库的四个基本要素 -->
    	<property name="driverClassName" value="com.mysql.jdbc.Driver"/>
    	<property name="url" value="jdbc:mysql://127.0.0.1:3308/spring"/>
    	<property name="username" value="root"/>
    	<property name="password" value="admin"/>
    </bean>
</beans>
```
启动类
```java
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;

public class JdbcTemplateDemo {

	public static void main(String[] args) {
		/**
		 * 从spring容器中，获取JdbcTemplate对象
		 */
		// 1.加载spring配置文件，创建spring容器
		ApplicationContext context = new ClassPathXmlApplicationContext("classpath:bean.xml");
		JdbcTemplate template = (JdbcTemplate) context.getBean("template");
		template.update("insert into account(name,money) values('张无忌',2000)");
	}
}
```

---
### 下面再来演示CRUD的使用
首先定义与库表映射的实体
```java
public class Account {
	
	private Integer id;// 账户id
	private String name;// 账户名称
	private Float money;// 账户金额
    
    // 省略setter、getter。。。
}
```
JdbcTemplate操作示例
```java
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import cn.itmyself.jdbc.po.Account;

public class JdbcTemplateDemo {

	public static void main(String[] args) {

		// 1.加载spring配置文件，创建spring容器
		ApplicationContext context = new ClassPathXmlApplicationContext("classpath:bean.xml");
		JdbcTemplate template = (JdbcTemplate) context.getBean("template");
		
        // 新增
		template.update("insert into account(name,money) values(?,?)", "小美",1500);
        // 修改
		template.update("update account set money=? where id=?", 3000,6);
        // 删除
		template.update("delete from account where id=?", 6);
		
		List<Account> list = template.query("select * from account", new RowMapper<Account>(){
			public Account mapRow(ResultSet rs, int rowNum) throws SQLException {
				// 创建账户对象
				Account account = new Account();
				account.setId(rs.getInt("id"));
				account.setName(rs.getString("name"));
				account.setMoney(rs.getFloat("money"));
				return account;
			}
		});
		for(Account ac:list){
			System.out.println(ac);
		}
	}
}
```
相关解析：
> template.query(String sql, RowMapper)：查询方法一行或多行
>
> RowMapper：用于获取查询的数据，它会迭代每条数据，并将每条数据封装到ResultSet中
>
> ResultSet：封装的每一条数据


JdbcTemplate聚合的使用
```java
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;

public class JdbcTemplateDemo {

	public static void main(String[] args) {

		ApplicationContext context = new ClassPathXmlApplicationContext("classpath:bean.xml");
		
		JdbcTemplate template = (JdbcTemplate) context.getBean("template");
		Integer accounts = template.queryForObject("select count(*) from account", Integer.class);
		
		System.out.println("当前的账户数量："+accounts);
	}
}
```
相关解析：
> template.queryForObject(String sql, Class)： 查询的聚合函数， Class 是指定返回的结果类型

---
上面的示例都是JdbcTemplate的单独示例，下面演示JdbcTemplate在项目中持久层的演示，此处指展示关键部分
```java
// 库表映射Account实体同上，此处省略
// 独立结果集封装
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class AccountRowMapper implements RowMapper<Account> {

	public Account mapRow(ResultSet rs, int rownum) throws SQLException {
		// 创建账户对象
		Account account = new Account();
		account.setId(rs.getInt("id"));
		account.setName(rs.getString("name"));
		account.setMoney(rs.getFloat("money"));
		return account;
	}
}
```
持久层接口
```java
import cn.itmyself.po.Account;

public interface AccountDao {
	
	/**
	 * 根据账户id查询账户
	 */
	Account findAccountById(Integer accountId);
	
	/**
	 * 根据账户名称查询账户
	 */
	Account findAccountByName(String accountName);
	
	/**
	 * 更新账户
	 */
	void updateAccount(Account account);

}

```
持久层接口实现
```java
import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import cn.itmyself.dao.AccountDao;
import cn.itmyself.po.Account;
import cn.itmyself.rowmapper.AccountRowMapper;

public class AccountDaoImpl implements AccountDao {
	
	// 定义JdbcTemplate
	private JdbcTemplate jdbcTemplate;

	/**
	 * @param jdbcTemplate the jdbcTemplate to set
	 */
	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	/**
	 * 根据账户id查询账户
	 */
	public Account findAccountById(Integer accountId) {
		List<Account> list = jdbcTemplate.query("select * from account where id=?", new AccountRowMapper(),accountId);
		return list.isEmpty()?null:list.get(0);
	}

	/**
	 * 根据账户名称查询账户
	 */
	public Account findAccountByName(String accountName) {
		List<Account> list = jdbcTemplate.query("select * from account where name=?", new AccountRowMapper(), accountName);
		if(list.isEmpty()){
			return null;
		}
		// 账户的名称必须唯一
		if(list.size()>1){
			throw new RuntimeException("帐号不唯一异常！");
		}
		return list.get(0);
	}

	/**
	 * 更新账户
	 */
	public void updateAccount(Account account) {
		jdbcTemplate.update("update account set money=? where name=?", account.getMoney(),account.getName());
	}
}
```
xml配置
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans 
    http://www.springframework.org/schema/beans/spring-beans-4.0.xsd">
	
	<!-- 配置账户service对象 -->
	<bean id="accountService" class="cn.itmyself.service.impl.AccountServiceImpl">
		<!-- 注入账户dao对象 -->
		<property name="accountDao" ref="accountDao"/>
	</bean>
	
	<!-- 配置账户dao对象 -->
	<bean id="accountDao" class="cn.itmyself.dao.impl.AccountDaoImpl">
		<!-- 注入jdbcTemplate对象 -->
		<property name="jdbcTemplate" ref="jdbcTemplate"/>
	</bean>
	
	<!-- 配置jdbcTemplate对象 -->
	<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
		<!-- 注入数据源对象 -->
		<property name="dataSource" ref="dataSource"/>
	</bean>

	<!-- 配置数据源对象 -->
	<bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
		<!-- 注入连接数据库的四个基本要素 -->
		<property name="driverClassName" value="com.mysql.jdbc.Driver"/>
		<property name="url" value="jdbc:mysql://127.0.0.1:3308/spring"/>
		<property name="username" value="root"/>
		<property name="password" value="admin"/>
	</bean>
</beans>
```

--- 
spring的jdbc操作数据库，除了JdbcTemplate类，还有一个**JdbcDaoSupport**类。我们的dao实现类，通过继承JdbcDaoSupport类完成数据库操作。
这里充分体现了**代码复用的两种方式**：**组合**和**继承**。JdbcTemplate是组合方式，JdbcDaoSupport是继承的方式。
以下我们来演示JdbcDaoSupport的使用。

因为JdbcDaoSupport已经实现了JdbcTemplate，所以我们自己并不需要定义属性了
```java
import java.util.List;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

public class AccountDaoImplByDaoSupport extends JdbcDaoSupport implements AccountDao {

    // CRUD功能同上，此处省略
}
```
xml配置，此处只展示与上面不同的点，取余相同配置省略
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans 
    http://www.springframework.org/schema/beans/spring-beans-4.0.xsd">
    
    <bean id="accountDaoSupport" class="cn.itmyself.dao.impl.AccountDaoImplByDaoSupport">
    	<!-- 注入JdbcTemplate -->
    	<property name="jdbcTemplate" ref="jdbcTemplate"/>
    </bean>
	
	<!-- 配置jdbcTemplate对象 -->
	<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
		<!-- 注入数据源对象 -->
		<property name="dataSource" ref="dataSource"/>
	</bean>
</beans>
```

---
**作者：aires的收藏馆**  
**出处：[www.aires.net.cn](http://www.aires.net.cn)**   
**版权所有，欢迎保留原文链接进行转载** 

