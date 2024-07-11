const Anime = require("../models/anime");
const AnimeCategory = require("../models/animeCategory");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  // get details of all anime's and categories present in this inventory
  const [numAnimeCategory, numAnime] = await Promise.all([
    AnimeCategory.countDocuments({}).exec(),
    Anime.countDocuments({}).exec(),
  ]);
  res.render("index", {
    title: "Anime Catalog",
    anime_category_count: numAnimeCategory,
    anime_count: numAnime,
  });
});

// display all Anime's
exports.anime_list = asyncHandler(async (req, res, next) => {
  const allAnimes = await Anime.find(
    {},
    "anime_title anime_category rating status episodes"
  )
    .sort({ anime_title:1 })
    .populate("anime_category")
    .exec();
  
    res.render("anime_list",{ title:"Anime List", anime_list:allAnimes})
});

// display detail page for specific anime
exports.anime_detail = asyncHandler(async (req, res, next) => {
  const anime = await Anime.findById(req.params.id).populate("anime_category").exec()

  if(anime === null) {
    // no results
    const err = new Error("Anime not found");
    err.status = 404;
    return next(err);
  }

  res.render("anime_detail",{
    title:anime.anime_title,
    animeCategoryName: anime.anime_category.category_name,
    animeDetails: anime,
  })
});

// display anime create form
exports.anime_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Anime create get");
});

//  handle anime create post
exports.anime_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Anime create post");
});

//  handle anime delete get
exports.anime_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Anime delete get");
});

//  handle anime delete post
exports.anime_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Anime delete post");
});
//  display anime update get form
exports.anime_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Anime update get");
});
//  handle anime update post
exports.anime_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Anime update post");
});
