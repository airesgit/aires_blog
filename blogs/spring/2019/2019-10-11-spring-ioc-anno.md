---
title: Spring (三) 基于spring注解的IOC
date: 2019-10-11
tags:
 - spring
categories: 
 - spring
---

## 基于spring注解的IOC

示例Demo

```java
// dao实现
@Component("customerDao")
public class CustomerDaoImpl implements CustomerDao {
	/**
	 * 保存客户操作
	 */
	public void saveCustomer() {
		System.out.println("保存了一个客户......");
	}
}

```

```java
// service实现
@Component("customerService")
public class CustomerServiceImpl implements CustomerService {
	
	// 业务层中，调用持久层对象
	private CustomerDao customerDao;

	/**
	 * 说明：提供set方法，让spring注入dao对象
	 */
	public void setCustomerDao(CustomerDao customerDao) {
		this.customerDao = customerDao;
	}
}
```

xml配置
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans 
    http://www.springframework.org/schema/beans/spring-beans-4.0.xsd
    http://www.springframework.org/schema/context 
    http://www.springframework.org/schema/context/spring-context-4.0.xsd">
   	
   	 <context:component-scan base-package="cn.itmyself.dao"></context:component-scan>
   	 <context:component-scan base-package="cn.itmyself.service"></context:component-scan>

</beans>

```
> xml 解析： 
>
   	配置扫描注解配置客户service/dao对象，说明：
   		第一步：导入context名称空间
   		第二步：配置context:component-scan标签
   			作用：配置spring在创建容器时候，需要扫描的包，创建包中有注解配置的对象，放入spring容器中
   			属性：
   				base-package：配置spring扫描的包。spring会扫描配置的当前包和它的子包
   	

spring去加载配置文件的时候，会根据context: component-scan 扫描指定包下的类，如果类上有@component注解，
就会将该类实例化并交由spring维护



---
## spring 相关的注解
#### 与创建对象相关的注解

@Component
```text
作用：
相当于bean.xml文件中，bean标签的配置。
属性：
value：给bean取一个名称，相当于bean标签的id属性。

细节：
  如果不指定，默认使用类的名称（首字母小写）作为bean的名称。
```
@Controller、@Service、@Repository
```text
我们一般会看到这三个注解: ，这三个注解是@Component的衍生注解，其作用与@Component是一样的，只是语义上更能表示三层架构的归类
```

#### 与bean作用范围相关的注解

@Scope
```text
作用：
    设置bean的作用范围，相当于bean标签中的scope属性。
属性：
value 
    属性取值：
        singleton：单例。默认值
        prototype：多例
        request：web项目中，request域范围
        session：web项目中，session域范围
        globalsession：web项目中全局会话范围
```

#### 与注入数据相关的注解

@Autowired
```text
作用：
    默认根据bean的类型自动注入。
细节：
    在spring容器中，如果同一个类型存在多个bean。则先根据bean的类型注入，再根据bean的名称进行匹配。
    匹配上注入成功；匹配不上注入失败。
```

@Qualifier
```text
作用：
    用于指定注入bean的id。
    一般配合@Autowired注解一起使用。在按照类型注入的基础上，按照bean的名称进行注入。
属性：
    value：指定注入bean的id
细节：
    1.在给类的成员变量注入数据时，不能单独使用，需要配合@Autowired注解一起使用
    2.在给方法的形参注入数据时候，可以单独使用
```

@Resource
```text
作用：
    默认按照bean的名称注入数据。找不到对应的名称会根据类型注入，这个注解不属于spring的，它是jdk原生注解
属性：
    name：指定注入bean的名称
    type：指定注入bean的类型
细节：
    默认情况下（不指定属性），它会先根据变量名称注入，注入不成功；再根据类型注入。
```


上面介绍的三个注解，都只能给bean类型注入数据。不能给基本类型和String类型注入数据。如果想给基本类型与String类型注入则要使用下面这个注解

@Value
```text
作用：
    给基本类型和String类型注入数据。
属性：
    value：注入的数据值
```

#### 与生命周期相关的注解
@PostConstruct
```text
作用：
    指定执行初始化操作的方法。相当于xml配置中bean标签的init-method属性，对象实例后调用
```

@PreDestroy
```text
作用：
    指定执行释放资源操作的方法。相当于xml配置中bean标签的destroy-method属性，对象销毁前调用
```

---
目前我们遇到的配置bean有两种。一种是纯xml，一种是xml+注解。上面的注解都要结合开始的xml配置来扫描，那么是否可以纯注解配置不使用xml呢，答案是ok的。

## 纯注解配置spring bean

首先说下以下两个注解，@Configuration其实也是@Component注解的衍生注解，它的语义代表配置的意思。
而@ComponentScan注解是用来指定spring扫描范围的，它就代替了xml的扫描配置。

@Configuraion：
```text
作用：声明该类是spring的配置类
```
    
@ComponentScan：
```text
作用：配置spring创建容器时，要扫描的包。
     相当于bean.xml文件中，context:component-scan标签
