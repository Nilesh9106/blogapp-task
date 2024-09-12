import { dbConnect } from "@/lib/db";
import BlogModel from "@/models/BlogModel";
import { NextRequest, NextResponse } from "next/server";

// get by id api
export const GET = async (
  req: NextRequest,
  { params }: { params: { slug: string } }
) => {
  try {
    await dbConnect();
    const blog = await BlogModel.findOne({ slug: params.slug });
    return NextResponse.json(blog);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
};
// delete by id api

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { slug: string } }
) => {
  try {
    await dbConnect();
    const blog = await BlogModel.findByIdAndDelete(params.slug);
    return NextResponse.json(blog);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
};
