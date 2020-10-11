##  python



### 注释

```python
"""
 这是一个多行注释
"""

# 这是一个单行注释
```





### 算术运算符

```python
 +、-、*、/、//、%、**(幂运算)
    
- / 与 //的区别
- / 会返回小数部分
- // 只返回整数部分
```



#### 算术运算优先级

* **先乘除后加减**
* 同级运算符是 **从左至右** 计算
* 可以使用 `()` 调整计算的优先级

| 运算符   | 描述                   |
| -------- | ---------------------- |
| **       | 幂 (最高优先级)        |
| * / % // | 乘、除、取余数、取整除 |
| + -      | 加法、减法             |



### 变量

- python的变量不需要指定类型，会自动根据类型推导

```python
number="12312"
```



#### 变量的类型

- 数字型
  - 整型 (`int`)
  - 浮点型（`float`）
  - 布尔型（`bool`） 
    - 真 `True` `非 0 数` —— **非零即真**
    - 假 `False` `0`
  - 复数型 (`complex`)
    - 主要用于科学计算，例如：平面场问题、波动问题、电感电容等问题
- 非数字型
  - 字符串
  - 列表
  - 元组
  - 字典

> tip: 两个数值类型可以直接进行运算（包括boolean）

> 字符串可以使用+ 号拼接，同其它语言

> 字符串使用 * 号，相当于拼接 指定次数： "-" * 50



#### 输入函数input（shell 的read、 java的scanner）

```python
print("", end="") # 打印到空值台， end是可选参数：表示输出后再结尾输出的内容，默认\r\n

type(x) # 可以查看变量的类型

input("提示信息") -> str  # 监听用户的输入内容
```



#### 类型转换函数 int(), float()，str()

```python
str = "123"

ivar = int(str)
fvar = float(str)
```



### 流程判断语句 if

> python中是没有java的 {}， shell的 do... done、fi这些来区分的，python依赖于缩进

```python
if 条件:
	action ## 缩进才认为是if的内部代码块
elif 条件:
    action
else:
    action
```



### 逻辑运算 and / or / not

```python
# 多个条件用 and / or 连接

if 条件1 and 条件2:
    action
```



### 比较运算符

| 运算符 | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| ==     | 检查两个操作数的值是否 **相等**，如果是，则条件成立，返回 True |
| !=     | 检查两个操作数的值是否 **不相等**，如果是，则条件成立，返回 True |
| >      | 检查左操作数的值是否 **大于** 右操作数的值，如果是，则条件成立，返回 True |
| <      | 检查左操作数的值是否 **小于** 右操作数的值，如果是，则条件成立，返回 True |
| >=     | 检查左操作数的值是否 **大于或等于** 右操作数的值，如果是，则条件成立，返回 True |
| <=     | 检查左操作数的值是否 **小于或等于** 右操作数的值，如果是，则条件成立，返回 True |

> python的字符串比较可以直接使用 == 



赋值运算符

- 在 Python 中，使用 `=` 可以给变量赋值
- 在算术运算时，为了简化代码的编写，`Python` 还提供了一系列的 与 **算术运算符** 对应的 **赋值运算符**
- 注意：**赋值运算符中间不能使用空格**

| 运算符 | 描述                       | 实例                                  |
| ------ | -------------------------- | ------------------------------------- |
| =      | 简单的赋值运算符           | c = a + b 将 a + b 的运算结果赋值为 c |
| +=     | 加法赋值运算符             | c += a 等效于 c = c + a               |
| -=     | 减法赋值运算符             | c -= a 等效于 c = c - a               |
| *=     | 乘法赋值运算符             | c *= a 等效于 c = c * a               |
| /=     | 除法赋值运算符             | c /= a 等效于 c = c / a               |
| //=    | 取整除赋值运算符           | c //= a 等效于 c = c // a             |
| %=     | 取 **模** (余数)赋值运算符 | c %= a 等效于 c = c % a               |
| **=    | 幂赋值运算符               | c **= a 等效于 c = c ** a             |



### 循环结构

#### while

```python
while 条件
	action
```



#### for

```python
for item in 列表/元组/字典

## 注意： 跌打字典，迭代的是key，也就是item指的是key
```



#### break、 continue

```python
break: 结束循环
continue: 跳过当前循环
```



#### 字符串中的转义字符

- `\t` 在控制台输出一个 **制表符**，协助在输出文本时 **垂直方向** 保持对齐
- `\n` 在控制台输出一个 **换行符**

> **制表符** 的功能是在不使用表格的情况下在 **垂直方向** 按列对齐文本

| 转义字符 | 描述       |
| -------- | ---------- |
| \\\\     | 反斜杠符号 |
| \\'      | 单引号     |
| \\"      | 双引号     |
| \n       | 换行       |
| \t       | 横向制表符 |
| \r       | 回车       |

##### 字符串的格式化

```python
%s :替换字符串
%d: 替换数值 ，如果 %02d， 说明是两位数，不足 0补
%.2f: 替换成小数，保留2位小数
%%： 代表 结尾指定一个 % 号
```





### 函数定义

- 关键字 def 

```python
# 普通函数： def 函数名 (): 
# 实例函数： def 函数名(self):  self 表示当前对象相当于java的this（self是形参，可以取其它名字，默认这个，python是根据形参的位置将对象赋值）

# 类函数： 要用@classmethod 修饰
	@classmethod
	def 函数名(cls): # cls 代表当前类对象

# 静态函数：其实和静态函数差不多，只不过是不对类属性进行修饰 用@staticmethod 修饰
	@staticmethod
    def 函数名(): 

      
# 函数的调用 
 函数名()

# 如果有返回值用 return 返回，会默认在方法体上隐式 加上返回值 如：def 函数名() -> 返回值:

```



#### 参数及变量

> python的参数传递同java一样，不存在值传递，都是引用传递，所以函数体内的修改并不会影响函数体外变量的修改（但是如果是引用的地址内数据则可以变更数据）



> python和java有点不一样的是，python的变量指向的都是引用地址



##### 缺省参数

```python
def 函数名(参数名 = 值):
```

##### 多值参数

```python
def 函数名(参数1， *参数2, **参数3):
    
    * 代表元组
    ** 代表字典
```



#### 返回值

```python
### 多个返回值，可以通过元组返回

def m ():
    
    return 1,2  # 相当于(1，2), 单元组时可以省略

## 接收
rs = m(): # rs 接收元组，然后通过元组的方式获取
    
### 也可以通过下列方式，变量根据元组的顺序获取值
num1, num2 = m()
```





