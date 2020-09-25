---
layout: post
title:  SpringBoot (九) springboot多数据源事物管理
category: springBoot 
tags: [springBoot]
copyright: java
---

## springboot多数据源事物管理

---

多数据源可以参考上一篇，此处介绍多数据源事物的整合，此处演示springboot + jta + atomikos实现的分布式事物管理操作（该方式一般不用）

springboot + jta + atomikos 。该方案适合传统的项目，因为性能低

---
#### 以下相关demo演示
```text
步骤：
    1、导入jta-atomiikos依赖
    2、配置数据源集 jta相关属性（可以无）
    3、自己手动编写配置类，配置使用 MysqlXADataSource 数据源，并将数据源交由 Atomikos 来统一维护事务，这样就做好了全局事务的统一管理（配置类不需要配置事务，由jta 统一管理）
```

引入相关依赖
```xml
<dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-jta-atomikos</artifactId>
</dependency>
```
属性配置类
```java
@Data
@ConfigurationProperties(prefix = "mysql.datasource.test1")
public class DBConfig1 {
 
      private String url;
      private String username;
      private String password;
      private int minPoolSize;
      private int maxPoolSize;
      private int maxLifetime;
      private int borrowConnectionTimeout;
      private int loginTimeout;
      private int maintenanceInterval;
      private int maxIdleTime;
      private String testQuery;
}
 
@Data
@ConfigurationProperties(prefix = "mysql.datasource.test2")
public class DBConfig2 {
 
      private String url;
      private String username;
      private String password;
      private int minPoolSize;
      private int maxPoolSize;
      private int maxLifetime;
      private int borrowConnectionTimeout;
      private int loginTimeout;
      private int maintenanceInterval;
      private int maxIdleTime;
      private String testQuery;
}
```

数据源配置，集成 jta + atomikos 配置分布式事物
```java
@Configuration
// basePackages 最好分开配置 如果放在同一个文件夹可能会报错
@MapperScan(basePackages = "com.itmayiedu.test01", sqlSessionTemplateRef = "testSqlSessionTemplate")
public class MyBatisConfig1 {
 
      // 配置数据源
      @Primary
      @Bean(name = "testDataSource")
      public DataSource testDataSource(DBConfig1 testConfig) throws SQLException {
            MysqlXADataSource mysqlXaDataSource = new MysqlXADataSource();
            mysqlXaDataSource.setUrl(testConfig.getUrl());
            mysqlXaDataSource.setPinGlobalTxToPhysicalConnection(true);
            mysqlXaDataSource.setPassword(testConfig.getPassword());
            mysqlXaDataSource.setUser(testConfig.getUsername());
            mysqlXaDataSource.setPinGlobalTxToPhysicalConnection(true);  // 必要
 
            AtomikosDataSourceBean xaDataSource = new AtomikosDataSourceBean();
            xaDataSource.setXaDataSource(mysqlXaDataSource);
            xaDataSource.setUniqueResourceName("testDataSource");  // 必要，指定数据源的名称
 
            xaDataSource.setMinPoolSize(testConfig.getMinPoolSize());
            xaDataSource.setMaxPoolSize(testConfig.getMaxPoolSize());
            xaDataSource.setMaxLifetime(testConfig.getMaxLifetime());
            xaDataSource.setBorrowConnectionTimeout(testConfig.getBorrowConnectionTimeout());
            xaDataSource.setLoginTimeout(testConfig.getLoginTimeout());
            xaDataSource.setMaintenanceInterval(testConfig.getMaintenanceInterval());
            xaDataSource.setMaxIdleTime(testConfig.getMaxIdleTime());
            xaDataSource.setTestQuery(testConfig.getTestQuery());
            return xaDataSource;
      }
 
      @Primary
      @Bean(name = "testSqlSessionFactory")
      public SqlSessionFactory testSqlSessionFactory(@Qualifier("testDataSource") DataSource dataSource)
                  throws Exception {
            SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
            bean.setDataSource(dataSource);
            return bean.getObject();
      }
 
      @Primary
      @Bean(name = "testSqlSessionTemplate")
      public SqlSessionTemplate testSqlSessionTemplate(
                  @Qualifier("testSqlSessionFactory") SqlSessionFactory sqlSessionFactory) throws Exception {
            return new SqlSessionTemplate(sqlSessionFactory);
      }
}
 
@Configuration
@MapperScan(basePackages = "com.itmayiedu.test02", sqlSessionTemplateRef = "test2SqlSessionTemplate")
public class MyBatisConfig2 {
 
      // 配置数据源
      @Bean(name = "test2DataSource")
      public DataSource testDataSource(DBConfig2 testConfig) throws SQLException {
            MysqlXADataSource mysqlXaDataSource = new MysqlXADataSource();
            mysqlXaDataSource.setUrl(testConfig.getUrl());
            mysqlXaDataSource.setPinGlobalTxToPhysicalConnection(true);
            mysqlXaDataSource.setPassword(testConfig.getPassword());
            mysqlXaDataSource.setUser(testConfig.getUsername());
            mysqlXaDataSource.setPinGlobalTxToPhysicalConnection(true);
 
            AtomikosDataSourceBean xaDataSource = new AtomikosDataSourceBean();
            xaDataSource.setXaDataSource(mysqlXaDataSource);
            xaDataSource.setUniqueResourceName("test2DataSource");
 
            xaDataSource.setMinPoolSize(testConfig.getMinPoolSize());
            xaDataSource.setMaxPoolSize(testConfig.getMaxPoolSize());
            xaDataSource.setMaxLifetime(testConfig.getMaxLifetime());
            xaDataSource.setBorrowConnectionTimeout(testConfig.getBorrowConnectionTimeout());
            xaDataSource.setLoginTimeout(testConfig.getLoginTimeout());
            xaDataSource.setMaintenanceInterval(testConfig.getMaintenanceInterval());
            xaDataSource.setMaxIdleTime(testConfig.getMaxIdleTime());
            xaDataSource.setTestQuery(testConfig.getTestQuery());
            return xaDataSource;
      }
 
      @Bean(name = "test2SqlSessionFactory")
      public SqlSessionFactory testSqlSessionFactory(@Qualifier("test2DataSource") DataSource dataSource)
                  throws Exception {
            SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
            bean.setDataSource(dataSource);
            return bean.getObject();
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

