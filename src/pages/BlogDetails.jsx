import { useEffect, useState } from "react";
import { getBlogById } from "../api/blogApi";
import { useParams } from "react-router-dom";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    getBlogById(id).then((res) => setBlog(res.data));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <small>Author: {blog.author}</small>
    </div>
  );
}
