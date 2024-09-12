"use client";
import BlogList from "@/components/BlogList";
import { BlogHelper } from "@/helpers/Blog";
import { ListBlogType } from "@/types/Blog";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [blogs, setBlogs] = useState<ListBlogType[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const blogs: ListBlogType[] = await BlogHelper.getBlogs();
      setBlogs(blogs ?? []);
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
      {!loading && <BlogList blogs={blogs} />}
    </div>
  );
};

export default Page;
