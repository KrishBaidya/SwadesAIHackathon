import { Hono } from 'hono'
import { 
  listAgents, 
  getAgentCapabilities 
} from '../controllers/agents/agent.controller'

const agents = new Hono()

agents.get('/', listAgents)
agents.get('/:type/capabilities', getAgentCapabilities)

export default agents
