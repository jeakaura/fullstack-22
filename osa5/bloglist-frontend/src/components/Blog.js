import TogglableText from "./TogglableText"

const Blog = ({blog,paivitaTykkays}) => {
  const tykkaa = () => {
    const { id, author, url, title, } = blog
    if (blog.likes == null) {
      blog.likes = 0
    }
    const paivitetty = {
      title,
      author,
      url,
      likes: blog.likes + 1,
      user: blog.user?.id || blog.user,
    }
    paivitaTykkays(id, paivitetty)
  }

  return(
    <li className="blog">
    <b>{blog.title}</b> {blog.author}
    <TogglableText buttonLabel="Avaa">
      <small>
      Aihe: <i> {blog.title} </i>
      <br />
      Kirjoittaja: <i> {blog.author} </i>
      <br />
      Tykkäykset: <i> {blog.likes} </i>
      <button onClick={tykkaa}>Tykkää</button>
      <br />
      Osoite: <i> {blog.url} </i>
      </small>
    </TogglableText>
  </li>
  )
}

export default Blog