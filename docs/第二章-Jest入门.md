# Jest 入门

## 概述

### 前端比较流行的测试框架

* [Jasmine](https://jasmine.github.io/)
* [mocha](https://mochajs.org/) + [chai](https://www.chaijs.com/)
* [Jest](https://jestjs.io/)

### 衡量测试框架的指标

* 速度快
* API 简单
* 易配置
* 隔离性
* 监控模式
* IDE 整合
* Snapshot
* 多项目并行
* 覆盖率
* Mock 丰富

## 快速上手

### 安装 Jest

先把工程初始化一下吧

```shell
npm init
```

然后安装`jest`。

```shell
npm install jest -D
```

`-D`仅在开发时依赖使用

课程中使用的`jest`版本是`24.8.0`，为保证跟着课程练习不会有因版本更新造成的问题，我们也可以直接安装这个版本

```shell
npm install jest@24.8.0 -D
```

### 运行测试

在 `package.json` 中

```json
"scripts": {
    "test": "jest"
}
```

执行

`npm run test`

即可启动`jest`对项目中所有以`.test.js`结尾的文件进行测试。



注意：

要测试的`js`文件必须写成模块形式，比如

```js
// math.js
function add(a, b) {
    return a + b
}
module.exports = {
    add
}
```

然后在测试文件中导入进来

```js
// matcher.test.js
const {add} = require('./math.js')

test('测试加法', () => {
    expect(add(3, 7)).toBe(10)
})
```



但是呢，如果我们的`html`文件引入该`js`则会报错说`module`是个什么玩意，这么我们的暂时解决方案是`try`一下（实际上现在的项目很少直接自己在`html`里引用`js`，都前端工程化了）

```js
// math.js
try { 
    module.exports = {
    	add
	}
} catch (e) {}
```

## Jest 的简单配置

上面我们安装了就可以使用`jest`，会使用默认的配置，如果想自己搞点飞机，可以执行下面的命令，来初始化生成一个`jest.config.js`文件 

```shell
npx jest --init
```

过程中会有一些常用配置，可以交互中配置好，当然也可以之后在文件里自行修改。

举例我们可以配置代码覆盖率生成的文件的目录，有原来的

```json
// coverageDirectory: "coverage",
// 修改为
coverageDirectory: "hahaha",
```

这样我们在运行

```shell
npx jest --coverage
```

或者将`package.json` 里面增加

```json
"scripts": {
    "coverage": "jest --coverage"
}
```

这样就可以直接

```shell
npm run coverage
```

除了在终端显示代码覆盖率的结果，还会在 `hahaha/`目录生成便于浏览的网页结果。



我们前面使用了`commonJS`的语法来定义`module`，但实际项目中更多使用的是`ES`的语法来定义`module`，但是如果我们直接改成了`ES`语法，则运行`jest`就报错了。

`ES`的写法：

```js
// math.js
export function add(a, b) {
    return a + b
}

// math.test.js
import {add} from './math'
```

如何做兼容呢，我们可以使用`babel`。

### 安装 `babel`

```shell
npm install @babel/core@7.4.5 @babel/preset-env@7.4.5 -D
```

### 配置`babel`

在项目根目录新建`.babelrc`文件，并写入以下内容

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current"
        }
      }
    ]
  ]
}
```

配置完毕，再运行`jest`，没毛病，全过。

这个过程：

1. 在运行`npm run jest`之后
2. `jest`内部有一个`babel-jest`
3. 它会检测当前项目是否安装了`babel-core`
4. 如果安装了则会去读取`.babelrc`配置
5. 根据配置对代码进行转换
6. 最后，运行转化后的代码



## Jest 中的匹配器

### 自动监控测试文件

让`jest`自动监控测试文件，一有更新，就自动运行测试。在`package.json`中的`jest`那里加上`--watchAll`参数

```json
"script": {
    "test": "jest --watchAll"
}
```

### 啥叫匹配器

上面的测试中的`toBe`，就是一个基础的匹配器，它相当于`object.js` 或者是`===`，比较的是内存地址。

比如下面这个测试会是失败

```js
const a = {one: 1}
expect(a).toBe({one: 1})
```

#### toEqual 

上面那个例子如果想测试通过，可以使用`toEqual`匹配器

```
const a = {one: 1}
expect(a).toEqual({one: 1})
```

### true/false 相关的

#### toBeNull

```js
const a = null
expect(a).toBeNull() //测试通过
```

#### toBeUndefined

```js
const a = undefined
expect(a).toBeUndefined() //测试通过
```

#### toBeDefined

```js
const a = null
expect(a).toBeDefined() //测试通过
```

#### toBeTruthy

```js
const a = null
expect(a).toBeTruthy() //测试不通过
expect(1).toBeTruthy() //测试通过
```

#### toBeFalsy

```js
const a = 0
expect(a).toBeFalsy() //测试通过
expect(1).toBeFalsy() //测试不通过
```

#### not

```js
const a = 0
expect(a).not.toBeTruthy() //测试通过
```

### 数字相关的

* `toBeGreaterThan`
* `toBeLessThan`
* `toBeGreaterThanOrEqual`
* `toBeLessThanOrEqual`
* `toBeCloseTo` 特别用来处理浮点数

### 字符串相关的

#### toMatch

```js
const s = "hello world"
expect(s).toMatch('hello') //通过
expect(s).toMatch(/hello/) //也可以写正则，通过
```



### Array/Set 相关的

#### toContain

### 异常相关的

#### toThrow

```js
const throwNewErrorFunc = () => {
    throw new Error('this is a new error')
}
expect(throwNewErrorFunc).toThrow('this is a new error')
```



更多，更完整的匹配器请参考[官方文档](<https://jestjs.io/docs/en/expect>)

## Jest 的命令行参数

`--watchAll`，相当于`a`模式，当任何一个测试文件修改，则重新运行所有的测试

`--watch`，相当于`o`模式，当某个测试文件修改，则只重新运行修改的那个文件里的所有测试。需要配合使用`git`

`f`，只重新运行上次测试失败的测试用例。

`p`，只重新运行**测试文件名字**跟输入的匹配的测试文件。

`t`，只重新运行**测试用例名字**跟输入的匹配的测试用例。

但我们运行的`jest`命令行带了`--watchAll` 或`--watch`，执行命令后，终端中该命令并不会退出，而是在等待状态，这时候你可以输入上述中的各种模式的代号，进行重新运行测试



## 异步代码的测试

### 情景一：回调函数型型的异步函数

安装之前学的内容，我们上来就写如下测试代码

```js
test('异步函数', () => {
    fetchData((data)=> {
        expect(data).toEqual({success: true})
    })
})
```

运行，测试通过。

但是！但是！这是错误的写法，因为`test`刷就执行完了，`expect`压根就没运行，也就是说哪怕要测试的函数返回值并不是`{success: true}`，这里也会测试通过的，咋整？稍微修改一下

```js
test('异步函数', (done) => {
    fetchData((data)=> {
        expect(data).toEqual({success: true})
        done()
    })
})
```

给`test`的回调函数传个参数（函数） ，告诉他，这个传入的函数执行完了，你这个`test`才算执行完了。这样就可以等到`expect`执行之后，才算这个测试用例完事。

### 情景二：返回Promise 型的异步函数

#### 方法一：

如果测试正常情况，则

```js
test('promise', ()=> {
    return fetchDataPromise().then(res=> {
        expect(res.data).toEqual({success: true})
    })
})
```

如果要测试抛出异常的Promise的话，我们觉得应该这么写

```js
test('返回结果为 404', () =>{
    return fetchDataPromise().catch(e=>{
        expect(e.toString().indexOf('404')>-1).toBe(true)
    })
})
```

但是！但是！这是错误的，因为如果该函数正常返回了`{success: true}`，测试结果竟然还是通过！因为`catch`那里根本没有执行。

改进一下，也就是说，如果`expect`执行次数不够`1`，在这里也就是说`catch`那里没有被执行，就测试失败。

```js
test('返回结果为 404', () =>{
    expect.assetions(1) // 至少要执行一个 expect
    return fetchDataPromise().catch(e => {
        expect(e.toString().indexOf('404') > -1).toBe(true)
    })
})
```

#### 方法二：

```js
// 测试正常情况
test('promise', ()=> {
    return expect(fetchDataPromise()).resolves.toMathObject({
        data:{
        	success: true
        }
    })
})

