import { Schema, model, models } from "mongoose"

const SubcategoriesSchema = new Schema({
  title: String,
  info_title_1: String,
  info_text_1: String,
  info_title_2: String,
  info_text_2: String,
  info_title_3: String,
  info_text_3: String,
  info_title_4: String,
  info_text_4: String,
})

export default models.Subcategories ||
  model("Subcategories", SubcategoriesSchema)
