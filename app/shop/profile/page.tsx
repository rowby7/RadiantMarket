import { ProfilePage } from "@/components/profile";
import NavBar from '@/components/navbar';
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function profile() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    
    if (error || !data?.user) {
        redirect("/auth/login");
    }

    return(
        <div>
            <NavBar />
            <ProfilePage User={{ email: data.user.email || "" }} />
        </div>
    )
}