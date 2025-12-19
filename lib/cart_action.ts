import { createClient } from "./supabase/client";

export async function addToCart(product_id: string){
    console.log('🔵 [addToCart] Function called');
    console.log('📦 [addToCart] Product ID received:', product_id);
    
    const supabase = createClient();
    console.log('✅ [addToCart] Supabase client created');
    
    const { data: {user}, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
        console.error('❌ [addToCart] Error getting user:', userError);
        throw userError;
    }
    
    console.log('👤 [addToCart] User ID:', user?.id);
    console.log('📝 [addToCart] Preparing to insert:', {
        user_id: user?.id,
        product_id: product_id,
    });

    const { data, error } = await supabase
    .from("cart_items")
    .insert({
        user_id: user?.id,
        product_id: product_id,
    })
    .select();
    
    if (error) {
        console.error('❌ [addToCart] Supabase insert error:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint,
        });
        throw error;
    }
    
    console.log('✅ [addToCart] Successfully inserted into Supabase!');
    console.log('📊 [addToCart] Inserted data:', data);
    
    return data;
}