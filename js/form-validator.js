const HASHTAGS_COUNT = 5;
const imageUploadFormElement = document.querySelector('.img-upload__form');

const pristine = new Pristine(imageUploadFormElement);

const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;

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
    document.querySelector('.img-upload__text').firstChild.textContent = 'можно отправлять';
  } else {
    document.querySelector('.img-upload__text').firstChild.textContent = 'форма невалидна';
  }
};

imageUploadFormElement.addEventListener('submit', onSubmitForm);
