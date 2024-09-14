// import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import AuthService from '#services/auth_service'
import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

@inject()
export default class AuthController {
  private _authService: AuthService

  constructor(authService: AuthService) {
    this._authService = authService
  }

  /**
   * @auth
   * @requestBody {"email": "example@email.com", "password": "123#abc"}
   */
  public async auth({ request }: HttpContext) {
    const body = request.body()
    const user = await this._authService.auth(body.email, body.password)

    const token = await User.accessTokens.create(user)

    return {
      type: 'bearer',
      value: token.value!.release(),
    }
  }
}
