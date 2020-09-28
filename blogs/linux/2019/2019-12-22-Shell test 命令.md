---
title: test
date: 2019-10-22
tags:
 - linux 
 - shell
categories: 
 - linux
---

## Shell test 命令

###
Shell中的 test 命令用于检查某个条件是否成立，它可以进行数值、字符和文件三个方面的测试。

### 数值测试

<html>
    <table>
        <tr>
            <th width="20%">参数</th>
            <th width="40%">说明</th>
        </tr>
        <tr>
			<td width="20%">-eq</td>
			<td width="80%">等于则为真</td>
        </tr>
		<tr>
			<td width="20%">-ne</td>
			<td width="80%">不等于则为真</td>
        </tr>
		<tr>
			<td width="20%">-gt</td>
			<td width="80%">大于则为真</td>
        </tr>
		<tr>
			<td width="20%">-ge</td>
			<td width="80%">大于等于则为真</td>
        </tr>
		<tr>
			<td width="20%">-lt</td>
			<td width="80%">小于则为真</td>
        </tr>
		<tr>
			<td width="20%">-le</td>
			<td width="80%">小于等于则为真</td>
        </tr>
    </table>
</html>

实例演示：
```
num1=100
num2=100
if test $[num1] -eq $[num2]
then
    echo '两个数相等！'
else
    echo '两个数不相等！'
fi
```
输出结果：
```
两个数相等！
```
代码中的 [] 执行基本的算数运算，如：
```
#!/bin/bash

a=5
b=6

result=$[a+b] # 注意等号两边不能有空格
echo "result 为： $result"
```

结果为:
```
result 为： 11
```


---


### 字符串测试

<html>
    <table>
        <tr>
            <th width="20%">参数</th>
            <th width="40%">说明</th>
        </tr>
        <tr>
			<td width="20%">=</td>
			<td width="80%">等于则为真</td>
        </tr>
		<tr>
			<td width="20%">!=</td>
			<td width="80%">不等于则为真</td>
        </tr>
		<tr>
			<td width="20%">-z 字符串</td>
			<td width="80%">字符串的长度为零则为真</td>
        </tr>
		<tr>
			<td width="20%">-n 字符串</td>
			<td width="80%">字符串的长度不为零则为真真</td>
        </tr>
    </table>
</html>

实例演示：
```
num1="ru1noob"
num2="runoob"
if test $num1 = $num2
then
    echo '两个字符串相等!'
else
    echo '两个字符串不相等!'
fi
```

输出结果：
```
两个字符串不相等!
```


--- 


### 文件测试
<html>
    <table>
        <tr>
            <th width="20%">参数</th>
            <th width="40%">说明</th>
        </tr>
        <tr>
			<td width="20%">-e 文件名</td>
			<td width="80%">如果文件存在则为真</td>
        </tr>
		<tr>
			<td width="20%">-r 文件名</td>
			<td width="80%">如果文件存在且可读则为真</td>
        </tr>
		<tr>
			<td width="20%">-w 文件名</td>
			<td width="80%">如果文件存在且可写则为真</td>
        </tr>
		<tr>
			<td width="20%">-x 文件名</td>
			<td width="80%">如果文件存在且可执行则为真</td>
        </tr>
        <tr>
			<td width="20%">-s 文件名</td>
			<td width="80%">如果文件存在且至少有一个字符则为真</td>
        </tr>
        <tr>
			<td width="20%">-d 文件名</td>
			<td width="80%">如果文件存在且为目录则为真</td>
        </tr>
        <tr>
			<td width="20%">-f 文件名</td>
			<td width="80%">如果文件存在且为普通文件则为真</td>
        </tr>
        <tr>
			<td width="20%">-c 文件名</td>
			<td width="80%">如果文件存在且为字符型特殊文件则为真</td>
        </tr>
        <tr>
			<td width="20%">-b 文件名</td>
			<td width="80%">如果文件存在且为块特殊文件则为真</td>
        </tr>
    </table>
</html>

实例演示：
```
cd /bin
if test -e ./bash
then
    echo '文件已存在!'
else
    echo '文件不存在!'
fi
```

输出结果：
```
文件已存在!
```

另外，Shell还提供了与( -a )、或( -o )、非( ! )三个逻辑操作符用于将测试条件连接起来，其优先级为："!"最高，"-a"次之，"-o"最低。例如：

```
cd /bin
if test -e ./notFile -o -e ./bash
then
    echo '至少有一个文件存在!'
else
    echo '两个文件都不存在'
fi
```
输出结果：
```
至少有一个文件存在!
```