function defaultAuth(username, password, cb) {
    if (username === 'nodejs' && password === 'sevensys'){
      return cb(null, true);
    }
    return cb(null, false);
  }
  export {
    defaultAuth,
  };
