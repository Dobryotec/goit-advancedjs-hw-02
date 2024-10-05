import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('form');

formEl.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const delay = e.target.delay.value;
  const state = e.target.state.value;
  setTimeout(() => {
    if (state === 'fulfilled') {
      Promise.resolve(
        iziToast.success({
          message: `Fulfilled promise in ${delay}ms`,
          position: 'topRight',
        })
      );
    } else
      Promise.reject(
        iziToast.error({
          message: `Rejected promise in ${delay}ms`,
          position: 'topRight',
        })
      );
  }, delay);
}
