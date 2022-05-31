// uuden blogin luominen omassa komponentissaan

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
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          kirjoittaja:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          linkki:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">Luo uusi</button>
      </form>
     </div>
   )
}
 
export default BlogForm
