import TogglableText from "./TogglableText"

const Blog = ({blog}) => (
  <li className="blog">
    <b>{blog.title}</b> {blog.author}
    <TogglableText buttonLabel="Avaa">
      <small>
      Aihe: <i> {blog.title} </i>
      <br />
      Kirjoittaja: <i> {blog.author} </i>
      <br />
      Tykkäykset: <i> {blog.likes} </i>
      <br />
      Osoite: <i> {blog.url} </i>
      </small>
    </TogglableText>
  </li>  
)

export default Blog