import throttle from 'lodash.throttle';

import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const userFeedbackForm = document.querySelector('.feedback-form');
console.log(userFeedbackForm);

const submitBtn = document.querySelector('form > button')
console.log(submitBtn);

const onFormSubmit = (evt) => {
  evt.preventDefault();

  console.log('Отправляем форму');

}

const onFormInput = evt => {
  evt.preventDefault();

  console.log('write');
};
userFeedbackForm.addEventListener('submit', onFormSubmit);
userFeedbackForm.addEventListener('input', throttle(onFormInput, 200));
