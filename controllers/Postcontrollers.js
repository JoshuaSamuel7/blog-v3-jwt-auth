const Text = require("../models/text");
exports.getposts = (req, res) => {
    Text.find()
        .then(response => { res.status(200).json(response) })
        .catch(error => { res.status(500).json("Failed to fetch post") });
}
exports.createPost = (req, res) => {
    const newText = new Text({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });

    newText.save()
        .then(() => res.status(200).send("Text Saved Successfully"))
        .catch(error => res.status(500).send("Failed to save text"));
};
