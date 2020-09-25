---
title: Spring (五) AOP
date: 2019-10-12
tags:
 - spring
categories: 
 - spring
---

## AOP（Aspect Oriented Programming）
AOP（Aspect Oriented Programming），即面向切面编程。通过预编译方式和运行期动态代理实现程序功能的统一维护的一种技术。AOP是OOP的延续，是软件系统开发中的一个热点，也是spring框架的一个重点。利用AOP可以实现业务逻辑各个部分的隔离，从而使得业务逻辑各个部分的耦合性降低，提高程序的可重用性，同时提高开发效率。
   
简单理解。aop是面向切面编程，是使用动态代理技术，实现在不修改java源代码的情况下，运行时实现方法功能的增强。

作用：在程序运行期间，不修改源代码对已有方法功能进行增强

优势：减少重复代码，提高开发效率，统一管理统一调用，方便维护

AOP的技术实现：动态代理技术

--- 
### AOP 常用术语
Joinpoint（连接点）：
在spring中，连接点指的都是方法（指的是那些要被增强功能的候选方法），spring只支持方法类型的连接点。

Pointcut（切入点）：
在运行时已经被spring 的AOP实现了增强的方法。

Advice（通知）：
通知指的是拦截到Joinpoint之后要做的事情。即增强的功能。
通知类型：前置通知/后置通知/异常通知/最终通知/环绕通知

Target（目标对象）：
被代理的对象。比如动态代理案例中的演员。

Weaving（织入）：
织入指的是把增强用于目标对象，创建代理对象的过程。spring采用动态代理织入，AspectJ采用编译期织入和类装载期织入

Proxy（代理）：
一个类被AOP织入增强后，即产生一个结果代理类。比如动态代理案例中的经纪人。

Aspect（切面）：
切面指的是切入点和通知的结合。

--- 
### 基于xml的aop配置

```java
// 客户业务接口
public interface CustomerService {
	
	void saveCustomer();
	
	void findCustomerById(Integer custId);
}
```

```java
// 客户业务实现
public class CustomerServiceImpl implements CustomerService {

	public void saveCustomer() {
		System.out.println("保存了客户数据。");

	}

	public void findCustomerById(Integer custId) {
		System.out.println("根据客户id：【"+custId+"】查询客户数据。");
	}
}
```
> 通知类，此处演示用于打印日志
```java
public class LogAdvice {
	
	/**
	 * 前置通知
	 */
	public void beforeLog(){
		System.out.println("【前置通知】记录用户操作日志。");
	}
	
	/**
	 * 后置通知
	 */
	public void afterReturingLog(){
		System.out.println("【后置通知】记录用户操作日志。");
	}
	
	/**
	 * 异常通知
	 */
	public void afterThrowingLog(){
		System.out.println("【异常通知】记录用户操作日志。");
	}
	
	/**
	 * 最终通知
	 */
	public void afterLog(){
		System.out.println("【最终通知】记录用户操作日志。");
	}
}
```
> xml配置 
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:aop="http://www.springframework.org/schema/aop"
    xsi:schemaLocation="http://www.springframework.org/schema/beans 
    http://www.springframework.org/schema/beans/spring-beans-4.0.xsd
    http://www.springframework.org/schema/aop 
    http://www.springframework.org/schema/aop/spring-aop-4.0.xsd">

	<!-- 配置客户service对象 -->
	<bean id="customerService" class="cn.itmyself.service.impl.CustomerServiceImpl"></bean>
	
	<!-- 配置通知对象 -->
	<bean id="log" class="cn.itmyself.advice.LogAdvice"></bean>

    <!-- aop配置 -->
    <aop:config>
        <aop:aspect id="logAspect" ref="log">
            <!-- 前置通知 -->
            <aop:before method="beforeLog" pointcut-ref="pt1"/>
            <!-- 后置通知 -->
            <aop:after-returning method="afterReturingLog" pointcut-ref="pt1"/>
            <!-- 异常通知 -->
            <aop:after-throwing method="afterThrowingLog" pointcut-ref="pt1"/>
            <!-- 最终通知 -->
            <aop:after method="afterLog" pointcut-ref="pt1"/>
            <aop:pointcut expression="execution(public void cn.itmyself.service.impl.CustomerServiceImpl.saveCustomer())" id="pt1"/>
        </aop:aspect>
    </aop:config>
