---
title: SpringBoot (十一) springboot-整合EhCache
date: 2019-10-23
tags:
 - springBoot
categories: 
 - springBoot
---

## springboot-整合EhCache

---

#### Spring Cache 
EhCache 是 hibernate 默认使用的缓存。

Spring Cache使用方法与Spring对事务管理的配置相似。Spring Cache的核心就是对某 个方法进行缓存，
其实质就是缓存该方法的返回结果，并把方法参数和结果用键值对的 方式存放到缓存中，
当再次调用该方法使用相应的参数时，就会直接从缓存里面取出指 定的结果进行返回。

#### 相关注解解析
@CacheConfig(cacheNames = "xxx")  		
```text
作用：放置在需要配置缓存的 mapper 接口上，并指定缓存名称，方便后续需要清理
```

@Cacheable 
```text
使用这个注解的方法在执行后会缓存其返回结果。
  |- value:  容器中的大key
  |- key：  指定参数：  #key
```

@CacheEvict
```text
使用这个注解的方法在其执行前或执行后移除Spring Cache中的某些 元素。 	用于删改操作
```

@EnableCache                        
```text
开启缓存支持
```

CacheMapper 对象，
```text
用于操作 EhCache 缓存，例如：
  |- cacheManager.getCache("缓存名称").clear();
```

spring cache 是对 spring data redis 的进一步封装
```text
两者使用场景：
  |- spring cache 更加适合简单业务逻辑不复杂的运用
  |- spring data redis 适用相对复杂的业务场景

spring cache 并没有过期时间的设置，适用相对简单的操作，如果需要过期时间则使用 spring data redis
```

---
#### 相关Demo演示
```text
步骤：
    导入 Encache 依赖
    配置 encache.xml 文件（可以无）
    mapper 接口使用相关注解
    启动类开启 注解支持
```

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
```

@Cacheable缓存使用
```text
@Cacheable(value="gathering",key="#id")      
public Gathering findById(String id) {      
    return gatheringDao.findById(id).get();          
}
```
```text
@CacheConfig(cacheNames = "baseCache")
public interface UserMapper {
      @Select("select * from users where name=#{name}")
      @Cacheable
      UserEntity findName(@Param("name") String name);
}
```

@CacheEvict删除缓存
```text
@CacheEvict(value="gathering",key="#gathering.id")      
public void update(Gathering gathering) {      
    gatheringDao.save(gathering);          
}     

@CacheEvict(value="gathering",key="#id")      
public void deleteById(String id) {      
    gatheringDao.deleteById(id);          
}
```

--- 
缓存配置
```xml
<?xml version="1.0" encoding="UTF-8"?>
<ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:noNamespaceSchemaLocation="http://ehcache.org/ehcache.xsd"
      updateCheck="false">
      <diskStore path="java.io.tmpdir/Tmp_EhCache" />
 
      <!-- 默认配置 -->
      <defaultCache maxElementsInMemory="5000" eternal="false"
            timeToIdleSeconds="120" timeToLiveSeconds="120"
            memoryStoreEvictionPolicy="LRU" overflowToDisk="false" />
 
      <cache name="baseCache" maxElementsInMemory="10000"
            maxElementsOnDisk="100000" />
 
</ehcache>
```
```text
2.name:缓存名称。  
3.maxElementsInMemory：缓存最大个数。  
4.eternal :对象是否永久有效，一但设置了，timeout将不起作用。  
5.timeToIdleSeconds：设置对象在失效前的允许闲置时间（单位：秒）。仅当eternal=false对象不是永久有效时使用，可选属性，默认值是0，也就是可闲置时间无穷大。  
           timeToLiveSeconds：设置对象在失效前允许存活时间（单位：秒）。最大时间介于创建时间和失效时间之间。仅当eternal=false对象不是永久有效时使用，默认是0.，也就是对象存活时间无穷大。
1.overflowToDisk：当内存中对象数量达到maxElementsInMemory时，Ehcache将会对象写到磁盘中。  
2.diskSpoolBufferSizeMB：这个参数设置DiskStore（磁盘缓存）的缓存区大小。默认是30MB。每个Cache都应该有自己的一个缓冲区。  
3.maxElementsOnDisk：硬盘最大缓存个数。  
4.diskPersistent：是否缓存虚拟机重启期数据 Whether the disk store persists between restarts of the Virtual Machine. The default value is false.  
5.：磁盘失效线程运行时间间隔，默认是120秒。  
6.memoryStoreEvictionPolicy：当达到maxElementsInMemory限制时，Ehcache将会根据指定的策略去清理内存。默认策略是LRU（最近最少使用）。你可以设置为FIFO（先进先出）或是LFU（较少使用）。  
7.clearOnFlush：内存数量最大时是否清除。  
```

---
**作者：aires的收藏馆**  
**出处：[www.aires.net.cn](http://www.aires.net.cn)**   
**版权所有，欢迎保留原文链接进行转载** 

