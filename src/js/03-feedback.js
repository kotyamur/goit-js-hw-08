import throttle from 'lodash.throttle';

const STORAGE_FORM_DATA = 'feedback-form-state';

const userFeedbackForm = document.querySelector('.feedback-form');

const renovateUserInfo = () => {
  const savedUserFeedback = localStorage.getItem(STORAGE_FORM_DATA);

  if (savedUserFeedback) {
    try {
      const parsedUserFeedback = JSON.parse(savedUserFeedback);

      Object.entries(parsedUserFeedback).forEach(([name, value]) => {
        userFeedbackForm.elements[name].value = value;
      });
    } catch (error) {
      console.log(error.name); // "SyntaxError"
      console.log(error.message); // "Unexpected token u in JSON at position 1"
    }
  }
};

renovateUserInfo();

const onFormSubmit = evt => {
  evt.preventDefault();

  console.log(JSON.parse(localStorage.getItem(STORAGE_FORM_DATA)));

  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_FORM_DATA);
};

const onFormInput = evt => {
  const savedUserFeedback = localStorage.getItem(STORAGE_FORM_DATA);
  const feedbackFormData = savedUserFeedback
    ? JSON.parse(savedUserFeedback)
    : {};
  feedbackFormData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_FORM_DATA, JSON.stringify(feedbackFormData));
};

userFeedbackForm.addEventListener('input', throttle(onFormInput, 500));
userFeedbackForm.addEventListener('submit', onFormSubmit);
