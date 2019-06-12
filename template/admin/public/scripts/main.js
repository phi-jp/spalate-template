document.addEventListener('DOMContentLoaded', async () => {
  firebase.initializeApp(config.firebase);
  flarestore.init();

  var user = await auth.init();

  if (!user) {
    auth.signInAnonymously();
  }

  spalate.start();
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