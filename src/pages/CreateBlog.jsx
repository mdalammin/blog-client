import { useState } from "react";
import { createBlog } from "../api/blogApi";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBlog(form);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h2>Create Blog</h2>

      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        required
      />
      <br />

      <textarea
        name="content"
        placeholder="Content"
        onChange={handleChange}
        required
      />
      <br />

      <input
        name="author"
        placeholder="Author"
        onChange={handleChange}
      />
      <br />

      <button type="submit">Create</button>
    </form>
  );
}
