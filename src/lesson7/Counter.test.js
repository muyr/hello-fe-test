import Counter from './Counter'


describe('测试Counter 类', () => {
  let counter = null

  beforeAll(() => {
    console.log('before all')
  })

  beforeEach(() => {
    console.log('before each')
    counter = new Counter()
  })
  afterEach(() => {
    console.log('after each')
  })
  afterAll(() => {
    console.log('after all')
  })

  describe('测试加法相关函数', () => {
    beforeAll(() => {
      console.log('describe about add: before all')
    })
    beforeEach(() => {
      console.log('describe about add: before each')
    })

    afterEach(() => {
      console.log('describe about add: after each')
    })

    afterAll(() => {
      console.log('describe about add: after all')
    })
    test('测试 addOne 方法', () => {
      counter.addOne()
      expect(counter.number).toBe(1)

    })
    test('测试 addTwo 方法', () => {
      counter.addTwo()
      expect(counter.number).toBe(2)

    })
  })

  describe('测试减法相关函数', () => {
    beforeAll(() => {
      console.log('describe about minus: before all')
    })
    beforeEach(() => {
      console.log('describe about minus: before each')
    })

    afterEach(() => {
      console.log('describe about minus: after each')
    })

    afterAll(() => {
      console.log('describe about minus: after all')
    })
    test('测试 minusOne 方法', () => {
      counter.minusOne()
      expect(counter.number).toBe(-1)

    })
    test('测试 minusTwo 方法', () => {
      counter.minusTwo()
      expect(counter.number).toBe(-2)

    })
  })

})
