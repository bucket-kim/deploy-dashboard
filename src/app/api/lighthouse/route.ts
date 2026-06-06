import { supabaseAdmin } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const { run_id, run_number, lcp, fid, cls, performance_score } = body;

    if (!run_id || !run_number) {
      return NextResponse.json({
        error: "run_id and run_number are required",
        status: 400,
      });
    }

    console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("Service key exists:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);

    const { data, error } = await supabaseAdmin
      .from("lighthouse_scores")
      .insert({
        run_id,
        run_number,
        lcp,
        fid,
        cls,
        performance_score,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error: ", error);
      return NextResponse.json({
        error: "Failed to save scores",
        details: error.message,
        code: error.code,
        status: 500,
      });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Requst Error: ", error);

    return NextResponse.json({
      error: "Invalid Request",
      status: 400,
    });
  }
};
