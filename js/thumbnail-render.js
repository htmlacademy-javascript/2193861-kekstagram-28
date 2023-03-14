import { bigPictureContainerElement, renderBigPicture, commentsListElement, renderShownCommentsList } from './big-picture-render.js';
import { createPosts } from './data.js';

const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const pictureListElement = document.querySelector('.pictures');

const similarPosts = createPosts();

const renderThumbnailList = (posts) => {
  const pictureElementFragment = document.createDocumentFragment();

  posts.forEach(({ url, description, likes, comments}) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    const pictureInfoElement = pictureElement.querySelector('.picture__info');
    pictureInfoElement.querySelector('.picture__comments').textContent = comments.length;
    pictureInfoElement.querySelector('.picture__likes').textContent = likes;
    pictureElementFragment.append(pictureElement);

    const onThumbnailOpen = (evt) => {
      evt.preventDefault();
      bigPictureContainerElement.classList.remove('hidden');
      document.body.classList.add('modal-open');
      commentsListElement.innerHTML = '';
      renderShownCommentsList(comments);
      renderBigPicture(url, likes, description, comments);
    };

    pictureElement.addEventListener('click', onThumbnailOpen);
  });
  const pictureListFragment = document.createDocumentFragment();
  pictureListFragment.append(pictureElementFragment);
  pictureListElement.append(pictureListFragment);
};

renderThumbnailList(similarPosts);

document.addEventListener('click', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPictureContainerElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

export { renderThumbnailList, similarPosts, pictureListElement };
