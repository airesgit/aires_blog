---
layout: post
title:  SpringBoot (十五) springboot-集成swagger
category: springBoot 
tags: [springBoot]
copyright: java
---

## springboot-集成swagger

---

引入依赖
```xml
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>2.8.0</version>
</dependency>
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>2.8.0</version>
</dependency>
```
swagger的配置类
```java
@Configuration
@EnableSwagger2   // 4
@Profile({"default", "test", "dev"}) // 5
public class Swagger2Config {

    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo()).select()
                .apis(RequestHandlerSelectors.basePackage("com.yilu.gzxf.admin")) // 1
                .paths(PathSelectors.any()) // 2
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("xxxx RESTful Apis").description("YILU-GZXF-Admin-Platform") // 3
                .version("1.0").build();
    }
}
```
相关步骤解析
```text
1 ： 指定扫描的包路径，主要用于扫描sqgger注解标识的pojo
2 ： 配置路径，（应该可以用来指定过滤的路径）
3 ： 描述信息
4 ： 开启swagger2
5 ： 只在 default、test、dev 环境下生效
```

#### 我的项目里面的一个情景：

因为配置了拦截器 + redis 实现单点登陆，所以swagger 会被拦截器拦截，
这里要重写 springMvc 的拦截器，进行配置

```java
package com.yilu.gzxf.admin.config;

import com.yilu.gzxf.admin.filter.SessionInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

import javax.annotation.Resource;

@Configuration
public class WebMvcConfig extends WebMvcConfigurationSupport { // 1

    @Resource
    private SessionInterceptor sessionInterceptor; // 2

    @Override
    protected void addInterceptors(InterceptorRegistry registry) { // 3
        registry.addInterceptor(sessionInterceptor) //4      
                .addPathPatterns("/**") // 5
                .excludePathPatterns("/error", "/swagger-resources/**", "/webjars/**", "/v2/**", "/swagger-ui.html/**"); // 6
    }

    @Override
    protected void addResourceHandlers(ResourceHandlerRegistry registry) { // 7
        registry.addResourceHandler("swagger-ui.html") // 8
                .addResourceLocations("classpath:/META-INF/resources/"); // 9
        registry.addResourceHandler("/webjars/**") // 10
                .addResourceLocations("classpath:/META-INF/resources/webjars/"); //11
    }
}
```
相关步骤解析
```text
1：WebMvcConfigurationSupport  重写springMvc 的拦截器
2：自定义的登陆session拦截器 （swagger 代码里不需要关心）
3：addInterceptors， 重写添加拦截器的方法
4：将自定义的拦截器交给springMvc 管理（此处不关心）
5：拦截所有路径
6：排除拦截的路径此处将swagger 的一些资源目录放行不拦截
7：addResourceHandlers， 重新资源处理器
8、9、10、11： 都是配置资源的处理器，以及指定swagger的静态资源路径
```

---
**作者：aires的收藏馆**  
**出处：[www.aires.net.cn](http://www.aires.net.cn)**   
**版权所有，欢迎保留原文链接进行转载** 

