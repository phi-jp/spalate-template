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
    id: (item) => {
      return item.id;
    },
    value: (item, schema) => {
      return item.$get(schema.key);
    },
    input: (item, schema) => {
      return item;
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

    // アップロード
    upload: async (file) => {
      var pathes = file.name.split('.');
      var ext = pathes[pathes.length-1];
      var ref = firebase.storage().ref();
      var snapshot = await ref.child('temp').child(`${Date.now()}.${ext}`).put(file);
      var url = await snapshot.ref.getDownloadURL();
      return url;
    },
  };

})(this);
