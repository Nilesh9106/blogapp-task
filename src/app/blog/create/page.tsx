"use client";
import CreateBlog from "@/components/CreateBlog";
import { BlogHelper } from "@/helpers/Blog";
import { BlogCreateType } from "@/types/Blog";
import { useRouter } from "nextjs-toploader/app";
import React from "react";

const Page = () => {
  const router = useRouter();
  const onSubmit = async (blog: BlogCreateType) => {
    try {
      const res = await BlogHelper.createBlog(blog);
      console.log(res);
      if (res) {
        router.push("/blog/" + blog.slug);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <CreateBlog isUpdate={false} onSubmit={onSubmit} />
    </div>
  );
};

export default Page;
