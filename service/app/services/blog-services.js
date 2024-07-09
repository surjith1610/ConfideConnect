// services for Blog which defines CRUD operations
import Blog from '../models/blog.js';

export const getAllBlogs = async () => {
    return await Blog.find();
};

export const createBlog = async (blogData) => {
    const newBlog = new Blog(blogData); 
    const savedBlog = await newBlog.save(); 
    return savedBlog; 
};


export const updateBlog = async(id,blogUpdate) => {
    return await Blog.updateOne({_id:id}, blogUpdate, { new: true });
};

export const deleteBlog = async(id) => {
    return await Blog.deleteOne({_id:id});
};

export const filterBlog = async (blogId, creatorId) => {
    let filter = {};

    if (blogId) {
        filter._id = blogId; 
    }

    if (creatorId) {
        filter.creatorId = creatorId; 
    }
    return await Blog.find(filter);
};

export const deleteAllBlogs = async () => {
    return await Blog.deleteMany();
};