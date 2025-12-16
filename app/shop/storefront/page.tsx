import React from 'react'
import NavBar from '@/components/navbar';
import ProductGrid from '@/components/product-grid';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function storefront() {

      const supabase = await createClient();

      const { data: products, error} = await supabase
      .from('products')
      .select('id, name, price, image_url, Description')
      .order('created_at', { ascending: false });

      if (error) {
            console.error('Error fetching products:', error);
      }
      return (
     <div>
      <NavBar />
      <ProductGrid products={products || []} />
     </div>
      )
}

