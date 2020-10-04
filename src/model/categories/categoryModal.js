const mongoose = require("mongoose");
const { slugify } = require('../../helpers');

const CategorySchema = new mongoose.Schema({
        name: String,
        slug: { type: String, index: true },
        parent: {
          type: mongoose.Schema.Types.ObjectId,
          default: null,
          ref: 'Category'
        },
        ancestors: [{
             _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
                index: true
        },
             name: String,
             slug: String
        }]
});

CategorySchema.pre('save', async function (next) {
        this.slug = slugify(this.name);
        next();
});

module.exports = mongoose.model("category",CategorySchema);