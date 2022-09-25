const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', async(req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{
                model: User
            }]
        });
        const post = postData.get({ plain: true });
        console.log(post);
        res.render('singlePostHB', { post });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/newPost', withAuth, async(req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.render('createPostHB', { newPost });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async(req, res) => {
    try {
        const projectData = await Project.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!projectData) {
            res.status(404).json({ message: 'No project found with this id!' });
            return;
        }

        res.status(200).json(projectData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;