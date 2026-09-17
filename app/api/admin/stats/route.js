import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { query } from "@/lib/mysql";
export async function GET(){const session=await getServerSession(authOptions);if(!session?.user||session.user.role!=="admin")return NextResponse.json({error:"Unauthorized"},{status:401});try{const[[projects],[clients],[messages],[reviews]]=await Promise.all([query("SELECT COUNT(*) AS count FROM deliverables WHERE visibility = 'public'"),query("SELECT COUNT(*) AS count FROM clients"),query("SELECT COUNT(*) AS count FROM contact_messages WHERE status = 'new'"),query("SELECT COUNT(*) AS count FROM reviews WHERE status = 'pending'")]);return NextResponse.json({projects:projects.count,clients:clients.count,messages:messages.count,reviews:reviews.count})}catch(error){console.error("Admin stats failed",error);return NextResponse.json({error:"Unable to load dashboard"},{status:500})}}
