import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions={
  providers:[GoogleProvider({clientId:process.env.GOOGLE_CLIENT_ID?.trim(),clientSecret:process.env.GOOGLE_CLIENT_SECRET?.trim()})],
  // NEXTAUTH_SECRET is the canonical production secret. JWT_SECRET remains a
  // backwards-compatible fallback for existing Hostinger deployments.
  secret:process.env.NEXTAUTH_SECRET?.trim() || process.env.JWT_SECRET?.trim(),
  trustHost:true,
  session:{strategy:"jwt"},
  callbacks:{
    async signIn({user}){const allowed=process.env.ADMIN_EMAIL?.trim().toLowerCase();const email=user.email?.trim().toLowerCase();return Boolean(email&&allowed&&email===allowed)},
    async jwt({token,user}){if(user){token.role="admin";token.id=user.id;token.email=user.email}return token},
    async session({session,token}){if(session.user){session.user.id=token.id;session.user.email=token.email;session.user.role=token.role||null}return session},
    async redirect({url,baseUrl}){if(url.startsWith("/"))return `${baseUrl}${url}`;try{if(new URL(url).origin===baseUrl)return url}catch{return `${baseUrl}/en/dashboard`}return `${baseUrl}/en/dashboard`}
  },
  pages:{signIn:"/en/login"},
};
const handler=NextAuth(authOptions);export{handler as GET,handler as POST};


