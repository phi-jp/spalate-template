
;((global) => {

  var flarebase = {
    auth: {
      async createUserWithEmailAndPassword(email, password) {
        try {
          var res = await firebase.auth().createUserWithEmailAndPassword(email, password);;
          var data = this._normalizeResponse(res);
          return data;
        }
        catch(e) {
          e.error_message = {
            'auth/email-already-in-use': 'このメールアドレスはすでに使用されています',
            'auth/invalid-email': 'メールアドレスの形式が間違っています',
            'uth/operation-not-allowed': 'メールアドレス/パスワードによるアカウント登録が有効化されていません',
            'auth/weak-password': 'パスワードのセキュリティが弱すぎます',
          }[e.code];

          throw e;
        }
      },
      async signInWithProvider(providerId) {
        try {
          var provider = this.idToProvider(providerId);
          var res = await firebase.auth().signInWithPopup(provider);
          var data = this._normalizeResponse(res);

          return data;
        }
        catch (e) {
          e.error_message = {
            'auth/popup-closed-by-user': 'ログイン処理が中断されました',
          }[e.code];

          throw e;
        }
      },

      idToProvider(providerId) {
        var provider = {
          'google.com': firebase.auth.GoogleAuthProvider,
          'twitter.com': firebase.auth.TwitterAuthProvider,
          'facebook.com': firebase.auth.FacebookAuthProvider,
        }[providerId];

        return new provider;
      },

      _normalizeResponse(res) {
        // 共通情報
        var user = {
          display_name: res.user.displayName,
          screen_name: res.user.uid,
          profile: '',
          email: res.user.email,
          verified_email: res.user.emailVerified,
          image: res.user.photoURL,
          // 匿名かどうか
          isAnonymous: res.user.isAnonymous,
          // 新しいユーザーかどうか
          isNewUser: res.additionalUserInfo.isNewUser,
        };

        var userInfo = res.additionalUserInfo;

        // sns 差分を吸収
        if (userInfo.providerId === 'google.com') {
          // TODO: 
        }
        else if (userInfo.providerId === 'twitter.com') {
          user.screen_name = userInfo.profile.screen_name;
          user.profile = userInfo.profile.description;
          user.image = userInfo.profile.profile_image_url_https.replace('_normal', '');
        }
        else if (userInfo.providerId === 'facebook.com') {
          // TODO: facebook api で大きな画像を取ってきて差し替える
        }
        else if (userInfo.providerId === 'password') {
          // TODO: 
        }

        return {
          user: user,
          providerId: userInfo.providerId,
        };
      },
    },
  };

  global.flarebase = flarebase;

})(this);
