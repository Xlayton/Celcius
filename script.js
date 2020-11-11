console.log("Working")
fetch("http://newsapi.org/v2/top-headlines?country=us&category=science&apiKey=20ba8aef150a4b599827f02a43125c32")
    .then(res => res.json())
    .then(data => console.log(data))