document.addEventListener('DOMContentLoaded', async () => {
  firebase.initializeApp(config.firebase);
  flarestore.init();

  var user = await flarebase.auth.init();

  if (!user) {
    await flarebase.auth.signInAnonymously();
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