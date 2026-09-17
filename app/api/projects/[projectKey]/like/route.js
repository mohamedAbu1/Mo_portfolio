import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { query } from "@/lib/mysql";
async function identity(){const s=await getServerSession(authOptions);return s?.user?.email?.toLowerCase()||null}
export async function GET(req,{params}){const key=params.projectKey;const user=await identity();const rows=await query("SELECT COUNT(*) AS count FROM project_likes WHERE project_key = ?",[key]);const mine=user?await query("SELECT 1 AS liked FROM project_likes WHERE project_key = ? AND user_key = ? LIMIT 1",[key,user]):[];return NextResponse.json({count:Number(rows[0]?.count||0),liked:Boolean(mine.length)})}
export async function POST(req,{params}){const user=await identity();if(!user)return NextResponse.json({error:"Authentication required"},{status:401});try{await query("INSERT IGNORE INTO project_likes (project_key,user_key) VALUES (?,?)",[params.projectKey,user]);const rows=await query("SELECT COUNT(*) AS count FROM project_likes WHERE project_key = ?",[params.projectKey]);return NextResponse.json({count:Number(rows[0].count),liked:true})}catch{return NextResponse.json({error:"Unable to like project"},{status:500})}}
export async function DELETE(req,{params}){const user=await identity();if(!user)return NextResponse.json({error:"Authentication required"},{status:401});await query("DELETE FROM project_likes WHERE project_key = ? AND user_key = ?",[params.projectKey,user]);const rows=await query("SELECT COUNT(*) AS count FROM project_likes WHERE project_key = ?",[params.projectKey]);return NextResponse.json({count:Number(rows[0].count),liked:false})}

