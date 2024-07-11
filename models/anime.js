const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnimeSchema = new Schema({
  anime_title: { type: String, required: true, maxLength: 100 },
  anime_desc: { type: String, required: true },
  anime_category: {
    type: Schema.Types.ObjectId,
    ref: "AnimeCategory",
    required: true,
  },
  rating: { type: Number, required: true, min: 0, max: 10 },
  status: { type: String, required: true, maxLength: 100 },
  episodes: { type: Number, min: 1, max: 3000 },
  date_started:{type: Date},
  date_ended:{type: Date},
});

AnimeSchema.virtual("url").get(function () {
  // we don't use arrow function as we'll need this thi object
  return `/catalog/anime/${this._id}`;
});

// if i want to precede anime name with category name
// Virtual for anime's URL
// AnimeSchema.virtual("url").get(function () {
//   // Populate the anime_category field to access category_name
//   this.populate("anime_category", "category_name");

//   // Construct and return the URL
//   return `/catalog/${this.anime_category.category_name}/anime/${this._id}`;
// });

// export model
module.exports = mongoose.model("Anime", AnimeSchema);
