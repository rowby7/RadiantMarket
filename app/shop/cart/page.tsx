import NavBar from '@/components/navbar';
import CartPage from '@/components/cart-page';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function cart(){
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    console.log('🛒 [Cart Page] User ID:', user?.id);

    const { data: cartItems, error: cartError } = await supabase
        .from('cart_items')
        .select(`
            id,
            product_id,
            user_id,
            products!inner (
                id,
                name,
                price,
                image_url,
                Description
            )
        `)
        .eq('user_id', user?.id);
    
    console.log('🛒 [Cart Page] Cart items fetched:', cartItems);
    console.log('🛒 [Cart Page] Cart items count:', cartItems?.length || 0);
    
    if (cartError) {
        console.error('❌ [Cart Page] Error fetching cart:', cartError);
    }
    
    return(
        <div>
            <NavBar />
            <CartPage cartItems={cartItems || []}/>
        </div>
    )
}