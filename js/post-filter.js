import { imagePreviewElement } from './post-edit.js';

const effectControlListElement = document.querySelector('.effects__list');
const effectControlContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');

effectLevelValueElement.value = 1;
effectControlContainerElement.classList.add('hidden');

noUiSlider.create(effectLevelSliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

const onFilterChange = (evt) => {
  imagePreviewElement.classList = `effects__preview--${evt.target.value}`;
  if (evt.target.value === 'none') {
    imagePreviewElement.classList = '';
    imagePreviewElement.style.filter = '';
    effectControlContainerElement.classList.add('hidden');
  } else if (evt.target.value === 'chrome') {
    effectLevelSliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    effectControlContainerElement.classList.remove('hidden');
  } else if (evt.target.value === 'sepia') {
    effectLevelSliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  } else if (evt.target.value === 'marvin') {
    effectLevelSliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
    effectControlContainerElement.classList.remove('hidden');
  } else if (evt.target.value === 'phobos') {
    effectLevelSliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    effectControlContainerElement.classList.remove('hidden');
  } else if (evt.target.value === 'heat') {
    effectLevelSliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    effectControlContainerElement.classList.remove('hidden');
  }
};

effectLevelSliderElement.noUiSlider.on('update', () => {
  effectLevelValueElement.value = effectLevelSliderElement.noUiSlider.get();

  if (imagePreviewElement.classList.value === 'effects__preview--chrome') {
    imagePreviewElement.style.filter = `grayscale(${effectLevelValueElement.value})`;
  } else if (imagePreviewElement.classList.value === 'effects__preview--sepia') {
    imagePreviewElement.style.filter = `sepia(${effectLevelValueElement.value})`;
  } else if (imagePreviewElement.classList.value === 'effects__preview--marvin') {
    imagePreviewElement.style.filter = `invert(${effectLevelValueElement.value}%)`;
  } else if (imagePreviewElement.classList.value === 'effects__preview--phobos') {
    imagePreviewElement.style.filter = `blur(${effectLevelValueElement.value}px)`;
  } else if (imagePreviewElement.classList.value === 'effects__preview--heat') {
    imagePreviewElement.style.filter = `brightness(${effectLevelValueElement.value})`;
  }
});


effectControlListElement.addEventListener('change', onFilterChange);
