const Blog = ({blog}) => (
  <li className="blog">
    <b>{blog.title}</b> {blog.author}
  </li>  
)

export default Blog