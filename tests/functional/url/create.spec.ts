import { test } from '@japa/runner'
import { generateShortUrl } from '../../../app/utils/generateShortUrl.js'
import User from '../../../app/models/user.js'
import db from '@adonisjs/lucid/services/db'
import Url from '#models/url'
import UrlService from '#services/url_service'

test.group('UrlService', (group) => {
  let user: User
  let userEmail = 'teste5@gmail.com'
  let urlService: UrlService

  group.setup(async () => {
    user = await User.create({ email: userEmail, password: '123' })
    urlService = new UrlService()
  })

  group.teardown(async () => {
    await db.from('users').where('email', userEmail).delete()
  })

  test('should create a new URL code', ({ assert }) => {
    assert.typeOf(generateShortUrl(), 'string')
  })

  test('verify ownership of URL - user owns URL', async ({ assert }) => {
    const url = await Url.create({
      original_url: 'https://google.com',
      user_id: user.id,
      shortned_url_code: generateShortUrl(),
    })

    const result = await urlService.verifyOwnership(url.id, user.id)
    assert.isTrue(result, 'O usuário deve ser o dono da URL')
  })

  test('verify ownership of URL - user does not own URL', async ({ assert }) => {
    const anotherUser = await User.create({ email: 'owner2@gmail.com', password: '123' })
    const url = await Url.create({
      original_url: 'https://google.com',
      user_id: anotherUser.id,
      shortned_url_code: generateShortUrl(),
    })

    try {
      await urlService.verifyOwnership(url.id, user.id)
      assert.fail('A verificação de propriedade deveria falhar quando o usuário não possui a URL')
    } catch (error) {
      assert.equal(
        error.message,
        'Você não tem permissão para esta ação. Esta URL não pertence à você!.'
      )
    }

    await anotherUser.delete()
  })
})

test.group('HTTP Testes', (group) => {
  let user: User
  let userEmail = 'teste5@gmail.com'

  group.setup(async () => {
    user = await User.create({ email: userEmail, password: '123' })
  })

  group.teardown(async () => {
    await db.from('users').where('email', userEmail).delete()
  })

  test('get a list of users without login', async ({ client }) => {
    const response = await client.get('api/url')
    response.assertStatus(401)
  })

  test('get a list of users with login', async ({ client }) => {
    const response = await client.get('api/url').withGuard('api').loginAs(user)
    response.assertStatus(200)
  })

  test('Generate short Url without auth', async ({ client, assert }) => {
    const response = await client.post('api/url').form({
      url: 'http://youtube.com.br/',
    })

    response.assertStatus(200)
    assert.equal(typeof response.body().shortnedUrl, 'string')
  })

  test('Generate short Url with auth', async ({ client, assert }) => {
    const response = await client
      .post('api/url')
      .form({
        url: 'http://youtube.com.br/',
      })
      .withGuard('api')
      .loginAs(user)

    response.assertStatus(200)
    assert.equal(typeof response.body().shortnedUrl, 'string')
  })

  test('Edit a URL with auth', async ({ client }) => {
    const arrayUrl = await client.get('api/url').withGuard('api').loginAs(user)
    const response = await client
      .put(`api/url/${arrayUrl.body()[0].id}`)
      .form({ targetUrl: 'https://google.com' })
      .withGuard('api')
      .loginAs(user)

    response.assertStatus(200)
  })

  test('Edit a URL without auth', async ({ client }) => {
    const response = await client.put('api/url/2')
    response.assertStatus(401)
  })

  test('Delete a URL with auth', async ({ client }) => {
    const arrayUrl = await client.get('api/url').withGuard('api').loginAs(user)
    const response = await client
      .delete(`api/url/${arrayUrl.body()[0].id}`)
      .withGuard('api')
      .loginAs(user)

    response.assertStatus(200)
  })

  test('Delete a URL without auth', async ({ client }) => {
    const response = await client.delete('api/url/2')
    response.assertStatus(401)
  })

  test('Authenticate a user', async ({ client, assert }) => {
    const response = await client.post('api/auth').form({ email: userEmail, password: '123' })
    response.assertStatus(200)
    response.assertBodyContains({ type: 'bearer' })
    assert.equal(typeof response.body().value, 'string')
  })
})
