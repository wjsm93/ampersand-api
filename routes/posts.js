const express = require('express')
const router = express.Router()
const Post = require('../models/posts')

// Get all
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get all from user
router.get('/user/:user_id', async (req, res) => {
    try {
        const posts = await Post.where('user_id', req.params.user_id)
        res.json(posts)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one
router.get('/:id', getPost, (req, res) => {
    res.json(res.post)
})

// Create
router.post('/', async (req, res) => {
    const post = new Post({
        photo: req.body.photo,
        caption: req.body.caption,
        user_id: req.body.user_id
    })
    try {
        const newPost = await post.save()
        res.status(201).json(newPost)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update
router.patch('/:id', getPost, async (req, res) => {
    if (req.body.caption != null) {
        res.post.caption = req.body.caption
    }
    try {
        const updatedPost = await res.post.save()
        res.json(updatedPost)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Delete
router.delete('/:id', getPost, async (req, res) => {
    try {
        await res.post.remove()
        res.json({ message: 'Post deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getPost(req, res, next) {
    let post
    try {
        post = await Post.findById(req.params.id)
        if (post == null) {
            return res.status(404).json({ message: 'No post found' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.post = post
    next()
}

module.exports = router