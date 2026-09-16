document.addEventListener("DOMContentLoaded", () => {
    const likeBtn = document.querySelector(".like-btn");
    const likesCountSpan = likeBtn.querySelector(".likes-count");
    const likesSubcount = document.querySelector(".likes-subcount");
    const postMedia = document.querySelector(".post-media");
    const bookmarkBtn = document.querySelector(".bookmark-btn");
    const likeSvg = likeBtn.querySelector("svg");

    // Elementos do sistema de comentários
    const commentBtn = document.querySelector(".comment-btn");
    const commentsModal = document.getElementById("commentsModal");
    const closeCommentsBtn = document.querySelector(".close-comments");
    const commentInput = document.getElementById("commentInput");
    const sendCommentBtn = document.getElementById("sendCommentBtn");
    const commentsList = document.querySelector(".comments-list");
    const commentsCountSpan = document.querySelector(".comments-count");

    let baseLikes = 10000; // Começa em 10.000 curtidas exatas
    let totalComments = 142;
    let isLiked = false;

    // Formata números para o padrão K (ex: 10.0K)
    function formatLikes(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    }

    // Atualiza os textos de curtidas na interface
    function updateLikesUI() {
        likesCountSpan.textContent = formatLikes(baseLikes);
        likesSubcount.textContent = `outras ${baseLikes.toLocaleString('pt-BR')} pessoas`;
    }

    // Animação visual do ícone
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
            updateLikesUI();
            animateHeart(likeSvg);
        }
    }

    // Função para descurtir
    function removeLike() {
        if (isLiked) {
            isLiked = false;
            baseLikes = Math.max(10000, baseLikes - 1); // Nunca baixa de 10.000
            likeBtn.classList.remove("liked");
            updateLikesUI();
            animateHeart(likeSvg);
        }
    }

    // Evento no botão curtir
    likeBtn.addEventListener("click", () => {
        if (isLiked) {
            removeLike();
        } else {
            addLike();
        }
    });

    // Evento de duplo clique na foto de Hogwarts
    if (postMedia) {
        postMedia.addEventListener("dblclick", () => {
            addLike();
        });
    }

    // Evento no botão Salvar
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

    // --- LÓGICA DE COMENTÁRIOS ---
    commentBtn.addEventListener("click", () => {
        commentsModal.classList.add("active");
    });

    closeCommentsBtn.addEventListener("click", () => {
        commentsModal.classList.remove("active");
    });

    function addNewComment() {
        const text = commentInput.value.trim();
        if (text !== "") {
            const commentDiv = document.createElement("div");
            commentDiv.classList.add("comment-item");
            commentDiv.innerHTML = `<strong>hermione.granger</strong> ${text}`;
            commentsList.appendChild(commentDiv);
            
            commentInput.value = "";
            commentsList.scrollTop = commentsList.scrollHeight;

            // Incrementa contador de comentários
            totalComments++;
            commentsCountSpan.textContent = totalComments;
        }
    }

    sendCommentBtn.addEventListener("click", addNewComment);
    commentInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addNewComment();
        }
    });
});