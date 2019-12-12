document.addEventListener('DOMContentLoaded', async () => {
  firebase.initializeApp(config.firebase);
  flarestore.init();

  var user = await flarebase.auth.init();

  if (!user) {
    var res = await flarebase.auth.signInAnonymously();
    // firestore のほうにもユーザーをセット
    var user = await app.store.users.get();
    user.doc.ref.set(res.user);
  }

  await spalate.start();

  spat.modal.indicator();  
});
