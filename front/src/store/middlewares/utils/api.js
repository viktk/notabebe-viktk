import axios from 'axios';
// on peut pré-configurer une instance d'axios
// ici on passe le baseUrl, ainsi quand on utilisera "api"
// on aura pas besoin de préciser cette valeur de baseUrl
// const api = axios.create({
//   baseURL: 'http://localhost:3001/',
//   timeout: 2500,
// });

const api = axios.create({
  // baseURL: 'https://localhost:3001/',
  // old back-end heroku app : 
  //baseURL: 'https://notabebe-back.herokuapp.com/',

  // new back-end heroku app (oct2021): 
  baseURL: 'https://notabebe-backend.herokuapp.com/',
  timeout: 2500,
});

export default api;
