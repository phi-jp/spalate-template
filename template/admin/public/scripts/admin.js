/*
 *
 */

;(function(global) {

  global.admin = {};

  global.admin.menus = [
    {
      label: 'カードマスタ',
      items: [
        {
          label: 'カード一覧',
          link: '/cards',
        },
        {
          label: '属性一覧',
          link: '/attributes',
        },
      ]
    },
    {
      label: 'その他',
      items: [
        {
          label: '管理者',
          link: '/users',
        },
      ]
    },
  ];

  global.admin.schemas = {
    users: {
      label: 'ユーザー',
      collection: 'users',
      api: 'users',
      singular: 'user',

      show: [
        { label: 'ID',    type: 'id', class: 'col1', class: 'w64' },
        { label: '名前',  type: 'label', key: 'name', class: '' },
        { label: 'email',  type: 'label', key: 'email', class: '' },
      ],
      edit: [
        { key: 'name', label: '成分名', type: 'text', input_type: 'text' },
        { key: 'description', label: '詳細', type: 'multitext' },
        { key: 'amount', label: '成分量', type: 'text', input_type: 'text' },
        { key: 'material', label: '原料名', type: 'text', input_type: 'text' },
        { key: 'memo', label: '備考', type: 'multitext' },
      ],
    },
    cards: {
      label: 'カード',
      collection: 'cards',
      api: 'ygo/cards',
      singular: 'card',

      show: [
        // { label: 'index', type: 'index', class: 'col1', class: 'w64' },
        { label: 'ID',    type: 'id', class: 'col1', class: 'w64' },
        { label: '商品名',  type: 'label', key: 'name', class: '' },
        { label: 'シリーズ',  type: 'label', key: 'series.name', class: 'w100' },
        { label: 'シリアル',  type: 'label', key: 'serial_id', class: 'w100' },
        { label: 'レアリティ',  type: 'label', key: 'rarity.name', class: 'w100' },
        // { label: 'テキスト',  type: 'text', key: 'text' },
      ],
      edit: [
        { label: '商品名',  type: 'text', key: 'name', class: 'col12' },
        { label: 'テキスト',  type: 'text', key: 'text', class: 'col12' },
        { label: '検索テキスト',  type: 'text', key: 'search_text', class: 'col12' },
        { label: 'カード画像', type: 'image', key: 'card_images', align: 'right' },
        // { key: 'name', label: '成分名', type: 'text', input_type: 'text', class: 'col4' },
        // { key: 'description', label: '詳細', type: 'multitext' },
        // { key: 'amount', label: '成分量', type: 'text', input_type: 'text' },
        // { key: 'material', label: '原料名', type: 'text', input_type: 'text' },
        // { key: 'memo', label: '備考', type: 'multitext' },
      ],
    },
    attributes: {
      label: '属性',
      collection: 'attributes',
      api: 'ygo/attributes',
      singular: 'attribute',

      show: [
        // { label: 'index', type: 'index', class: 'col1', class: 'w64' },
        { label: 'ID',    type: 'id', class: 'col1', class: 'w64' },
        { label: 'name',  type: 'label', key: 'name', class: '' },
      ],
      edit: [
        { key: 'name', label: '成分名', type: 'text', input_type: 'text' },
        { key: 'description', label: '詳細', type: 'multitext' },
        { key: 'amount', label: '成分量', type: 'text', input_type: 'text' },
        { key: 'material', label: '原料名', type: 'text', input_type: 'text' },
        { key: 'memo', label: '備考', type: 'multitext' },
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

    // api
    get: async (schema, params) => {
      var ref = app.ref.child(schema.api).child(params.id);
      var res = await ref.get();

      return res.data[schema.singular];
    },
    list: async (schema, params) => {
      var ref = app.ref.child(schema.api);
      var res = await ref.get();

      var pathes = ref.api.split('/');
      var key = pathes[pathes.length-1];

      return res.data[key];
    },
  };

})(this);
