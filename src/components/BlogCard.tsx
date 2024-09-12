import { ListBlogType } from "@/types/Blog";
import { User } from "lucide-react";
import TimeAgo from "react-timeago";
import Link from "next/link";
import React from "react";

type Props = {
  post: ListBlogType;
};

const BlogCard = ({ post }: Props) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="bg-card rounded-2xl border border-muted overflow-hidden flex flex-col"
    >
      <div className="relative h-48 sm:h-56 md:h-64">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4 sm:p-6 flex-grow flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2 line-clamp-2">
            {post.title}
          </h2>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base line-clamp-3">
            {post.description}
          </p>
        </div>
        <div className="mt-auto">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center text-sm ">
              <User className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{post.author}</span>
            </div>
            <TimeAgo date={post.createdAt} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
