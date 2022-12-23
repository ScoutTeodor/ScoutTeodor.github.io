window.addEventListener("load", async function loadComments() {
    const container = document.getElementById('comments');
    let comments = []
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/comments')
        comments = await response.json();
    } catch (e) {
        const message = document.createElement("p")
        message.innerHTML = "⚠ Что-то пошло не так"
        container.appendChild(message)
        return
    } finally {
        document.getElementsByClassName("preloader")[0].style.display = "none"
    }


    function randomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let comment_flag = 0;

    comments = comments.filter(function (item, index, array) {
        return (item.id % randomNumber(49, 50) === 0
            && item.id % 2 === comment_flag++ % 2);
    });


    comments.forEach(function (comment, i, comments) {
        const newElement = document.createElement("article");
        const author = document.createElement("div")
        const authorName = document.createElement("p")
        const authorEmail = document.createElement("a")
        const body = document.createElement("p")
        const img = document.createElement("img")

        authorName.innerHTML = comment.name
        authorEmail.href = "mailto: " + comment.email
        authorEmail.innerHTML = comment.email
        body.innerHTML = comment.body
        img.src = "person.png"

        newElement.classList.add("comment")
        author.classList.add("comment_author")
        authorName.classList.add("comment_author_name")
        authorEmail.classList.add("comment_author_email")
        img.classList.add("comment_author_photo")

        author.appendChild(img)
        author.appendChild(authorName)
        author.appendChild(authorEmail)
        newElement.appendChild(author)
        newElement.appendChild(body)
        container.appendChild(newElement)
    });
})