import { scaleReset } from './post-edit.js';
import { filterReset } from './post-filter.js';
import { isEscapeKey } from './util.js';

const imageUploadFormElement = document.querySelector('.img-upload__form');
const fileUploadControlElement = document.querySelector('#upload-file');
const imageUploadOverlayElement = document.querySelector('.img-upload__overlay');
const fileUploadCloseButtonElement = document.querySelector('#upload-cancel');
const inputsElements = document.querySelectorAll('input');

const onFileUploadOpen = () => {
  imageUploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const onFileUploadClose = () => {
  imageUploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadFormElement.reset();
  scaleReset();
  filterReset();
};

fileUploadControlElement.addEventListener('change', onFileUploadOpen);
fileUploadCloseButtonElement.addEventListener('click', onFileUploadClose);

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onFileUploadClose();
  }
});

inputsElements.forEach((input) => input.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
}));

export {onFileUploadClose};
