// import type { HttpContext } from '@adonisjs/core/http'

import UserService from '#services/user_service'
import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { createUserValidator } from '#validators/user'

@inject()
export default class UsersController {
  private __userService: UserService
  constructor(userService: UserService) {
    this.__userService = userService
  }

  /**
   * @post
   * @requestBody <createUserValidator>
   */
  public async post(ctx: HttpContext) {
    await ctx.request.validateUsing(createUserValidator)
    const body = ctx.request.body()
    return await this.__userService.saveUser({
      email: body.email,
      name: body.name,
      password: body.password,
    })
  }
}
