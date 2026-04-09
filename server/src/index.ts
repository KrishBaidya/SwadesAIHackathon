import { Hono } from 'hono'
import chatRoutes from './routes/chat.routes'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/chat', chatRoutes)

export default app