// 测试异常情况
test('返回 404'，()=>{
    return expect(fetchDataPromise()).rejects.toThrow()
})
```



#### 方法三：

```js
// 测试正常情况
test('promise', async () => {
    await expect(fetchDataPromise()).resolves.toMatchObject({
        data: {
            success: true
        }
    })
})

// 测试异常情况
test('返回 404', async () => {
    await expect(fetchDataPromise()).rejects.toThrow()
})
```

#### 方法四：

```js
// 测试正常情况
test('promise', () => {
    const res = await fetchDataPromise()
    expect(res.data).toEqual({success: true})
})

// 测试异常情况
test('返回 404', () => {
    expect.assertions(1)
    try {
        await fetchDataPromise()
	} catch (e){
        expect(e.toString()).toEqual('Error: Request failed with status code 404')
	}
})
```

## Jest 的钩子函数

* `beforeAll`
* `afterAll`
* `beforeEach`
* `afterEach`

直接写在测试文件里，钩子函数接受一个函数

```js
beforeAll(() => {
    // 做一些初始化
	console.log('before all')
})
```



### 对测试进行分组

```js
describe('这里是描述：测试跟xxx相关', ()=> {
    describe('也可以嵌套', () => {
        test('测试xxx', () =>{
            
        })
    })
    describe('也可以并列', () => {
        test('测试yyy', () =>{
            
        })
    })
})
```



钩子函数是有**作用域**的，取决于钩子函数位于 `describe` 中的位置。

