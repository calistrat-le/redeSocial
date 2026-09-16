
document.addEventListener("DOMContentLoaded", () => {
    const likeBtn = document.querySelector(".like-btn");
    const likesCountSpan = likeBtn.querySelector(".likes-count");
    const postMedia = document.querySelector(".post-media");
    const bookmarkBtn = document.querySelector(".bookmark-btn");
    const likeSvg = likeBtn.querySelector("svg");

    let baseLikes = 0; // Começa em 0
    let isLiked = false;

    // Formata números para o padrão 1.2K se passar de 1000
    function formatLikes(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    }

    // Animação visual do coração
    function animateHeart(svgElement) {
        svgElement.style.transform = "scale(1.4)";
        setTimeout(() => {
            svgElement.style.transform = "scale(1)";
        }, 150);
    }

    // Função para curtir
    function addLike() {
        if (!isLiked) {
            isLiked = true;
            baseLikes++;
            likeBtn.classList.add("liked");
            likesCountSpan.textContent = formatLikes(baseLikes);
            animateHeart(likeSvg);
        }
    }

    // Função para descurtir
    function removeLike() {
        if (isLiked) {
            isLiked = false;
            baseLikes = Math.max(0, baseLikes - 1);
            likeBtn.classList.remove("liked");
            likesCountSpan.textContent = formatLikes(baseLikes);
            animateHeart(likeSvg);
        }
    }

    // Evento de clique no botão de curtir (alterna entre curtir e descurtir)
    likeBtn.addEventListener("click", () => {
        if (isLiked) {
            removeLike();
        } else {
            addLike();
        }
    });

    // Evento de duplo clique na imagem principal (Sempre curte)
    if (postMedia) {
        postMedia.addEventListener("dblclick", () => {
            addLike();
        });
    }

    // Evento no botão de SALVAR (Bookmark)
    if (bookmarkBtn) {
        let isBookmarked = false;
        bookmarkBtn.addEventListener("click", () => {
            isBookmarked = !isBookmarked;
            bookmarkBtn.classList.toggle("bookmarked", isBookmarked);
            const svgBookmark = bookmarkBtn.querySelector("svg");
            if (svgBookmark) {
                animateHeart(svgBookmark);
            }
        });
    }
});