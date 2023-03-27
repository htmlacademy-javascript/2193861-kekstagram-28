import { getData } from './api.js';
import { renderThumbnailList } from './thumbnail-render.js';
import { debounce } from './util.js';
const MAX_RANDOM_POSTS_SHOWN = 10;
const RERENDER_DELAY = 500;

const imageFiltersElement = document.querySelector('.img-filters');
const filterButtonsElement = document.querySelectorAll('.img-filters__button');
const defaultFilterButtonElement = imageFiltersElement.querySelector('#filter-default');
const randomFilterButtonElement = imageFiltersElement.querySelector('#filter-random');
const discussedFilterButtonElement = imageFiltersElement.querySelector('#filter-discussed');

const filtersControl = () => {
  imageFiltersElement.classList.remove('img-filters--inactive');

  filterButtonsElement.forEach((button) => {
    button.addEventListener('click', (evt) => {
      const activeButtonElement = document.querySelector('.img-filters__button--active');

      if (activeButtonElement) {
        activeButtonElement.classList.remove('img-filters__button--active');
      }

      evt.target.classList.add('img-filters__button--active');
    });
  });
};

const randomFilter = (photos) => {
  const photosCopy = photos.slice();

  return photosCopy.sort(() => 0.5 - Math.random()).slice(0, MAX_RANDOM_POSTS_SHOWN);
};

const discussedFilter = (photos) => {
  const photosCopy = photos.slice();

  return photosCopy.sort((a, b) => b.comments.length - a.comments.length);
};

const onDefaultLoad = (cb) => {
  defaultFilterButtonElement.addEventListener('click', () => {
    cb();
  });
};

const onRandomLoad = (cb) => {
  randomFilterButtonElement.addEventListener('click', () => {
    cb();
  });
};

const onDiscussedLoad = (cb) => {
  discussedFilterButtonElement.addEventListener('click', () => {
    cb();
  });
};

getData()
  .then((posts) => {
    renderThumbnailList(posts);
    onDefaultLoad(debounce(() => renderThumbnailList(posts), RERENDER_DELAY));
    onRandomLoad(debounce(() => renderThumbnailList(randomFilter(posts)), RERENDER_DELAY));
    onDiscussedLoad(debounce(() => renderThumbnailList(discussedFilter(posts)), RERENDER_DELAY));
  })
  .then(() => filtersControl());

