// import type { HttpContext } from '@adonisjs/core/http'

import UserService from '#services/user_service'
import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

@inject()
export default class UsersController {
  private __userService: UserService
  constructor(userService: UserService) {
    this.__userService = userService
  }
  public async post(ctx: HttpContext) {
    const body = ctx.request.body()
    return await this.__userService.saveUser({
      email: body.email,
      name: body.name,
      password: body.password,
    })
  }
}
