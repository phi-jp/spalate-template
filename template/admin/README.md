# <%= name %>


created by \<template commit version\>


var {data} = await app.ref.child('me/sign_in').post({
  "email": "sugimoto.yuusuke@rabee.jp",
  "password": "hogehoge"
});
app.ref.auth.login(data.token, {});
