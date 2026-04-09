import { Context } from 'hono'
import { routerAgent } from '../../agents/router.agent'
import { supportAgent, orderAgent, billingAgent, Message } from '../../agents/sub-agents'

const conversations = [
  { id: '1', title: 'Researching AI Agents', createdAt: new Date() },
  { id: '2', title: 'Refactoring Chat Logic', createdAt: new Date() }
]

export const getConversations = (c: Context) => {
  return c.json({
    success: true,
    data: conversations
  })
}

export const getConversation = (c: Context) => {
  const id = c.req.param('id')
  const conversation = conversations.find(conv => conv.id === id)

  if (!conversation) {
    return c.json({
      success: false,
      message: 'Conversation not found.'
    }, 404)
  }

  return c.json({
    success: true,
    data: {
      ...conversation,
      messages: [
        { role: 'user', content: 'What are AI Agents?' },
        { role: 'assistant', content: 'AI Agents are autonomous entities...' }
      ]
    }
  })
  const id = c.req.param('id')
  const conversation = conversations.find(conv => conv.id === id)

  if (!conversation) {
    return c.json({
      success: false,
      message: 'Conversation not found.'
    }, 404)
  }

  return c.json({
    success: true,
    data: {
      ...conversation,
      messages: [
        { role: 'user', content: 'What are AI Agents?' },
        { role: 'assistant', content: 'AI Agents are autonomous entities...' }
      ]
    }
  })
}

export const deleteConversation = (c: Context) => {
  const id = c.req.param('id')
  const index = conversations.findIndex(conv => conv.id === id)

  if (index === -1) {
    return c.json({
      success: false,
      message: 'Conversation not found.'
    }, 404)
  }

  return c.json({
    success: true,
    message: `Conversation ${id} deleted.`
  })
}

export const postChat = async (c: Context) => {
  const body = await c.req.json()
  const { message, previousMessages = [] } = body

  if (!message) {
    return c.json({
      success: false,
      message: 'Message is required.'
    }, 400)
  }

  const decision = await routerAgent(message)

  const conversationMessages: Message[] = [
    ...previousMessages,
    { role: 'user', content: message }
  ]

  let agentResponse;
  
  switch (decision.intent) {
    case 'support':
      agentResponse = await supportAgent(conversationMessages)
      break
    case 'order':
      agentResponse = await orderAgent(conversationMessages)
      break
    case 'billing':
      agentResponse = await billingAgent(conversationMessages)
      break
    default:
      return c.json({
        success: true,
        message: 'Request is ambiguous. Can you clarify your request?',
        decision
      })
  }

  return c.json({
    success: true,
    message: agentResponse.text,
    decision,
    history: agentResponse.steps
  })
}
