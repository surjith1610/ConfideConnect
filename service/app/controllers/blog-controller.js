// controller for blog 
import * as blogService from '../services/blog-services.js'
import { setError, setResponse } from './response-handler.js';

export const getAllBlogs = async (request, response) => {
    try{
        const getParams = {...request.filter}
        const allBlogs = await blogService.getAllBlogs();
        setResponse(allBlogs,response);
    }
    catch (error){
        setError(error,response)
    }
}

export const createBlog = async (request, response) => {
    try{
        const createParams = {...request.body};
        const addBlog = await blogService.createBlog(createParams);
        setResponse(addBlog,response)
    }
    catch(error){
        setError(error,response)
    }
}

export const updateBlog = async (request, response) => {
    const { id } = request.params;
    const updatedBlogData = { ...request.body };
    try {
        const updatedBlog = await blogService.updateBlog(id, updatedBlogData);
        setResponse(updatedBlog, response);
    } catch (error) {
        setError(error, response);
    }
}


export const deleteBlog = async (request,response) =>{
    const {id} = request.params;
    try{
        const deletedBlog = await blogService.deleteBlog(id);
        setResponse(deletedBlog, response);
    }
    catch(error){
        setError(error,response)
    }
}

export const filterBlog = async (request,response) =>{
    const{blogId, creatorId} = request.query;
    try{
        const filteredBlogs = await blogService.filterBlog(blogId,creatorId);
        setResponse(filteredBlogs,response)
    }
    catch(error){
        setError(error,response)
    }
};

export const deleteAllBlogs = async (request, response) => {
    try {
        const blogs = await blogService.deleteAllBlogs();
        setResponse(blogs, response);
    } catch (error) {
        setError(error, response);
    }
};