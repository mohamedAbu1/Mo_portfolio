import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { query } from "@/lib/mysql";
async function user(){const s=await getServerSession(authOptions);return s?.user?.email?.toLowerCase()||null}
export async function POST(req,{params}){const u=await user();if(!u)return NextResponse.json({error:"Authentication required"},{status:401});await query("INSERT IGNORE INTO comment_likes(comment_id,user_key) VALUES(?,?)",[params.id,u]);const r=await query("SELECT COUNT(*) AS count FROM comment_likes WHERE comment_id=?",[params.id]);return NextResponse.json({count:Number(r[0].count),liked:true})}
export async function DELETE(req,{params}){const u=await user();if(!u)return NextResponse.json({error:"Authentication required"},{status:401});await query("DELETE FROM comment_likes WHERE comment_id=? AND user_key=?",[params.id,u]);const r=await query("SELECT COUNT(*) AS count FROM comment_likes WHERE comment_id=?",[params.id]);return NextResponse.json({count:Number(r[0].count),liked:false})}

