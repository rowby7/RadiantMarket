import { ProfilePage } from "@/components/profile";
import NavBar from '@/components/navbar';
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function profile() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    const userEmail = data.user?.email;
    if (error || !data?.user) {
        redirect("/auth/login");
    }

    return(
        <div>
            <NavBar />
            <ProfilePage User={userEmail} />
        </div>
    )
}