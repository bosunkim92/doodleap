import tokenService from './tokenService';

const BASE_URL = '/api/users/';

function signup(data) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Email already taken!');
  })
  .then(({token}) => tokenService.setToken(token));
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
  .then(({token}) => tokenService.setToken(token));
}

function getProfile(username){
  return fetch(`${BASE_URL}username/` + username, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  }).then(res => {
    if(res.ok) return res.json();
    throw new Error('Bad Credentials')
  })
}

function updateProfile(user, data){
  return fetch(`${BASE_URL}username/` + user.username, {
    method: 'PUT',
    body: data,
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  }).then(res => {
    if (res.ok) return res.json();
    throw new Error('Update Failed');
  });
}

export default {
  signup, 
  logout,
  login,
  getUser,
  getProfile,
  updateProfile
};