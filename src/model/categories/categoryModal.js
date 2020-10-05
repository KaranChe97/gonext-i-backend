const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
        name: String,
        orgId: { type: mongoose.Schema.Types.ObjectId } 
});

CategorySchema.pre('save', function (next) {
        const words = this.name.split(' ')
        this.name = words
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(' ')
        next()
    })

CategorySchema.index({ name: 1, orgId: 1 },  { unique: true });

module.exports = mongoose.model("category",CategorySchema);