const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length == 0)
        return 0
    else
        yhteensa = 0
        for (let i=0; i < blogs.length; i++) {
            yhteensa += blogs[i].likes
        }
        return yhteensa
}

const favoriteBlog = (blogs) => {
    if (blogs.length == 0)
        return 0
    else
        lemppari = blogs[0]
        tykkaykset = 0
        for (let i=0; i < blogs.length; i++) {
            if (tykkaykset < blogs[i].likes) {
                lemppari = blogs[i]
                tykkaykset = blogs[i].likes
            }
        }
        return lemppari
}

const mostBlogs = (blogs) => {
    if (blogs.length == 0)
        return 0
    else
        // eka laitetaan kaikki nimet taulukkoon
        var nimet = []
        for (let i=0; i < blogs.length; i++) {
            nimet.push(blogs[i].author)
        }

        // lasketaan montako kertaa mitäkin nimeä esiintyy
        const counts = {};
        nimet.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });

        // järjestetään esiintyvät nimet mukavasti järjestykseen
        const sortedEntriesByVal = Object.entries(counts).sort(([, v1], [, v2]) => v1 - v2);
        const enitenBlogeja = sortedEntriesByVal[sortedEntriesByVal.length - 1]

        // laitetaan tulos haluttuun lopulliseen muotoon
        const tulos = {
            author: enitenBlogeja[0],
            blogs: enitenBlogeja[1]
          };

        return tulos
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}