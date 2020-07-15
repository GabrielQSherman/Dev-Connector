const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const router = require("express").Router();
// const validator = require("validator");
// const bcrypt = require("bcrypt");
// const secret = process.env.JWT_SECRET;
// const jwt = require("jsonwebtoken");

const userAuth = require('../middleware/userAuth');
const validatePost = require('../middleware/validatePost');
const validateComment = require('../middleware/validateComment');

//POST route for Post
//localhost:4000/post
//@desc post/make a new post and store in post collection, add to users post array
//@path (server path)/post/
//@access private
router.post(
    '/',
    userAuth,
    validatePost, 
    async (req, res) => {

        try {

            const newPost = await Post.create(req.post);

            await User.updateOne(
                {_id: req.userId}, 
                {$push: {posts: newPost._id}}
            )

            res.json({post: newPost});
            
        } catch (err) {
            const errMsg = err.message || err;
            res.status(500).json({error: errMsg})
        }
    
    }

)

//DELETE route for Post
//localhost:4000/post
//@desc DELETE a new post from post collection,and users post array
//@path (server path)/post/:id
//@access private
router.delete(
    '/:id',
    userAuth, 
    async (req, res) => {

        const postId = req.params.id.trim();

        if (!postId || postId.length != 24) {
            res.status(400).json({error: 'Invalid Post Id Given'});
        }

        try {

            const deleted = await Post.findOneAndDelete(
                {_id: postId, user: res.userId}
            )

            if (deleted === null) {
                return res.status(401).json({error: 'Not Authorized To Delete'})
            }
            
            console.log(deleted);

            await User.updateOne(
                {_id: req.userId}, 
                {$pull: {posts: newPost._id}}
            )

            res.json({message: 'post deleted'});
            
        } catch (err) {
            const errMsg = err.message || err;
            res.status(500).json({error: errMsg})
        }
    
    }

)

//PUT route for liking a post (req.body.dislike = true if trying to dislike)
//localhost:4000/like/:id
//@desc like a post, if already like, it will be unliked
//@path (server path)/post/like/:id
//@access private (need to be signed in)
router.put(
    '/like',
    userAuth,
    async (req, res) => {

        const postId = req.body.id.trim(),
              isDislike = req.body.dislike;

        if (!postId || postId.length != 24) {
            res.status(400).json({error: 'Invalid Post Id Given'});
        }

        try {

            if (!isDislike) {
                await Post.findOneAndUpdate(
                    {_id: postId},
                    {$addToSet: {likes: req.userId}}
                )

                await User.findOneAndUpdate(
                    {_id: req.userId},
                    {$addToSet: {likedPosts: postId}}
                )
            } else {
                await Post.findOneAndUpdate(
                    {_id: postId},
                    {$pull: {likes: req.userId}}
                )

                await User.findOneAndUpdate(
                    {_id: req.userId},
                    {$pull: {likedPosts: postId}}
                )
            }

            res.json({message: isDislike ? 'disliked' : 'liked'})

            
        } catch (err) {
            const errMsg = err.message || err;
            res.status(500).json({error: errMsg})
        }

    }
)

//POST route for Comment
//localhost:4000/comment/:id
//@desc post/make a new comment and store in Comment collection, add to Post's comment array
//@path (server path)/post/comment/:id
//@access private (need to be signed in)
router.post(
    '/comment/:id',
    userAuth,
    validateComment, 
    async (req, res) => {

        const postId = req.params.id.trim();

        if (!postId || postId.length != 24) {
            res.status(400).json({error: 'Invalid Post Id Given'});
        }

        try {

            const newCom = await Comment.create(req.comment);

            await Post.updateOne(
                {_id: postId}, 
                {$push: {comments: newCom._id}}
            )

            res.json({comment: newCom});
            
        } catch (err) {
            const errMsg = err.message || err;
            res.status(500).json({error: errMsg})
        }
    
    }

)



module.exports = router;