document.addEventListener("DOMContentLoaded", () => {
    const cat = document.querySelector(".cat");
    const moveLeftArrow = document.getElementById("move-left");
    const moveRightArrow = document.getElementById("move-right");
    const floor = document.querySelector(".floor img");

    let floorPosition = 0; // Position actuelle du sol
    let isMoving = false; // État de déplacement

    const moveFloor = (direction) => {
        isMoving = true;
        const move = () => {
            if (!isMoving) return; // Stop si l'utilisateur a relâché
            floorPosition += direction; // Mise à jour de la position
            floor.style.transform = `translateX(${floorPosition}px)`; // Déplace le sol
            requestAnimationFrame(move); // Continue le mouvement
        };
        move();
    };

    // Gestion des clics sur les flèches
    moveLeftArrow.addEventListener("mousedown", () => {
        cat.classList.remove("right");
        cat.classList.add("left");
        cat.style.animationName = "walk"; // Animation de marche
        moveFloor(2); // Déplacement vers la droite (arrière-plan)
    });

    moveRightArrow.addEventListener("mousedown", () => {
        cat.classList.remove("left");
        cat.classList.add("right");
        cat.style.animationName = "walk"; // Animation de marche
        moveFloor(-2); // Déplacement vers la gauche (arrière-plan)
    });

    // Arrêter le déplacement quand le clic est relâché
    [moveLeftArrow, moveRightArrow].forEach((arrow) =>
        arrow.addEventListener("mouseup", () => {
            cat.style.animationName = "idle"; // Animation d'attente
            isMoving = false; // Stop le déplacement
        })
    );

    // Gestion des touches du clavier
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            cat.classList.remove("right");
            cat.classList.add("left");
            cat.style.animationName = "walk"; // Animation de marche
            moveFloor(2); // Déplace vers la droite
        } else if (event.key === "ArrowRight") {
            cat.classList.remove("left");
            cat.classList.add("right");
            cat.style.animationName = "walk"; // Animation de marche
            moveFloor(-2); // Déplace vers la gauche
        }
    });

    document.addEventListener("keyup", (event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            cat.style.animationName = "idle"; // Revenir à l'état d'attente
            isMoving = false; // Stop le déplacement
        }
    });
});

