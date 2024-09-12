import { dbConnect } from "@/lib/db";
import BlogModel from "@/models/BlogModel";
import { NextRequest, NextResponse } from "next/server";

// create api
export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    const body = await req.json();
    const b = await BlogModel.findOne({ slug: body.slug });
    if (b) {
      return NextResponse.json(
        { error: "Blog with this slug already exists" },
        { status: 400 }
      );
    }
    const blog = await BlogModel.create(body);
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
};
// get blog api
export const GET = async () => {
  try {
    await dbConnect();
    const blogs = await BlogModel.find({}).select("-content");
    return NextResponse.json(blogs);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
};
