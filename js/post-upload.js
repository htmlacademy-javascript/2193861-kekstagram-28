import { imagePreviewElement, scaleReset } from './post-edit.js';
import { filterReset } from './post-filter.js';
import { isEscapeKey } from './util.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imageUploadFormElement = document.querySelector('.img-upload__form');
const fileUploadControlElement = document.querySelector('#upload-file');
const imageUploadOverlayElement = document.querySelector('.img-upload__overlay');
const fileUploadCloseButtonElement = document.querySelector('#upload-cancel');
const inputsElements = document.querySelectorAll('input');
const textDescriptionElement = document.querySelector('.text__description');

fileUploadControlElement.addEventListener('change', () => {
  const file = fileUploadControlElement.files[0];
  const fileName = file.name.toLowerCase();

  const fileTypeMatches = FILE_TYPES.some((end) => fileName.endsWith(end));

  if (fileTypeMatches) {
    imagePreviewElement.src = URL.createObjectURL(file);
  }
});

const onFileUploadClose = () => {
  imageUploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadFormElement.reset();
  scaleReset();
  filterReset();
};

const onFileUploadOpen = () => {
  imageUploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

fileUploadControlElement.addEventListener('change', onFileUploadOpen);
fileUploadCloseButtonElement.addEventListener('click', onFileUploadClose);

inputsElements.forEach((input) => input.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
}));

textDescriptionElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
});

export {onFileUploadClose, textDescriptionElement};
