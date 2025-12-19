import NavBar from '@/components/navbar';
import CartPage from '@/components/cart-page';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

type CartItem = {
    id: number;
    product_id: number;
    user_id: string;
    products: {
        id: number;
        name: string;
        price: number;
        image_url: string;
        Description: string;
    };
}

export default async function cart(){
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    console.log('🛒 [Cart Page] User ID:', user?.id);

    const { data: cartItemsRaw, error: cartError } = await supabase
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
    
    console.log('🛒 [Cart Page] Cart items from DB:', cartItemsRaw);
    
    // Supabase with !inner returns products as object, not array - cast to unknown first then to CartItem[]
    const cartItems = (cartItemsRaw as unknown as CartItem[] || []).filter(item => {
        if (!item.products || !item.products.id) {
            console.warn('⚠️ [Cart Page] Filtering out item without valid products:', item);
            return false;
        }
        return true;
    });
    
    console.log('🛒 [Cart Page] Valid cart items:', cartItems);
    console.log('🛒 [Cart Page] Cart items count:', cartItems?.length || 0);
    
    if (cartError) {
        console.error('❌ [Cart Page] Error fetching cart:', cartError);
    }
    
    return(
        <div>
            <NavBar />
            <CartPage cartItems={cartItems}/>
        </div>
    )
}