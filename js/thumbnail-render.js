import { createPosts } from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictureList = document.querySelector('.pictures');

const pictureListFragment = document.createDocumentFragment();

createPosts.forEach((createPost) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = createPost.url;
  const pictureInfo = pictureElement.querySelector('.picture__info');
  pictureInfo.querySelector('.picture__comments').textContent = createPost.comments.id;
  pictureInfo.querySelector('.picture__likes').textContent = createPost.likes;

  pictureListFragment.append(pictureElement);
});

pictureList.append(pictureListFragment);
