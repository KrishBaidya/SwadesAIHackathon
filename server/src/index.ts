import { Hono } from 'hono'
import { cors } from 'hono/cors'
import chatRoutes from './routes/chat.routes'
import agentRoutes from './routes/agent.routes'

const app = new Hono()

app.use('*', cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/chat', chatRoutes)
app.route('/agents', agentRoutes)

export default { 
  port: 8080, 
  fetch: app.fetch, 
} 
