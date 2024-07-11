const AnimeCategory = require("../models/animeCategory");
const Anime = require("../models/anime");
const asyncHandler = require("express-async-handler");

// display all Anime categories
exports.anime_category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await AnimeCategory.find({}, "category_name")
    .sort({ category_name: 1 })
    .exec();

  res.render("category_list", {
    title: "Anime Categories",
    anime_categories: allCategories,
  });
});

// display detail page for specific anime category
exports.anime_category_detail = asyncHandler(async (req, res, next) => {
  const [animeCategory, anime] = await Promise.all([
    AnimeCategory.findById(req.params.id).exec(),
    Anime.find({ anime_category: req.params.id }).exec(),
  ]);

    if (animeCategory === null) {
        // no result
        const err = new Error("Category not found ");
        err.status = 404;
        return next(err)
    }
    console.log(animeCategory)
    res.render("Anime_category_detail", {
        title: animeCategory.category_name,
        anime_category: animeCategory,
        animeFound:anime,
    })
});

// display anime category create form
exports.anime_category_create_get = (req, res, next) => {
  res.render("category_form",{title: "Create Category"});
};

//  handle anime create post
exports.anime_category_create_post = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  res.send("NOT IMPLEMENTED: Anime category create post");
});

//  handle anime delete get
exports.anime_category_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Anime category delete get");
});

//  handle anime delete post
exports.anime_category_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Anime category delete post");
});
//  display anime update get form
exports.anime_category_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Anime category update get");
});
//  handle anime update post
exports.anime_category_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Anime category update post");
});
