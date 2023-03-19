// Функция для проверки длины строки
const checkStringLength = (string, length) => string.length <= length;


checkStringLength('htmlacademy', 18);

// Функция для проверки является ли строка палиндромом

const checkPalindrome = (string) => {
  let check = '';

  for (let i = string.length - 1; i >= 0; i--) {
    check += string[i];
  }

  return check.trim().toLowerCase() === string.trim().toLowerCase();
};

checkPalindrome('топот');

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9

const findInteger = (string) => {
  if(string.match(/\d+/)) {
    return string.replace(/\D/g, '');
  } else {
    return NaN;
  }
};

findInteger('ECMAScript 2022');

//  Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины.
const createFilePath = (initial, minLength, additional) => {
  let repeatTimes = (minLength - initial.length) / additional.length;
  if (initial.length < minLength && additional.length < minLength) {
    while (repeatTimes > 0) {
      if(initial.length <= additional.length) {
        additional = additional.slice(0, (repeatTimes)) + additional;
      }
      additional = additional.slice(0, (minLength - initial.length));
      repeatTimes--;
    }
    return additional + initial;
  } if (initial.length < minLength && additional.length > minLength) {
    while (repeatTimes > 0) {
      additional = additional.slice(0, (minLength - initial.length));
      repeatTimes--;
    }
    return additional + initial;
  }
  if (initial.length > minLength) {
    return initial;
  }
};

createFilePath('1', 2, '0');
createFilePath('1', 4, '0');
createFilePath('q', 4, 'werty');
createFilePath('q', 4, 'we');
createFilePath('qwerty', 4, '0');

// проверка Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

export {isEscapeKey};
