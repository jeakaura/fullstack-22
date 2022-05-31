import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Footer from './components/Footer'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()

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
      setErrorMessage('Virhe: Käyttäjätunnus tai salasana ei kelpaa')
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
      blogFormRef.current.toggleVisibility()
      setErrorMessage(`Uusi blogi: "${title}", kirjoittajalta: "${author}" lisättiin!`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 10000)

      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    } catch (exception) {
      setErrorMessage('Virhe: Uuden blogin luominen ei onnistunut')
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
        <h1>Blogit</h1>
        <Notification message={errorMessage} />
        <h3>Kirjaudu sisään</h3>
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
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <h1>Blogit</h1>
      <Notification message={errorMessage} />
      <p>{user.name} on kirjautunut sisään 
      <button onClick={handleLogout} type="button">Kirjaudu ulos</button>
      </p>
      
      <Togglable buttonLabel='Luo uusi' ref={blogFormRef}>
        <BlogForm 
          handleUusiBlogi={handleUusiBlogi}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          title={title}
          author={author}
          url={url}
        />
      </Togglable>

      <h3>Blogilista</h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <Footer />
    </div>
  )
}

export default App
