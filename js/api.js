const getData = () => fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json());


const sendData = (body) => fetch('https://28.javascript.pages.academy/kekstagram',
  {
    method: 'POST',
    body
  });

export {getData, sendData};
