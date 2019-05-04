;((global) => {

  var flarestore = {
    _cache: {},
    
    init: () => {
      flarestore.db = firebase.firestore();
    },

    get: async (collection, id, opts = {}) => {
      var cache = flarestore._cache[collection] || {};
  
      if (opts.cache !== false && cache[id]) {
        return cache[id];
      }
      else {
        var doc = await flarestore.db.collection(collection).doc(id).get();
        var item = await flarestore.normalize(doc, opts);
  
        return item;
      }
    },

    getCollection: async(ref) => {
      var ss = await ref.get();

      var promises = ss.docs.map(async (doc) => {
        var item = await flarestore.normalize(doc);
        return item;
      });

      return Promise.all(promises);
    },

    watch: (ref, callback) => {
      var isNew = false;
      return new Promise((resolve) => {
        var observer = ref.onSnapshot(async (ss) => {
          for (let change of ss.docChanges()) {
            var item = await flarestore.normalize(change.doc);
            callback && callback({change, item, isNew});
          }
  
          isNew = true;
  
          resolve(observer);
        });
      });
    },

    // データ構造整理してついでにキャッシュする
    normalize: async (doc, opts = {}) => {
      var item = {
        id: doc.id,
        doc: doc,
        data: doc.data(),
      };
  
      // キャッシュ
      var collection = doc.ref.parent.path;
  
      if (!flarestore._cache[collection]) {
        flarestore._cache[collection] = {};
      }
      var cache = flarestore._cache[collection];
      if (cache[doc.id]) {
        cache[doc.id].doc = item.doc;
        cache[doc.id].data = item.data;
      }
      else {
        cache[doc.id] = item;
      }
  
      // リレーションの展開
      if (doc.exists && opts.relation !== false) {
        var keys = Object.keys(item.data);
        for (let key of keys) {
          var value = item.data[key];
          if (value instanceof firebase.firestore.DocumentReference) {
            item.data[ key.replace(/_ref$/, '') ] = await flarestore.get(value.parent.path, value.id);
          }
        }
      }
  
      return item;
    },
  };

  global.flarestore = flarestore;

  firebase.firestore.DocumentReference.prototype.getWithRelation = function(opts) {
    return flarestore.get(this.parent.path, this.id, opts);
  };

  firebase.firestore.Query.prototype.getWithRelation = function(callback) {
    return flarestore.getCollection(this);
  };

  firebase.firestore.Query.prototype.watch = function(callback) {
    return flarestore.watch(this, callback);
  };

})(this);