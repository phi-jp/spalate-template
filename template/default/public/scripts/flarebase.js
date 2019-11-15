
;((global) => {

  var flarebase = {
    auth: {
      signInWithProvider: async () => {
        var provider = new firebase.auth.TwitterAuthProvider();
        var res = await firebase.auth().signInWithPopup(provider);

        var user = {
          display_name: res.user.displayName,
          screen_name: res.user.uid,
          profile: '',
          email: res.user.email,
          verified_email: res.user.emailVerified,
          image: res.user.photoURL,
        };

        var userInfo = res.additionalUserInfo;

        if (userInfo.providerId === 'google.com') {

        }
        else if (userInfo.providerId === 'twitter.com') {
          user.screen_name = userInfo.profile.screen_name;
          user.profile = userInfo.profile.description;
          user.image = userInfo.profile.profile_image_url_https.replace('_normal', '');
        }
        else if (userInfo.providerId === 'facebook.com') {
          
        }
      },
    },
  };

  global.flarebase = flarebase;

})(this);
