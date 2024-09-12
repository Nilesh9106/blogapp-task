"use client";
import CreateBlog from "@/components/CreateBlog";
import { BlogHelper } from "@/helpers/Blog";
import { BlogCreateType, BlogType } from "@/types/Blog";
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [blog, setBlog] = useState<BlogType>();
  const [loading, setLoading] = useState(false);
  const { slug }: { slug: string } = useParams();
  const router = useRouter();
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const blog: BlogType = await BlogHelper.getBlog(slug);
      if (blog) {
        setBlog(blog);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (blog: BlogCreateType) => {
    try {
      const res = await BlogHelper.updateBlog(slug, blog);
      console.log(res);
      if (res) {
        router.push("/blog/" + blog.slug);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      {loading && <div className="my-4 text-center">Loading...</div>}
      {!loading && blog && (
        <CreateBlog blog={blog} isUpdate onSubmit={onSubmit} />
      )}
    </div>
  );
};

export default Page;
