import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/storeContext';
import axios from 'axios';

const statusClasses = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const StatusPill = ({ status }) => {
  const styles = statusClasses[status] ?? 'bg-gray-100 text-gray-800';
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${styles}`}
    >
      {status}
    </span>
  );
};

const Myorders = () => {
  const url = import.meta.env.VITE_API_URL;
  const { token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.post(
        `${url}/api/order/userorder`,
        {},
        { headers: { token } }
      );
      setOrders(res.data.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        orders.map(order => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200"
          >
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500">
                  Order ID: <span className="font-mono select-all">{order._id}</span>
                </p>
                {order.createdAt && (
                  <p className="text-xs text-gray-400">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
              <StatusPill status={order.status} />
            </div>

            <ul className="divide-y divide-gray-200">
              {order.items.map(item => (
                <li key={item._id} className="flex items-center py-4">
                  <img
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      ₹{item.price} × {item.quantity}
                    </p>
                    <p className="text-sm text-gray-500">
                      Category: {item.category}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-end mt-4">
              <button onClick={fetchOrders} className="bg-orange-300 hover:bg-orange-400 text-white text-sm px-5 py-2 rounded-lg shadow">
                Track Order
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Myorders;
