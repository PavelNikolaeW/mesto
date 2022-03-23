let likes = document.querySelectorAll('.card__button');

if (likes.length > 0) {
    for (let i = 0; i < likes.length; i++) {
        const like = likes[i];
        like.addEventListener('click', function() {
            like.classList.toggle('like');
        })
    }
}