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

router.post('url', '#controllers/urls_controller.shortenUrl')
router.get('url', '#controllers/urls_controller.get').use([middleware.auth()])
router.put('url/:id', '#controllers/urls_controller.update').use([middleware.auth()])
router.delete('url/:id', '#controllers/urls_controller.delete').use([middleware.auth()])

router.get('/:url', '#controllers/urls_controller.redirectToOriginalUrl')

router.post('user', '#controllers/users_controller.post')

router.post('auth', '#controllers/auth_controller.auth')
