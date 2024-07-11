const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AnimeCategorySchema = new Schema({
    category_name:{type:String,required:true,maxLength:100},
    category_desc:{type:String,required:true},
});

AnimeCategorySchema.virtual("url").get(function(){
    // we don't use arrow function as we'll need the this object
    return `/catalog/category/${this._id}`;
})

module.exports = mongoose.model("AnimeCategory",AnimeCategorySchema);