</beans>
```
AOP配置基本步骤基本就是这样，下面来解析下相关标签：

```text
<aop:config>  //声明aop配置

<aop:aspect id="logAspect" ref="log"> // 配置切面： id，切面的唯一标识； 
                                                   ref，引用通知对象 
        
<aop:pointcut expression="execution(public void cn.itmyself.service.CustomerServiceImpl.saveCustomer())" id="pt1"/>
// 配置切入点表达式： expression：配置切入点表达式
                     id：给切入点表达式取一个唯一标识名称

<aop:before method="printLog" pointcut-ref="pt1"/> // 配置前置通知：method，指定增强功能的方法，这里是指上面的日志打印
                                                                   pointcut-ref， 引入切入点表达式
                                                                   pointcut：定义切入点表达式（直接这里定义就不需要上面的配置了）

除了befor还有以下四种通知类型，除了作用不同，属性都一样：

<aop:after-returning> // 后置通知  
<aop:after-throwing> // 异常通知
<aop:after>  // 最终通知
<aop:around> // 环绕通知
```

切入点表达式：
```text
格式： 
    访问修饰符  返回值  包名称  类名称  方法名称  (参数列表)

全匹配方式：
    public void cn.itmyself.service.impl.CustomerServiceImpl.saveCustomer()

访问修饰符可以省略：
    void cn.itmyself.service.impl.CustomerServiceImpl.saveCustomer()

返回值可以使用通配符*：
    * cn.itmyself.service.impl.CustomerServiceImpl.saveCustomer()

包名称可以使用通配符*，有多少级包就写多少个*：
    * *.*.*.*.CustomerServiceImpl.saveCustomer()

包名称可以使用..，表示当前包和子包：
    * *..CustomerServiceImpl.saveCustomer()

类名称可以使用通配符*：
    * *..*.saveCustomer()

方法名称可以使用通配符*：
    * *..*.*()

参数列表可以使用通配符*，此时必须要有参数：
    * *..*.*(*)

参数列表可以使用..，有无参数均可：
    * *..*.*(..)

实际项目中的配置案例：
    * cn.itmyself.service..*.*(..)
```

> 启动类
```java
public class CustomerAction {

	public static void main(String[] args) {
		// 1.加载spring配置文件，创建spring容器
		ApplicationContext context = new ClassPathXmlApplicationContext("classpath:bean.xml");
		// 2.从spring容器中，获取客户service对象
		CustomerService customerService = (CustomerService) context.getBean("customerService");
		customerService.saveCustomer();
	}
}
```

--- 
### 不同通知类型执行机制
前置通知：
在切入点方法执行前执行。

后置通知：
在切入点方法正常执行之后执行。它和异常通知只能执行一个。

异常通知：
在切入点方法发生异常后执行。它和后置通知只能执行一个。

最终通知：
无论切入点方法执行是否发生异常。它总是可以执行。

---

### 特殊的通知类型-环绕通知
环绕通知是spring框架，为我们提供的一种手动控制通知执行时间点的一种特殊通知类型，它使用起来会更加灵活一些。其它通知本质也是和环绕一样的写法只不过被spring隐藏了实现而已

> ProceedingJoinPoint接口中有一个方法：proceed()，它相当于代理的method.invoke()方法，本质就是代理
```java
import org.aspectj.lang.ProceedingJoinPoint;

public class LogAdvice {
    
	public void aroundLog(ProceedingJoinPoint pjp){
	
		try {
			System.out.println("【环绕通知-前置通知】");
			
			// 执行目标方法
			pjp.proceed();
			
			System.out.println("【环绕通知-后置通知】");
		} catch (Throwable e) {
			e.printStackTrace();
			System.out.println("【环绕通知-异常通知】");
		}
		
		System.out.println("【环绕通知-最终通知】");
	}
}
```
```xml
<!-- aop配置 -->
<aop:config>
    <aop:aspect id="logAspect" ref="log">
        <!-- 环绕通知 -->
        <aop:around method="aroundLog" pointcut-ref="pt1"/>
        <aop:pointcut expression="execution(* cn.itmyself.service..*.*(..))" id="pt1"/>
    </aop:aspect>
