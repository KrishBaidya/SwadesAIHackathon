import { Context } from 'hono'

const agents = [
  {
    id: '1',
    name: 'Research Agent',
    capabilities: ['web-search', 'data-extraction', 'summarization']
  },
  {
    id: '2',
    name: 'Support Agent',
    capabilities: ['troubleshooting', 'faq-handling', 'ticket-creation', 'queue-conversation']
  },
  {
    id: '3',
    name: 'Order Agent',
    capabilities: ['order-tracking', 'modification', 'cancellation']
  },
  {
    id: '4',
    name: 'Billing Agent',
    capabilities: ['invoice-lookup', 'payment-issues', 'refunds']
  }
]

export const listAgents = (c: Context) => {
  return c.json({
    success: true,
    data: agents
  })
}

export const getAgentCapabilities = (c: Context) => {
  const name = c.req.param('name')
  const agent = agents.find(a => a.name === name)

  if (!agent) {
    return c.json({
      success: false,
      message: `Name of Agent '${name}' not found.`
    }, 404)
  }

  return c.json({
    success: true,
    data: agent.capabilities
  })
}
