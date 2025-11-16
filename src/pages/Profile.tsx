import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navigation } from "@/components/Navigation";

// Initialize Supabase client
const supabase: SupabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

type ProfileRow = {
  id: string;
  full_name?: string | null;
  avatar_url?: string | null;
};

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) throw error;
        if (!user) return;

        if (mounted) {
          setEmail(user.email ?? "");
          setFullName(
            user.user_metadata?.full_name ??
              user.user_metadata?.name ??
              "User"
          );
          setAvatarUrl(user.user_metadata?.avatar_url ?? "");
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadProfile();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <motion.div
        className="flex flex-col items-center justify-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-lg shadow-lg border border-gray-200 bg-white rounded-2xl mt-8">
          <CardContent className="p-8 flex flex-col items-center space-y-4">
            {loading ? (
              <p className="text-gray-500 text-sm">Loading profile...</p>
            ) : (
              <>
                <Avatar className="h-24 w-24">
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt={fullName} />
                  ) : (
                    <>
                      <AvatarImage
                        src="/profile-placeholder.png"
                        alt="Profile"
                      />
                      <AvatarFallback>
                        {(fullName || "U").charAt(0)}
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>

                <h2 className="text-2xl font-semibold text-gray-800">
                  {fullName}
                </h2>
                <p className="text-gray-500 text-sm">{email}</p>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
