const AnimeCategory = require("../models/animeCategory");
const asyncHandler = require("express-async-handler");



// display all Anime categories
exports.anime_category_list = asyncHandler(async (req,res,next) => {
    res.send("NOT Implemented: Anime category list");
});

// display detail page for specific anime category
exports.anime_category_detail = asyncHandler(async (req,res,next) => {
    res.send(`NOT IMPLEMENTED: Anime category detail: ${req.params.id}`);
})

// display anime category create form
exports.anime_category_create_get = asyncHandler(async (req,res,next) => {
    res.send("NOT IMPLEMENTED: Anime category create get");
})

//  handle anime create post
exports.anime_category_create_post = asyncHandler(async (req,res,next) => {
    res.send("NOT IMPLEMENTED: Anime category create post");
})

//  handle anime delete get
exports.anime_category_delete_get = asyncHandler(async (req,res,next) => {
    res.send("NOT IMPLEMENTED: Anime category delete get");
})

//  handle anime delete post
exports.anime_category_delete_post = asyncHandler(async (req,res,next) => {
    res.send("NOT IMPLEMENTED: Anime category delete post");
})
//  display anime update get form
exports.anime_category_update_get = asyncHandler(async (req,res,next) => {
    res.send("NOT IMPLEMENTED: Anime category update get");
})
//  handle anime update post
exports.anime_category_update_post = asyncHandler(async (req,res,next) => {
    res.send("NOT IMPLEMENTED: Anime category update post");
})