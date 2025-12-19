"use client"

import { addToCart } from "@/lib/cart_action"
type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  Description: string;
  created_at?: string;
}

export default function ProductGrid({products} : { products: Product[]}) {

  const handleAddToCart = async (productId: number) =>  {
    console.log('🛒 Add to Cart clicked!');
    console.log('Product ID:', productId);
    console.log('Product ID as string:', productId.toString());
    
    try {
      console.log('Calling addToCart function...');
      const result = await addToCart(productId.toString());
      console.log('addToCart result:', result);
      console.log('✅ Successfully added to cart!');
      alert(`Product ${productId} added to cart!`);
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      alert('Failed to add to cart. Check console for details.');
    }
  }

  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div 
                onClick={() => window.location.href = `/shop/product/${product.id}`}
                className="cursor-pointer"
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
                <h3 className="mt-4 text-sm text-white">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-white">${product.price}</p>
              </div>
              <button 
                onClick={() => handleAddToCart(product.id)} 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2 w-full"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}