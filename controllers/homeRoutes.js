const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async(req, res) => {
    try {
        // Get all posts and JOIN with user data
        const postData = await Post.findAll({
            include: [{
                model: User,
                attributes: [
                    'name'
                ]
            }]
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('allPostsHB', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async(req, res) => {
    try {

        const postData = await Post.findAll({
            where: {
                "user_id": req.session.user_id
            },
            include: [User]

        });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('dashboardHB', { posts, logged_in: req.session.logged_in });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/newPost', withAuth, async(req, res) => {
    try {
        res.render('createPostHB', {
            logged_in: req.session.logged_in
        });
        res.status(400);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/newPost', withAuth, async(req, res) => {
    console.log(req.body);
    try {
        console.log(req.session.logged_in);
        const newPost = await Post.create({
            title: req.body.title,
            contents: req.body.contents,
            user_id: req.session.user_id,
        });
        console.log('newPost in .post route: ', newPost);
        res.render('dashboardHB', { newPost });

    } catch (err) {
        res.status(400).json(err);
    }
});



// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async(req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Project }],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('loginHB');
});

module.exports = router;