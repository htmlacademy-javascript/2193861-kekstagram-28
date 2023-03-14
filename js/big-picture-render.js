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

const COMMENTS_SHOWN_QUANTITY = 5;

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
  const shownComments = comments.slice(0,5);
  shownComments.forEach(({avatar, username, message}) => renderCommentList(avatar, username, message));
  commentsCountElement.firstChild.textContent = `${commentsListElement.children.length} из `;
  const onCommentLoad = (evt) => {
    evt.preventDefault();
    const otherComments = comments.slice(commentsListElement.children.length, commentsListElement.children.length + COMMENTS_SHOWN_QUANTITY);
    otherComments.forEach(({avatar, username, message}) => renderCommentList(avatar, username, message));
    if (otherComments.length === 0) {
      commentsLoaderButtonElement.classList.add('hidden');
    }
    commentsCountElement.firstChild.textContent = `${commentsListElement.children.length} из `;
  };
  commentsLoaderButtonElement.addEventListener('click', onCommentLoad);
};

const onClickClose = (evt) => {
  evt.preventDefault();
  bigPictureContainerElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

closeButton.addEventListener('click', onClickClose);

const renderBigPicture = (url, likes, description, comments) => {
  bigPictureImageElement.src = url;
  bigPictureImageElement.alt = description;
  bigPictureLikesCountElement.textContent = likes;
  bigPictureCaptionElement.textContent = description;
  bigPictureCommentsCountElement.textContent = comments.length;
};

export { renderBigPicture, bigPictureContainerElement, bigPictureImageContentElement, renderCommentList, commentsListElement, renderShownCommentsList, commentsLoaderButtonElement, commentsCountElement};
