import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { query } from "@/lib/mysql";
async function guard(){const session=await getServerSession(authOptions);return session?.user?.role==="admin"}
export async function GET(){if(!await guard())return NextResponse.json({error:"Unauthorized"},{status:401});return NextResponse.json({data:await query("SELECT * FROM seasonal_themes ORDER BY id ASC")})}
export async function PUT(req){if(!await guard())return NextResponse.json({error:"Unauthorized"},{status:401});try{const b=await req.json();const code=String(b.themeCode||"").trim();if(!code)return NextResponse.json({error:"Theme code is required"},{status:400});await query("UPDATE seasonal_themes SET enabled=?,headline=?,message=?,start_date=?,end_date=?,accent=?,background=? WHERE theme_code=?",[Boolean(b.enabled),String(b.headline||"").trim(),String(b.message||"").trim(),b.startDate||null,b.endDate||null,String(b.accent||"#8ff0c2"),String(b.background||"#11151b"),code]);return NextResponse.json({updated:true})}catch(e){console.error(e);return NextResponse.json({error:"Unable to update seasonal theme"},{status:500})}}
