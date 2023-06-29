import { Schema, model, models } from "mongoose"

const CategoriesSchema = new Schema({
  title: String,
  subcategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "subcategories",
    },
  ],
  text: String,
})

export default models.Categories || model("Categories", CategoriesSchema)
