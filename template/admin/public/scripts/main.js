document.addEventListener('DOMContentLoaded', async () => {
  firebase.initializeApp(config.firebase);
  flarestore.init();

  spalate.start(false).then(() => {
    if (!admin.auth.isSignIn()) {
      app.routeful.go('/auth');
    }
    app.routeful.start(true);
  });

  spat.nav.on('swap', (e) => {
    riot.update();
  });
});

app.utils = {
  imageToBase64: (url) => {
    return new Promise((resolve) => {
      var img = new Image();
      img.onload = () => {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
  
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        var base64 = canvas.toDataURL('image/jpg');
        resolve(base64);
      };
      img.crossOrigin = 'anonymous';
      img.src = url;
    });
  },
  uploadFile: () => {

  },
};

Object.defineProperty(Object.prototype, '$get', {  
  value: function(key) {
    return key.split('.').reduce(function(t, v) {
      return t && t[v];
    }, this);
  },
});

Object.defineProperty(Object.prototype, '$set', {  
  value: function(key, value) {
    key.split('.').reduce(function(t, v, i, arr) {
      if (i === (arr.length-1)) {
        t[v] = value;
      }
      else {
        if (!t[v]) t[v] = {};
        return t[v];
      }
    }, this);
  },
});