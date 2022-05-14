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
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}