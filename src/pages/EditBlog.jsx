import { useEffect, useState } from "react";
import { getBlogById, updateBlog } from "../api/blogApi";
import { useParams, useNavigate } from "react-router-dom";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
  });

  useEffect(() => {
    getBlogById(id).then((res) => setForm(res.data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateBlog(id, form);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h2>Edit Blog</h2>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
      />
      <br />

      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
      />
      <br />

      <input
        name="author"
        value={form.author}
        onChange={handleChange}
      />
      <br />

      <button type="submit">Update</button>
    </form>
  );
}