### pyc文件

> 该文件是python用于提高性能而提前编译的文件（一个py文件引用另一个py文件，才会产生该文件），这样python再使用该文件的时候就不需要再编译解释执行了（该文件变动了，会更新编译文件）



### 高级变量类型（非数值）

在 `Python` 中，所有 **非数字型变量** 都支持以下特点：

1. 都是一个 **序列** `sequence`，也可以理解为 **容器**
2. **取值** `[]`
3. **遍历** `for in`
4. **计算长度**、**最大/最小值**、**比较**、**删除**
5. **链接** `+` 和 **重复** `*`
6. **切片**



#### 列表 []

![1601708326886](D:\github_repository\aires_blog\blogs\python\assets\1601708326886.png)

#### 关键字 del

- 使用 `del` 关键字(`delete`) 同样可以删除列表中元素
- `del` 关键字本质上是用来 **将一个变量从内存中删除的（所以也可以删除一个对象）**
- 如果使用 `del` 关键字将变量从内存中删除，后续的代码就不能再使用这个变量了



#### 关键字 keyword

```python
In [1]: import keyword
In [2]: print(keyword.kwlist)
In [3]: print(len(keyword.kwlist))
```



#### 元组 ()

- `Tuple`（元组）与列表类似，不同之处在于元组的 **元素不能修改**
  - **元组** 表示多个元素组成的序列
  - **元组** 在 `Python` 开发中，有特定的应用场景
- 用于存储 **一串 信息**，**数据** 之间使用 `,` 分隔
- 元组用 `()` 定义
- 元组的 **索引** 从 `0` 开始
  - **索引** 就是数据在 **元组** 中的位置编号

```python
info_tuple = ("zhangsan", 18, 1.75)

## 空元组
info_tuple =()

## 只包含一个元素
info_tuple = （50,）

# 注意：是逗号结尾，否则整个数值分成字符做为元组的元素
```



#### 元组与列表的互换 list()、tuple()

- 使用 `list` 函数可以把元组转换成列表

```python
list(元组) 
```

- 使用 `tuple` 函数可以把列表转换成元组

```python
tuple(列表)
```





#### 字典 {}

- `dictionary`（字典） 是 **除列表以外** `Python` 之中 **最灵活** 的数据类型
- 字典同样可以用来 **存储多个数据**
  - 通常用于存储 **描述一个 `物体` 的相关信息** 
- 和列表的区别
  - **列表** 是 **有序** 的对象集合
  - **字典** 是 **无序** 的对象集合
- 字典用 `{}` 定义
- 字典使用 **键值对** 存储数据，键值对之间使用 `,` 分隔
  - **键** `key` 是索引
  - **值** `value` 是数据
  - **键** 和 **值** 之间使用 `:` 分隔
  - **键必须是唯一的**
  - **值** 可以取任何数据类型，但 **键** 只能使用 **字符串**、**数字**或 **元组**

```python
## 相当于json
xiaoming = {"name": "小明",
            "age": 18,
            "gender": True,
            "height": 1.75}
```

![1601708893057](D:\github_repository\aires_blog\blogs\python\assets\1601708893057.png)



#### 字符串 ""

- **字符串** 就是 **一串字符**，是编程语言中表示文本的数据类型
- 在 Python 中可以使用 **一对双引号** `"` 或者 **一对单引号** `'` 定义一个字符串
  - 虽然可以使用 `\"` 或者 `\'` 做字符串的转义，但是在实际开发中：
    - 如果字符串内部需要使用 `"`，可以使用 `'` 定义字符串
    - 如果字符串内部需要使用 `'`，可以使用 `"` 定义字符串
- 可以使用 **索引** 获取一个字符串中 **指定位置的字符**，索引计数从 **0** 开始
- 也可以使用 `for` **循环遍历** 字符串中每一个字符

![1601708946110](D:\github_repository\aires_blog\blogs\python\assets\1601708946110.png)

#####  常用操作

######  判断类型 

| 方法               | 说明                                                         |
| ------------------ | ------------------------------------------------------------ |
| string.isspace()   | 如果 string 中只包含空格，则返回 True                        |
| string.isalnum()   | 如果 string 至少有一个字符并且所有字符都是字母或数字则返回 True |
| string.isalpha()   | 如果 string 至少有一个字符并且所有字符都是字母则返回 True    |
| string.isdecimal() | 如果 string 只包含数字则返回 True，`全角数字`                |
| string.isdigit()   | 如果 string 只包含数字则返回 True，`全角数字`、`⑴`、`\u00b2` |
| string.isnumeric() | 如果 string 只包含数字则返回 True，`全角数字`，`汉字数字`    |
| string.istitle()   | 如果 string 是标题化的(每个单词的首字母大写)则返回 True      |
| string.islower()   | 如果 string 中包含至少一个区分大小写的字符，并且所有这些(区分大小写的)字符都是小写，则返回 True |
| string.isupper()   | 如果 string 中包含至少一个区分大小写的字符，并且所有这些(区分大小写的)字符都是大写，则返回 True |

###### 查找和替换 

| 方法                                                    | 说明                                                         |
| ------------------------------------------------------- | ------------------------------------------------------------ |
| string.startswith(str)                                  | 检查字符串是否是以 str 开头，是则返回 True                   |
| string.endswith(str)                                    | 检查字符串是否是以 str 结束，是则返回 True                   |
| string.find(str, start=0, end=len(string))              | 检测 str 是否包含在 string 中，如果 start 和 end 指定范围，则检查是否包含在指定范围内，如果是返回开始的索引值，否则返回 `-1` |
| string.rfind(str, start=0, end=len(string))             | 类似于 find()，不过是从右边开始查找                          |
| string.index(str, start=0, end=len(string))             | 跟 find() 方法类似，不过如果 str 不在 string 会报错          |
| string.rindex(str, start=0, end=len(string))            | 类似于 index()，不过是从右边开始                             |
| string.replace(old_str, new_str, num=string.count(old)) | 把 string 中的 old_str 替换成 new_str，如果 num 指定，则替换不超过 num 次 |

######  大小写转换 

| 方法                | 说明                             |
| ------------------- | -------------------------------- |
| string.capitalize() | 把字符串的第一个字符大写         |
| string.title()      | 把字符串的每个单词首字母大写     |
| string.lower()      | 转换 string 中所有大写字符为小写 |
| string.upper()      | 转换 string 中的小写字母为大写   |
| string.swapcase()   | 翻转 string 中的大小写           |

