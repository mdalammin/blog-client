import { useEffect, useState } from "react";
import { getBlogs, deleteBlog } from "../api/blogApi";
import { Link } from "react-router-dom";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const res = await getBlogs();
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    await deleteBlog(id);
    fetchBlogs();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>All Blogs</h2>

      {blogs.map((blog) => (
        <div key={blog._id} style={{ marginBottom: 16 }}>
          <h3>{blog.title}</h3>
          <p>{blog.content.slice(0, 100)}...</p>

          <Link to={`/blog/${blog._id}`}>View</Link>{" | "}
          <Link to={`/edit/${blog._id}`}>Edit</Link>{" | "}
          <button onClick={() => handleDelete(blog._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
