import { test } from '@japa/runner'
import { generateShortUrl } from '../../../app/utils/generateShortUrl.js'
import User from '../../../app/models/user.js'

test.group('UrlService', () => {
  //  group.beforeEach(() => {
  // Configurações antes de cada teste, se necessário
  //})

  test('should create a new URL code', async ({ assert }) => {
    assert.typeOf(generateShortUrl(), 'string')
  })
})

test.group('HTTP Testes', () => {
  test('get a list of users without login', async ({ client }) => {
    const response = await client.get('/url')

    response.assertStatus(401)
  })

  test('get a list of users with Login', async ({ client }) => {
    const user = await User.create({email:"teste@gmail.com", password:123})

    const response = await client.get('/url').withGuard('api_tokens')
    .loginAs(user)

    response.assertStatus(200)
  })

  test('Generate short Url', async ({ client }) => {
    const response = await client.post('/url')

    response.assertStatus(200)
    response.assertBodyContains({
      url: "https://localhost:3000/9sad8a"
    })
  })

  test('Generate short Url', async ({ client }) => {
    const response = await client.post('/url')

    response.assertStatus(200)
    response.assertBodyContains({
      url: "https://localhost:3000/9sad8a"
    })
  })

  test('Edit a Url with auth', async ({ client }) => {
    const user = await User.create({email:"teste@gmail.com", password:123})

    const response = await client.put('/ur/2').withGuard('api_tokens')
    .loginAs(user)

    response.assertStatus(200)
    response.assertBodyContains({
      id:1,
      url: "https://localhost:3000/9sad8a"
    })
  })

  test('Edit a URL without auth', async ({ client }) => {
    const response = await client.put('/url/2')

    response.assertStatus(401)
  })

  test('Delete a Url with auth', async ({ client }) => {
    const user = await User.create({email:"teste@gmail.com", password:"123#abc"})

    const response = await client.delete('/ur/2').withGuard('api_tokens')
    .loginAs(user)

    response.assertStatus(200)
  })

  test('Delete a URL without auth', async ({ client }) => {
    const response = await client.delete('/url/2')

    response.assertStatus(401)
  })

  test('Authenticate a user', async ({ client }) => {
    const response = await client.post('/auth').form({email:"teste@gmail.com", password: "123#abc"})

    response.assertStatus(200)
    response.assertBodyContains({
      type:"Bearer",
      value:"safjfsafhsahfsakdaajfshfakjafsbfaskh"
    })
  })

})
