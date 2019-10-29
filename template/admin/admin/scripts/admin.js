/*
 *
 */

;(function(global) {

  global.admin = {};

  global.admin.menus = [
    {
      label: '共通',
      items: [
        {
          label: 'ユーザー一覧',
          link: '/users',
        },
        {
          label: 'グループ一覧',
          link: '/groups',
        },
      ]
    },
    {
      label: 'その他',
      items: [
        {
          label: '管理者',
          link: '/admin',
        },
      ]
    },
  ];

  global.admin.schemas = {
    users: {
      label: 'ユーザー',
      collection: 'users',
      plural: 'users',
      singular: 'user',
      search_column: 'screen_name',
      show: [
        { label: 'アイコン', key: 'data.icon_image.url', type: 'image', shape: 'circle', width: '100px', },
        { label: 'ID',    type: 'id', width: '250px' },
        { label: '名前',  type: 'label', key: 'data.screen_name', class: '' },
      ],
      edit: [
        {
          class: 'col8',
          items: [
            { label: '名前', type: 'text', key: 'data.screen_name', class: 'col12' },
            { label: 'プロフィール', type: 'multitext', key: 'data.description', class: 'col12' },
            { label: '年齢', type: 'number', key: 'data.age', class: 'col6' },
            {
              label: '血液型',
              type: 'select',
              key: 'data.blood_type',
              class: 'col6',
              options: [
                { label: 'A', value: 'A' },
                { label: 'B', value: 'B' },
                { label: 'O', value: 'O' },
                { label: 'AB', value: 'AB' },
              ]
            },
            { label: '自己紹介', type: 'button', class: 'col6', callback: 'selfIntroduction' },
          ]
        },
        {
          class: 'col4',
          items: [
            { label: 'アイコン画像', type: 'image', key: 'data.icon_image.url', class: 'col12' },
          ]
        },
      ]
    },
    groups: {
      label: 'グループ',
      collection: 'groups',
      plural: 'groups',
      singular: 'group',
      search_column: 'title',
      sub_collections: [
        'messages',
      ],

      show: [
        { label: 'ID',    type: 'id', class: 'col1', class: 'w64' },
        { label: 'タイトル',  type: 'label', key: 'data.title', class: '' },
        { label: 'メッセージ',  type: 'label', key: 'data.last_message.data.body', class: '' },
      ],
      edit: [
        {
          items: [
            { label: 'タイトル',  type: 'text', key: 'data.title', class: 'col12' },
            {
              label: 'オーナー', 
              type: 'select-collection',
              key: 'data.owner',
              class: 'col12',
              options: {
                collection: 'users',
                key: 'data.screen_name',
              },
            },
            {
              label: '所属ユーザー', 
              type: 'select-collection',
              key: 'data.users',
              class: 'col12',
              multiple: true,
              options: {
                collection: 'users',
                key: 'data.screen_name',
              },
            },
            {
              key: 'data.options',
              label: 'オプション',
              type: 'multiform',
              forms: [
                { key: 'option1', label: 'オプション1', type: 'text' },
                { key: 'option2', label: 'オプション2', type: 'text' },
              ],
            },
            {
              label: 'メッセージ一覧',
              type: 'table',
              key: 'sub_collections.messages',
              class: 'col12',
            }
          ]
        }
      ],
    },

    messages: {
      label: 'メッセージ',
      collection: 'messages',
      plural: 'messages',
      singular: 'message',
      editable: true,
      sub_collections: ['replies'],
      show: [
        { label: 'ID', type: 'id', class: 'col1', class: 'w64' },
        { label: '本文', type: 'label', key: 'data.body', class: '' },
      ],
      edit: [
        {
          class: 'col12',
          items: [
            { label: '本文', type: 'multitext', key: 'data.body', class: 'col12' },
            {
              label: 'リプライ一覧',
              type: 'table',
              key: 'sub_collections.replies',
              class: 'col12',
            },
          ],
        },
      ],
    },

    replies: {
      label: 'リプライ',
      collection: 'replies',
      plural: 'replies',
      singular: 'reply',
      editable: true,

      show: [
        { label: 'ID', type: 'id', class: 'col1', class: 'w64' },
        { label: '本文', type: 'label', key: 'data.body', class: '' },
      ],
      edit: [
        {
          class: 'col12',
          items: [
            { label: '本文', type: 'multitext', key: 'data.body', class: 'col12' },
          ],
        },
      ],
    }
  };

  global.admin.method = {
    // データ本体
    item: (item, schema) => {
      return item;
    },
    // id
    id: (item) => {
      return item.id;
    },
    // 対応する key の値
    value: (item, option) => {
      return item.$get(option.key);
    },
    // アップロードするときの変換
    output: async (value, option) => {
      // 画像のときの対応
      if (option.type === 'image') {
        var url = value;
        // base 64 だったら upload しておく
        if (/^data:/.test(value)) {
          url = await admin.utils.uploadBase64(value);
        }
        
        return url;
      }
      else {
        return value;
      }
    },

    // 一覧取得
    list: async (path, params = {}) => {
      if (!Array.isArray(path)) {
        path = [path];
      }
      if (params.id && params.sub_collection) {
        path = path.slice(0);
        path.push(params.id);
        path.push(params.sub_collection);
      }

      var schema = admin.schemas[path[path.length - 1]];
      var ref = admin.method.createRef(path);

      // params にキーワードがある場合は疑似 like 検索でヒットするものだけ取ってくるようにする
      var keyword = params.keyword;
      if (keyword && schema.search_column) {
        ref = ref.orderBy(schema.search_column).startAt(keyword).endAt(keyword+'\uf8ff');
      }

      // カーソルがある場合, それ以降を取得する
      if (params.cursor) {
        var startAfter = await ref.doc(params.cursor).get();
        ref = ref.startAfter(startAfter);
      }

      // 取得数上限を設定
      if (params.per) {
        ref = ref.limit(params.per);
      }

      var res = await ref.getWithRelation();
      var last = res[res.length-1];

      return {
        items: res,
        cursor: last ? last.id : null,
      };
    },
    createRef: (path, params) => {
      if (!Array.isArray(path)) {
        path = [path];
      }
      var ref = path.reduce((ref, key, i) => {
        if (i % 2 === 0) {
          return ref.collection(admin.schemas[key].collection);
        }
        else {
          return ref.doc(key);
        }
      }, flarestore.db);
      if (params && params.id) {
        ref = ref.doc(params.id);
      }
      return ref;
    },
    // 単体取得
    get: async (path, params) => {
      var ref = admin.method.createRef(path, params);
      var res = await ref.getWithRelation();

      return res;
    },
    // 更新
    set: async (path, params, item) => {
      var ref = admin.method.createRef(path, params);
      return await ref.update(item.data);
    },

    // 新規追加
    add: async (path, params, item) => {
      var ref = admin.method.createRef(path, params);
      var response =  await ref.add(item.data);
      return await flarestore.db.doc(response.path).getWithRelation();
    },
    // 削除
    del: async (path, params) => {
      var ref = admin.method.createRef(path, params)
      return await ref.delete()
    },

    // ボタン用の処理
    selfIntroduction: ({id, path, option, item}) => {
      alert(`私の名前は ${item.data.screen_name} です!`);
    },
  };

  global.admin.utils = {
    uuid() {
      var d = Date.now();
      if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
      }
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
    },
    // アップロード
    upload: async (file) => {
      var paths = file.name.split('.');
      var ext = paths[paths.length-1];
      var ref = firebase.storage().ref();
      var snapshot = await ref.child('temp').child(`${admin.utils.uuid()}.${ext}`).put(file);
      var url = await snapshot.ref.getDownloadURL();
      return url;
    },
    // アップロード
    uploadBase64: async (base64) => {
      var schema = base64.split(';')[0];
      var mime_type = schema.split(':')[1];
      var ext = {
        'image/png': 'png',
        'image/jpeg': 'jpg',
      }[mime_type] || 'png';

      var ref = firebase.storage().ref();
      var ref = ref.child('temp').child(`${admin.utils.uuid()}.${ext}`);
      var snapshot = await ref.putString(base64, 'data_url');
      var url = await snapshot.ref.getDownloadURL();

      return url;
    },
  };

  global.admin.auth = {
    signIn: async ({email, password}) => {
      var {user} = await firebase.auth().signInWithEmailAndPassword(email, password);
      var token = await user.getIdToken();
      app.ref.auth.login(`Bearer ${token}`, user);
    },
    signOut: () => {
      app.ref.auth.logout();
      firebase.auth().signOut()
    },
    isSignIn: () => {
      return app.ref.auth.isLogin();
    },
  };

})(this);
