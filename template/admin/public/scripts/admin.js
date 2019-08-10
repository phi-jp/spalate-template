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
        { label: '名前',  type: 'label', key: 'screen_name', class: '' },
      ],
      edit: [
        { key: 'name', label: '成分名', type: 'text', input_type: 'text' },
        { key: 'description', label: '詳細', type: 'multitext' },
        { key: 'amount', label: '成分量', type: 'text', input_type: 'text' },
        { key: 'material', label: '原料名', type: 'text', input_type: 'text' },
        { key: 'memo', label: '備考', type: 'multitext' },
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
      await ref.set(item.data);
    },
  };

})(this);
