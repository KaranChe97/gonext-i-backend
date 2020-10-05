const mongoose = require("mongoose");

const TagsSchema = new mongoose.Schema({
        name: String,
});

TagsSchema.index({ name: 1 }, { unique: true });

TagsSchema.pre('save', function (next) {
    const words = this.name.split(' ')
    this.name = words
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ')
    next()
})

module.exports = mongoose.model("tags",TagsSchema);