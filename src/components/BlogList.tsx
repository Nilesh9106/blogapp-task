import { ListBlogType } from "@/types/Blog";
import BlogCard from "./BlogCard";

// This would typically come from an API or database

type Props = {
  blogs: ListBlogType[];
};

export default function BlogList({ blogs }: Props) {
  return (
    <div className="container   mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center ">
        Latest Blog Posts
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {blogs.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      {blogs.length === 0 && (
        <div className="text-center mx-auto text-muted-foreground">
          No blog posts found
        </div>
      )}
    </div>
  );
}
