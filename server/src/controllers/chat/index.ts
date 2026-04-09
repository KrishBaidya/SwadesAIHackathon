import { Hono } from 'hono'
import { deleteConversation, getConversation, getConversations, postChat } from './chat.controller'

const app = new Hono()

app.get('/conversations/:id', getConversation)
app.delete('/conversations/:id', deleteConversation)
app.post('/messages', postChat)
app.get('/conversations', getConversations)

export default app
