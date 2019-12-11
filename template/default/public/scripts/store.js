
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
      async index({user_id, limit, startAfter}) {
        var ref = flarestore.db.collection('groups');
        
        if (user_id) {
          ref = ref.where('users', 'array-contains', user_id);
        }
        ref = ref.orderBy('updated_at', 'desc');

        if (limit) {
          ref = ref.limit(limit);
        }
        if (startAfter) {
          ref = ref.startAfter(startAfter);
        }

        var res = await ref.getWithRelation();

        return res;
      }
    }
  };

})();