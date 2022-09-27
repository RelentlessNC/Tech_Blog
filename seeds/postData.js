const { Post } = require('../models');

const postData =

    [{
            "title": "Favorite Programming Language",
            "contents": "My favorite programming language is Python just because I have the most experience with it.",
            "user_id": 1
        },
        {
            "title": "Why Strategy Games are Awesome",
            "contents": "Strategy games teach patience and playing for the long game.  They also teach resource management and priorities.",
            "user_id": 2
        },
        {
            "title": "Drizzt Do'Urden",
            "contents": "Drizzt Do'Urden is a drow elf from the Forgotten Realms books that has been my favorite characters since I first read about him.  He is deadly but has a very compassionate and philosophical soul.",
            "user_id": 3
        }
    ]

function seedPost() {
    Post.bulkCreate(postData);
}

module.exports = seedPost;