</aop:config>
```

---
### 基于注解的aop配置
此处只展示通知切面相关bean

#### 通知类
```java
@Component("log")
@Aspect
public class LogAdvice {
	

	@Pointcut("execution(* cn.itmyself.service..*.*(..))")
	public void pt1(){}
	
	@Before("pt1()")
	public void beforeLog(){
		System.out.println("【前置通知】记录用户操作日志。");
	}
	
	@AfterReturning("pt1()")
	public void afterReturingLog(){
		System.out.println("【后置通知】记录用户操作日志。");
	}
	
	@AfterThrowing("pt1()")
	public void afterThrowingLog(){
		System.out.println("【异常通知】记录用户操作日志。");
	}
	
	@After("pt1()")
	public void afterLog(){
		System.out.println("【最终通知】记录用户操作日志。");
	}
	
	@Around("pt1()")
	public void aroundLog(ProceedingJoinPoint pjp){
	
		try {
			System.out.println("【环绕通知-前置通知】");
			
			// 执行目标方法
			pjp.proceed();
			
			System.out.println("【环绕通知-后置通知】");
		} catch (Throwable e) {
			e.printStackTrace();
			System.out.println("【环绕通知-异常通知】");
		}
		
		System.out.println("【环绕通知-最终通知】");
	}
}
```
> 此处的通知参数并没有说，比如异常通知，它可以获取拦截的异常（通过参数接收）等，后面有相关文章介绍详细的说明

主配置
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:aop="http://www.springframework.org/schema/aop"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans 
    http://www.springframework.org/schema/beans/spring-beans-4.0.xsd
    http://www.springframework.org/schema/aop 
    http://www.springframework.org/schema/aop/spring-aop-4.0.xsd
    http://www.springframework.org/schema/context 
    http://www.springframework.org/schema/context/spring-context-4.0.xsd">

	<!-- 配置context-component-scan，扫描客户业务层与通知对象 -->
	<context:component-scan base-package="cn.itmyself"></context:component-scan>
	<!-- 启用spring对注解aop支持 -->
	<aop:aspectj-autoproxy></aop:aspectj-autoproxy>
</beans>
```
关键点：spring默认是不支持注解aop的，所以必须要添加以下配置才可
```text
<aop:aspectj-autoproxy></aop:aspectj-autoproxy>
```
如果配置类代替主xml，则配置如下
```java
@Configuration
@ComponentScan(value={"cn.itmyself"})
@EnableAspectJAutoProxy
public class SpringConfiguration {
}
```


--- 
AOP注解说明：

@Aspect
```text
作用：声明当前类为切面类。相当于bean.xml文件中aop:aspect标签配置。
```
@Before
```text
作用：
配置前置通知

属性：
value：用于指定切入点表达式，还可以指定切入点表达式引用
```
@AfterReturning
```text
作用：
配置后置通知

属性：
value：用于指定切入点表达式，还可以指定切入点表达式引用
```
@AfterThrowing
```text
作用：
配置异常通知

属性：
value：用于指定切入点表达式，还可以指定切入点表达式引用
```
@After
```text
作用：
配置最终通知

属性：
value：用于指定切入点表达式，还可以指定切入点表达式引用
```
@Around
```text
作用：
配置环绕通知

属性：
value：用于指定切入点表达式，还可以指定切入点表达式引用
```
 @Pointcut
```text
作用：
配置切入点表达式

属性：
value：指定表达式内容
```
@EnableAspectJAutoProxy
```text
作用：启用spring对象注解事务配置，相当于bean.xml文件中<aop:aspectj-autoproxy/>标签的配置
```

---
此处要说一个spring对于代理的选择，我们都知道动态代理有两种，jdk代理与cglib代理，那spring是怎么选择的呢？

如果实现了接口则默认使用jdk代理，否则使用cglib，当然可以手动使用cglib，至于两者代理的要求及特点，参考代理相关一文


---
**作者：aires的收藏馆**  
**出处：[www.aires.net.cn](http://www.aires.net.cn)**   
**版权所有，欢迎保留原文链接进行转载** 

