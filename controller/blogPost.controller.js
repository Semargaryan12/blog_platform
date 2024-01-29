const { BlogPost } = require('../model/blogPosts.model');
// const { SuccessHandlerUtil } = require('../utils');
// import { SuccessHandlerUtil } from '../utils';
const { SuccessHandlerUtil } = require('../utils/success-handler.util');



async function createPost(req, res) {
    try {
        const { title, body, userId } = req.body;

        const newPost = new BlogPost({
            title,
            body,
            author: userId
        });

        await newPost.save();

        return res.status(201).send( { message: 'Post created successfully' });
    } catch (error) {
        console.log(error);
       return res.status(500).json({ message: 'Error creating post' });
       
    }
}



async function getAllPosts(req, res) {
    try {
        const posts = await BlogPost.find().populate('author');
        return res.status(200).send( posts);
    } catch (error) {
        console.log(error);
       return res.status(500).json( { message: 'Error retrieving posts' });
    }
};





async function updatePost(req, res) {
    const { userId, title, body } = req.body;
    const { _id } = req.params
    try {
        const post = await BlogPost.findOne({ _id, author: userId });
        if (!post) {
            return res.status(404).send( { message: 'Post not found or user not authorized' });
        }

        post.title = title;
        post.body = body;
        post.updatedAt = new Date();
        await post.save();

        return res.status(200).send( post);
    } catch (error) {
        console.log(error);
       return res.status(500).json( { message: 'Error updating the post' });
    }
};

async function deletePost(req, res) {
    const { _id } = req.params;
    const { userId } = req.body
    try {
        const post = await BlogPost.findOneAndDelete({ _id, author: userId });
        if (!post) {
            return res.status(404).json({ message: 'Post not found or user not authorized' });
        }
        return res.status(201).send( { message: "Post deleted Succesfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json( { message: 'Error deleting the post' });
    }
};


module.exports = {
    createPost,
    getAllPosts,
    updatePost,
    deletePost
};