import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const inputEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

startBtnEl.disabled = true;

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    const diff = userSelectedDate - new Date().getTime();

    if (diff <= 0) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });

      startBtnEl.disabled = true;
    } else {
      startBtnEl.disabled = false;
    }
  },
};

flatpickr(inputEl, options);

startBtnEl.addEventListener('click', handleClick);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function formattedTime(time) {
  return String(time).padStart(2, '0');
}

function handleClick() {
  const intervalId = setInterval(() => {
    const diff = userSelectedDate - Date.now();
    if (diff <= 0) {
      inputEl.disabled = false;
      clearInterval(intervalId);
      return;
    }
    inputEl.disabled = true;
    startBtnEl.disabled = true;
    const { days, hours, minutes, seconds } = convertMs(diff);
    console.log(days, hours, minutes, seconds);

    daysEl.textContent = formattedTime(days);
    hoursEl.textContent = formattedTime(hours);
    minutesEl.textContent = formattedTime(minutes);
    secondsEl.textContent = formattedTime(seconds);
  }, 1000);
}
