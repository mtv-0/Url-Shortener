// import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import AuthService from '#services/auth_service'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthController {
  private _authService: AuthService

  constructor(authService: AuthService) {
    this._authService = authService
  }

  public async auth({ request }: HttpContext) {
    const body = request.body()
    const token = await this._authService.auth(body.email, body.password)

    return token
  }
}
