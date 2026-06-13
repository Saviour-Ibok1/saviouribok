import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json();

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid slug" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    const { data, error } = await supabase.rpc("increment_likes", {
      post_slug: slug,
    });

    if (error) {
      console.error("increment_likes error:", error.message);
      return NextResponse.json(
        { error: "Failed to update likes" },
        { status: 500 }
      );
    }

    return NextResponse.json({ likes: data });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}