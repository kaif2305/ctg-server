const express = require("express");

const cors = require('cors');

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/NewsBlog');

    console.log('db connect')
}
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});


const Contactus = mongoose.model('contactus', contactSchema)

let BlogSchema = new mongoose.Schema({
    title: String,
    genre: String,
    date: String,
    content: String
});

let Blogs = mongoose.model('blogs', BlogSchema)

let HomeArticle1 = new mongoose.Schema({
    genre: String,
    title: String,
    date: String,
    imageUrl: String,
    content: String,
});

let Homearticle1 = mongoose.model("article-1-home", HomeArticle1)

let three_articles = mongoose.Schema({
    imageUrl: String,
    Url: String,
    title: String,
    date: String,
    content: String,
});

let Three_articles = mongoose.model("3-articles", three_articles)

const bodyParser = require('body-parser')

const server = express();

server.use(cors());
server.use(bodyParser.json());

//get data from api
server.get('/article1/:id', async (req, res) => {
    let article1 = await Homearticle1.findOne({ _id: "63bc62b3afcfeefade2b561c" });
    res.json(article1);
});


server.get('/blogs', async (req, res) => {
    let blogs = await Blogs.find({});
    res.json(blogs);
});

server.get('/three_articles', async (req, res) => {
    let Three_article = await Three_articles.find({});
    res.json(Three_article);
});

server.post('/demo', async (req, res) => {
    let Contact = new Contactus();
    Contact.name = req.body.name;
    Contact.email = req.body.email;
    Contact.message = req.body.message;

    const datasave = await Contact.save();


    console.log(datasave)
    res.json(datasave)
})

server.listen(4500, () => {
    console.log('server started')
})