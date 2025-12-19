import { createClient } from "./supabase/client";


export async function addToCart(product_id: string){
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
}