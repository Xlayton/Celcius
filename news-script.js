let newsStories = []

//There's a soft limit of 21 stories because API stuff :\
function getNews(numOfStories = 10) {
    newsStories = []
    fetch("http://newsapi.org/v2/top-headlines?country=us&q=weather&apiKey=20ba8aef150a4b599827f02a43125c32")
        .then(res => res.json())
        .then(data => {
            console.log(1, data)
            newsStories.push(...data.articles)
            if (newsStories.length < 10) {
                fetch("http://newsapi.org/v2/top-headlines?country=us&category=science&apiKey=20ba8aef150a4b599827f02a43125c32")
                    .then(res => res.json())
                    .then(data => {
                        console.log(2, data)
                        let fillerStories = data.articles.slice(newsStories.length > 0 ? newsStories.length - 1 : newsStories.length, newsStories.length > 0 ? numOfStories - 1 : numOfStories)
                        newsStories.push(...fillerStories)
                        updateNewsArticles()
                    })
            } else {
                updateNewsArticles()
            }
        })
}

function updateNewsArticles() {
    let container = document.getElementById("news-articles")
    let newsStoryRotation = [0, 1, 1, 0]
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    newsStories.forEach((article, index) => {
        let articleDiv = document.createElement("div");
        articleDiv.classList.add(`news-article${newsStoryRotation[index % 4]}`, "article")
        articleDiv.addEventListener("click", () => {
            window.open(article.url, "_blank")
        })
        let articleTitle = document.createElement("h2")
        articleTitle.classList.add("article-title")
        articleTitle.innerText = `${article.title}`
        let articleDesc = document.createElement("p")
        articleDesc.classList.add("article-desc")
        articleDesc.innerText = `${article.description}`
        let articleImage = document.createElement("img")
        articleImage.classList.add("article-img")
        articleImage.src = `${article.urlToImage}`
        articleDiv.append(articleImage, articleTitle, articleDesc)
        container.appendChild(articleDiv);

    })
}

window.onload = function () {
    getNews();
}