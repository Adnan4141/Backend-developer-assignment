import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const purchaseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "Purchase amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);


purchaseSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default models.Purchase || model("Purchase", purchaseSchema);
