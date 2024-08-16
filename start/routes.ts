/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('shorten-url', '#controllers/urls_controller.shortenUrl')
router.get('url', '#controllers/urls_controller.get')
router.put('url', '#controllers/urls_controller.update')
router.delete('url', '#controllers/urls_controller.delete')

router.post('user', '#controllers/users_controller.post')

router.post('auth', '#controllers/auth_controller.auth')
