import mongoose, { Document, Schema } from "mongoose";

interface IBlog extends Document {
  title: string;
  content: string;
  description: string;
  image?: string;
  author: string;
  slug: string;
  keywords: string[];
  createdAt?: string;
  updatedAt?: string;
}

const BlogSchema: Schema<IBlog> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
    },
    keywords: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const BlogModel: mongoose.Model<IBlog> =
  mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default BlogModel;
