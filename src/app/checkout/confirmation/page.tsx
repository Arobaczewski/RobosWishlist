'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  CheckCircle, 
  Package, 
  MapPin, 
  CreditCard, 
  AlertCircle,
  ArrowRight,
  Download,
  Home
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useOrders } from '@/app/store/hooks/useOrders';
import { Order } from '@/app/data/orders';

export default function OrderConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { fetchOrderById } = useOrders();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      router.push('/');
      return;
    }

    const loadOrder = async () => {
      const fetchedOrder = await fetchOrderById(orderId);
      if (fetchedOrder) {
        setOrder(fetchedOrder);
      } else {
        router.push('/');
      }
      setLoading(false);
    };

    loadOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]); // Only re-run when orderId changes, not when fetchOrderById changes

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
          </div>
        </motion.div>

        {/* Main Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            Thank you for your demo order
          </p>
          <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
            Order #{order.orderNumber}
          </p>
        </motion.div>

        {/* DEMO DISCLAIMER - Most Prominent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-gray-900 via-purple-300 to-purple-600 border-b border-purple-400 rounded-2xl p-8 mb-8 shadow-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="bg-white rounded-full p-3 flex-shrink-0">
              <AlertCircle className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-3">
                🎭 THIS IS A PORTFOLIO DEMONSTRATION
              </h2>
              <div className="space-y-2 text-lg">
                <p className="font-semibold">
                  NO REAL ORDER HAS BEEN PLACED
                </p>
                <p>This is a demonstration of e-commerce functionality for portfolio purposes:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>No payment was processed</li>
                  <li>No products will be shipped</li>
                  <li>No charges were made to any card</li>
                  <li>Your data is stored locally for demo purposes only</li>
                </ul>
                <p className="text-sm mt-4 opacity-90">
                  This project showcases full-stack development skills including authentication, 
                  cart management, checkout flow, and order tracking.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Order Details
          </h2>

          {/* Order Summary */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Shipping Address */}
            <div className="flex gap-4">
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-3 h-fit">
                <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Shipping Address
                </h3>
                <div className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {order.shippingAddress.fullName}
                  </p>
                  <p>{order.shippingAddress.addressLine1}</p>
                  {order.shippingAddress.addressLine2 && (
                    <p>{order.shippingAddress.addressLine2}</p>
                  )}
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                    {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                  <p className="mt-2">{order.shippingAddress.phone}</p>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="flex gap-4">
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-3 h-fit">
                <CreditCard className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Payment Method
                </h3>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  <p className="font-medium text-gray-900 dark:text-white capitalize">
                    {order.paymentInfo.cardType} ending in {order.paymentInfo.lastFourDigits}
                  </p>
                  <p>{order.paymentInfo.cardholderName}</p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                    (Demo - No actual charge)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Order Items ({order.items.length})
            </h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <div className="relative w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      {item.name}
                    </h4>
                    {Object.keys(item.selectedVariants).length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {Object.entries(item.selectedVariants).map(([key, value]) => (
                          <span
                            key={key}
                            className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-600 dark:text-gray-300"
                          >
                            {value}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ${item.price.toFixed(2)} each
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  ${order.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  ${order.tax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between items-baseline">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  Total
                </span>
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Order Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-6"
        >
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-3">
            📧 Order Information
          </h3>
          <div className="text-blue-800 dark:text-blue-300 text-sm space-y-2">
            <p>
              <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            <p>
              <strong>Status:</strong> <span className="capitalize">{order.status}</span>
            </p>
            <p className="text-xs mt-3 opacity-75">
              In a real application, you would receive a confirmation email with your order details and tracking information.
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid sm:grid-cols-2 gap-4"
        >
          <Link href="/account/orders">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" />
              View All Orders
            </motion.button>
          </Link>
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Portfolio Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Thank you for exploring this portfolio project! 🚀
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            Built with Next.js, TypeScript, Redux, and Tailwind CSS
          </p>
        </motion.div>
      </div>
    </div>
  );
}