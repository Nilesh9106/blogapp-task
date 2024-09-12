"use client";
import { CalendarDays, Edit, Trash } from "lucide-react";
import { BlogType } from "@/types/Blog";
import ReactTimeago from "react-timeago";
import { Button } from "./ui/button";
import Link from "next/link";
import { BlogHelper } from "@/helpers/Blog";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";

type Props = {
  blog: BlogType;
};

export default function BlogPage({ ...props }: Props) {
  const router = useRouter();
  const deleteBlog = async () => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await BlogHelper.deleteBlog(props.blog.slug);
      if (res) {
        toast.success("Blog deleted successfully");
        router.push("/");
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <img
          src={props.blog.image!}
          alt="Blog post cover image"
          className="rounded-lg shadow-lg object-cover w-full"
        />
      </div>

      <h1 className="text-4xl font-bold mb-4">{props.blog.title}</h1>

      <div className="flex items-center justify-between space-x-4 mb-6 text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="font-medium">By {props.blog.author}</span>
          <div className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-1" />
            <ReactTimeago date={props.blog.createdAt!} />
          </div>
        </div>
        <div className="flex gap-3">
          <Link href={`/blog/${props.blog.slug}/edit`}>
            <Button variant={"ghost"} size={"icon"}>
              <Edit size={20} />
            </Button>
          </Link>
          <Button onClick={deleteBlog} variant={"ghost"} size={"icon"}>
            <Trash size={20} />
          </Button>
        </div>
      </div>
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{
          __html: props.blog.content,
        }}
      ></div>
    </article>
  );
}
