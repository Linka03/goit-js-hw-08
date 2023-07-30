
import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageTextarea = feedbackForm.querySelector('textarea[name="message"]');


const formState = JSON.parse(localStorage.getItem('feedback-form-state')) || {};

if (formState.email) {
  emailInput.value = formState.email;
}

if (formState.message) {
  messageTextarea.value = formState.message;
}

const saveFormState = () => {
  const currentState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(currentState));
};


emailInput.addEventListener('input', throttle(saveFormState, 500));
messageTextarea.addEventListener('input', throttle(saveFormState, 500));


feedbackForm.addEventListener('submit', event => {
  event.preventDefault();

  
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageTextarea.value = '';

 
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  console.log(formData);
});
