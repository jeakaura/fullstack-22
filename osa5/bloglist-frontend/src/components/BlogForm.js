import PropTypes from 'prop-types'

const BlogForm = ({
  handleUusiBlogi,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url
}) => {
  return (
    <div>
      <h3>Luo uusi</h3>
      <form onSubmit={handleUusiBlogi}>
        <div>
          otsikko:
          <input
            id="blogtitle"
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
            placeholder='write here blog title'
          />
        </div>
        <div>
          kirjoittaja:
          <input
            id="blogauthor"
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          linkki:
          <input
            id="blogurl"
            type="text"
            value={url}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">Luo uusi blogi</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleUusiBlogi: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm
