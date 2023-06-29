import { Schema, model, models } from "mongoose"

const SectionSchema = new Schema({
  title: String,
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Categories",
    },
  ],
  text: String,
})

export default models.Sections || model("Sections", SectionSchema)
