---
title: SpringBoot (十) springboot-aop
date: 2019-10-23
tags:
 - springBoot
categories: 
 - springBoot
---

## springboot-aop

---
引入相关依赖
```xml
<dependency>
     <groupId>org.springframework.boot</groupId>
     <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

相关注解解析

@Aspect
- 代表该类是一个切面类

@Pointcut("execution(   )")		
- 指明切入点，使用表达式切入

@Pointcut("@annotation()")
- 也可以指定注解来切入	

---
此处摘录我项目中的部分代码做示例
```java
@Aspect
@Component
@Order(900)
public class OperationLogAspect {

    private Logger log = LoggerFactory.getLogger(this.getClass());
    @Resource
    private ILogInfoApi iSysLogInfoApi;
    @Autowired
    private HttpServletRequest request;
    private ExecutorService pool = Executors.newFixedThreadPool(8);


    @Pointcut("@annotation(com.yilu.gzxf.business.anno.LogMsg)")
    public void pointcut(){}


    @AfterReturning(pointcut = "pointcut()", returning = "result")
    public void ReturnOperationLog(JoinPoint joinPoint, Object result){
        execResult(joinPoint);
        pushLog(OperationType.SUCCESS, joinPoint, null, result);
    }

    @AfterThrowing(pointcut = "pointcut()", throwing = "ex")
    public void ThrowOperationLog(JoinPoint joinPoint, Exception ex){
        execResult(joinPoint);
        pushLog(OperationType.ERROR, joinPoint, ex, null);
    }
}
```

---
**作者：aires的收藏馆**  
**出处：[www.aires.net.cn](http://www.aires.net.cn)**   
**版权所有，欢迎保留原文链接进行转载** 

