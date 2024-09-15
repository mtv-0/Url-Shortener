import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'

// Prefixe as rotas de "url" com "/api/url" para evitar conflitos
router.post('api/url', '#controllers/urls_controller.shortenUrl')
router.get('api/url', '#controllers/urls_controller.get').use([middleware.auth()])
router.put('api/url/:id', '#controllers/urls_controller.update').use([middleware.auth()])
router.delete('api/url/:id', '#controllers/urls_controller.delete').use([middleware.auth()])

router.post('api/user', '#controllers/users_controller.post')
router.post('api/auth', '#controllers/auth_controller.auth')

// Rotas de documentação Swagger
router.get('/docs/routes', async () => {
  return AutoSwagger.default.ui('/docs/swagger', swagger)
})

router.get('/docs/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

// A rota dinâmica vem por último
router.get('/:url', '#controllers/urls_controller.redirectToOriginalUrl')
