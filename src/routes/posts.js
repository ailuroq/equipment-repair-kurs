const express = require('express');
const Post = require('../controllers/Post');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const result = await Post.getAllPosts();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const name = req.body.name;
        const result = await Post.createPost(name);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/delete', async (req, res, next) => {
    try {
        const {ids} = req.body;
        const result = await Post.deletePosts(ids);
        console.log(result)
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/update/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const result = await Post.updatePost(id, name);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/problems/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await Post.getPotentialCountryDataToDelete(id);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/search', async (req, res, next) => {
    try {
        const data = req.query.data;
        const result = await Post.findPosts(data);
        res.send(result);
    } catch (err) {
        next(err);
    }
});


module.exports = router;
