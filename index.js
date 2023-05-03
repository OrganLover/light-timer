const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');
let interval

const createTimerAnimator = () => {
  return (seconds) => {
    clearInterval(interval)
    const [hours, minutes, timerSeconds] = getTimeBySeconds(seconds)
    timerEl.innerText = `${hours}:${minutes}:${timerSeconds}`
    seconds--
    interval = setInterval(() => {
      const [hours, minutes, timerSeconds] = getTimeBySeconds(seconds)
      timerEl.innerText = `${hours}:${minutes}:${timerSeconds}`
      seconds--
      if (seconds < 0) {
        clearInterval(interval)
      }
    }, 1000)
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  inputEl.value = inputEl.value.split('')
    .filter(item => !isNaN(item) && item !== ' ') // Проверяем, является ли запись числом или пустой строкой
    .join('')
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);
  inputEl.value = '';
  if (!seconds) {
    return
  }

  animateTimer(seconds);
});

function getTimeBySeconds(seconds) {
  let minutes = Math.floor(seconds / 60)
  let hours = 0
  let timerSeconds = seconds % 60
  if (minutes >= 60) {
    hours = Math.floor(minutes / 60)
    minutes = minutes % 60
  }
  timerSeconds = timerSeconds < 10 ? `0${timerSeconds}` : `${timerSeconds}`
  minutes = minutes < 10 ? `0${minutes}` : `${minutes}`
  hours = hours < 10 ? `0${hours}` : `${hours}`
  return [hours, minutes, timerSeconds]
}