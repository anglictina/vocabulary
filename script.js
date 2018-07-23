const nextButton = document.querySelector('.Button--next');
const switchButton = document.querySelector('.Button--switch');
const showButton = document.querySelector('.Button--show');
const wordElemEn = document.querySelector('.Word--en span');
const wordElemCs = document.querySelector('.Word--cs span');
let toEnglish = false;

function getVocabulary() {
	return fetch('vocabulary.json')
		.then((data) => {
			return data.json();
		});
};

function getRandomNumber(maximum, minimum = 0) {
	return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function getRandomWord(data) {
	return data[getRandomNumber(data.length - 1)]
}

function setWords({ en, cs }) {
	wordElemEn.innerText = en;
	wordElemCs.innerText = cs;
}

function nextWord(data) {
	setTranslateOrder();
	setWords(
		getRandomWord(data)
	);
}

function setFirstWord(data) {
	nextWord(data);
}

function setTranslateOrder() {
	if (toEnglish) {
		wordElemEn.classList.remove('is-hidden');
		wordElemCs.classList.add('is-hidden');
	} else {
		wordElemEn.classList.add('is-hidden');
		wordElemCs.classList.remove('is-hidden');
	}
}

function switchTranslateOrder() {
	toEnglish = !toEnglish;
	setTranslateOrder();
}

function showWord() {
	wordElemEn.classList.remove('is-hidden');
	wordElemCs.classList.remove('is-hidden');
}

function setButtons(data) {
	nextButton.addEventListener('click', () => nextWord(data));
	switchButton.addEventListener('click', switchTranslateOrder)
	showButton.addEventListener('click', showWord)
}

async function init() {
	const data = await getVocabulary();

	setFirstWord(data);
	setButtons(data);
};

init();
