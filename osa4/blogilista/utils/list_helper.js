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
  
module.exports = {
    dummy,
    totalLikes
}