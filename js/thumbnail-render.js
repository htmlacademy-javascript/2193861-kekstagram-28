import { commentsListElement, onClickOpen, onClickClose, renderBigPicture, closeButton, bigPictureContainerElement } from './big-picture-render.js';
import { createPosts } from './data.js';
import { renderCommentItems } from './comment-list-render.js';

const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const pictureListElement = document.querySelector('.pictures');

const pictureListFragment = document.createDocumentFragment();

createPosts.forEach((createPost) => {
  const pictureElement = pictureTemplateElement.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = createPost.url;
  const pictureInfoElement = pictureElement.querySelector('.picture__info');
  pictureInfoElement.querySelector('.picture__comments').textContent = createPost.comments.length;
  pictureInfoElement.querySelector('.picture__likes').textContent = createPost.likes;

  pictureElement.addEventListener('click', (evt) => {
    commentsListElement.innerHTML = '';
    onClickOpen(evt);
    renderBigPicture(createPost.url, createPost.likes, createPost.comments.length, createPost.description);
    createPost.comments.forEach((comment) => {
      renderCommentItems(comment.avatar, comment.name, comment.message);
    });
  });

  pictureListFragment.append(pictureElement);
});

pictureListElement.append(pictureListFragment);

closeButton.addEventListener('click', onClickClose);

document.addEventListener('click', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPictureContainerElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

export { pictureListElement };
