test('toEqual', () => {
  const a = {age: 18}
  expect(a).toEqual({age: 18})
})


test('toBeTruthy', () => {
  const a = null
  expect(a).not.toBeTruthy()
})

test('toBeNull', () => {
  const a = null
  expect(a).toBeNull()
})

test('toBeUndefined', () => {
  const a = undefined
  expect(a).toBeUndefined()
})


test('toBeDefined', () => {
  const a = null
  expect(a).toBeDefined()
})

test('toBeFalsy', () => {
  const a = null
  expect(a).toBeFalsy()
})


test('toContain', () => {
  const a = ['hello', 'world']
  expect(a).toContain('world')
})


test('toMatch', () => {
  expect('hello world').toMatch('hello')
})

const throwNewErrorFunc = () => {
  throw  new Error('this is a new error')
}

test('toThrow', () => {
  expect(throwNewErrorFunc).toThrow('this is a new error')
})
