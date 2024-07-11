#! /usr/bin/env node

console.log(
  'This script populates some anime title and categories. Specified database as argument -e.g.:node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority" '
);

// get argument passed on command line
const userArgs = process.argv.slice(2);

const AnimeCategory = require("./models/animeCategory");
const Anime = require("./models/anime");

const animeCategories = [];
const animes = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createAnimeCategory();
  await createAnime();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}
// We pass the index to the ...Create functions so that, for example,animeCategory[0] will always be the Action genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function animeCategoryCreate(index, name, desc) {
  const animeCategory = new AnimeCategory({
    category_name: name,
    category_desc: desc,
  });
  await animeCategory.save();
  animeCategories[index] = animeCategory;
  console.log(`Added category: ${name}`);
}

async function animeCreate(
  index,
  anime_title,
  anime_desc,
  category,
  rating,
  episodes,
  status,
  d_start,
  d_end
) {
  const animedetail = {
    anime_title: anime_title,
    anime_desc: anime_desc,
    anime_category: category,
    rating: rating,
    episodes: episodes,
    status: status,
  };
  if (d_start != false) animedetail.date_started = d_start;
  if (d_end != false) animedetail.date_ended = d_end;

  const anime = new Anime(animedetail);

  await anime.save();
  animes[index] = anime;
  console.log(`Added anime: ${anime_title}`);
}

async function createAnimeCategory() {
  console.log("Adding categories");
  await Promise.all([
    animeCategoryCreate(
      0,
      "Action",
      "Action category is all about fast-paced, adrenaline-fueled action scenes. It features high-stakes battles, dynamic fight scenes, and exciting chases."
    ),
    animeCategoryCreate(
      1,
      "Comedy",
      "This category often features comedic situations, quirky characters, and lighthearted humour"
    ),
    animeCategoryCreate(
      2,
      "Fantasy",
      "Fantasy category contains shows which are set in fantastical, often dreamy worlds"
    ),
  ]);
}

async function createAnime() {
  console.log("Adding Anime");
  await Promise.all([
    animeCreate(
      0,
      "Dragon Ball Z",
      "Five years after winning the World Martial Arts tournament, Gokuu is now living a peaceful life with his wife and son. This changes, however, with the arrival of a mysterious enemy named Raditz who presents himself as Gokuu's long-lost brother. He reveals that Gokuu is a descendant of the once powerful but now virtually extinct Saiyan race, whose homeworld was annihilated. When he was sent to Earth as a baby, Gokuu's sole purpose was to conquer and destroy the planet; but after suffering amnesia from a head injury, his violent and savage nature changed, and instead was raised as a kind and well-mannered boy, now fighting to protect others.",
      animeCategories[0],
      8,
      291,
      " Finished Airing",
      "1989-04-26",
      "1996-01-31"
    ),
    animeCreate(
      0,
      "One Piece",
      "Barely surviving in a barrel after passing through a terrible whirlpool at sea, carefree Monkey D. Luffy ends up aboard a ship under attack by fearsome pirates. Despite being a naive-looking teenager, he is not to be underestimated. Unmatched in battle, Luffy is a pirate himself who resolutely pursues the coveted One Piece treasure and the King of the Pirates title that comes with it.",
      animeCategories[0],
      9,
      1200,
      " Currently Airing",
      "1999-10-20"
    ),
    animeCreate(
      0,
      "Gintama",
      'Edo is a city that was home to the vigor and ambition of samurai across the country. However, following feudal Japan\'s surrender to powerful aliens known as the "Amanto," those aspirations now seem unachievable. With the once-influential shogunate rebuilt as a puppet government, a new law is passed that promptly prohibits all swords in public.',
      animeCategories[1],
      9,
      201,
      " Finished Airing",
      "2006-4-4",
      "2010-03-25"
    ),
    animeCreate(
      0,
      "Tower of God",
      'Fame. Glory. Power. Anything in your wildest dreams is possible when you reach the top of the Tower of God. Those lucky enough to be chosen by the tower ascend each floor in hopes of fulfilling their dreams, but to succeed, they must complete dangerous and deadly tests along the way. But there are others who can enter the structure on their own free will; these "irregulars" are feared by many and are said to leave chaos and change in their wake',
      animeCategories[2],
      7,
      13,
      " Finished Airing",
      "2010-06-30",
      "2012-01-09"
    ),
  ]);
}
