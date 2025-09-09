import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [120, "Title cannot exceed 120 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    published: {
      type: Boolean,
      default: false,
    },
    enrolledCount: {
      type: Number,
      default: 0,
      min: [0, "Enrolled count cannot be negative"],
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be negative"],
      max: [5, "Rating cannot exceed 5"],
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: [true, "Instructor is required"],
    },
  },
  { timestamps: true }
);

export default models.Course || model("Course", courseSchema);
