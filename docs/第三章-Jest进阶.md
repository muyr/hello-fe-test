# Jest 进阶

## snapshot

用来测试配置文件。目的只是为了提醒你，配置文件真的是要改，还是手滑了。



相关命令行操作模式

- `i` 下一个需要更新的 snapshot

- `u` 更新 snapshot


相关 `matcher`

-  `toMathSnapshot` 生成 `__snapshot__` 文件，保存返回值

- `toMathInlineSnapshot`，直接在测试代码里面插入返回值

## mock

参考

*  <https://jestjs.io/docs/en/mock-function-api>

* <https://jestjs.io/docs/en/jest-object>

\__mocks__  文件夹



#### 整体都 mock

`jest.config.js` 文件中

```js
automock: true
```

#### 个别文件 mock

```js
jest.mock('./demo.js')
```

#### 混合mock

```js
jest.mock('./demo')
import {fetchData} from './demo'
const {getNumber} = jest.requireActual('./demo')
```



## mock timers

使用 `jest.useFakeTimers()` 将要测试的代码中，所有`setTimeout`

并且在合适的位置

* `jest.runAllTimers()`让所有定时器立即到期。

* `jest.runOnlyPendingTimers()`只让当然的定时器到期。



`jest.advanceTimersByTime(ms)` 快进时间。

比如 `jest.advanceTimersByTime(3000)` 快进3秒

快进可能会影响其他测试，可以结合钩子函数，在开始测试用例之前，使用`jest.useFakeTimers()`清除影响



## 测试 class





## 测试 DOM

因为 `jest` 运行的环境是 `node`，` node` 不具备 `dom`，`jest`在 `node` 环境下自己模拟了一套 `dom` 的 `api`，` jsDom`