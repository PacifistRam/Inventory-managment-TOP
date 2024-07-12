const AnimeCategory = require("../models/animeCategory");
const Anime = require("../models/anime");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
    return next(err);
  }
  console.log(animeCategory);
  res.render("Anime_category_detail", {
    title: animeCategory.category_name,
    anime_category: animeCategory,
    animeFound: anime,
  });
});

// display anime category create form
exports.anime_category_create_get = (req, res, next) => {
  res.render("category_form", { title: "Create Category" });
};

//  handle anime create post
exports.anime_category_create_post = [
  // validate and sanitize form fields
  body("categoryName")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage(
      "category name can't be less than 3 characters or more than 30 characters "
    )
    .matches(/^([^\d\s][a-zA-Z\d]*)+(\s+[^\d\s][a-zA-Z\d]*)*$/)
    .withMessage("category name cannot start with a no")
    .escape(),

  body("categoryDesc")
    .trim()
    .isLength({ min: 30 })
    .withMessage("Description should have more than 30 characters")
    .matches(/^[\w\s!"#$%&'(),\-./]*$/)
    .withMessage("description cannot contain symbols or special character"),
    

  body("categoryDesc").customSanitizer((value) => {
    // Replace multiple spaces with a single space
    return value.replace(/\s+/g, " ");
  }),

  // process request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body)
    // crate a category object
    const animeCategory = new AnimeCategory({
      category_name: req.body.categoryName,
      category_desc: req.body.categoryDesc,
    });

    if (!errors.isEmpty()) {
      // there are errors, so rerender the form displaying errors
      res.render("category_form", {
        title: "Create Category",
        categoryData: animeCategory,
        errors: errors.array(),
      });
      return;
    } else {
      // Data is valid.
      // Check if Category already exists
      const categoryExists = await AnimeCategory.findOne({
        name: req.body.categoryName,
      }).collation({ locale: "en", strength: 2 });
      if (categoryExists) {
        res.redirect(categoryExists.url);
      } else {
        await animeCategory.save();
        // new category saved
        res.redirect(animeCategory.url);
      }
    }
  }),
];

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
