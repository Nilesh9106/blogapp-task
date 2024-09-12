import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BlogCreateType } from "@/types/Blog";
import { Editor } from "@tinymce/tinymce-react";

const initFullProps = {
  // plugins: 'preview   importcss  searchreplace autolink autosave save directionality  visualblocks visualchars fullscreen image link media  codesample table charmap pagebreak nonbreaking anchor  insertdatetime advlist lists  wordcount    help    charmap   quickbars  emoticons     ',
  plugins:
    "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
  editimage_cors_hosts: ["picsum.photos"],
  menubar: "file edit view insert format tools table tc help",
  toolbar:
    "fullscreen | undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code  preview | save print | pagebreak anchor codesample | ltr rtl",

  image_advtab: true,
  mobile: {
    toolbar:
      "fullscreen | undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code  preview | save print | pagebreak anchor codesample | ltr rtl",
    plugins:
      "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
  },

  autosave_ask_before_unload: true,
  autosave_interval: "30s",
  autosave_prefix: "{path}{query}-{id}-",
  autosave_restore_when_empty: false,
  autosave_retention: "2m",
  importcss_append: true,
  image_caption: true,
  quickbars_selection_toolbar:
    "bold italic | quicklink h1 h2 h3 blockquote quickimage",
  contextmenu: "copy paste link image table",

  fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt",
  a11y_advanced_options: true,
  browser_spellcheck: true,
  language: "en",
  language_url: "/tinymce/langs/es.js",
  branding: false,
  width: "100%",
};

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
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    console.log(formData);

    await props.onSubmit(formData);
    setFormData({
      title: "",
      content: "",
      description: "",
      image: "",
      author: "",
      slug: "",
    });
    setLoading(false);
  };

  return (
    <div className="my-10   flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-4xl p-6  rounded-lg "
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
            placeholder="Title of the blog post"
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
            placeholder="Description of the blog post"
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content" className="text-sm sm:text-base">
            Content
          </Label>
          <Editor
            id="content"
            value={formData.content}
            tinymceScriptSrc="/tinymce/tinymce.min.js"
            init={{
              ...initFullProps,
            }}
            onEditorChange={(content) => {
              formData.content = content;
              setFormData({ ...formData });
            }}
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
              placeholder="Author of the blog post"
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
              placeholder="slug-of-the-blog-post"
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
          {loading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
