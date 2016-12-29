var Session={
  TOKEN: 'session_token',

  storeToken:function (a_token) {
    localStorage.setItem(Session.TOKEN, a_token);
  },

  token:function () {
    return localStorage.getItem(Session.TOKEN);
  },

  clear:function () {
    localStorage.removeItem(Session.TOKEN);
  }
};