######  文本对齐 

| 方法                 | 说明                                                         |
| -------------------- | ------------------------------------------------------------ |
| string.ljust(width)  | 返回一个原字符串左对齐，并使用空格填充至长度 width 的新字符串 |
| string.rjust(width)  | 返回一个原字符串右对齐，并使用空格填充至长度 width 的新字符串 |
| string.center(width) | 返回一个原字符串居中，并使用空格填充至长度 width 的新字符串  |

###### 去除空白字符 

| 方法            | 说明                               |
| --------------- | ---------------------------------- |
| string.lstrip() | 截掉 string 左边（开始）的空白字符 |
| string.rstrip() | 截掉 string 右边（末尾）的空白字符 |
| string.strip()  | 截掉 string 左右两边的空白字符     |

######  拆分和连接 

| 方法                      | 说明                                                         |
| ------------------------- | ------------------------------------------------------------ |
| string.partition(str)     | 把字符串 string 分成一个 3 元素的元组 (str前面, str, str后面) |
| string.rpartition(str)    | 类似于 partition() 方法，不过是从右边开始查找                |
| string.split(str="", num) | 以 str 为分隔符拆分 string，如果 num 有指定值，则仅分隔 num + 1 个子字符串，str 默认包含 '\r', '\t', '\n' 和空格 |
| string.splitlines()       | 按照行('\r', '\n', '\r\n')分隔，返回一个包含各行作为元素的列表 |
| string.join(seq)          | 以 string 作为分隔符，将 seq 中所有的元素（的字符串表示）合并为一个新的字符串 |



#### 字符串切片（元组和列表一样）

```python
字符串[开始索引:结束索引:步长]
```

**注意**：

1. 指定的区间属于 **左闭右开** 型 `[开始索引,  结束索引)` => `开始索引 >= 范围 < 结束索引`
   - 从 `起始` 位开始，到 **`结束`位的前一位** 结束（**不包含结束位本身**)
2. 从头开始，**开始索引** **数字可以省略，冒号不能省略**
3. 到末尾结束，**结束索引** **数字可以省略，冒号不能省略**
4. 步长默认为 `1`，如果连续切片，**数字和冒号都可以省略**

#### 索引的顺序和倒序

- 在 Python 中不仅支持 **顺序索引**，同时还支持 **倒序索引**
- 所谓倒序索引就是 **从右向左** 计算索引
  - 最右边的索引值是 **-1**，依次递减

```python

```



### 公共方法

#### Python 内置函数

Python 包含了以下内置函数：

| 函数              | 描述                              | 备注                                             |
| ----------------- | --------------------------------- | ------------------------------------------------ |
| len(item)         | 计算容器中元素个数                |                                                  |
| del(item)         | 删除变量                          | del 有两种方式                                   |
| max(item)         | 返回容器中元素最大值              | 如果是字典，只针对 key 比较                      |
| min(item)         | 返回容器中元素最小值              | 如果是字典，只针对 key 比较                      |
| cmp(item1, item2) | 比较两个值，-1 小于/0 相等/1 大于 | Python 3.x 取消了 cmp 函数（运算符就可以比较了） |

**注意**

- **字符串** 比较符合以下规则： "0" < "A" < "a"

####  切片

| 描述 | Python 表达式      | 结果    | 支持的数据类型     |
| :--: | ------------------ | ------- | ------------------ |
| 切片 | "0123456789"[::-2] | "97531" | 字符串、列表、元组 |

- **切片** 使用 **索引值** 来限定范围，从一个大的 **字符串** 中 **切出** 小的 **字符串**
- **列表** 和 **元组** 都是 **有序** 的集合，都能够 **通过索引值** 获取到对应的数据
- **字典** 是一个 **无序** 的集合，是使用 **键值对** 保存数据

#### 运算符

|    运算符    | Python 表达式         | 结果                         | 描述           | 支持的数据类型           |
| :----------: | --------------------- | ---------------------------- | -------------- | ------------------------ |
|      +       | [1, 2] + [3, 4]       | [1, 2, 3, 4]                 | 合并           | 字符串、列表、元组       |
|      *       | ["Hi!"] * 4           | ['Hi!', 'Hi!', 'Hi!', 'Hi!'] | 重复           | 字符串、列表、元组       |
|      in      | 3 in (1, 2, 3)        | True                         | 元素是否存在   | 字符串、列表、元组、字典 |
|    not in    | 4 not in (1, 2, 3)    | True                         | 元素是否不存在 | 字符串、列表、元组、字典 |
| > >= == < <= | (1, 2, 3) < (2, 2, 3) | True                         | 元素比较       | 字符串、列表、元组       |

**注意**

- `in` 在对 **字典** 操作时，判断的是 **字典的键**
- `in` 和 `not in` 被称为 **成员运算符**

##### 成员运算符

成员运算符用于 **测试** 序列中是否包含指定的 **成员**

| 运算符 | 描述                                                  | 实例                              |
| ------ | ----------------------------------------------------- | --------------------------------- |
| in     | 如果在指定的序列中找到值返回 True，否则返回 False     | `3 in (1, 2, 3)` 返回 `True`      |
| not in | 如果在指定的序列中没有找到值返回 True，否则返回 False | `3 not in (1, 2, 3)` 返回 `False` |

注意：在对 **字典** 操作时，判断的是 **字典的键**

#### 完整的 for 循环语法

- 在 `Python` 中完整的 `for 循环` 的语法如下：

```python
for 变量 in 集合:
    
    循环体代码
else:
    没有通过 break 退出循环，循环结束后，会执行的代码
```





### 面向对象

#### 类和对象

> 同java，类也是一个对象，都具有特征或行为

```python
## 类的构建语法

class 类名(父类，3.5默认object):
   

## 创建对象
var = 类名()
```

#### dir内置函数

- 在 `Python` 中 **对象几乎是无所不在的**，我们之前学习的 **变量**、**数据**、**函数** 都是对象

在 `Python` 中可以使用以下两个方法验证：

1. 在 **标识符** / **数据** 后输入一个 `.`，然后按下 `TAB` 键，`iPython` 会提示该对象能够调用的 **方法列表**
2. 使用内置函数 `dir` 传入 **标识符** / **数据**，可以查看对象内的 **所有属性及方法**

**提示** `__方法名__` 格式的方法是 `Python` 提供的 **内置方法 / 属性(私有方法/属性，python中没有真正的私有，只是改了个名字，可以通过  对象变量._类名.内置方法调用，但是不推荐)**

