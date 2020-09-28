---
title: SpringBoot (三) springboot实现全局异常捕获
date: 2019-10-23
tags:
 - springBoot
categories: 
 - springBoot
---

## springboot实现全局异常捕获

---

```java
import com.yilu.gzxf.commons.dto.JsonObjectPage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private Logger log = LoggerFactory.getLogger(this.getClass());

    @ExceptionHandler(value = {Exception.class})
    public JsonObjectPage defaultErrorHandler(Exception e){
        log.error(e.getMessage(),e);
        String errorMesssage = "";
        if (e instanceof MethodArgumentNotValidException){
            MethodArgumentNotValidException validException = (MethodArgumentNotValidException) e;
            BindingResult bindingResult = validException.getBindingResult();
            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                errorMesssage = fieldError.getDefaultMessage() + ", ";
            }
        }else{
            errorMesssage += e.getMessage();
        }
        JsonObjectPage jsonPage = new JsonObjectPage();
        jsonPage.setSuccess(false);
        jsonPage.setMsg("温馨提示: " + errorMesssage);
        jsonPage.setData(null);
        return jsonPage;

    }
    
}
```
相关注解解释：

@ControllerAdvice    
- 声明在类上，一般指定扫描controller，因为方法最终都是抛到控制层 （要指定扫描的包，否则会报错）

@ExceptionHandler		
- 声明在方法上，定义拦截的异常 （要指定拦截的异常，否则会有问题）

---

**作者：aires的收藏馆**  
**出处：[www.aires.net.cn](http://www.aires.net.cn)**   
**版权所有，欢迎保留原文链接进行转载** 

