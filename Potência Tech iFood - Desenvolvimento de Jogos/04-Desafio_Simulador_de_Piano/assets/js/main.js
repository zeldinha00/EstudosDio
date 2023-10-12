const pianoKeys = document.querySelectorAll('.piano-keys .key');
const volumeSlider = document.querySelector('.volume-slider input');
const keysCheck = document.querySelector('.keys-check input');

let mapedeKeys = [];
let audio = new Audio("./assets/tunes/a.wav");

const playTune = (key) => {
    audio.src = `./assets/tunes/${key}.wav`;
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add('active');

    setTimeout(() => {
        clickedKey.classList.remove('active');
    }, 150);
}

pianoKeys.forEach(key => {
    console.log(key.dataset.key);
    key.addEventListener('click', () => {
        playTune(key.dataset.key);
        mapedeKeys.push(key.dataset.key);
    });
});

document.addEventListener('keydown', (e) => {
    if (mapedeKeys.includes(e.key)) {
        playTune(e.key);
    }
});

const handleVolume = (e) => {
    audio.volume = e.target.value;
}

const showHideKeys = () => {
    pianoKeys.forEach(key => {
        key.classList.toggle('hide');
    });
}

volumeSlider.addEventListener('input', handleVolume);

keysCheck.addEventListener('click', showHideKeys);