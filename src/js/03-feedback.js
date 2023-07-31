
import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const STORAGE_KEY = "feedback-form-state";
let currentState = {};

const saveFormState = (e) => {
  currentState [e.target.name] =  e.target.value.trim();  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));
};

feedbackForm.addEventListener('input', throttle(saveFormState, 500));
feedbackForm.addEventListener("submit", (event) => {
  event.preventDefault();

  localStorage.removeItem(STORAGE_KEY);

  console.log(currentState);
  currentState = {};
  event.target.reset();
});

const onLoad =()=> {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;
    currentState = JSON.parse(data);
    Object.entries(currentState).forEach(([key, val]) => {
      feedbackForm.elements[key].value = val;
    });
  } catch (error) {
    console.log(error.message);
  }
};

window.addEventListener("load", onLoad);