document.addEventListener('DOMContentLoaded', async () => {
  firebase.initializeApp(config.firebase);
  flarestore.init();

  var user = await flarebase.auth.init();

  if (!user) {
    await flarebase.auth.signInAnonymously();
  }

  spalate.start();
});
