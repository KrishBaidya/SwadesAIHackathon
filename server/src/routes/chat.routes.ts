import { Hono } from 'hono'
import { 
  deleteConversation, 
  getConversation, 
  getConversations, 
  postChat 
} from '../controllers/chat/chat.controller'

const chat = new Hono()

chat.get('/conversations/:id', getConversation)
chat.delete('/conversations/:id', deleteConversation)
chat.post('/messages', postChat)
chat.get('/conversations', getConversations)

export default chat