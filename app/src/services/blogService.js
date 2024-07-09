import axios from "axios";


const baseURL = "http://localhost:3002/confideconnect/blogs";

// get blogs by creatorId
const getBlogs = async (creatorId) => {
  const response = await axios.get(baseURL+`/filter?creatorId=${creatorId}`);
  return response.data;
}

// create blog
const createBlog = async (blogInfo) => {
  const response = await axios.post(baseURL, blogInfo);
  return response.data;
}

// delete blog by id
const deleteBlog = async (blogId) => {
  const response = await axios.delete(baseURL+`/${blogId}`);
  return response.data;
}
// Fetch all blogs
const adminGetBlogs = async () => {
    const response = await axios.get(baseURL);
    return response.data;
}

// Update blog
const adminUpdateBlog = async (blog) => {
    const response = await axios.put(`${baseURL}/${blog._id}`, blog);
    return response.data;
}

// Delete blog
const adminDeleteBlog = async (id) => {
    const response = await axios.delete(`${baseURL}/${id}`);
    return response.data;
}

// Create blog
const adminCreateBlog = async (newBlog) => {
    const response = await axios.post(baseURL, newBlog);
    return response.data;
}

// Blog service object
export const fetchBlogs = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

const blogService = {  getBlogs, createBlog, deleteBlog, adminCreateBlog, adminDeleteBlog, adminGetBlogs, adminUpdateBlog };

export default blogService;
