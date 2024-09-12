export type ListBlogType = {
  _id: string;
  slug: string;
  title: string;
  author: string;
  description: string;
  image: string;
  createdAt: string;
};

export type BlogType = {
  _id: string;
  title: string;
  content: string;
  description: string;
  image?: string;
  author: string;
  slug: string;
  keywords: string[];
  createdAt?: string;
  updatedAt?: string;
};
