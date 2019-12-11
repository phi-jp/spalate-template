
;(() => {

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

    // 登録/ログインを表示
    openAuthModal() {
      return new Promise((resolve) => {
        var modal = spat.modal.open('modal-auth');

        modal.on('authed', async (e) => {
          spat.modal.alert('ログインしました');
  
          // 新しいユーザーだった場合は DB に登録
          if (e.isNewUser) {
            await app.store.users.set(e.user);
          }
          
          modal.close();
        });

        modal.on('close', () => {
          resolve();
        });
      });
    },
  };

})();