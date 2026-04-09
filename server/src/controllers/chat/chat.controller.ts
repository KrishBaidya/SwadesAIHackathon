import { Context } from 'hono'

export const getConversation = (c: Context) => {
  return c.text('Hello from Chat Controller!')
}

export const getConversations = (c: Context) => {
  return c.text('Hello from Chat Controller!')
}

export const deleteConversation = (c: Context) => {
  return c.text('Hello from Chat Controller!')
}

export const postChat = async (c: Context) => {
  const body = await c.req.json()
  return c.json({
    message: 'Message received',
    data: body
  })
}
