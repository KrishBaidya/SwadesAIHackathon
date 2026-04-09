import { generateObject } from 'ai';
import { z } from 'zod';
import { google } from '@ai-sdk/google';

export type Intent = 'support' | 'order' | 'billing' | 'unknown';

export interface RouteDecision {
  intent: Intent;
  confidence: number;
  reasoning: string;
}

export const routerAgent = async (query: string): Promise<RouteDecision> => {
  try {
    const { object } = await generateObject({
      model: google('gemini-2.5-flash'),
      schema: z.object({
        intent: z.enum(['support', 'order', 'billing', 'unknown']),
        confidence: z.number().min(0).max(1),
        reasoning: z.string(),
      }),
      prompt: `Analyze the following customer query and classify its intent into one of these categories:
      - 'support': General support inquiries, FAQs, troubleshooting, conversation history lookups.
      - 'order': Order status, tracking, modifications, cancellations.
      - 'billing': Payment issues, refunds, invoices, subscription queries.
      - 'unknown': If the query is ambiguous, irrelevant, or cannot be classified.

      Query: "${query}"`,
    });

    return object;
  } catch (error) {
    console.error('Router Agent Error:', error);
    return {
      intent: 'unknown',
      confidence: 0,
      reasoning: 'AI Router experienced an error during classification.',
    };
  }
};
