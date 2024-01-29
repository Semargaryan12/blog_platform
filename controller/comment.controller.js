const Comment = require('../model/comment.model');
const BlogPost = require('../model/blogPosts.model');
// const { SuccessHandlerUtil } = require('../utils');
// import { SuccessHandlerUtil } from '../utils';
const { SuccessHandlerUtil } = require('../utils/success-handler.util');



async function addComment(req, res) {
    try {
        const { postId } = req.params;
        const { text } = req.body;
        const postExists = await BlogPost.findById(postId);
        if (!postExists) {
           return res.status(404).send({ message: 'Blog post not found' });
        }

        const newComment = new Comment({
            text,
            author: req.userId,
            post: postId
        });

        await newComment.save();
        return res.status(201).send(newComment);
    } catch (error) {
        console.log(error);
       return res.status(500).json( { message: 'Error adding comment' });
    }
};

async function getCommentsByPost(req, res) {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ post: postId }).populate('author', 'username');
       return res.status(201).send(comments);
    } catch (error) {
        console.log(error);
       return res.status(500).json({ message: 'Error retrieving comments' });
    }
};

async function deleteComment(ras, res) {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId);

        if (!comment) {
           return res.status(404).send({ message: 'Comment not found' });
        }

        if (comment.author.toString() !== req.userId) {
           return res.status(409).send({ message: 'Not authorized to delete this comment' });
        }

        await comment.remove();
       return res.status(201).send({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json( { message: 'Error deleting comment' });
    }
};

module.exports = {
    addComment, getCommentsByPost, getCommentsByPost, deleteComment
}