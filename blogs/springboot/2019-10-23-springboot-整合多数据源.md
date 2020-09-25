---
layout: post
title:  SpringBoot (八) springboot整合多数据源
category: springBoot 
tags: [springBoot]
copyright: java
---

## springboot整合多数据源

---

一个项目，操作2个以上数据源，那么此时就需要自己手动配置 sqlSessionTemplate、sqlSesionFactory、 TransactionManager、 dataSource ，自己配置了spring就不会配置了

此时需要用到 @Configuration 注解 （本质也是 @Compoent注解，只是方便见名知意，同controller）

@ConfigurationProperties 注解，作用： 读取指定的配置文件，将相关的配置信息通过getter/setter 方法加载

@MapperScan 注解需要配置使用的 sessionFactory，或者 配置 sqlSessionTemplate也行

业务层使用@Transaction 注解，需要指明配置的哪个事务，否则事务无效

@Primary 注解 代表是默认使用，如果有多个该对象，但是没有指明使用哪个的话，就使用默认的

---
#### 以下相关demo演示

配置数据源1
```java
//DataSource01
@Configuration // 注册到springboot容器中
@MapperScan(basePackages = "com.itmayiedu.test01", sqlSessionFactoryRef = "test1SqlSessionFactory")
public class DataSource1Config {
 

      @Bean(name = "test1DataSource")
      @ConfigurationProperties(prefix = "spring.datasource.test1")
      @Primary
      public DataSource testDataSource() {
            return DataSourceBuilder.create().build();
      }
 
   
      @Bean(name = "test1SqlSessionFactory")
      @Primary
      public SqlSessionFactory testSqlSessionFactory(@Qualifier("test1DataSource") DataSource dataSource)
                  throws Exception {
            SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
            bean.setDataSource(dataSource);
            // bean.setMapperLocations(
            // new
            // PathMatchingResourcePatternResolver().getResources("classpath:mybatis/mapper/test1/*.xml"));
            return bean.getObject();
      }
 
     
      @Bean(name = "test1TransactionManager")
      @Primary
      public DataSourceTransactionManager testTransactionManager(@Qualifier("test1DataSource") DataSource dataSource) {
            return new DataSourceTransactionManager(dataSource);
      }
 
      @Bean(name = "test1SqlSessionTemplate")
      @Primary
      public SqlSessionTemplate testSqlSessionTemplate(
                  @Qualifier("test1SqlSessionFactory") SqlSessionFactory sqlSessionFactory) throws Exception {
            return new SqlSessionTemplate(sqlSessionFactory);
      }
 
}
```
配置数据源2
```java
//DataSource2
@Configuration // 注册到springboot容器中
@MapperScan(basePackages = "com.itmayiedu.test02", sqlSessionFactoryRef = "test2SqlSessionFactory")
public class DataSource2Config {
 
     
      @Bean(name = "test2DataSource")
      @ConfigurationProperties(prefix = "spring.datasource.test2")
      public DataSource testDataSource() {
            return DataSourceBuilder.create().build();
      }
 
    
      @Bean(name = "test2SqlSessionFactory")
      public SqlSessionFactory testSqlSessionFactory(@Qualifier("test2DataSource") DataSource dataSource)
                  throws Exception {
            SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
            bean.setDataSource(dataSource);
            // bean.setMapperLocations(
            // new
            // PathMatchingResourcePatternResolver().getResources("classpath:mybatis/mapper/test2/*.xml"));
            return bean.getObject();
      }
 
    
      @Bean(name = "test2TransactionManager")
      public DataSourceTransactionManager testTransactionManager(@Qualifier("test2DataSource") DataSource dataSource) {
            return new DataSourceTransactionManager(dataSource);
      }
 
      @Bean(name = "test2SqlSessionTemplate")
      public SqlSessionTemplate testSqlSessionTemplate(
                  @Qualifier("test2SqlSessionFactory") SqlSessionFactory sqlSessionFactory) throws Exception {
            return new SqlSessionTemplate(sqlSessionFactory);
      }
 
}
```

---
**作者：aires的收藏馆**  
**出处：[www.aires.net.cn](http://www.aires.net.cn)**   
**版权所有，欢迎保留原文链接进行转载** 