| 序号 | 方法名     | 类型 | 作用                                                         |
| ---- | ---------- | ---- | ------------------------------------------------------------ |
| 01   | `__new__`  | 方法 | **创建对象**时，会被 **自动** 调用，该方法是分配一个内存地址返回，给到init方法（一定要返回，否则没有内存地址） |
| 02   | `__init__` | 方法 | **对象被初始化**时，会被 **自动** 调用                       |
| 03   | `__del__`  | 方法 | **对象被从内存中销毁**前，会被 **自动** 调用                 |
| 04   | `__str__`  | 方法 | 返回**对象的描述信息**，`print` 函数输出使用                 |

#### 继承、多态

> 同java，但是python可以多继承（不建议），多继承之后根据路径来选择哪个父类优先级高

**问题的提出**

- 如果 **不同的父类** 中存在 **同名的方法**，**子类对象** 在调用方法时，会调用 **哪一个父类中**的方法呢？

> 提示：**开发时，应该尽量避免这种容易产生混淆的情况！** —— 如果 **父类之间** 存在 **同名的属性或者方法**，应该 **尽量避免** 使用多继承

###### Python 中的 MRO —— 方法搜索顺序（知道）

- `Python` 中针对 **类** 提供了一个 **内置属性** `__mro__` 可以查看 **方法** 搜索顺序
- MRO 是 `method resolution order`，主要用于 **在多继承时判断 方法、属性 的调用 路径**

```
print(C.__mro__)
```

**输出结果**

```python
(<class '__main__.C'>, <class '__main__.A'>, <class '__main__.B'>, <class 'object'>)

## python的super()不同于java的super，python的super()是根据python的c3算法计算的继承顺序（也就是__mro__得出得上面元组得类的顺序来调用的）
## tip: 可以通过super(B, self) 传递类名（不传默认是自己）则会直接跳过AB，直接使用的object
```

```python
# 继承语法
class Cat(Animal):  # cat类 继承 Animal
    
# 多态： python的多态与java的不太一样，java的是父类变量对字类引用（相当于隐式提升），而python因为不用指定类型，更像是重写

"""例"""
class Dog(object):

    def __init__(self, name):
        self.name = name

    def game(self):
        print("%s 蹦蹦跳跳的玩耍..." % self.name)


class XiaoTianDog(Dog):

    def game(self):
        print("%s 飞到天上去玩耍..." % self.name)

```



#### 类属性和方法

```python
python的类虽然和java一样是个类对象，但是类属性不太一样，他相当于java类的静态方法，它是全局共享的，实例自己的方法一般通过内置函数__init__()，通过self. 来对属性进行赋值
```



#### property 对象与注解（装饰类注解）

```python
"""
在java 开发中，一般属性都是内省的，提供对外的getter、setter方法来操作，python也可以这么实现，但是python在此基础上提供了更加简洁的作法，就是property 装饰类对象/注解 对getter/setter方法进行了封装
"""
```

##### @property 注解

```python
class Money(object):
    def __init__(self):
        self.__money = 0

    # 使用装饰器对money进行装饰，那么会自动添加一个叫money的属性，当调用获取money的值时，调用装饰的方法
    @property
    def money(self):
        return self.__money

    # 使用装饰器对money进行装饰，当对money设置值时，调用装饰的方法
    @money.setter   # @money 是@property修饰的方法名字
    def money(self, value):
        if isinstance(value, int):
            self.__money = value
        else:
            print("error:不是整型数字")

a = Money()
a.money = 100
print(a.money)
```

##### property() 函数

```python
# property(getter方法， setter方法， deleter 方法， 描述) -> property属性

class Money(object):
    def __init__(self):
        self.__money = 0

    def getMoney(self):
        return self.__money

    def setMoney(self, value):
        if isinstance(value, int):
            self.__money = value
        else:
            print("error:不是整型数字")

    # 定义一个属性，当对这个money设置值时调用setMoney,当获取值时调用getMoney
    money = property(getMoney, setMoney)  

a = Money()
a.money = 100  # 调用setMoney方法
print(a.money)  # 调用getMoney方法
#100
```



#### setattr(self, key, value) 给对象赋值

```python
# 上面我们给对象赋值的方式是 
def __init__(self):
    self.name = 123    # 此时name 是做为对象的属性名
    
# 但是如果我们要取name的值做为属性名，这么取就无法取到了,如下：

def __init(self, **kages):
    for name, value in kages.item():
        # self.name = value               # 这么取是无法得到name的值的，反而将name做为属性名
        # 我们所以通过 setattr() 对属性赋值
        setattr(self, name, value)
```

```python
# 有setattr 那么就要 getattr，语法如下

getattr(self, name, None)  # 传入属性名，因为是获取值，所以value处设置为None


# 当然也有判断属性的 hasattr(Foo, "n") 判断 Foo 类是否有 n 属性
```



#### 异常

```python
# 异常捕获
try:
    # 捕获的代码
except Exception as e:
    # 错误处理 同java的 catch(Exeption e)
else:
    # 没有错误时执行的
finally:
    # 最终都会执行的（同java）
    
    
    
## python的异常和java一样，都具备传递性

## 抛出异常 raise ， 同 java的throw

"""例："""
def input_password():
    ex = Exception("密码长度不够")
    raise ex



```



### 模块和包

##### 模块导入（模块就是py文件）

```python
import 模块1，模块2

# 别名方式
import 模块1 as 模块别名

# 指定模块部分导入
from 模块1 import 工具名

## 判断存在多个模块下使用的是哪个模块：
### 就近原则，也可以通过 __file__ 内置函数查看模块的完整路径
```

###### \__name\__属性

```python
python在执行程序时候，会执行没有缩进的所有函数，对于别人导入的类中包含的测试类也会一并执行，一般通过 __name__ 函数区分

###
__name__ 是 Python 的一个内置属性，记录着一个 字符串
如果 是被其他文件导入的，__name__ 就是 模块名
如果 是当前执行的程序 __name__ 是 __main__
###


""" 例子 """

# 在代码的最下方
def main():
    # ...
    pass

# 根据 __name__ 判断是否执行下方代码
if __name__ == "__main__":
    main()
```



##### 包

> 其实就是一个目录,使用 import 包名，可以导入包下的所有模块
>
> 包含有一个 \__init\__.py文件

### `__init__.py`

- 要在外界使用 **包** 中的模块，需要在 `__init__.py` 中指定 **对外界提供的模块列表**

