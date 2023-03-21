const MAX_VALUE = 100;
const MIN_VALUE = 25;
const SCALE_STEP = 25;
const scaleSmallerButtonElement = document.querySelector('.scale__control--smaller');
const scaleBiggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview').querySelector('img');

let currentValue = parseFloat(scaleValueElement.value);

const scaleBiggerImage = () => {
  scaleValueElement.value = `${currentValue += SCALE_STEP}%`;
  imagePreviewElement.style.transform = `scale(${parseFloat(scaleValueElement.value) / 100})`;
};

const scaleSmallerImage = () => {
  scaleValueElement.value = `${currentValue -= SCALE_STEP}%`;
  imagePreviewElement.style.transform = `scale(${parseFloat(scaleValueElement.value) / 100})`;
};

const scaleBiggerControl = () => {
  if (currentValue === MAX_VALUE) {
    return false;
  }

  scaleBiggerImage();
};

const scaleSmallerControl = () => {
  if (currentValue === MIN_VALUE) {
    return false;
  }

  scaleSmallerImage();
};

scaleBiggerButtonElement.addEventListener('click', scaleBiggerControl);

scaleSmallerButtonElement.addEventListener('click', scaleSmallerControl);

export {imagePreviewElement};
