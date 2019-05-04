document.addEventListener('DOMContentLoaded', async () => {
  firebase.initializeApp(config.firebase);
  flarestore.init();

  var user = await auth.init();

  if (!user) {
    auth.signInAnonymously();
  }

  spalate.start();
});