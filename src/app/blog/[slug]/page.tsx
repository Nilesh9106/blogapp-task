"use client";

import BlogPage from "@/components/BlogPage";
import { BlogHelper } from "@/helpers/Blog";
import { BlogType } from "@/types/Blog";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [blog, setBlog] = useState<BlogType>();
  const [loading, setLoading] = useState(false);
  const { slug }: { slug: string } = useParams();
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

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      {loading && <div className="my-4 text-center">Loading...</div>}
      {!loading && blog && <BlogPage blog={blog} />}
    </div>
  );
};

export default Page;
