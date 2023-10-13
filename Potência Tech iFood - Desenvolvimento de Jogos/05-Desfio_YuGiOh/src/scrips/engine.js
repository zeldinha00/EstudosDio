const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById('score_points'),
    },
    cardSprites: {
        avatar: document.getElementById('card-image'),
        name: document.getElementById('card-name'),
        type: document.getElementById('card-type'),
    },
    fieldsCards: {
        player: document.getElementById('player-field-card'),
        computer: document.getElementById('computer-field-card'),
    },
    actions: {
        button: document.getElementById('next-duel'),
    },
};

const playerSides = {
    player1: "player-cards",
    computer: "computer-cards",

}

const cardData = [
    {
        id: 0,
        name: "Dragão Branco de Olhos Azuis",
        type: "Papel",
        img: "./src/assets/icons/dragon.png",
        WinOf: [1],
        LoserOf: [2],
    },
    {
        id: 1,
        name: "Mago Negro",
        type: "Pedra",
        img: "./src/assets/icons/magician.png",
        WinOf: [2],
        LoserOf: [0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Tesoura",
        img: "./src/assets/icons/exodia.png",
        WinOf: [0],
        LoserOf: [1],
    }
]

async function getRandomCardId() {
    const randomIdenx = Math.floor(Math.random() * cardData.length);
    return cardData[randomIdenx].id;
}

async function createCardImage(idCard, fieldSide) {
    const cardImage = document.createElement('img');
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", idCard);
    cardImage.classList.add("card");


    if (fieldSide === playerSides.player1) {

        cardImage.addEventListener('mouseover', function () {
            drawSelectCard(idCard);
        });

        cardImage.addEventListener('click', function () {
            setCardsField(cardImage.getAttribute('data-id'))
        });
    }


    return cardImage;
}

async function setCardsField(cardId) {
    await removeAllCardsImages();

    let computerCardId = await getRandomCardId();

    state.fieldsCards.player.style.display = "block";
    state.fieldsCards.computer.style.display = "block";

    state.fieldsCards.player.src = cardData[cardId].img;
    state.fieldsCards.computer.src = cardData[computerCardId].img;

    let duelResults = await checkDueResults(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResults);
}

async function updateScore() {
    state.score.scoreBox.innerText = `Vitoria: ${state.score.playerScore} | Derrota: ${state.score.computerScore}`;
}

async function drawButton(text) {
    state.actions.button.innerText = text;
    state.actions.button.style.display = "block";
}

async function checkDueResults(playerCardId, computerCardId) {
    let duelResults = "Empate";
    let playerCard = cardData[playerCardId];

    if (playerCard.WinOf.includes(computerCardId)) {
        duelResults = "Ganhou";;
        state.score.playerScore++;
    }

    if (playerCard.LoserOf.includes(computerCardId)) {
        duelResults = "Perdeu";
        state.score.computerScore++;
    }
    
    await playAdudio(duelResults);
    return duelResults;
}


async function removeAllCardsImages() {
    let cards = document.querySelector("#computer-cards");
    let imgElements = cards.querySelectorAll("img");
    imgElements.forEach(img => {
        img.remove();
    });

    cards = document.querySelector("#player-cards");
    imgElements = cards.querySelectorAll("img");
    imgElements.forEach(img => {
        img.remove();
    });
}

async function drawSelectCard(index) {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Atributo: " + cardData[index].type;
}

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

async function resetDuel() {
    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";

    state.fieldsCards.player.style.display = "none";
    state.fieldsCards.computer.style.display = "none";

    init();
}

async function playAdudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`);

    try {
        audio.play();
    }catch {}
}



function init() {
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);
}

init(); // Inicia o jogo