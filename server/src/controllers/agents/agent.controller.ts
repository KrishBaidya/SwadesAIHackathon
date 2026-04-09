import { Context } from 'hono'

// Placeholder for agent data
const agents = [
  {
    id: '1',
    name: 'Research Agent',
    type: 'research',
    description: 'Expert in gathering information and synthesizing reports.',
    capabilities: ['web-search', 'data-extraction', 'summarization']
  },
  {
    id: '2',
    name: 'Coding Assistant',
    type: 'coding',
    description: 'Specialized in writing and debugging code across various languages.',
    capabilities: ['code-generation', 'refactoring', 'unit-testing']
  }
]

export const listAgents = (c: Context) => {
  return c.json({
    success: true,
    data: agents
  })
}

export const getAgentCapabilities = (c: Context) => {
  const type = c.req.param('type')
  const agent = agents.find(a => a.type === type)

  if (!agent) {
    return c.json({
      success: false,
      message: `Agent of type '${type}' not found.`
    }, 404)
  }

  return c.json({
    success: true,
    data: agent.capabilities
  })
}
