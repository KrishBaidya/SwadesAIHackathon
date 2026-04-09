import { streamText, tool } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { z } from 'zod';
import { getOrderDetails, getInvoiceDetails, getRefundStatus, mockData } from './data';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const supportAgent = async (messages: any[]) => {
  return streamText({
    model: google('gemini-2.5-flash'),
    system: `You are a Customer Support Agent. Answer general inquiries, FAQs, and troubleshooting.
    You have access to previous conversation history provided in context.`,
    messages: messages as any,
    tools: {
      queryConversationHistory: tool({
        description: 'Query the user\'s past conversation history for context.',
        parameters: z.object({ userId: z.string() }),
        execute: async ({ userId }: { userId: string }): Promise<any> => {
          const context = mockData.conversations.find(c => c.userId === userId);
          return context ? context.messages : 'No prior history found.';
        },
      } as any),
    },
  });
};

export const orderAgent = async (messages: any[]) => {
  return streamText({
    model: google('gemini-2.5-flash'),
    system: `You are an Order Management Agent. Help users check order status, track shipments, and request cancellations.`,
    messages: messages as any,
    tools: {
      fetchOrderDetails: tool({
        description: 'Fetch details for a specific order by its unique ID.',
        parameters: z.object({ orderId: z.string() }),
        execute: async ({ orderId }: { orderId: string }): Promise<any> => getOrderDetails(orderId) || 'Order not found.',
      } as any),
      checkDeliveryStatus: tool({
        description: 'Check current delivery status and estimated arrival dates.',
        parameters: z.object({ orderId: z.string() }),
        execute: async ({ orderId }: { orderId: string }): Promise<any> => {
          const order = getOrderDetails(orderId);
          return order ? { status: order.status, date: order.deliveryDate } : 'No delivery data found.';
        },
      } as any),
    },
  });
};

export const billingAgent = async (messages: any[]) => {
  return streamText({
    model: google('gemini-2.5-flash'),
    system: `You are a Billing and Payments Agent. Assist with invoices, payment issues, refund requests, and subscriptions.`,
    messages: messages as any,
    tools: {
      getInvoiceDetails: tool({
        description: 'Retrieve billing information and payment status for an invoice.',
        parameters: z.object({ invoiceId: z.string() }),
        execute: async ({ invoiceId }: { invoiceId: string }): Promise<any> => getInvoiceDetails(invoiceId) || 'Invoice not found.',
      } as any),
      checkRefundStatus: tool({
        description: 'Verify if a refund has been processed for a specific order ID.',
        parameters: z.object({ orderId: z.string() }),
        execute: async ({ orderId }: { orderId: string }): Promise<any> => getRefundStatus(orderId),
      } as any),
    },
  });
};
