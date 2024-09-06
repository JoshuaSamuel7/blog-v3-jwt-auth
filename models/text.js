const mongoose = require('mongoose');

const textSchema = {
    title: String,
    content: String,
    author: String
}
const Text = mongoose.model("Text", textSchema);
module.exports = Text;