```
# 从 当前目录 导入 模块列表
from . import send_message
from . import receive_message
```

### 发布模块（知道）

- 如果希望自己开发的模块，**分享** 给其他人，可以按照以下步骤操作
#### 制作发布压缩包步骤

###### 创建 setup.py

- `setup.py` 的文件

```
from distutils.core import setup

setup(name="hm_message",  # 包名
      version="1.0",  # 版本
      description="itheima's 发送和接收消息模块",  # 描述信息
      long_description="完整的发送和接收消息模块",  # 完整描述信息
      author="itheima",  # 作者
      author_email="itheima@itheima.com",  # 作者邮箱
      url="www.itheima.com",  # 主页
      py_modules=["hm_message.send_message",
                  "hm_message.receive_message"])
```

有关字典参数的详细信息，可以参阅官方网站：

<https://docs.python.org/2/distutils/apiref.html>

###### 构建模块

```
$ python3 setup.py build
```

###### 生成发布压缩包

```
$ python3 setup.py sdist
```

> 注意：要制作哪个版本的模块，就使用哪个版本的解释器执行！

#### 安装模块

```
$ tar -zxvf hm_message-1.0.tar.gz 

$ sudo python3 setup.py install
```

**卸载模块**

直接从安装目录下，把安装模块的 **目录** 删除就可以

```
$ cd /usr/local/lib/python3.5/dist-packages/
$ sudo rm -r hm_message*
```

### 3.3 `pip` 安装第三方模块

安装和卸载命令如下：

```
# 将模块安装到 Python 2.x 环境
$ sudo pip install pygame
$ sudo pip uninstall pygame

# 将模块安装到 Python 3.x 环境
$ sudo pip3 install pygame
$ sudo pip3 uninstall pygame
```

#### 在 `Mac` 下安装 `iPython`

```
$ sudo pip install ipython
```

#### 在 `Linux` 下安装 `iPython`

```
$ sudo apt install ipython
$ sudo apt install ipython3
```




###  文件相关操作

> 文件操作无非就是、打开>读写>关闭

#### 操作文件的函数/方法

- 在 `Python` 中要操作文件需要记住 1 个函数和 3 个方法

| 序号 | 函数/方法 | 说明                           |
| ---- | --------- | ------------------------------ |
| 01   | open      | 打开文件，并且返回文件操作对象 |
| 02   | read      | 将文件内容读取到内存           |
| 03   | write     | 将指定内容写入文件             |
| 04   | close     | 关闭文件                       |

- `open` 函数负责打开文件，并且返回文件对象
- `read`/`write`/`close` 三个方法都需要通过 **文件对象** 来调用

#### 文件指针

- **文件指针** 标记 **从哪个位置开始读取数据**

- **第一次打开** 文件时，通常 **文件指针会指向文件的开始位置**

- 当执行了read方法之后指针会指向文件末尾（read是一次读取整个文本的）


  - 默认情况下会移动到 **文件末尾**



#### 打开文件语法

```python
f = open("文件名", "访问方式") # 默认以 只读方式 打开文件，并且返回文件对象
```

| 访问方式 | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| r        | 以**只读**方式打开文件。文件的指针将会放在文件的开头，这是**默认模式**。如果文件不存在，抛出异常 |
| w        | 以**只写**方式打开文件。如果文件存在会被覆盖。如果文件不存在，创建新文件 |
| a        | 以**追加**方式打开文件。如果该文件已存在，文件指针将会放在文件的结尾。如果文件不存在，创建新文件进行写入 |
| r+       | 以**读写**方式打开文件。文件的指针将会放在文件的开头。如果文件不存在，抛出异常 |
| w+       | 以**读写**方式打开文件。如果文件存在会被覆盖。如果文件不存在，创建新文件 |
| a+       | 以**读写**方式打开文件。如果该文件已存在，文件指针将会放在文件的结尾。如果文件不存在，创建新文件进行写入 |

- 频繁的移动文件指针，**会影响文件的读写效率**，开发中更多的时候会以 **只读**、**只写** 的方式来操作文件

**写入文件示例**

```
# 打开文件
f = open("README", "w")

f.write("hello python！\n")
f.write("今天天气真好")

# 关闭文件
f.close()
```

#### readline 方法

- 可以一次读取一行内容
- 方法执行后，会把 **文件指针** 移动到下一行，准备再次读取

**读取大文件的正确姿势**

```
# 打开文件
file = open("README")

while True:
    # 读取一行内容
    text = file.readline()

    # 判断是否读到内容
    if not text:
        break

    # 每读取一行的末尾已经有了一个 `\n`
    print(text, end="")

# 关闭文件
file.close()
```

#### 小文件复制

- 打开一个已有文件，读取完整内容，并写入到另外一个文件

```
# 1. 打开文件
file_read = open("README")
file_write = open("README[复件]", "w")

# 2. 读取并写入文件
text = file_read.read()
file_write.write(text)

# 3. 关闭文件
file_read.close()
file_write.close()
```

#### 大文件复制

- 打开一个已有文件，逐行读取内容，并顺序写入到另外一个文件

```
# 1. 打开文件
file_read = open("README")
file_write = open("README[复件]", "w")

# 2. 读取并写入文件
while True:
    # 每次读取一行
    text = file_read.readline()

    # 判断是否读取到内容
    if not text:
        break

    file_write.write(text)

# 3. 关闭文件
file_read.close()
file_write.close()
```



#### 文件目录的常用管理操作（os 模块）

```python
import os

os.system("linux命令") # 相当于java的Process和Runtime
```

##### 文件操作

| 序号 | 方法名 | 说明       | 示例                              |
| ---- | ------ | ---------- | --------------------------------- |
| 01   | rename | 重命名文件 | `os.rename(源文件名, 目标文件名)` |
| 02   | remove | 删除文件   | `os.remove(文件名)`               |

##### 目录操作

| 序号 | 方法名     | 说明           | 示例                      |
| ---- | ---------- | -------------- | ------------------------- |
| 01   | listdir    | 目录列表       | `os.listdir(目录名)`      |
| 02   | mkdir      | 创建目录       | `os.mkdir(目录名)`        |
| 03   | rmdir      | 删除目录       | `os.rmdir(目录名)`        |
| 04   | getcwd     | 获取当前目录   | `os.getcwd()`             |
| 05   | chdir      | 修改工作目录   | `os.chdir(目标目录)`      |
| 06   | path.isdir | 判断是否是文件 | `os.path.isdir(文件路径)` |

