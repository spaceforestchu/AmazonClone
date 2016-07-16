var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
 Category: {type: Schema.Types.ObjectId, ref: 'Category'},
 name: String,
 price: Number,
 image: String
});


module.export = mongoose.model('Category', ProductSchema);
