import { CalendarDays } from "lucide-react";
import { BlogType } from "@/types/Blog";
import ReactTimeago from "react-timeago";

type Props = {
  blog: BlogType;
};

export default function BlogPage({ ...props }: Props) {
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

      <div className="flex items-center space-x-4 mb-6 text-muted-foreground">
        <div className="flex items-center">
          <span className="font-medium">By {props.blog.author}</span>
        </div>
        <div className="flex items-center">
          <CalendarDays className="w-4 h-4 mr-1" />
          <ReactTimeago date={props.blog.createdAt!} />
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