> 提示：文件或者目录操作都支持 **相对路径** 和 **绝对路径**



##### 关于中文python2.x的使用ASCII 编码不支持的情况

```python
在 Python 2.x 文件的 第一行 增加以下代码，解释器会以 utf-8 编码来处理 python 文件

# *-* coding:utf8 *-*
这方式是官方推荐使用的！

也可以使用
# coding=utf8
```



### eval函数

> 可以将字符串中的语法，解析出来执行，和js一样 ，类似shell的expr `表达式`

```python
# 基本的数学计算
In [1]: eval("1 + 1")
Out[1]: 2

# 字符串重复
In [2]: eval("'*' * 10")
Out[2]: '**********'

# 将字符串转换成列表
In [3]: type(eval("[1, 2, 3, 4, 5]"))
Out[3]: list

# 将字符串转换成字典
In [4]: type(eval("{'name': 'xiaoming', 'age': 18}"))
Out[4]: dict
```





### GIL（全局解释器锁）

```python
python的多线程并不是真正意义上的多线程，它是单核cpu在不停的切换任务，当遇到io阻塞时也会阻塞，并不会真正用到多核cpu的并行能力（java也是单核cpu在多个任务上不停切换，但是如果os认为是计算密集型任务则会使用多核并行，这点python不会）


因为GIL是 cpython 解释器的历史遗留问题（其它Jpython 解释器不会），所以如果想真正使用多核性能，则可以替换其它解释器，或者使用 多进程方式

tip： 如果是IO密集型，则使用多线程或多协程；如果是计算密集型，可以使用多进程方式提高并行度
```



### 深拷贝与浅拷贝

```python
浅拷贝： 拷贝的是第一层的数据，内部的属性如果是引用类型则不会进行拷贝
深拷贝： 拷贝的是内容值

# 这点和java一样


所有的赋值语句(如：a=b)，都是指向的引用
```

#### copy 模块

```python
import copy
copy.copy()  # 拷贝一个变量，返回一个新的变量

## 该方法对与不可变类型，仅仅是新变量指向引用。对于可变类型，只是做了浅拷贝



copy.deepcopy()  

## 该方法是用于深拷贝的，但是如果对象的内部属性是一个不可变类型（如元组），那么它和.copy一样也只是引用；如果是可变类型则是数值拷贝
```





### 私有属性/方法

> python 不像java一样通过关键字来标识一个属性/方法是否私有，它是通过_下划线表示

```python
xx: 公有变量  （类比java public）
_x: 单前置下划线,私有化属性或方法，from somemodule import *禁止导入,类对象和子类可以访问 （类比java的protected ）
__xx：双前置下划线,避免与子类中的属性命名冲突，无法在外部直接访问(名字重整所以访问不到) （类比java的private）

# _x, 可以通过super(). 方式在字类中调用， __xx 只能在本类中使用

__xx__:双前后下划线,用户名字空间的魔法对象或属性。例如:__init__ , __ 不要自己发明这样的名字
        
xx_:单后置下划线,用于避免与Python关键词的冲突
```





### import 导入模块

```python
"""模块的导入分下列几种"""
import xx      # 定义了一个xx 变量指向xx 模块
import xx, xx   # 同理
import xx as 别名 # 同理
from xx import a # 定义了 a变量指向 xx 模块的 a 功能
from xx import a,b  # 同理


# tip： 因为本质都是通过变量来操作，所以如果对模块的某些属性处理或者调整了变量的引用，可能会断开与该模块的引用或者调整该模块的属性，如

a = 100 # 这么操作并不会影响xx 模块的a 这个值，因为引用已经指向100引用

xx.a = 100 # 如果是通过变量的引用去操作，则同java一样的，会修改模块的值


```

#### sys 模块

> 我们可以通过sys模块来判断导入的模块的搜索路径

> \__file\__也可以查看该导入的py模块到底是哪个py文件

```python
sys.path   # 列出当前模块所有import 的搜索路径，返回的是一个列表

sys.path.append('/home/itcast/xxx')   # 用于手动插入搜索的路径
sys.path.insert(0, '/home/itcast/xxx')  # 可以确保先搜索这个路径
```

#### reload功能

> 用于动态的修改导入模块，例如一个模块如果已经导入再另一个模块，会生成.cache 文件，如果此时修改了导入的模块，并不会改变其它模块已经导入的数据，如果需要修改，则需要通过reload重新加载导入的模块

```python
from imp import reload

reload(模块名)  # 重新装载模块名
```



### 魔法属性

无论人或事物往往都有不按套路出牌的情况，Python的类属性也是如此，存在着一些具有特殊含义的属性，详情如下：

#### 1. __doc__

- 表示类的描述信息

```
class Foo:
    """ 描述类信息，这是用于看片的神奇 """
    def func(self):
        pass

print(Foo.__doc__)
#输出：类的描述信息
```

#### 2. __module__ 和 __class__

- __module__ 表示当前操作的对象在那个模块
- __class__ 表示当前操作的对象的类是什么

`test.py`

```
# -*- coding:utf-8 -*-

class Person(object):
    def __init__(self):
        self.name = 'laowang'
```

`main.py`

```
from test import Person

obj = Person()
print(obj.__module__)  # 输出 test 即：输出模块
print(obj.__class__)  # 输出 test.Person 即：输出类
```

#### 3. __init__

- 初始化方法，通过类创建对象时，自动触发执行

```
class Person:
    def __init__(self, name):
        self.name = name
        self.age = 18


obj = Person('laowang')  # 自动执行类中的 __init__ 方法
```

#### 4. __del__

- 当对象在内存中被释放时，自动触发执行。

注：此方法一般无须定义，因为Python是一门高级语言，程序员在使用时无需关心内存的分配和释放，因为此工作都是交给Python解释器来执行，所以，__del__的调用是由解释器在进行垃圾回收时自动触发执行的。

```
class Foo:
    def __del__(self):
        pass
```

#### 5. __call__

- 对象后面加括号，触发执行。

注：__init__方法的执行是由创建对象触发的，即：`对象 = 类名()` ；而对于 __call__ 方法的执行是由对象后加括号触发的，即：`对象()` 或者 `类()()`

```
class Foo:
    def __init__(self):
        pass

    def __call__(self, *args, **kwargs):
        print('__call__')


obj = Foo()  # 执行 __init__
obj()  # 执行 __call__
```

#### 6. __dict__

- 类或对象中的所有属性

类的实例属性属于对象；类中的类属性和方法等属于类，即：

