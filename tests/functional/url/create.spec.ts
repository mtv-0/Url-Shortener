import { test } from '@japa/runner'
import { generateShortUrl } from '../../../app/utils/generateShortUrl.js'

test.group('UrlService', () => {
  //  group.beforeEach(() => {
  // Configurações antes de cada teste, se necessário
  //})

  test('should create a new URL code', async ({ assert }) => {
    assert.typeOf(generateShortUrl(), 'string')
  })
})
