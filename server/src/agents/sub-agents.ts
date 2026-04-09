import { generateText, tool } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { getOrderDetails, getInvoiceDetails, getRefundStatus, mockData } from './data';

// --- Shared Context Type ---
export type Message = {
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
};

// --- Support Agent ---
export const supportAgent = async (messages: Message[]) => {
  return generateText({
    model: google('gemini-1.5-flash'), // Or suitable Gemini version
    system: `You are a Customer Support Agent. Answer general inquiries, FAQs, and troubleshooting.
    You have access to previous conversation history provided in context.`,
    messages: messages,
    tools: {
      queryConversationHistory: tool({
        description: 'Query the user\'s past conversation history for context.',
        parameters: z.object({ userId: z.string() }),
        execute: async ({ userId }) => {
          const context = mockData.conversations.find(c => c.userId === userId);
          return context ? context.messages : 'No prior history found.';
        },
      }),
    },
  });
};

// --- Order Agent ---
export const orderAgent = async (messages: Message[]) => {
  return generateText({
    model: google('gemini-1.5-flash'),
    system: `You are an Order Management Agent. Help users check order status, track shipments, and request cancellations.`,
    messages: messages,
    tools: {
      fetchOrderDetails: tool({
        description: 'Fetch details for a specific order by its unique ID.',
        parameters: z.object({ orderId: z.string() }),
        execute: async ({ orderId }) => getOrderDetails(orderId) || 'Order not found.',
      }),
      checkDeliveryStatus: tool({
        description: 'Check current delivery status and estimated arrival dates.',
        parameters: z.object({ orderId: z.string() }),
        execute: async ({ orderId }) => {
          const order = getOrderDetails(orderId);
          return order ? { status: order.status, date: order.deliveryDate } : 'No delivery data found.';
        },
      }),
    },
  });
};

// --- Billing Agent ---
export const billingAgent = async (messages: Message[]) => {
  return generateText({
    model: google('gemini-1.5-flash'),
    system: `You are a Billing and Payments Agent. Assist with invoices, payment issues, refund requests, and subscriptions.`,
    messages: messages,
    tools: {
      getInvoiceDetails: tool({
        description: 'Retrieve billing information and payment status for an invoice.',
        parameters: z.object({ invoiceId: z.string() }),
        execute: async ({ invoiceId }) => getInvoiceDetails(invoiceId) || 'Invoice not found.',
      }),
      checkRefundStatus: tool({
        description: 'Verify if a refund has been processed for a specific order ID.',
        parameters: z.object({ orderId: z.string() }),
        execute: async ({ orderId }) => getRefundStatus(orderId),
      }),
    },
  });
};