```
class Province(object):
    country = 'China'

    def __init__(self, name, count):
        self.name = name
        self.count = count

    def func(self, *args, **kwargs):
        print('func')

# 获取类的属性，即：类属性、方法、
print(Province.__dict__)
# 输出：{'__dict__': <attribute '__dict__' of 'Province' objects>, '__module__': '__main__', 'country': 'China', '__doc__': None, '__weakref__': <attribute '__weakref__' of 'Province' objects>, 'func': <function Province.func at 0x101897950>, '__init__': <function Province.__init__ at 0x1018978c8>}

obj1 = Province('山东', 10000)
print(obj1.__dict__)
# 获取 对象obj1 的属性
# 输出：{'count': 10000, 'name': '山东'}

obj2 = Province('山西', 20000)
print(obj2.__dict__)
# 获取 对象obj1 的属性
# 输出：{'count': 20000, 'name': '山西'}
```

#### 7. __str__

- 如果一个类中定义了__str__方法，那么在打印 对象 时，默认输出该方法的返回值。

```
class Foo:
    def __str__(self):
        return 'laowang'


obj = Foo()
print(obj)
# 输出：laowang
```

#### 8、__getitem__、__setitem__、__delitem__

- 用于索引操作，如字典。以上分别表示获取、设置、删除数据

```
# -*- coding:utf-8 -*-

class Foo(object):

    def __getitem__(self, key):
        print('__getitem__', key)

    def __setitem__(self, key, value):
        print('__setitem__', key, value)

    def __delitem__(self, key):
        print('__delitem__', key)


obj = Foo()

result = obj['k1']      # 自动触发执行 __getitem__
obj['k2'] = 'laowang'   # 自动触发执行 __setitem__
del obj['k1']           # 自动触发执行 __delitem__
```

#### 9、__getslice__、__setslice__、__delslice__

- 该三个方法用于分片操作，如：列表

```
# -*- coding:utf-8 -*-

class Foo(object):

    def __getslice__(self, i, j):
        print('__getslice__', i, j)

    def __setslice__(self, i, j, sequence):
        print('__setslice__', i, j)

    def __delslice__(self, i, j):
        print('__delslice__', i, j)

obj = Foo()

obj[-1:1]                   # 自动触发执行 __getslice__
obj[0:1] = [11,22,33,44]    # 自动触发执行 __setslice__
del obj[0:2]                # 自动触发执行 __delslice__
```





### with与上下文管理器

```python
"""
with 关键字 与 java1.8的 try() 有相似之处，都可以用于自动释放资源
"""

def m3():
    with open("output.txt", "r") as f: # 当打开文件发生异常会自动释放资源，但是下面的write并不会自动										处理异常（这点和java不一样）
        f.write("Python之禅")
        
```

#### with实现原理（上下文管理器概念）

```python
"""
python 定义一个对象做为上下文管理器 是通过实现__enter__() 和 __exit__() 方法，有这两个方法就可以做为上下文管理器
"""
class File():

    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode

    def __enter__(self):
        print("entering")
        self.f = open(self.filename, self.mode)
        return self.f

    def __exit__(self, *args):
        print("will exit")
        self.f.close()
        
"""
当 with 关键字修饰该对象的时候，会调用__enter__() 方法，它本质就是通过装饰模式包装了open()函数，真正的在__enter__()里执行，然后返回一个流。 外部通过 with File() as f 来接收(f就是接收返回的变量)，如果当该函数在构建流的过程中出现异常，则会调用__exit__() 方法，通常在该方法内做资源的释放（with 应该是对该方法在解释的时候对这些方法进行try了，个人理解）
"""
```



#### contextlib 模块的 contextmanager

```python
"""
放方式简化了上面的上下文的构建，通过@contextmanager 与 yield 关键字来实现
"""

from contextlib import contextmanager
@contextmanager   ## 简化了上面通过__enter__、__exit__方法（本质个人理解还是一样，都是在解释器解释的					时候对该代码try了，然后通过yield 关键字，在发生异常或结束的时候finally调用next()					  触发资源释放）
def my_open(path, mode):
    f = open(path, mode)
    yield f     ## 最终结束或异常时候会触发next() 方法从而释放资源
    f.close()
    
## 调用 
with my_open('out.txt', 'w') as f:
    f.write("hello , the simplest context manager")
```



### 闭包

> 闭包其实也是函数，只不过是函数中嵌套了函数，嵌套的函数使用到了外部函数的值。这样的好处跟封装一样，如果一个函数只是用到函数内部的值，就没必要使用全局变量

```python
def fun(x,y):
    def fun2(z):
        print(x + y +z)
    return fun2    # 返回闭包的引用

# 调用
f1 = fun(1,2)
f2(3)
```



#### 闭包修改外部函数的值

> 使用 nonlocal关键字

```python
x = 300
def fun():
    x = 200
    def fun2():  
        nonlocal x  # 变量的寻找会就近原则，如果函数内部定义了该变量就不会找外面一层的了(如果先使用后定						义也是一样，解释器发现内部有变量但是没法使用，就会报未定义，可以通过nonlocal 关					键字说明使用上一层的变量)   
        print(x)
        x = 100
    return fun2    
```

> nonlocal 只在python3中有

> 个人理解其实闭包就是指函数内部的函数，它和java的匿名内部类做为参数传递是差不多的
>
> 



### 装饰器

> 装饰器，其实就是指装饰设计模式，python是通过闭包的方式来实现的

##### 通过闭包实现

```python
"""通过闭包的方式实现

def a(fun):
	def b(num):
		... 此处可做功能增强
		fun()   # 这里就像java的lambda方式，在方法内部调用传入的函数，达到封装的作用  
	return b

def test():
	print("要加强的方法")
	
	
# 调用	
test = a(test())   # 此处传递了函数，返回内部的函数
test(20)           # 调用内部的函数

"""
```

##### 通过装饰器实现

```python
def a(fun):
	def b(num):
		... 此处可做功能增强
		fun()   # 这里就像java的lambda方式，在方法内部调用传入的函数，达到封装的作用  
	return b

@a     # 这就是python提供的装饰器用法，解释器执行时会解释成上面闭包的方式。此处的test变量指向的方法已经			是a的内部函数了
def test():
	print("要加强的方法")
    

# 调用
test(20)   # 此时调用的方法实际是内部函数
```

