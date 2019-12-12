
;(() => {

  app.store = {
    users: {
      get collection() {
        return flarebase.store.db.collection('users');
      },
      // セット(上書き)
      async set(data) {
        await this.collection.doc(data.uid).set(data);
      },
      async get(uid=firebase.auth().getUid()) {
        return await this.collection.doc(uid).getWithRelation();
      },
      async index() {
        var items = await this.collection.getWithRelation();
        return items;
      }
    },
    groups: {
      async get(id) {
        return await flarebase.store.db.collection('groups').doc(id).getWithRelation();
      },
      async index({user_id, limit, startAfter}) {
        var ref = flarebase.store.db.collection('groups');
        
        if (user_id) {
          var user_ref = flarebase.store.db.collection('users').doc(user_id);
          ref = ref.where('users', 'array-contains', user_ref);
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
      },
    }
  };

})();