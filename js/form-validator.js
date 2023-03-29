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
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
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

const validateHashtag = (value) => {
  const hashtagsArray = value.toLowerCase().trim().split(' ');

  if (value === '') {
    return true;
  }

  return hashtagsArray.every((hashtag) => hashtagRegExp.test(hashtag));
};

const validateHashtagUnique = (value) => {
  const hashtagsArray = value.toLowerCase().trim().split(' ');
  const uniqueHashtagsArray = new Set(hashtagsArray);

  return hashtagsArray.length === uniqueHashtagsArray.size;
};

const validateHashtagCount = (value) => {
  const hashtagsArray = value.toLowerCase().trim().split(' ');

  return hashtagsArray.length <= HASHTAGS_COUNT;
};

pristine.addValidator(hashtagInputElement, validateHashtag, 'Хэштег должен содержать одну # в начале и буквы или цифры, быть длиной до 20 символов.');
pristine.addValidator(hashtagInputElement, validateHashtagUnique, 'Хэштеги не могут повторяться');
pristine.addValidator(hashtagInputElement, validateHashtagCount, 'Максимум 5 хэштегов');

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
  } else {
    imageUploadTextContainer.firstChild.textContent = 'Проверьте правильность введеных хэштегов и комментариев';
  }
};

imageUploadFormElement.addEventListener('submit', onSubmitForm);

export {errorMessageTemplateElement};

