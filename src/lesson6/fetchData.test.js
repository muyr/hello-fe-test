import {fetchData, fetchDataPromise} from './fetchData'

test('fetchData 返回结果为 {success: true}', (done) => {
  fetchData((data) => {
    expect(data).toEqual({
      success: true
    })
    done()
  })
})


// promise 型

// 方法一
test('fetchDataPromise 返回结果为 {success: true}', () => {
  return fetchDataPromise('http://www.dell-lee.com/react/api/demo.json').then(res => {
    expect(res.data).toEqual({success: true})
  })
})

test('fetchDataPromise 返回结果为 404', () => {
  expect.assertions(1)
  return fetchDataPromise('http://www.dell-lee.com/react/api/demo1.json').catch(e => {
    expect(e.toString().indexOf('404') > -1).toBe(true)
  })
})

// 方法二
test('fetchDataPromise 返回结果为 {success: true}', () => {
  return expect(fetchDataPromise('http://www.dell-lee.com/react/api/demo.json')).resolves.toMatchObject({
    data:
      {success: true}
  })
})

test('fetchDataPromise 返回结果为 404', () => {
  return expect(fetchDataPromise('http://www.dell-lee.com/react/api/demo1.json')).rejects.toThrow()
})

// 方法三
test('fetchDataPromise 返回结果为 {success: true}', async () => {
  await expect(fetchDataPromise('http://www.dell-lee.com/react/api/demo.json')).resolves.toMatchObject({
    data:
      {success: true}
  })
})

test('fetchDataPromise 返回结果为 404', async () => {
  await expect(fetchDataPromise('http://www.dell-lee.com/react/api/demo1.json')).rejects.toThrow()
})

// 方法四
test('fetchDataPromise 返回结果为 {success: true}', async () => {
  const res = await fetchDataPromise('http://www.dell-lee.com/react/api/demo.json')
  expect(res.data).toEqual({success: true})
})

test('fetchDataPromise 返回结果为 404', async () => {
  try {
    await fetchDataPromise('http://www.dell-lee.com/react/api/demo1.json')
  } catch (e) {
    console.log(e.toString())
    expect(e.toString()).toEqual('Error: Request failed with status code 404')
  }
})
