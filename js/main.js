const NUMBER_OF_POSTS = 25;

// функция для генерации id
const getIdArray = (idQuantity) => {
  const idArray = [];
  for (let i = 1; i <= idQuantity; i++) {
    idArray.push(i);
  }
  return idArray;
};
const id = getIdArray(NUMBER_OF_POSTS); // числа от 1 до 25

// функция для генерации URL

const getUrl = (photoId) => {
  const urlArray = [];
  for (let i = 1; i <= photoId; i++) {
    const photoIdUrl = `photos/${i}.jpg`;
    urlArray.push(photoIdUrl);
  }
  return urlArray;
};

const url = getUrl(NUMBER_OF_POSTS); // i - числа от 1 до 25

// массив с описанием фотографий
const description = ['Панорама пляжа', 'Указатель до пляжа', 'Лазурное море', 'Девушка с фотоаппаратом', 'Рисовые человечки наслаждаются супом', 'Черный Mclaren', 'Клубнику едят ложкой', 'Клюквенный морс', 'Приветствуем самолеты на пляже', 'Удобная обувница', 'Лабиринт до пляжа', 'Audi RS5', 'Запекаем овощи', 'Суши кот', 'Лунные домашние тапки', 'Над облаками', 'Оркестр', 'Лоурайдер из GTA San Andreas', 'Тапки с фонариками', 'Модный тропический отель', 'Азиатский рис курицей', 'Закат на море', 'Жизнь краба', 'Масонский концерт', 'Бегемоты не любят Land Rover'];

// функция для генерации случайного количества лайков от 15 до 200
const getLikesCount = function () {
  const MIN_LIKES = 15;
  const MAX_LIKES = 200;
  const likesCount = Math.floor(Math.random() * ((MAX_LIKES - MIN_LIKES) + MIN_LIKES));
  return likesCount;
};

// функция для генерации id комментария
const getCommentId = function() {
  const MAX = 1000;
  const commentId = Math.floor(Math.random() * MAX);
  return commentId;
};

// функция для генерации пути до файла с аватаром
const getAvatar = function() {
  const MIN = 1;
  const MAX = 6;
  const randomInteger = Math.ceil(Math.random() * ((MAX - MIN) + MIN));
  return `img/avatar-${randomInteger}.svg`;
};

// функция для генерации сообщения
const getMessage = function() {
  const messageArray = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  const randomInteger = Math.floor(Math.random() * (messageArray.length - 1));
  return messageArray[randomInteger];
};

// функция для генерации имени
const getName = () => {
  const nameArray = ['Анна', 'Алиса', 'София', 'Алёна', 'Матвей', 'Артемий', 'Георгий', 'Ксения', 'Марк', 'Захар'];
  const randomInteger = Math.floor(Math.random() * (nameArray.length - 1));
  return nameArray[randomInteger];
};

// Функция для генерации массива с постами
export const createPosts = id.map((currentValue, index) => ({
  id: currentValue,
  url: url[index],
  description: description[index],
  likes: getLikesCount(),
  comments: {
    id: getCommentId(),
    avatar: getAvatar(),
    message: getMessage(),
    name: getName()
  },
}));

