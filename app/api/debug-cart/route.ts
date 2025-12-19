import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    const { data: cartItems, error } = await supabase
        .from('cart_items')
        .select(`
            id,
            user_id,
            product_id,
            products!inner (
                id,
                name,
                price,
                image_url
            )
        `)
        .eq('user_id', user.id);
    
    return NextResponse.json({
        user_id: user.id,
        cartItems,
        error,
        count: cartItems?.length || 0
    });
}
