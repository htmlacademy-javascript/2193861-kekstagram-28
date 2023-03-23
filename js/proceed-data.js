import { getData } from './api.js';
import { renderThumbnailList } from './thumbnail-render.js';

getData()
  .then((posts) => renderThumbnailList(posts));
