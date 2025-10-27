'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Package,
  ShoppingBag,
  Trash2,
  Eye,
  AlertCircle,
  Calendar,
  DollarSign,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useOrders } from '@/app/store/hooks/useOrders';
import { useAppSelector } from '@/app/store/hooks/hooks';

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { 
    orders, 
    loading, 
    deleteOrderById, 
    deleteAllOrders, 
    getTotalSpent, 
    getOrderCount 
  } = useOrders();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleDeleteOrder = async (orderId: string) => {
    if (confirm('Are you sure you want to delete this demo order?')) {
      const success = await deleteOrderById(orderId);
      if (success) {
        // Order deleted successfully
      }
    }
  };

  const handleDeleteAllOrders = async () => {
    if (confirm('Are you sure you want to delete ALL demo orders? This cannot be undone.')) {
      const success = await deleteAllOrders();
      if (success) {
        setShowDeleteConfirm(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Orders
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage your demo order history
          </p>
        </motion.div>

        {/* Demo Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 mb-6"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800 dark:text-yellow-200">
              <p className="font-semibold mb-1">Demo Orders</p>
              <p>
                These are demonstration orders for portfolio purposes. No real purchases were made.
                You can delete these orders at any time.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        {orders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            {/* Total Orders */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Total Orders
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {getOrderCount()}
                  </p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-3">
                  <Package className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>

            {/* Total Spent */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Total Spent (Demo)
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${getTotalSpent().toFixed(2)}
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3">
                  <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Last Order
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {orders[0] ? new Date(orders[0].createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-3">
                  <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Orders List */}
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="w-32 h-32 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <ShoppingBag className="w-16 h-16 text-gray-400 dark:text-gray-600" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No orders yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              When you place demo orders, they'll appear here.
            </p>
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors inline-flex items-center gap-2"
              >
                Start Shopping
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Delete All Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-end mb-4"
            >
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear All Demo Orders
              </button>
            </motion.div>

            {/* Orders Grid */}
            <div className="space-y-4">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    {/* Order Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          Order #{order.orderNumber}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium rounded-full capitalize">
                          {order.status}
                        </span>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Items ({order.items.length})
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {order.items.slice(0, 4).map((item) => (
                          <div
                            key={item.id}
                            className="relative w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden group"
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain p-2"
                            />
                            {/* Tooltip on hover */}
                            <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <p className="text-white text-xs text-center px-1 line-clamp-2">
                                {item.name}
                              </p>
                            </div>
                          </div>
                        ))}
                        {order.items.length > 4 && (
                          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                              +{order.items.length - 4}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Shipping Address Preview */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Shipping to:
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {order.shippingAddress.fullName} • {order.shippingAddress.city}, {order.shippingAddress.state}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <Link href={`/account/orders/${order.id}`} className="flex-1 min-w-[200px]">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </motion.button>
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleDeleteOrder(order.id)}
                        className="bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Delete All Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-3">
                  <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Delete All Orders?
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete all {orders.length} demo order(s)? 
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAllOrders}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Delete All
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}