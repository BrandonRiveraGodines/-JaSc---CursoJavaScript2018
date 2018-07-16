const imgPlayerChoice = document.getElementById('playerChoice');
const imgComputerChoice = document.getElementById('computerChoice');
const pResult = document.getElementById('result');
const pScore = document.getElementById('score');
const buttons = document.querySelectorAll('button');
const choices = ['piedra', 'papel', 'tijeras'];
const fileNames = {
    'piedra': 'images/rock.png',
    'papel': 'images/paper.png',
    'tijeras': 'images/scissors.png'
};
var contadorVictorias = 0;
var contadorDerrotas = 0;
var contadorJuegos = 0;

buttons.forEach(function (button) {
    button.addEventListener('click', startGame);
});

function startGame(event) {
    // Determinar la elección del jugador
    const button = event.currentTarget;
    const playerChoice = button.dataset.choice;
    //console.log(playerChoice);
    //Determinar la elección de la computadora
    const computerChoice = getComputerChoice();
    //console.log(computerChoice);
    //Determinar los resultados
    const winner = getWinner(playerChoice, computerChoice);
    //console.log(winner);
    //Mostrar resultados
    imgPlayerChoice.setAttribute('src', fileNames[playerChoice]);
    imgComputerChoice.setAttribute('src', fileNames[computerChoice]);
    if (winner === 'player') {
        pResult.innerHTML = `Tu ganas escogiendo
                             <strong>${playerChoice}</strong> en contra de
                             <strong>${computerChoice}</strong>`;
        contadorVictorias++;
        contadorJuegos++;
    } else if (winner === 'computer') {
        pResult.innerHTML = `Tu pierdes escogiendo
                             <strong>${playerChoice}</strong> en contra de
                             <strong>${computerChoice}</strong>`;
        contadorDerrotas++;
        contadorJuegos++;
    } else {
        pResult.innerHTML = `Tu empatas escogiendo
                             <strong>${playerChoice}</strong> en contra de
                             <strong>${computerChoice}</strong>`;
        contadorJuegos++;
    }
    pScore.innerHTML = `Has ganado
                        <strong>${contadorVictorias}</strong> veces.
                        Has perdido
                        <strong>${contadorDerrotas}</strong> veces.
                        De <strong>${contadorJuegos}</strong> juegos.`;
}

function getComputerChoice() {
    // Obtener un valor aleatorio i = 0,1,2
    const i = parseInt(Math.random() * 3);
    return choices[i];
}

function getWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return null;
    }
    if (playerChoice === 'piedra') {
        if (computerChoice === 'papel') {
            return 'computer';
        } else if (computerChoice === 'tijeras') {
            return 'player';
        }
    } else if (playerChoice === 'papel') {
        if (computerChoice === 'piedra') {
            return 'player';
        } else if (computerChoice === 'tijeras') {
            return 'computer';
        }
    } else {
        if (computerChoice === 'piedra') {
            return 'computer';
        } else if (computerChoice === 'papel') {
            return 'player';
        }
    }
}