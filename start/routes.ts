import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'

router.get('/:url', '#controllers/urls_controller.redirectToOriginalUrl')

router.post('url', '#controllers/urls_controller.shortenUrl')
router.get('url', '#controllers/urls_controller.get').use([middleware.auth()])
router.put('url/:id', '#controllers/urls_controller.update').use([middleware.auth()])
router.delete('url/:id', '#controllers/urls_controller.delete').use([middleware.auth()])

router.post('user', '#controllers/users_controller.post')

router.post('auth', '#controllers/auth_controller.auth')

// Renders Swagger-UI and passes YAML-output of /swagger
router.get('/docs/routes', async () => {
  return AutoSwagger.default.ui('/docs/swagger', swagger)
})

router.get('/docs/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})