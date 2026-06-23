import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // لازم يكون sb_secret_... من قسم Secret keys
);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.sub;
        token.name = profile.name;
        token.email = profile.email;
        token.picture = profile.picture;
        token.role = "admin"; // افتراضيًا مستخدم عادي
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.picture;
      session.user.role = token.role;
      return session;
    },
async signIn({ user }) {
  // تحقق هل المستخدم موجود بالفعل
  const { data: existingUser, error: fetchError } = await supabase.auth.admin.listUsers();

  if (fetchError) {
    console.error("Supabase fetch error:", fetchError);
    return false;
  }

  const found = existingUser.users.find(u => u.email === user.email);

  if (!found) {
    // إنشاء مستخدم جديد فقط لو مش موجود
    const { error } = await supabase.auth.admin.createUser({
      email: user.email,
      email_confirm: true,
      user_metadata: {
        name: user.name,
        image: user.image,
        role: "admin",
      },
    });

    if (error) {
      console.error("Supabase Auth error:", error);
      return false;
    }
  }

  return true;
}

  },
});

export { handler as GET, handler as POST };
