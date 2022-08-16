import throttle from 'lodash.throttle';

const STORAGE_FORM_DATA = 'feedback-form-state';

const userFeedbackForm = document.querySelector('.feedback-form');
const userEmailLabel =
  userFeedbackForm.firstElementChild.querySelector('input');
const userMessageText = userFeedbackForm.querySelector('textarea');

const feedbackFormData = {};

const renovateUserInfo = () => {
  const savedUserFeedback = localStorage.getItem(STORAGE_FORM_DATA);
  
  if (savedUserFeedback) {
    try {
      const parsedUserFeedback = JSON.parse(savedUserFeedback);
      userEmailLabel.value = parsedUserFeedback.email;
      userMessageText.value = parsedUserFeedback.message;
    } catch (error) {
      console.log(error.name); // "SyntaxError"
      console.log(error.message); // "Unexpected token u in JSON at position 1"
    }
  }
}

renovateUserInfo();

const onFormSubmit = (evt) => {
  evt.preventDefault();
  
  console.log(feedbackFormData);
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_FORM_DATA);
}

const onFormInput = evt => {
  evt.preventDefault();

  feedbackFormData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_FORM_DATA, JSON.stringify(feedbackFormData));
};

userFeedbackForm.addEventListener('submit', onFormSubmit);
userFeedbackForm.addEventListener('input', throttle(onFormInput, 500));
