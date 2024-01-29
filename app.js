const authRouter = require('./router/auth.router');
const blogPostRouter = require('./router/blogPost.router');
const blogPostComment = require('./router/comment.router');
const client_URL = process.env.CLIENT_URL;
const morgan = require('morgan');
const cors = require('cors');
const express = require("express");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    origin: client_URL,
    methods: 'GET, POST, DELETE, PUT'
}));

app.use('/api/auth', authRouter);
app.use('/api/post', blogPostRouter);
app.use('/api', blogPostComment);

module.exports = app;
