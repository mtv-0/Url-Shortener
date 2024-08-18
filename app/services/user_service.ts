import User from '#models/user'

interface UserInterface {
  name: string
  email: string
  password: string
}

export default class UserService {
  async saveUser(data: UserInterface): Promise<User> {
    return await User.create({ email: data.email, fullName: data.name, password: data.password })
  }
}
