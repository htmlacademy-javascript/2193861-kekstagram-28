const bigPictureContainerElement = document.querySelector('.big-picture');

const bigPictureImageElement = bigPictureContainerElement.querySelector('.big-picture__img').querySelector('img');

const bigPictureImageContentElement = bigPictureContainerElement.querySelector('.big-picture__social');
const bigPictureLikesCountElement = bigPictureImageContentElement.querySelector('.social__likes').querySelector('.likes-count');

const bigPictureCommentsCountElement = bigPictureImageContentElement.querySelector('.social__comment-count').querySelector('.comments-count');

const bigPictureCaptionElement = bigPictureImageContentElement.querySelector('.social__caption');

const commentsListElement = bigPictureImageContentElement.querySelector('.social__comments');
const commentTemplateElement = bigPictureImageContentElement.querySelector('.social__comment');
const commentsCountElement = bigPictureImageContentElement.querySelector('.social__comment-count');
const commentsLoaderButtonElement = bigPictureImageContentElement.querySelector('.comments-loader');

const closeButton = bigPictureContainerElement.querySelector('.big-picture__cancel');

const onClickOpen = (evt) => {
  evt.preventDefault();
  bigPictureContainerElement.classList.remove('hidden');
  commentsCountElement.classList.add('hidden');
  commentsLoaderButtonElement.classList.add('hidden');
  document.body.classList.add('modal-open');
};

const onClickClose = (evt) => {
  evt.preventDefault();
  bigPictureContainerElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const renderBigPicture = (url, likesCount, commentsCount, description) => {
  bigPictureImageElement.src = url;
  bigPictureLikesCountElement.textContent = likesCount;
  bigPictureCommentsCountElement.textContent = commentsCount;
  bigPictureCaptionElement.textContent = description;
};

export {bigPictureContainerElement, bigPictureImageElement, commentsListElement, commentTemplateElement, onClickOpen, renderBigPicture, bigPictureImageContentElement, onClickClose, closeButton};
