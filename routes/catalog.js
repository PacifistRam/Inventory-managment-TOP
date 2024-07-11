const express = require("express");
const router = express.Router();

// Require controller modules
const anime_controller = require("../controllers/animeController");
const anime_category_controller = require("../controllers/animeCategoryController");

// ___Anime Routes__ ////

// GET catalog home page
router.get("/",anime_controller.index)

// GET request for creating an anime
router.get("/anime/create",anime_controller.anime_create_get)

// POST request for handling creation of an anime
router.post("/anime/create",anime_controller.anime_create_post)

// GET request for deleting an anime
router.get("/anime/:id/delete",anime_controller.anime_delete_get)

// POST request for handling delete  anime
router.post("/anime/:id/delete",anime_controller.anime_delete_post)

// GET request for  updating an  anime
router.get("/anime/:id/update",anime_controller.anime_update_get)

// POST request for  handling updating of an  anime
router.post("/anime/:id/post",anime_controller.anime_update_post)

// get request for  single  anime
router.get("/anime/:id/",anime_controller.anime_detail)

// get request for  all  anime's
router.get("/anime",anime_controller.anime_list)

//  ___Anime Category Routes__ //



// GET request for creating an anime category
router.get("/category/create",anime_category_controller.anime_category_create_get)

// POST request for handling creation of an anime category
router.post("/category/create",anime_category_controller.anime_category_create_post)

// GET request for deleting an anime category
router.get("/category/:id/delete",anime_category_controller.anime_category_delete_get)

// POST request for handling delete  anime category
router.post("/category/:id/delete",anime_category_controller.anime_category_delete_post)

// GET request for  updating an  anime category
router.get("/category/:id/update",anime_category_controller.anime_category_update_get)

// POST request for  handling updating of an category  anime
router.post("/category/:id/post",anime_category_controller.anime_category_update_post)

// GET request for  single  category anime
router.get("/category/:id",anime_category_controller.anime_category_detail)

// GET request for  all  category anime
router.get("/category",anime_category_controller.anime_category_list)


module.exports = router;