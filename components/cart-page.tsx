'use client'

type CartItem = {
  id: number;
  user_id: string;
  product_id: number;
  products: {
    id: number;
    name: string;
    price: number;
    image_url: string;
    Description: string;
  }
}

export default function CartPage({cartItems} : { cartItems: CartItem[]}) {
  console.log('🛒 [CartPage] Received cart items:', cartItems);
  console.log('🛒 [CartPage] First item structure:', cartItems[0]);
  
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-400">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            <ul role="list" className="space-y-4">
              {cartItems.map((item) => {
                console.log('🛒 [CartPage] Rendering item:', item);
                console.log('🛒 [CartPage] Products:', item.products);
                return (
                <li key={item.id} className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg">
                  <img 
                    src={item.products.image_url} 
                    className="w-24 h-24 object-cover rounded"
                    alt={item.products.name}
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{item.products.name}</h3>
                    <p className="text-gray-400">${item.products.price}</p>
                  </div>
                  <button 
                    type="button" 
                    className="text-red-500 hover:text-red-400"
                  >
                    Remove
                  </button>
                </li>
              )})}
            
            </ul>
            
            <div className="mt-8 border-t border-gray-700 pt-8">
              <div className="flex justify-between text-lg font-medium text-white mb-4">
                <p>Subtotal</p>
                <p>${cartItems.reduce((sum, item) => sum + (item.products.price || 0), 0).toFixed(2)}</p>
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-md">
                Checkout
              </button>
              <a 
                href="/shop/storefront" 
                className="block text-center text-indigo-400 hover:text-indigo-300 mt-4"
              >
                Continue Shopping →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
