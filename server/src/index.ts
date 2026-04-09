import { Hono } from 'hono'
import chatRoutes from './routes/chat.routes'
import agentRoutes from './routes/agent.routes'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/chat', chatRoutes)
app.route('/agents', agentRoutes)

export default { 
  port: 8080, 
  fetch: app.fetch, 
} 
