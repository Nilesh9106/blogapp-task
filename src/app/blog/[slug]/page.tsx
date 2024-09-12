"use client";

import BlogPage from "@/app/components/BlogPage";
import { BlogHelper } from "@/app/helpers/Blog";
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
      setBlog(blog);
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
      {loading && <div>Loading...</div>}
      {!loading && blog && <BlogPage blog={blog} />}
    </div>
  );
};

export default Page;
