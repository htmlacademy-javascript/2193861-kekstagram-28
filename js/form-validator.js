import { sendData } from './api.js';
import { scaleReset } from './post-edit.js';
import { filterReset } from './post-filter.js';
import { onFileUploadClose } from './post-upload.js';
import { isEscapeKey, showAlert } from './util.js';

const HASHTAGS_COUNT = 5;
const imageUploadFormElement = document.querySelector('.img-upload__form');
const imageUploadTextContainer = document.querySelector('.img-upload__text');
const hashtagInputElement = imageUploadFormElement.querySelector('.text__hashtags');
const successMessageTemplateElement = document.querySelector('#success').content.querySelector('.success');
const successButtonElement = successMessageTemplateElement.querySelector('.success__button');
const errorMessageTemplateElement = document.querySelector('#error').content.querySelector('.error');
const errorButtonElement = errorMessageTemplateElement.querySelector('.error__button');
const submitButtonElement = imageUploadFormElement.querySelector('.img-upload__submit');

const submitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикация...'
};

const pristine = new Pristine(imageUploadFormElement, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__error-text',
});

const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;

const hideSuccessMessage = () => successMessageTemplateElement.remove();
const hideErrorMessage = () => errorMessageTemplateElement.remove();

successButtonElement.addEventListener('click', hideSuccessMessage);
errorButtonElement.addEventListener('click', hideErrorMessage);

window.addEventListener('click', hideSuccessMessage);
window.addEventListener('click', hideErrorMessage);

const onUploadReset = () => {
  onFileUploadClose();
  imageUploadFormElement.reset();
  scaleReset();
  filterReset();
  document.body.append(successMessageTemplateElement);
  imageUploadTextContainer.firstChild.textContent = '';

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      hideSuccessMessage();
    }
  });
};

const onError = () => {
  document.body.append(errorMessageTemplateElement);

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      hideErrorMessage();
    }
  });
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
  const hashtagInputValueElement = hashtagInputElement.value;
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

pristine.addValidator(hashtagInputElement, validateHashtag, 'Хэштег должен содержать одну # в начале и текст, быть длиной до 20 символов. Максимум можно добавить 5 хэштегов через пробел.');

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
      .catch(() => {
        showAlert('Фотография не загружена. Попробуйте позже');
      })
      .finally(unblockSubmitButton);
  }
};

imageUploadFormElement.addEventListener('submit', onSubmitForm);

export {errorMessageTemplateElement};

