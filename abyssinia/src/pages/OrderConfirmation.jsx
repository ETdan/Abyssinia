import { Link } from 'react-router-dom';

function OrderConfirmation() {
  // Placeholder data (replace with actual order details)
  const order = {
    number: '12345',
    date: 'June 1, 2023',
    total: 249.98,
    items: [
      { id: 1, name: 'Product 1', quantity: 1, price: 99.99 },
      { id: 2, name: 'Product 2', quantity: 2, price: 74.99 },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Order Confirmation</h1>
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-8" role="alert">
          <p className="font-bold">Thank you for your order!</p>
          <p>Your order has been successfully placed and is being processed.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <p><strong>Order Number:</strong> {order.number}</p>
          <p><strong>Order Date:</strong> {order.date}</p>
          <p><strong>Order Total:</strong> ${order.total.toFixed(2)}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Items Ordered</h2>
          <ul className="divide-y divide-gray-200">
            {order.items.map((item) => (
              <li key={item.id} className="py-4 flex justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center">
          <p className="mb-4">
            We'll send you a shipping confirmation email when your order ships.
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;

