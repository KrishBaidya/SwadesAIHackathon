// Mock database store
export const mockData = {
  orders: [
    { id: 'ORD-001', userId: 'user_1', status: 'shipped', item: 'AI Robot Arm', deliveryDate: '2026-04-12' },
    { id: 'ORD-002', userId: 'user_1', status: 'processing', item: 'Haptic Glove', deliveryDate: '2026-04-15' },
    { id: 'ORD-003', userId: 'user_1', status: 'cancelled', item: 'Neural Link Kit', deliveryDate: null }
  ],
  billings: [
    { id: 'INV-101', orderId: 'ORD-001', amount: 500.00, status: 'paid', invoiceDate: '2026-04-01' },
    { id: 'INV-102', orderId: 'ORD-002', amount: 150.00, status: 'pending', invoiceDate: '2026-04-08' }
  ],
  conversations: [
    { id: '1', userId: 'user_1', messages: [{ role: 'user', content: 'Where is my robot arm?' }, { role: 'assistant', content: 'Let me check on that for you.' }] }
  ]
};

export const getOrderDetails = (orderId: string) => mockData.orders.find(o => o.id === orderId);
export const getInvoiceDetails = (invoiceId: string) => mockData.billings.find(b => b.id === invoiceId);
export const getRefundStatus = (orderId: string) => {
  const order = mockData.orders.find(o => o.id === orderId);
  return order?.status === 'cancelled' ? 'Refund Processed' : 'No refund requested';
};
