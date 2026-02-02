import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: 20, borderBottom: "1px solid #ddd" }}>
      <Link to="/">Blogs</Link> |{" "}
      <Link to="/create">Create Blog</Link>
    </nav>
  );
}
