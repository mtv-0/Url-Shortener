import vine from '@vinejs/vine'

export const createUrlValidator = vine.compile(
  vine.object({
    url: vine.string().trim(),
  })
)

export const updateUrlValidator = vine.compile(
  vine.object({
    targetUrl: vine.string().trim(),
    params: vine.object({
      id: vine.number(),
    }),
  })
)

export const deleteUrlValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number(),
    }),
  })
)
