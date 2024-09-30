const express = require("express");

const router = express.Router();
const Post = require("../models/post");

// Routes

/**
 * GET
 * Home
 */

router.get("/", async (req, res) => {
  try {
    const locals = {
      title: "NodeJS Blog",
      description: "Simple Blog created with NodeJS, Express & MongoDb.",
    };

    let perPage = 5;
    let page = req.query.page || 1;

    const posts = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("index", {
      locals,
      posts,
      curret: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: "/",
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", (req, res) => {
  res.render("about", {
    currentRoute: "/about",
  });
});

// router.get('/', async(req, res) => {
//     const locals = {
//         title: "NodeJS Blog",
//         description: "Simple Blog created with NodeJS, Express & MongoDb."
//     }

//     try {
//         const posts = await Post.find();
//         res.render('index', { locals, posts });
//     } catch (error) {
//         console.log(error);
//     }
// });

// router.get('/about', (req, res) => {
//     res.render('about');
// });

/**
 * GET
 * Post: id
 */

router.get("/post/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const post = await Post.findById({ _id: id });

    const locals = {
      title: post.title,
      description: "Simple Blog created with NodeJS, Express & MongoDb.",
    };

    res.render("post", { locals, post, currentRoute: `/post/${id}` });
  } catch (error) {
    console.log(error);
  }
});

/**
 * POST
 * Post: id
 */

router.post("/search", async (req, res) => {
  const locals = {
    title: "Search",
    description: "Simple Blog created with NodeJS, Express & MongoDb.",
  };

  try {
    const locals = {
      title: "Search",
      description: "Simple Blog created with NodeJS, Express & MongoDb.",
    };

    let searchTerm = req.body.searchTerm;

    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const posts = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });
    res.render("search", { locals, posts, currentRoute: "/search" });
  } catch (error) {
    console.log(error);
  }
});

function insertPostData() {
  Post.insertMany([
    {
      title: "Deployment of Node.js applications",
      body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments...",
    },
    {
      title: "Authentication and Authorization in Node.js",
      body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries.",
    },
    {
      title: "Understand how to work with MongoDB and Mongoose",
      body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications.",
    },
    {
      title: "build real-time, event-driven applications in Node.js",
      body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js.",
    },
    {
      title: "Discover how to use Express.js",
      body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications.",
    },
    {
      title: "Asynchronous Programming with Node.js",
      body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations.",
    },
    {
      title: "Learn the basics of Node.js and its architecture",
      body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers.",
    },
    {
      title: "NodeJs Limiting Network Traffic",
      body: "Learn how to limit netowrk traffic.",
    },
    {
      title: "Learn Morgan - HTTP Request logger for NodeJs",
      body: "Learn Morgan.",
    },
  ]);
}
// insertPostData();

module.exports = router;
