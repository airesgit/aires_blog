---
layout: post
title:  SpringBoot (十三) springboot-跨域处理
category: springBoot 
tags: [springBoot]
copyright: java
---

## springboot-跨域处理

---

配置跨域处理
```java

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CrosConfig {

    @Bean
    public FilterRegistrationBean corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("*");
        config.addAllowedHeader(CorsConfiguration.ALL);
        config.addAllowedMethod(CorsConfiguration.ALL);
        config.addExposedHeader("Content-Disposition");
        source.registerCorsConfiguration("/**", config);
        FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }

}
```

---
下面说一个我遇到的一个场景案例：前端需要获取相应头的信息，但是cros 只能获取基本的响应头无法获取其它

解决方案；服务端设置header头，添加config.addExposedHeader("Content-Disposition"); 

网上找的一些资料介绍：
![images](http://www.aires.net.cn/assets/images/springboot/cors-01.png)

---
**作者：aires的收藏馆**  
**出处：[www.aires.net.cn](http://www.aires.net.cn)**   
**版权所有，欢迎保留原文链接进行转载** 

