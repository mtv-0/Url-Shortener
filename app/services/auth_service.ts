import User from '#models/user'

export default class AuthService {
  async auth(email: string, password: string): Promise<User> {
    return await User.verifyCredentials(email, password)
  }
}