```
 
@Bean
```text
作用：调用该方法，并给参数注入值，最后将返回的对象交由spring管理
属性：
    name：指定bean的id
    value：指定bean的id
```
  
```java
@Configuration
@ComponentScan(value={"cn.itmyself"})
public class SpringConfiguration {
	
	@Bean(value="runner")
	public QueryRunner getQueryRunner(DataSource dataSource){
		return new QueryRunner(dataSource);
	}

	@Bean(value="dataSource")
	public DataSource getDataSource(){
		// 创建c3p0数据源对象
		ComboPooledDataSource dataSource = new ComboPooledDataSource();
		
		// 设置连接数据库的四个基本属性
		try {
			dataSource.setDriverClass("com.mysql.jdbc.Driver");
			dataSource.setJdbcUrl("jdbc:mysql://127.0.0.1:3308/spring");
			dataSource.setUser("root");
			dataSource.setPassword("admin");
		} catch (PropertyVetoException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return dataSource;
	}
}
```

这里要注意，使用注解配置，必须是使用**AnnotationConfigApplicationContext(Class)** 类来加载
```java
public class CustomerAction {

	public static void main(String[] args) {
		
		// 1.加载spring配置类SpringConfiguration，创建spring容器
		ApplicationContext context = 
				new AnnotationConfigApplicationContext(SpringConfiguration.class);
		
		// 2.从容器中，获取客户service对象
		CustomerService customerService = (CustomerService) context.getBean("customerService");
		
		List<Customer> list = customerService.findAllCustomers();
		for(Customer c:list){
			System.out.println(c);
		}
	}
}

```

上面数据源的注入，我们可以将一些配置独立出来，此时要使用到一些注解

@Import
```text
作用：用于引入其它配置类
```
@PropertySource
```text
作用：用于加载配置文件
```

> tip：引入配置的注解和springboot 有点不同，此处不阐述


首先我们会将数据源配置独立在properties文件中
```text
db.driver=com.mysql.jdbc.Driver
db.url=jdbc:mysql://127.0.0.1:3308/spring
db.username=root
db.password=admin
```

持久层配置里面配置使用springEl+@value注入相关属性，但是此时并没有生效的，因为我们还需要一个主配置来加载这两个文件
```java
public class DaoConfig {
	
    @Value("${db.driver}")
	private String driver;
	@Value("${db.url}")
	private String url;
	@Value("${db.username}")
	private String user;
	@Value("${db.password}")
	private String password;

	@Bean(value="runner")
	public QueryRunner getQueryRunner(DataSource dataSource){
		
		return new QueryRunner(dataSource);
	}
	
	@Bean(value="dataSource")
	public DataSource getDataSource(){
		// 创建c3p0数据源对象
		ComboPooledDataSource dataSource = new ComboPooledDataSource();
		
		// 设置连接数据库的四个基本属性
		try {
			dataSource.setDriverClass(driver);
			dataSource.setJdbcUrl(url);
			dataSource.setUser(user);
			dataSource.setPassword(password);
		} catch (PropertyVetoException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return dataSource;
	}

}

```

主配置文件，通过@Import注解加载配置类，通过@PropertySource加载指定类目录下的配置文件，并构造相关实例

```java

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;

@Configuration
@ComponentScan(value={"cn.itmyself"})
@Import(value={DaoConfig.class})
@PropertySource(value={"classpath:cn/itmyself/config/db.properties"})
public class SpringConfiguration {

}

```
启动类不做演示，注解的加载通过AnnotationConfigApplicationContext来实现，和之前说的都一样
---
## 关于spring4.3之前版本无法链接数据库问题
![image](/aires_blog/assets/images/spring/spring4.3之前版本无法链接数据库.png)
原因是4.3之前版本需要手动去创建**PropertySourcesPlaceholderConfigurer**对象，解析属性文件;4.3之后已经不需要我们手动去创建该对象来解析配置文件了。
所以4.3之前版本需要加上这么一段配置
```java
@Configuration
@ComponentScan(value={"cn.itheima"})
@Import(value={DaoConfig.class})
@PropertySource(value={"classpath:cn/itheima/config/db.properties"})
public class SpringConfiguration {
	
/**
	 * 在spring4.3以前版本，需要手动创建PropertySourcesPlaceholderConfigurer对象，解析属性文件
	 */
	@Bean(name="configBean")
	public PropertySourcesPlaceholderConfigurer getConfigurer(){
		return new PropertySourcesPlaceholderConfigurer();
	}

}

```

---
##





---
**作者：aires的收藏馆**  
**出处：[www.aires.net.cn](http://www.aires.net.cn)**   
**版权所有，欢迎保留原文链接进行转载** 

