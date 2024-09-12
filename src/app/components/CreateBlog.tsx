import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BlogCreateType } from "@/types/Blog";

type Props = {
  blog?: BlogCreateType;
  isUpdate: boolean;
  onSubmit: (blog: BlogCreateType) => Promise<void>;
};

export default function CreateBlog(props: Props) {
  const [formData, setFormData] = useState<BlogCreateType>(
    props.blog ?? {
      title: "",
      content: "",
      description: "",
      image: "",
      author: "",
      slug: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onSubmit(formData);
    setFormData({
      title: "",
      content: "",
      description: "",
      image: "",
      author: "",
      slug: "",
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 bg-card rounded-lg shadow"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          Create a New Blog Post
        </h2>

        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm sm:text-base">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm sm:text-base">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content" className="text-sm sm:text-base">
            Content
          </Label>
          <Textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full min-h-[150px] sm:min-h-[200px]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="author" className="text-sm sm:text-base">
              Author
            </Label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug" className="text-sm sm:text-base">
              Slug
            </Label>
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="image" className="text-sm sm:text-base">
            Image URL{" "}
          </Label>
          <Input
            id="image"
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            required
            placeholder="https://example.com/image.jpg"
            className="w-full"
          />
        </div>

        <Button type="submit" className="w-full">
          Create Blog Post
        </Button>
      </form>
    </div>
  );
}
