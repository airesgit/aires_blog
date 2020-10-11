## python-mysql



### pymysql 模块

> 语法

```python
from pymysql import *

conn = connect()   
"""参数
参数host：连接的mysql主机，如果本机是'localhost'
参数port：连接的mysql主机的端口，默认是3306
参数database：数据库的名称
参数user：连接的用户名
参数password：连接的密码
参数charset：通信采用的编码方式，推荐使用utf8
"""

"""connect方法
close()关闭连接
commit()提交
cursor()返回Cursor对象，用于执行sql语句并获得结果
"""

cursor = conn.cursor()   # cursor 对象相当于 java的statement，用于提交执行sql语句

"""属性

rowcount只读属性，表示最近一次execute()执行后受影响的行数
connection获得当前连接对象
"""

"""cursor方法

close()关闭
execute(operation [, parameters ])执行语句，返回受影响的行数，主要用于执行insert、update、delete语句，也可以执行create、alter、drop等语句
fetchone()执行查询语句时，获取查询结果集的第一个行数据，返回一个元组
fetchall()执行查询时，获取结果集的所有行，一行构成一个元组，再将这些元组装入一个元组返回
"""
```

### crud操作

```python
 # 创建Connection连接
    conn = connect(host='localhost',port=3306,database='jing_dong',user='root',password='mysql',charset='utf8')
    # 获得Cursor对象
    cs1 = conn.cursor()
    # 执行insert语句，并返回受影响的行数：添加一条数据
    # 增加
    count = cs1.execute('insert into goods_cates(name) values("硬盘")')
    #打印受影响的行数
    print(count)

    count = cs1.execute('insert into goods_cates(name) values("光盘")')
    print(count)

    # # 更新
    # count = cs1.execute('update goods_cates set name="机械硬盘" where name="硬盘"')
    # # 删除
    # count = cs1.execute('delete from goods_cates where id=6')

    # 提交之前的操作，如果之前已经之执行过多次的execute，那么就都进行提交
    conn.commit()

    # 关闭Cursor对象
    cs1.close()
    # 关闭Connection对象
    conn.close()
```
### 查询
#### 查询一行

```python
count = cs1.execute('select id,name from goods where id>=4') # 返回查询的数量

for i in range(count):   # 迭代查询的数量然后通过cursor捕获每条数据
        # 获取查询的结果
        result = cs1.fetchone() # 返回每条数据元组
        # 打印查询的结果
        print(result)
        # 获取查询的结果
```

#### 查询多行

```python
result = cs1.fetchall() ## 返回每条元组数据的元组列表
```



