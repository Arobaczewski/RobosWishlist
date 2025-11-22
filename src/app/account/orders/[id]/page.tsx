'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Calendar,
  Truck,
  CheckCircle,
  AlertCircle,
  Download,
  Trash2
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useOrders } from '@/app/store/hooks/useOrders';
import { useAppSelector } from '@/app/store/hooks/hooks';
import { Order } from '@/app/data/orders';

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { fetchOrderById, deleteOrderById } = useOrders();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.push('/');
    }
  }, [isMounted, isAuthenticated, router]);

  // Fetch order - FIXED: Removed fetchOrderById from dependencies
  useEffect(() => {
    if (!isMounted) return;
    
    if (!orderId) {
      router.push('/account/orders');
      return;
    }

    const loadOrder = async () => {
      setLoading(true);
      const fetchedOrder = await fetchOrderById(orderId);
      if (fetchedOrder) {
        setOrder(fetchedOrder);
      } else {
        router.push('/account/orders');
      }
      setLoading(false);
    };

    loadOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, isMounted]); // Only run when orderId or isMounted changes

  const handleDeleteOrder = async () => {
  if (!order) return;

  if (confirm('Are you sure you want to delete this demo order?')) {
    await deleteOrderById(order.id);
    router.push('/account/orders');
  }
};



  if (!isMounted || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order || !isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            href="/account/orders"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Orders
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Order #{order.orderNumber}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium rounded-full capitalize">
                  {order.status}
                </span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDeleteOrder}
              className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              Delete Order
            </motion.button>
          </div>
        </motion.div>

        {/* Demo Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 mb-8"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800 dark:text-yellow-200">
              <p className="font-semibold mb-1">Demo Order</p>
              <p>
                This is a demonstration order. No real payment was processed and no products will be shipped.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Package className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                Order Items ({order.items.length})
              </h2>

              <div className="space-y-6">
                {order.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex gap-4 pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
                  >
                    {/* FIXED: Added 'relative' class to Link parent */}
                    <Link
                      href={`/product/${item.productId}`}
                      className="relative w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0 group"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2 group-hover:scale-110 transition-transform"
                        sizes="96px"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link 
                        href={`/product/${item.productId}`}
                        className="block group"
                      >
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-1">
                          {item.name}
                        </h3>
                      </Link>
                      
                      {/* Variants */}
                      {Object.keys(item.selectedVariants).length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
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

                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Quantity: {item.quantity}
                        </p>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              ${item.price.toFixed(2)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Order Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Truck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                Order Status
              </h2>

              <div className="space-y-4">
                {/* Order Placed */}
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2 flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Order Placed
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                {/* Completed */}
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2 flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white capitalize">
                      {order.status}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Demo order completed immediately
                    </p>
                  </div>
                </div>

                {/* Note */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Note:</strong> In a real e-commerce application, you would see tracking 
                    information, estimated delivery dates, and shipping updates here.
                  </p>
                </div>
                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3"
                >
                  <Link href="/shop">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                    >
                      Shop Again
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-lg p-6 sticky top-24"
            >
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
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
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  Shipping Address
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
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

              {/* Payment Method */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  Payment Method
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p className="font-medium text-gray-900 dark:text-white capitalize">
                    {order.paymentInfo.cardType} ending in {order.paymentInfo.lastFourDigits}
                  </p>
                  <p>{order.paymentInfo.cardholderName}</p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                    (Demo - No actual charge)
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}