/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'

router.post('url', '#controllers/urls_controller.shortenUrl')
router.get('url', '#controllers/urls_controller.get').use([middleware.auth()])
router.put('url/:id', '#controllers/urls_controller.update').use([middleware.auth()])
router.delete('url/:id', '#controllers/urls_controller.delete').use([middleware.auth()])

router.get('/:url', '#controllers/urls_controller.redirectToOriginalUrl')

/**
 * @requestBody {"code": "xxxxxx"}
 */
router.post('user', '#controllers/users_controller.post')

router.post('auth', '#controllers/auth_controller.auth')

router.get('/docs/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

// Renders Swagger-UI and passes YAML-output of /swagger
router.get('/docs/routes', async () => {
  return AutoSwagger.default.ui('/docs/swagger', swagger)
})
