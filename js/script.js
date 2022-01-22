const squares = document.querySelectorAll('.square');
const restartBtn = document.querySelector('.restart');
const player = document.querySelector('.player');
let gameBoard = ['', '', '', '', '', '', '', '', ''];
const themeToggle = document.querySelector('.theme-toggle');
const winningConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];
let currentPlayer = 'o';

const restartGame = () => {
	squares.forEach(square => {
		square.classList.remove('blocked');
		square.removeAttribute('disabled');
		square.innerHTML = '<div></div>';
	});
	currentPlayer = 'o';
	showCurrentPlayer();
	gameBoard = ['', '', '', '', '', '', '', '', ''];
	const winnerAreas = document.querySelectorAll('.winner');
	winnerAreas.forEach(area => {
		area.classList.remove('winner');
	});
};

const showCurrentPlayer = () => {
	player.textContent = `Current Player: ${currentPlayer.toUpperCase()}`;
};

const checkIsWinner = () => {
	winningConditions.forEach(condition => {
		let [a, b, c] = condition;
		if (
			gameBoard[a] &&
			gameBoard[a] === gameBoard[b] &&
			gameBoard[a] === gameBoard[c]
		) {
			squares.forEach(square => {
				square.setAttribute('disabled', 'true');
			});
			player.textContent = `${currentPlayer.toUpperCase()} WINS!`;
			const aArea = document.querySelector(`[data-area="${a}"]`);
			aArea.classList.add('winner');
			const bArea = document.querySelector(`[data-area="${b}"]`);
			bArea.classList.add('winner');
			const cArea = document.querySelector(`[data-area="${c}"]`);
			cArea.classList.add('winner');
		}
	});
};

const checkIsNext = () => {
	const xPlayer = document.querySelectorAll('.x');
	const oPlayer = document.querySelectorAll('.o');

	if (xPlayer.length + oPlayer.length === 9) {
		squares.forEach(square => {
			square.classList.add('blocked');
		});
	}
};

squares.forEach(square => {
	square.addEventListener('click', () => {
		square.querySelector('div').classList.add(currentPlayer);
		square.setAttribute('disabled', true);
		const area = parseInt(square.getAttribute('data-area'));
		gameBoard[area] = currentPlayer;
		checkIsWinner();
		currentPlayer = currentPlayer === 'o' ? 'x' : 'o';
		showCurrentPlayer();
		checkIsNext();
	});
});

const changeTheme = () => {
	const currentTheme = localStorage.getItem('theme');
	if (currentTheme === 'dark') {
		localStorage.setItem('theme', 'light');
		document.body.setAttribute('data-mode', 'light');
	} else {
		localStorage.setItem('theme', 'dark');
		document.body.setAttribute('data-mode', 'dark');
	}
};

const contentLoad = () => {
	showCurrentPlayer();
	const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
	if (prefersDarkScheme.matches && localStorage.getItem('theme') === null) {
		localStorage.setItem('theme', 'dark');
		document.body.setAttribute('data-mode', 'dark');
	} else if (
		!prefersDarkScheme.matches &&
		localStorage.getItem('theme') === null
	) {
		localStorage.setItem('theme', 'light');
		document.body.setAttribute('data-mode', 'light');
	} else {
		document.body.setAttribute('data-mode', localStorage.getItem('theme'));
	}
};

restartBtn.addEventListener('click', restartGame);
document.addEventListener('DOMContentLoaded', contentLoad);
themeToggle.addEventListener('click', changeTheme);
