import { commentTemplateElement, commentsListElement } from './big-picture-render.js';

const renderCommentItems = (avatar, username, message) => {
  const commentsListFragment = document.createDocumentFragment();
  const commentItem = commentTemplateElement.cloneNode(true);

  const avatarElement = commentItem.querySelector('.social__picture');
  avatarElement.src = avatar;
  const commentTextElement = commentItem.querySelector('.social__text');
  avatarElement.alt = username;
  commentTextElement.textContent = message;

  commentsListFragment.append(commentItem);
  commentsListElement.append(commentsListFragment);
};

export { renderCommentItems };
