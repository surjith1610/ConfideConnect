import express from 'express';
import * as blogController from '../controllers/blog-controller.js'

const blogRouter = express.Router();

blogRouter.route('/')
    .get(blogController.getAllBlogs)
    .post(blogController.createBlog)
    .delete(blogController.deleteAllBlogs);

blogRouter.route('/filter')
    .get(blogController.filterBlog);

blogRouter.route('/:id')
    .put(blogController.updateBlog)
    .delete(blogController.deleteBlog);


export default blogRouter;