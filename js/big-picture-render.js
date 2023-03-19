import { isEscapeKey } from './util.js';

const COMMENTS_SHOWN_QUANTITY = 5;
const bigPictureContainerElement = document.querySelector('.big-picture');

const bigPictureImageElement = bigPictureContainerElement.querySelector('.big-picture__img').querySelector('img');

const bigPictureImageContentElement = bigPictureContainerElement.querySelector('.big-picture__social');
const bigPictureLikesCountElement = bigPictureImageContentElement.querySelector('.social__likes').querySelector('.likes-count');

const bigPictureCommentsCountElement = bigPictureImageContentElement.querySelector('.social__comment-count').querySelector('.comments-count');

const bigPictureCaptionElement = bigPictureImageContentElement.querySelector('.social__caption');

const closeButton = bigPictureContainerElement.querySelector('.big-picture__cancel');

const commentsListElement = bigPictureImageContentElement.querySelector('.social__comments');
const commentTemplateElement = bigPictureImageContentElement.querySelector('.social__comment');
const commentsCountElement = bigPictureImageContentElement.querySelector('.social__comment-count');
const commentsLoaderButtonElement = bigPictureImageContentElement.querySelector('.comments-loader');

const renderCommentList = (avatar, username, message) => {
  const commentFragment = document.createDocumentFragment();

  const commentItem = commentTemplateElement.cloneNode(true);

  const avatarElement = commentItem.querySelector('.social__picture');
  avatarElement.src = avatar;
  const commentTextElement = commentItem.querySelector('.social__text');
  avatarElement.alt = username;
  commentTextElement.textContent = message;
  commentFragment.append(commentItem);

  const commentListFragment = document.createDocumentFragment();
  commentListFragment.append(commentFragment);
  commentsListElement.append(commentListFragment);
};

const renderShownCommentsList = (comments) => {
  commentsListElement.innerHTML = '';
  const shownComments = comments.slice(0,COMMENTS_SHOWN_QUANTITY);
  shownComments.forEach(({avatar, username, message}) => renderCommentList(avatar, username, message));

  if (commentsListElement.children.length === comments.length) {
    commentsLoaderButtonElement.classList.add('hidden');
  }

  commentsCountElement.firstChild.textContent = `${commentsListElement.children.length} из `;

  const onCommentLoad = (evt) => {
    evt.preventDefault();
    const commentsCount = commentsListElement.children.length;
    const otherComments = comments.slice(commentsCount, commentsCount + COMMENTS_SHOWN_QUANTITY);
    otherComments.forEach(({avatar, username, message}) => renderCommentList(avatar, username, message));
    commentsCountElement.firstChild.textContent = `${commentsListElement.children.length} из `;
    if (otherComments.length < COMMENTS_SHOWN_QUANTITY) {
      commentsLoaderButtonElement.classList.add('hidden');
    }
  };

  commentsLoaderButtonElement.addEventListener('click', onCommentLoad);

  const onClickClose = (evt) => {
    evt.preventDefault();
    bigPictureContainerElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentsListElement.innerHTML = '';
    commentsLoaderButtonElement.removeEventListener('click', onCommentLoad);
    commentsLoaderButtonElement.classList.remove('hidden');
  };

  closeButton.addEventListener('click', onClickClose);

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onClickClose(evt);
    }
  });
};

const renderBigPicture = (url, likes, description, comments) => {
  bigPictureImageElement.src = url;
  bigPictureImageElement.alt = description;
  bigPictureLikesCountElement.textContent = likes;
  bigPictureCaptionElement.textContent = description;
  bigPictureCommentsCountElement.textContent = comments.length;
};

export { renderBigPicture, bigPictureContainerElement, bigPictureImageContentElement, renderCommentList, renderShownCommentsList, commentsLoaderButtonElement, commentsCountElement};
