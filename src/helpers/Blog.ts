import { BlogCreateType } from "@/types/Blog";
import { toast } from "sonner";

export class BlogHelper {
  static async getBlogs() {
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getBlog(slug: string) {
    try {
      const res = await fetch(`/api/blog/${slug}`);
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        throw new Error(data.error);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async createBlog(blog: BlogCreateType) {
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        body: JSON.stringify(blog),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        throw new Error(data.error);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteBlog(slug: string) {
    try {
      const res = await fetch(`/api/blog/${slug}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        throw new Error(data.error);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
