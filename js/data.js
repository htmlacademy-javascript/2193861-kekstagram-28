const NUMBER_OF_POSTS = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENTS = 1000;
const MIN_AVATAR_INDEX = 1;
const MAX_AVATAR_INDEX = 6;
const messages = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const names = ['Анна', 'Алиса', 'София', 'Алёна', 'Матвей', 'Артемий', 'Георгий', 'Ксения', 'Марк', 'Захар'];
// массив с описанием фотографий
const descriptions = ['Панорама пляжа', 'Указатель до пляжа', 'Лазурное море', 'Девушка с фотоаппаратом', 'Рисовые человечки наслаждаются супом', 'Черный Mclaren', 'Клубнику едят ложкой', 'Клюквенный морс', 'Приветствуем самолеты на пляже', 'Удобная обувница', 'Лабиринт до пляжа', 'Audi RS5', 'Запекаем овощи', 'Суши кот', 'Лунные домашние тапки', 'Над облаками', 'Оркестр', 'Лоурайдер из GTA San Andreas', 'Тапки с фонариками', 'Модный тропический отель', 'Азиатский рис курицей', 'Закат на море', 'Жизнь краба', 'Масонский концерт', 'Бегемоты не любят Land Rover'];

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

// функция для генерации случайного количества лайков от 15 до 200
const getLikesCount = (minLikes, maxLikes) => Math.floor(Math.random() * ((maxLikes - minLikes) + minLikes));

// функция для генерации id комментария
const getCommentId = (maxComments) => Math.floor(Math.random() * maxComments);

// функция для генерации пути до файла с аватаром
const getAvatar = (minAvatarIndex, maxAvatarIndex) => `img/avatar-${Math.ceil(Math.random() * ((maxAvatarIndex - minAvatarIndex) + minAvatarIndex))}.svg`;

// функция для генерации сообщения
const getMessage = (messageArray) => messageArray[Math.floor(Math.random() * (messageArray.length - 1))];

// функция для генерации имени
const getName = (nameArray) => nameArray[Math.floor(Math.random() * (nameArray.length - 1))];

// Функция для генерации массива с постами
const createPosts = id.map((currentValue, index) => ({
  id: currentValue,
  url: url[index],
  description: descriptions[index],
  likes: getLikesCount(MIN_LIKES, MAX_LIKES),
  comments: {
    id: getCommentId(MAX_COMMENTS),
    avatar: getAvatar(MIN_AVATAR_INDEX, MAX_AVATAR_INDEX),
    message: getMessage(messages),
    name: getName(names)
  },
}));

export {createPosts};
