import { Hono } from 'hono'
import chat from './controllers/chat'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/chat', chat)

export default app
