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

      show: [
        { label: 'ID',    type: 'id', class: 'col1', class: 'w64' },
        { label: '名前',  type: 'label', key: 'data.screen_name', class: '' },
      ],
      edit: [
        { label: '名前', type: 'text', key: 'data.screen_name', input_type: 'text' },
        { label: 'アイコン画像', type: 'image', key: 'data.icon_image' },
      ],
    },
    groups: {
      label: 'グループ',
      collection: 'groups',

      show: [
        { label: 'ID',    type: 'id', class: 'col1', class: 'w64' },
        { label: 'タイトル',  type: 'label', key: 'data.title', class: '' },
        { label: 'メッセージ',  type: 'label', key: 'data.last_message.data.body', class: '' },
      ],
      edit: [
        { label: 'ID',    type: 'id', class: 'col1', class: 'w64' },
        { label: 'タイトル',  type: 'text', key: 'data.title', class: 'col12' },
      ],
    },
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
      var value = item.$get(option.key);

      // 画像のときの対応
      if (option.type === 'image') {
        return value.url;
      }
      else {
        return value;
      }
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
        
        return { url };
      }
      else {
        return value;
      }
    },

    // 一覧取得
    list: async (schema, params) => {
      var ref = flarestore.db.collection(schema.collection);
      var res = await ref.getWithRelation();

      return res;
    },
    // 単体取得
    get: async (schema, params) => {
      var ref = flarestore.db.collection(schema.collection).doc(params.id);
      var res = await ref.getWithRelation();

      return res;
    },
    // 更新
    set: async (schema, params, item) => {
      var ref = flarestore.db.collection(schema.collection).doc(params.id);
      await ref.update(item.data);
    },

  };

  global.admin.utils = {
    // アップロード
    upload: async (file) => {
      var paths = file.name.split('.');
      var ext = paths[paths.length-1];
      var ref = firebase.storage().ref();
      var snapshot = await ref.child('temp').child(`${Date.now()}.${ext}`).put(file);
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
      var ref = ref.child('temp').child(`${Date.now()}.${ext}`);
      var snapshot = await ref.putString(base64, 'data_url');
      var url = await snapshot.ref.getDownloadURL();

      return url;
    },
  };

})(this);
