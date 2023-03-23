import { sendData } from './api.js';
import { scaleReset } from './post-edit.js';
import { filterReset } from './post-filter.js';
import { isEscapeKey, showAlert } from './util.js';

const HASHTAGS_COUNT = 5;
const imageUploadFormElement = document.querySelector('.img-upload__form');
const successMessageTemplateElement = document.querySelector('#success').content.querySelector('.success');
const successButtonElement = successMessageTemplateElement.querySelector('.success__button');
const errorMessageTemplateElement = document.querySelector('#error').content.querySelector('.error');
const errorButtonElement = errorMessageTemplateElement.querySelector('.error__button');
const submitButtonElement = imageUploadFormElement.querySelector('.img-upload__submit');

const submitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикация...'
};

const pristine = new Pristine(imageUploadFormElement);

const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;

const hideSuccessMessage = () => successMessageTemplateElement.remove();
const hideErrorMessage = () => errorMessageTemplateElement.remove();

successButtonElement.addEventListener('click', hideSuccessMessage);
errorButtonElement.addEventListener('click', hideErrorMessage);

window.addEventListener('click', hideSuccessMessage);
window.addEventListener('click', hideErrorMessage);

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideSuccessMessage();
  }
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideErrorMessage();
  }
});

const onUploadReset = () => {
  imageUploadFormElement.reset();
  scaleReset();
  filterReset();
  document.body.append(successMessageTemplateElement);
};

const onError = () => {
  document.body.append(errorMessageTemplateElement);
};

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = submitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = submitButtonText.IDLE;
};

const validateHashtag = () => {
  const hashtagInputValueElement = imageUploadFormElement.querySelector('.text__hashtags').value;
  const hashtagsArray = hashtagInputValueElement.split(' ');
  const uniqueHashtagsArray = new Set(hashtagsArray);

  if (hashtagInputValueElement === '') {
    return true;
  }

  if (hashtagsArray.length <= HASHTAGS_COUNT && hashtagsArray.length === uniqueHashtagsArray.size) {
    return hashtagsArray.some((hashtag) => hashtagRegExp.test(hashtag));
  } else {
    return false;
  }
};

pristine.addValidator(imageUploadFormElement.querySelector('.text__hashtags'), validateHashtag);

const onSubmitForm = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    const formData = new FormData(evt.target);

    sendData(formData)
      .then((response) => {
        if (response.ok) {
          onUploadReset();
        } else {
          onError();
        }
      })
      .catch(showAlert('Ошибка! Попробуйте позже'))
      .finally(unblockSubmitButton);
  }
};

imageUploadFormElement.addEventListener('submit', onSubmitForm);
