
;(() => {

  app.store = {
    users: {
      async set(data) {
        await flarestore.db.collection('users').doc(data.uid).set(data);
      },
      async get(uid) {
        return await flarestore.db.collection('users').doc(uid).getWithRelation();
      },
      async index() {

      }
    },
    groups: {
      async index({user_id}) {
        var ref = flarestore.db.collection('groups');
        
        if (user_id) {
          ref = ref.where('users', 'array-contains', user_id);
        }

        var res = await ref.getWithRelation();

        return res;
      }
    }
  };

})();