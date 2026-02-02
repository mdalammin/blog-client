import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// ping
export const pingServer = () => API.get("/ping");

// blogs
export const getBlogs = () => API.get("/api/blogs");
export const getBlogById = (id) => API.get(`/api/blogs/${id}`);
export const createBlog = (data) => API.post("/api/blogs", data);
export const updateBlog = (id, data) =>
  API.put(`/api/blogs/${id}`, data);
export const deleteBlog = (id) =>
  API.delete(`/api/blogs/${id}`);
