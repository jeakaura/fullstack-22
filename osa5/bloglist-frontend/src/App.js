import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Käyttäjätunnus tai salasana ei kelpaa')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleUusiBlogi = async (event) => {
    event.preventDefault()

    try {
      await blogService.create({
        title, author, url,
      })

      setTitle('')
      setAuthor('')
      setUrl('')

      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    } catch (exception) {
      setErrorMessage('Virhe uuden blogin luonnissa')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Blogit - Kirjaudu</h2>
        <form onSubmit={handleLogin}>
          <div>
            käyttäjätunnus
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            salasana
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">kirjaudu sisään</button>
        </form>
        <Notification message={errorMessage} />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogit</h2>
      <p>{user.name} kirjautunut sisään 
      <button onClick={handleLogout} type="button">Kirjaudu ulos</button>
      </p>
      <h3>Luo uusi</h3>
      <form onSubmit={handleUusiBlogi}>
        <div>
          otsikko:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          kirjoittaja:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          linkki:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">luo uusi</button>
      </form>
      <Notification message={errorMessage} />
      <h3>Käyttäjän blogilista</h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
