---
title: Spring (二) 控制反转 IOC
date: 2019-10-11
tags:
 - spring
categories: 
 - spring
---

## IOC（Inversion Of Control）控制反转。
是面向对象编程的一个重要法则，用于削减计算机程序间的耦合问题。控制反转中分为两种类型，一种是DI（Dependency Injection）依赖注入；另外一种是DL（Dependency Lookup）依赖查找。实际应用中依赖注入使用更多。

[spring官方网址：http://spring.io/](http://spring.io/)

---

入门示例

> xml 配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans 
    http://www.springframework.org/schema/beans/spring-beans-4.0.xsd">

    <!-- 配置客户dao对象 ,说明：
    	bean标签：用于配置javaBean对象
    	属性：
    		id：给bean取一个唯一标识名称
    		class：指定创建对象的全限定类名称
    -->
    <bean id="customerDao" class="cn.itmyself.dao.CustomerDaoImpl"></bean>
    
    <!-- 配置客户service对象 -->
    <bean id="customerService" class="cn.itmyself.service.CustomerServiceImpl"></bean>

</beans>

```

> 加载配置文件并创建获取对象

```
public class CustomerAction {

	/**
	 * ApplicationContext：
	 * 		1.它是spring框架提供的工厂接口
	 * 		2.它提供了根据bean的id，获取bean对象的方法
	 * 		3.它有两个常用的实现类：
	 * 			ClassPathXmlApplicationContext：该实现类从类的根路径下，加载spring的配置文件
	 * 			FileSystemXmlApplicationContext：该实现类从文件路径中，加载spring配置文件
	 * 
	 */
	public static void main(String[] args) {
		
		// 1.直接创建客户业务层对象
		/*CustomerService customerService = new CustomerServiceImpl();
		customerService.saveCustomer();*/
		
		// 2.加载spring配置文件，创建一个spring的容器对象
		ApplicationContext context = new ClassPathXmlApplicationContext("bean.xml");
		
		// 3.从容器对象中，获取客户service对象
		CustomerService customerService = (CustomerService) context.getBean("customerService");
		customerService.saveCustomer();

	}

}

```

---
### 工厂类的结构图
![iamge](http://www.aires.net.cn/assets/images/spring/spring工厂类结构图.png)

从图中我们可以看出，ApplicationContext还有一个顶层接口BeanFactory，那么它们有什么区别呢？

ApplicationContext是BeanFactory的子接口实现，它们最大的区别是，BeanFactory在创建对象的时候是采用的**延迟加载思想**。
个人理解一些对象在程序启动的时候加载出来比在使用的时候创建更能提高性能，所以ApplicationContext的出现就
是解决这种情况，在创建对象的时候，加载配置文件，立即创建对象，将对象交由容器（工厂）管理，典型的空间还时间的思想

---

### bean标签的细节
#### bean标签的作用与属性
> 作用：
   
    配置javaBean对象，让spring容器创建管理。默认是使用无参的构造方法创建对象

> 属性：

    id：给bean取一个唯一标识名称
    class：指定类的全限定类名称（包名称+类名称）
    scope：指定bean的作用范围
    取值：
        singleton：单例（默认值）
        prototype：多例
        request：WEB项目中，请求域，几乎没用到
        session：WEB项目中，会话域，几乎没用到
        globalsession：WEB项目中，如果是服务器集群环境，应用在整个集群中；如果没有服务器集群，相当于session。
    init-method：指定初始化执行方法名称，在构造方法执行后立即执行。一般用于执行初始化
    destory-method：指定销毁执行方法名称，在spring容器销毁前执行。一般用于执行释放资源


#### bean的作用范围和生命周期
    单例对象：scope=”singleton”
        范围：
            一个应用只有一个对象实例，范围是整个应用
        生命周期：
            出生：加载配置文件，容器创建，对象出生
            活着：只要容器存在，对象就一直活着
            死亡：容器销毁，对象死亡
 
    多例对象：scope=”prototype”
        范围：
            在一次使用的过程中
        生命周期：
            出生：第一次获取对象时，对象出生
            活着：在一次使用的过程中，对象活着
            死亡：当对象不再使用，也没有被其它的对象引用，交给java垃圾回收器执行回收，收集机制跟垃圾回收机制有关


####  init-method和destory-method属性使用示例

```java
public class CustomerDaoImpl implements CustomerDao {

	/**
	 * 保存客户操作
	 */
	public void saveCustomer() {
		System.out.println("保存了一个客户......");

	}
	
	/**
	 * 构造方法
	 */
	public CustomerDaoImpl(){
		System.out.println("CustomerDaoImpl创建了......");
	}
	
	/**
	 * 初始化方法
	 */
	public void init(){
		System.out.println("初始化执行方法，在构造方法执行后立即执行......");
	}
	
	/**
	 * 销毁方法
	 */
	public void destroy(){
		System.out.println("销毁执行方法，在spring容器销毁前执行......");
	}

}

```

> 配置Dao对象，在创建dao的时候会先去调用init方法
```xml
    <!--	init-method：指定初始化方法，在构造方法执行后立即执行。一般用于资源的初始化
    		destroy-method：指定销毁方法，在spring容器销毁前执行。一般用于释放资源
    -->
    <bean id="customerDao" class="cn.itmyself.dao.CustomerDaoImpl"
    	scope="singleton" init-method="init" destroy-method="destroy">
    </bean>

```

> 示例工厂构造对象
```java
public class CustomerAction {

	public static void main(String[] args) {
		
		/**
		 * 3.讲解init-method和destroy-method属性
		 */
		ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("bean.xml");
		CustomerDao customerDao = (CustomerDao) context.getBean("customerDao");
		
		customerDao.saveCustomer();

		// 销毁spring容器
		context.close();
	}

}


```
从结果可以看出，对象在创建完成之后会去调用init-method所指定的函数，在对象销毁前会去指定destroy-method指定的函数
![iamge](http://www.aires.net.cn/assets/images/spring/init-destroy.png)


---
## bean创建对象的三种方式
1. 默认使用无参构造方法创建对象（所以我们在实例对象的时候必须提供空参构造）
2. 使用静态工厂方法创建对象
3. 使用实例工厂方法创建对象

静态工厂创建对象示例
```java
// 定义静态工厂类
public class StaticFactory {
	/**
	 * 静态方法创建客户dao实现类对象
	 */
	public static CustomerDao getCustomerDao(){
		return new CustomerDaoImpl();
	}
}

```

> xml配置解析： 
    spring在构造对象的时候会通过class指定的全限定类名实例静态工厂，并调用factory=method所指定的方法将Dao对象构造出来
```xml
<!-- 静态工厂方法创建对象,说明：
    	id：给被创建对象取一个唯一标识名称
    	class：静态工厂类全限定名称
    	factory-method：指定创建对象的静态方法
     -->
    <bean id="staticCustomerDao" class="cn.itmyself.factory.StaticFactory"
    	factory-method="getCustomerDao">
    </bean>
```

实例工厂方法创建对象示例
```java
// 定义实例工厂类 --- 与静态工厂类的差别无非就是构造对象的方法是否是静态的
public class InstanceFactory {
	/**
	 * 实例工厂方法创建对象
	 */
	public CustomerDao getCustomerDao(){
		return new CustomerDaoImpl();
	}
}

```

> xml解析：
    spring首先先构造出实例工厂，在构造dao的时候，通过factory-bean指明工厂类，并通过factory-method指明调用工厂的方法，
    从而spring最终将dao对象构造出来并交由容器管理（activiti7.x 就是通过这种方式来配置对象，可以查阅相关文章）
```xml
<!-- 实例工厂方法创建对象，说明：
    	第一步：配置实例工厂对象
    	第二步：使用实例工厂对象，指定工厂方法，创建目标对象
    		id：给被创建对象取一个唯一标识名称
    		factory-bean：指定实例工厂对象引用
    		factory-method：指定创建对象的方法
    		
     -->
     <bean id="instanceFactory" class="cn.itmyself.factory.InstanceFactory"></bean>
     <bean id="instanceCustomerDao" factory-bean="instanceFactory" factory-method="getCustomerDao"></bean>

```

## 依赖注入
IOC只是通过spring来创建管理对象，但是我们如何使用这些被管理的对象呢？此时spring的另一特性DY（依赖注入）就出场了

依赖注入一般分为两种方式：

    1、构造方法注入 
    2、set方法注入，该方式也是一般使用最多的方式

构造方法注入示例
```java
// 在dao中定义多个属性，并提供对应的构造器
public class ConstructorDaoImpl implements CustomerDao {
	
	// 定义成员变量
	private int id;
	private String name;
	private Integer age;
	private Date birthday;

	/**
	 * 保存客户操作
	 */
	public void saveCustomer() {
		System.out.println("[id="+id+",name="+name+",age="+age+",birthday="+birthday+"]");
		System.out.println("保存了一个客户......");
	}

	/**
	 * @param id
	 * @param name
	 * @param age
	 * @param birthday
	 */
	public ConstructorDaoImpl(int id, String name, Integer age, Date birthday) {
		super();
		this.id = id;
		this.name = name;
		this.age = age;
		this.birthday = birthday;
	}
}

```

> xml配置
```xml
     <bean id="constructorDao" class="cn.itmyself.dao.ConstructorDaoImpl">
     	<constructor-arg index="0" type="int" value="1"></constructor-arg>
     	<constructor-arg name="name" value="小明"></constructor-arg>
     	<constructor-arg name="age"  value="18"></constructor-arg>
     	<constructor-arg name="birthday" ref="now"></constructor-arg>
     </bean>
     
     <!-- 配置日期类型对象 -->
     <bean id="now" class="java.util.Date"></bean>

```
> xml 解析：
>
    constructor-arg标签：通知spring框架，使用构造方法给成员变量赋值
    属性：
        index：指定参数，在构造方法参数列表中的索引位置，从0开始
        name：指定参数，在构造方法参数列表中的名称（与index属性通常二者使用一个即可）
        type：指定参数类型。一般不需要指定，默认即可
        value：给简单类型成员变量赋值（八种基本类型+字符串）
        ref：给其它bean类型成员变量赋值
     
     
set方法注入示例
```java
public class SetDaoImpl implements CustomerDao {
	
	// 定义成员变量
	private int id;
	private String name;
	private Integer age;
	private Date birthday;
	
    // 省略getter、setter 方法...

}

```

```xml
      <!-- 配置日期类型对象 -->
      <bean id="now" class="java.util.Date"></bean>

      <bean id="setDao" class="cn.itheima.dao.impl.SetDaoImpl">
      	<property name="id" value="1"></property>
      	<property name="name" value="小明"></property>
      	<property name="age" value="18"></property>
      	<property name="birthday" ref="now"></property>
      </bean>
```
> xml 解析： 
 
    property标签：通知spring框架使用set方法给成员变量赋值
    属性：
        name：成员变量的名称
        value：给简单类型数据赋值（八种基本类型+字符串）
        ref：给其它bean类型赋值
      


p名称空间注入：
     
在spring框架中，注入数据本质上有两种：构造方法注入数据与set方法注入数据。有时候我们可能会听见p名称空间注入，它其实还是set方法注入数据。只是为了简化配置而出现的。 

> 首先在使用的时候需要引入p名称空间 xmlns:p="http://www.springframework.org/schema/p"
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:p="http://www.springframework.org/schema/p"  
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans 
        http://www.springframework.org/schema/beans/spring-beans-4.0.xsd">

   <bean id="pSetDao" class="cn.itmyself.dao.SetDaoImpl"
        p:id="1"
        p:name="小明"
        p:age="18"
        p:birthday-ref="now">
   </bean>
</beans>
```

> xml 解析：
        第一步：导入p名称空间（xmlns:p="http://www.springframework.org/schema/p"）
        第二步：配置bean
            p:属性名称：给简单类型数据赋值
            p:属性名称-ref：给其它bean类型赋值


数据结构是我们日常开发必不可少的一部分，下面示例通过set方法注入数组、List、Set、Map、Properties数据类型（当然通过构造方法注入也是可以的）

```java
public class CollectionDaoImpl implements CustomerDao {
	
	// 定义集合类型成员变量
	private String[] arr;
	private List<String> list;
	private Set<String> set;
	private Map<String,String> map;
	private Properties prop;

	// set 方法省略
}

```

```xml
    <bean id="collectionDao" class="cn.itmyself.dao.impl.CollectionDaoImpl">
        <!-- 数组 -->
        <property name="arr">
            <!-- array标签：给数组类型赋值 -->
            <array>
                <value>arr1</value>
                <value>arr2</value>
                <value>arr3</value>
            </array>
        </property>
        
        <!-- List -->
        <property name="list">
            <!-- list标签：给list类型赋值 -->
            <list>
                <value>list1</value>
                <value>list2</value>
                <value>list3</value>
            </list>
        </property>
        <!-- Set -->
        <property name="set">
            <!-- set标签：给set类型赋值 -->
            <set>
                <value>set1</value>
                <value>set2</value>
                <value>set3</value>
            </set>
        </property>
        <!-- Map -->
        <property name="map">
            <!-- map标签：给map类型赋值 -->
            <map>
                <entry key="map-k1" value="map-v1"></entry>
                <entry key="map-k2" value="map-v2"></entry>
                <entry key="map-k3" value="map-v3"></entry>
            </map>
        </property>
        <!-- Properties -->
        <property name="prop">
            <!-- props标签：给Properties类型赋值 -->
            <props>
                <prop key="prop-k1">prop-v1</prop>
                <prop key="prop-k2">prop-v2</prop>
                <prop key="prop-k3">prop-v3</prop>
            </props>
        </property>
    </bean>

```
> xml 解析:

    每一种数据类型的注入都有相应的标签<array><list><set><map><props>通过指定的标签与其子标签，spring会去解析并注入数据。
    TIP：数据结构一样，标签可以互换
            array/list/set
            map/propperties

---
**作者：aires的收藏馆**  
**出处：[www.aires.net.cn](http://www.aires.net.cn)**   
**版权所有，欢迎保留原文链接进行转载** 

