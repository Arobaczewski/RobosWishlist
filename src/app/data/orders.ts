import fs from 'fs';
import path from 'path';

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedVariants: { [key: string]: string };
}

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface PaymentInfo {
  cardType: string; // visa, mastercard, amex, etc.
  lastFourDigits: string;
  cardholderName: string;
}

export interface Order {
  id: string;
  userId: string | null; // Changed to allow null for guest orders
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentInfo: PaymentInfo;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  orderNumber: string; // Human-readable order number like "ORD-2024-001234
  orderToken?: string;
}

const DATA_FILE = path.join(process.cwd(), 'data', 'orders.json');

function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function readOrders(): Order[] {
  ensureDataDirectory();

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
    return [];
  }

  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading orders file:', error);
    return [];
  }
}

function writeOrders(orders: Order[]) {
  ensureDataDirectory();

  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2));
  } catch (error) {
    console.error('Error writing orders file:', error);
    throw error;
  }
}

// Generate a human-readable order number
function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `ORD-${year}-${randomNum}`;
}

export const getOrders = (): Order[] => {
  return readOrders();
};

export const getOrdersByUserId = (userId: string): Order[] => {
  const orders = readOrders();
  return orders.filter(order => order.userId === userId);
};

export const getOrderById = (orderId: string): Order | undefined => {
  const orders = readOrders();
  return orders.find(order => order.id === orderId);
};

export const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'orderNumber' | 'status'>): Order => {
  const orders = readOrders();
  
  const newOrder: Order = {
    ...orderData,
    id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    orderNumber: generateOrderNumber(),
    status: 'completed', // For demo purposes, all orders are immediately completed
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  writeOrders(orders);
  
  return newOrder;
};

export const updateOrder = (orderId: string, updates: Partial<Order>): Order | null => {
  const orders = readOrders();
  const orderIndex = orders.findIndex(order => order.id === orderId);

  if (orderIndex !== -1) {
    orders[orderIndex] = {
      ...orders[orderIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    writeOrders(orders);
    return orders[orderIndex];
  }

  return null;
};

export const deleteOrder = (orderId: string): boolean => {
  const orders = readOrders();
  const filteredOrders = orders.filter(order => order.id !== orderId);
  
  if (filteredOrders.length < orders.length) {
    writeOrders(filteredOrders);
    return true;
  }
  
  return false;
};

export const deleteAllOrdersByUserId = (userId: string): number => {
  const orders = readOrders();
  const filteredOrders = orders.filter(order => order.userId !== userId);
  const deletedCount = orders.length - filteredOrders.length;
  
  if (deletedCount > 0) {
    writeOrders(filteredOrders);
  }
  
  return deletedCount;
};