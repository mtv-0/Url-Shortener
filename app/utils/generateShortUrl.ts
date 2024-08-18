import Url from '#models/url'

export const generateShortUrl = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let key = ''
  for (let i = 0; i < 6; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return key
}

export const uniqueShortUrl = async (): Promise<string> => {
  let code: string

  do {
    code = generateShortUrl()
  } while (await Url.findBy('shortned_url_code', code))

  return code
}