```python
"""多个装饰器对一个函数（同上面一样）"""
def a(fun):
	def b(num):
		... 此处可做功能增强
		fun()   # 这里就像java的lambda方式，在方法内部调用传入的函数，达到封装的作用  
	return b

def a2(fun):
	def b2(num):
		... 此处可做功能增强
		fun()    
	return b2

@a    
@a2
def test():
	print("要加强的方法")
    
## 解释器在解释的时候会先包装a2，将a2返回的函数再给到a函数，a处理完之后再将内部函数引用指向test变量

# 此时就相当于
a(a2(test()))
```

```python
"""参数和返回值情况（其实和方法传递一样）"""

def a(fun):
	def b(num, *args, **kargs):
		... 此处可做功能增强
		return fun(num, *args, **kargs)   # 这里就像java的lambda方式，在方法内部调用传入的函数，达到封装的作用  
	return b

@a
def test(num, *args, **kargs):
	return 10

# 调用 
test(10，23，3)  # 这里其实调用的是b函数，真正的test()函数已经在解释的时候包装到b()函数里了
```

###### 通过类的方式实现装饰器

> 类是通过\__call\__()魔法函数来实现的，该函数可以直接 对象() 调用

```python
class A(object):
    def __init__(self, fun): 
        self.fun = fun()
    
    def __call__(self):
        # 功能加强...
        self.fun() 
    
@A
def test():
    print("要包装的方法")
# 调用
test()


# 相当于 a = A(test())， 调用的时候是 a() 调用__call__


"""可以通过类名调用静态方法实现装饰器（道理都是一样的，本质就是闭包）"""

class A(object):
    def __init__(self, fun): 
        self.fun = fun()
    
    def __call__(self):
        # 功能加强...
        self.fun()
        
    @classmethod
    def f(cls, fun):
        def f2():
            fun()
        return fun2
        
@A.fun
def test():
    print("要包装的方法")

## 可以通过这些思想自行拓展
```



### 元类

### globals() 函数 及 \__builtins\__属性

```python
globals() -> dict   # 获取所有加载的对象（类、变量等python中所有东西都是变量）
# 当我们执行 A.fun()  的时候，其实就是取globals()字典表里找对应的函数key，从而取得这个引用（python中所有的对象都存放在这，所以我们可以这么取值 globals().A.fun , 它们是等价的）

# 但是会发现有一部分的属性是不再globals() 字典中的， print() 函数就不在。它们存放在 __builtins__属性中，python解释器，首先执行一个对象(包含所有)，首先是取globals()字典中查询，没有就会取__builtins__属性中搜寻，如果还是没有就会报 未定义异常
```



> 这些就是 type 创建元类的基础，所有对象都是存放在字典的，用key和value做映射

#### 动态创建类  type()

```python
# type() 除了前面的获取对象的类型以为，还能创建类对象，因为类对象(python叫元类)，是根据Type 元类构建的（跟java类型，类也是一个对象，都是class 的类对象）

type("创建的类名", ("继承的父类名", ), {"属性": 值})    # 属性，给类赋值属性、方法等，就是从上面的 													 # globals() 字典里取值
# tip: 参数没有可以用空值


""" 动态创建类用法 """


class Foo(object):
    pass

@staticmethod
def sf():
    pass

@classmethod
def cf(cls):
    pass

def f(self):
    pass

name = "123"

# 动态创建子类
sub_Foo = type(sub_Foo, (Foo, ), {"sf": sf, "cf": cf, "f": f, "name": name})
```

#### help(对象) 查看对象的结构属性

```python
# 查看上面构造的对象属性
help(sub_Foo)

""" 可以看到大概如下数据
class sub_Foo(Foo):

	name: "123"
	def f(self):
		pass
	
	...
"""
```

 

#### 元类

##### \__metaclass\__属性

> 所有元类都是根据 type构造出来的，python解释器做了这件事。python解释器在创建元类的时候首先会找这个类的 \__metaclass\__ 属性，如果定义了则通过调用这个属性构造元类，如果没定义会找父类的定义，如果都没找到，python解释器会自己根据 type 动态的创建元类，因为是解释器动态的创建的，所以我们定义的属性名称是什么则是什么。
>
> 但是我们本着想定义的时候是这个名字，但是运行的时候为了兼容某种框架需要更新掉属性（如将小写的属性名改为大写的属性名），这种在运行的时候对类进行处理就需要用到 这个 \__metaclass\__ 属性(有点像java的反射的思想，动态去获取属性的内容，也有点像字节码技术)
>



##### 自定义元类

> 基于方法的用法

```python
#-*- coding:utf-8 -*-
def upper_attr(class_name, class_parents, class_attr):

    #遍历属性字典，把不是__开头的属性名字变为大写
    new_attr = {}
    for name,value in class_attr.items():
        if not name.startswith("__"):
            new_attr[name.upper()] = value

    #调用type来创建一个类
    return type(class_name, class_parents, new_attr)


# 此处在定义类的时候会调用upper_attr构造元类，我们用的时候属性是bar，真正的属性时候就是BAR了
class Foo(object, metaclass=upper_attr):   
    bar = 'bip'



f = Foo()
print(f.BAR)
```



> 基于类的用法

```python
#coding=utf-8

class UpperAttrMetaClass(type):
    # __new__ 是在__init__之前被调用的特殊方法
    # __new__是用来创建对象并返回之的方法
    # 而__init__只是用来将传入的参数初始化给对象
    # 你很少用到__new__，除非你希望能够控制对象的创建
    # 这里，创建的对象是类，我们希望能够自定义它，所以我们这里改写__new__
    # 如果你希望的话，你也可以在__init__中做些事情
    # 还有一些高级的用法会涉及到改写__call__特殊方法，但是我们这里不用
    def __new__(cls, class_name, class_parents, class_attr):
        # 遍历属性字典，把不是__开头的属性名字变为大写
        new_attr = {}
        for name, value in class_attr.items():
            if not name.startswith("__"):
                new_attr[name.upper()] = value

        # 方法1：通过'type'来做类对象的创建
        return type(class_name, class_parents, new_attr)

        # 方法2：复用type.__new__方法
        # 这就是基本的OOP编程，没什么魔法
        # return type.__new__(cls, class_name, class_parents, new_attr)

# python3的用法
class Foo(object, metaclass=UpperAttrMetaClass):
    bar = 'bip'

# python2的用法
# class Foo(object):
#     __metaclass__ = UpperAttrMetaClass
#     bar = 'bip'


print(hasattr(Foo, 'bar'))
# 输出: False
print(hasattr(Foo, 'BAR'))
# 输出:True

f = Foo()
print(f.BAR)
# 输出:'bip'
```

