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

    // Elementos de Repostar
    const repostBtn = document.querySelector(".repost-btn");
    const repostCountSpan = document.querySelector(".repost-count");
    const repostSvg = repostBtn.querySelector("svg");
    const toastNotification = document.getElementById("toastNotification");

    // Elementos de Salvar
    const toastBookmark = document.getElementById("toastBookmark");

    // Elementos de Enviar (Harry Potter characters)
    const sendBtn = document.querySelector(".send-btn");
    const sendSvg = sendBtn.querySelector("svg");
    const sendCountSpan = document.querySelector(".send-count");
    const sendModal = document.getElementById("sendModal");
    const closeSendBtn = document.querySelector(".close-send");
    const characterItems = document.querySelectorAll(".character-item");
    const confirmSendBtn = document.getElementById("confirmSendBtn");
    const targetNameSpan = document.getElementById("targetName");
    const toastSend = document.getElementById("toastSend");

    let baseLikes = 10000;
    let totalComments = 142;
    let totalReposts = 84;
    let totalSends = 36;
    let isLiked = false;
    let isBookmarked = false;
    let selectedCharacter = null;

    function formatLikes(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    }

    function updateLikesUI() {
        likesCountSpan.textContent = formatLikes(baseLikes);
        likesSubcount.textContent = `outras ${baseLikes.toLocaleString('pt-BR')} pessoas`;
    }

    function animateHeart(svgElement) {
        svgElement.style.transform = "scale(1.4)";
        setTimeout(() => {
            svgElement.style.transform = "scale(1)";
        }, 150);
    }

    function addLike() {
        if (!isLiked) {
            isLiked = true;
            baseLikes++;
            likeBtn.classList.add("liked");
            updateLikesUI();
            animateHeart(likeSvg);
        }
    }

    function removeLike() {
        if (isLiked) {
            isLiked = false;
            baseLikes = Math.max(10000, baseLikes - 1);
            likeBtn.classList.remove("liked");
            updateLikesUI();
            animateHeart(likeSvg);
        }
    }

    likeBtn.addEventListener("click", () => {
        if (isLiked) {
            removeLike();
        } else {
            addLike();
        }
    });

    if (postMedia) {
        postMedia.addEventListener("dblclick", () => {
            addLike();
        });
    }

    // --- LÓGICA DE SALVAR ---
    if (bookmarkBtn) {
        bookmarkBtn.addEventListener("click", () => {
            isBookmarked = !isBookmarked;
            bookmarkBtn.classList.toggle("bookmarked", isBookmarked);
            const svgBookmark = bookmarkBtn.querySelector("svg");
            if (svgBookmark) {
                animateHeart(svgBookmark);
            }
            if (isBookmarked) {
                toastBookmark.classList.add("show");
                setTimeout(() => {
                    toastBookmark.classList.remove("show");
                }, 2000);
            }
        });
    }

    // --- LÓGICA DE REPOSTAR ---
    repostBtn.addEventListener("click", () => {
        totalReposts++;
        repostCountSpan.textContent = totalReposts;
        
        repostSvg.classList.add("spin-animation");
        setTimeout(() => {
            repostSvg.classList.remove("spin-animation");
        }, 400);

        toastNotification.classList.add("show");
        setTimeout(() => {
            toastNotification.classList.remove("show");
        }, 2000);
    });

    // --- LÓGICA DE ENVIAR (Fictício) ---
    sendBtn.addEventListener("click", () => {
        sendModal.classList.add("active");
    });

    closeSendBtn.addEventListener("click", () => {
        sendModal.classList.remove("active");
    });

    characterItems.forEach(item => {
        item.addEventListener("click", () => {
            characterItems.forEach(c => c.classList.remove("selected"));
            item.classList.add("selected");
            selectedCharacter = item.getAttribute("data-name");
            targetNameSpan.textContent = selectedCharacter;
            confirmSendBtn.classList.add("enabled");
        });
    });

    confirmSendBtn.addEventListener("click", () => {
        if (selectedCharacter) {
            totalSends++;
            sendCountSpan.textContent = totalSends;
            sendModal.classList.remove("active");
            
            // Animação de giro no aviãozinho de enviar
            sendSvg.classList.add("spin-animation");
            setTimeout(() => {
                sendSvg.classList.remove("spin-animation");
            }, 400);

            // Mensagem flutuante de sucesso
            toastSend.textContent = `Mensagem enviada para ${selectedCharacter}! 🦉`;
            toastSend.classList.add("show");
            setTimeout(() => {
                toastSend.classList.remove("show");
            }, 2000);
            
            // Reseta seleção
            characterItems.forEach(c => c.classList.remove("selected"));
            confirmSendBtn.classList.remove("enabled");
            targetNameSpan.textContent = "ninguém";
            selectedCharacter = null;
        }
    });

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
