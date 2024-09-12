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
    const blog = await BlogModel.findOneAndDelete({ slug: params.slug });
    return NextResponse.json(blog);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
};

// update by slug api

export const PUT = async (
  req: NextRequest,
  { params }: { params: { slug: string } }
) => {
  try {
    await dbConnect();
    const body = await req.json();
    const b1 = await BlogModel.findOne({ slug: params.slug });
    const b2 = await BlogModel.findOne({ slug: body.slug });
    if (b2 && b1 && b1._id?.toString() !== b2._id?.toString()) {
      console.log(b1._id, b2._id);
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 }
      );
    }
    const blog = await BlogModel.findOneAndUpdate({ slug: params.slug }, body, {
      new: true,
    });
    return NextResponse.json(blog);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
};
