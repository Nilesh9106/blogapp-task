import { ListBlogType } from "@/types/Blog";
import { Clock, User } from "lucide-react";

// This would typically come from an API or database

type Props = {
  blogs: ListBlogType[];
};

export default function BlogList({ blogs }: Props) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">
        Latest Blog Posts
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {blogs.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
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
                <p className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-3">
                  {post.description}
                </p>
              </div>
              <div className="mt-auto">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <User className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{post.author}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
