;((global) => {

  var auth = {
    init: () => {
      return new Promise((resolve) => {
        firebase.auth().onIdTokenChanged(async (user) => {
          if (user) {
            resolve(user);
          }
          else {
            resolve(null);
          }
        });
      });
    },

    // 匿名ログイン
    signInAnonymously: async () => {
      var {user} = await firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });

      await flarestore.db.collection('users').doc(user.uid).set({
        screen_name: user.uid,
        image: {
          url: faker.image.avatar(),
          default: true,
        },
        created_at: Date.now(),
        authed: false,
      });

      return user;
    },


    signOut: () => {
      firebase.auth().signOut();
    },
  };

  global.auth = auth;

})(this);