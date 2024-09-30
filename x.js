const mongoose = require('mongoose');

const connectDb = () => {
    mongoose.set('strictQuery', false)
        .connect(process.env.MONGODB_URI)
        .then((result) => console.log(`Database connected: ${result}`))
        .catch((err) => console.log(err));
}


const Schema = mongoose.Schema;
let PostSchema = new Schema([{
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    apdatedAt: {
        type: Date,
        default: Date.now
    }
}]);

//module.exports = mongoose.model('Post', PostSchema);









// const express = require('express');
// const router = express.Router();
// const Post = require('../models/post');
// const User = require('../models/user');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const adminLayout = '../views/layouts/admin';
// const jwtSecret = process.env.JWT_SECRET;

// /**
//  * 
//  * Check Login
//  */
// const authMiddleware = (req, res, next) => {
//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }

//     try {
//         const decoded = jwt.verify(token, jwtSecret);
//         req.userId = decoded.userId;
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
// }



// /**
//  * GET /
//  * Admin - Login Page
//  */

// router.get('/admin', async(req, res) => {
//     try {
//         const locals = {
//             title: "Admin",
//             description: "Simple Blog created with NodeJS, Express & MongoDb."
//         }

//         res.render('admin/index', { locals, layout: adminLayout });
//     } catch (error) {
//         console.log(error);
//     }
// });


// /**
//  * POST /
//  * Admin - Check Login
//  */

// router.post('/admin', async(req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = await User.findOne({ username });
        
//         if (!user) {
//             return res.status(401).json({ message: 'invalid credentials' });
//         }
//         const isPasswordValid = await bcrypt.compare(password, user.password);

//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'invalid credentials' });
//         }

//         const token = jwt.sign({ userId: user._id }, jwtSecret);
//         res.cookie('token', token, { httpOnly: true });
//         res.redirect('/dashboard');
//     } catch (error) {
//         console.log(error);
//     }
// });

// /**
//  * GET /
//  * Admin - Dashboard
//  */

// router.get('/dashboard', authMiddleware, async (req, res) => {
//     try {
//         const locals = {
//             title: "Dashboard",
//             description: "Simple Blog created with NodeJS, Express & MongoDb."
//         }

//         const posts = await Post.find();
//         res.render('admin/dashboard', {
//             locals,
//             posts
//     });
//     } catch (error) {
        
//     }
// });

// // router.post('/admin', async(req, res) => {
// //     try {
// //         const { username, password } = req.body;
// //         console.log(req.body);

// //         if (req.body.username === 'admin' && req.body.password === 'password') {
// //             res.send('You are Logged in.');
// //         } else {
// //             res.send('Wrong username or password');
// //         }

// //         res.redirect('/admin');
// //     } catch (error) {
// //         console.log(error);
// //     }
// // });

// /**
//  * POST /
//  * Admin - Register
//  */

// router.post('/register', async(req, res) => {
//     try {
//         const { username, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);

//         try {
//             const user = await User.create({ username, password: hashedPassword });
//             res.status(201).json({ message: 'user Created', user });
//         } catch(error) {
//             if (error.code === 11000) {
//                 res.status(409).json({ message: 'User already in use' });
//             } else {
//                 res.status(500).json({ message: 'Internal server Error' });
//             }
//         }
//     } catch (error) {
//         console.log(error);
//     }
// });

// module.exports = router;