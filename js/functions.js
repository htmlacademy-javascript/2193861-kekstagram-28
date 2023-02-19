// Функция для проверки длины строки
function checkStringLength (string, length) {
  if (string.length <= length) {
    return true;
  }

  return false;
}

// Функция для проверки является ли строка палиндромом

function checkPalindrome (string) {
  let check = '';

  for (let i = string.length - 1; i >= 0; i--) {
    check += string[i];
  }

  if (check.trim().toLowerCase() === string.trim().toLowerCase()) {
    return true;
  }

  return false;
}

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9

function findInteger (string) {
  if(string.match(/\d+/)) {
    return string.replace(/\D/g, '');
  } else {
    return NaN;
  }
}

//  Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины.
function createFilePath (initial, minLength, additional) {
  let repeatTimes = (minLength - initial.length) / additional.length;
  if (initial.length < minLength && additional.length < minLength) {
    // additiional * количество повторов символов до заданной длины строки + initial;
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
    return initial.slice(0, minLength);
  }
}
