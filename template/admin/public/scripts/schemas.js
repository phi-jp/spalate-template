    
/*
 *
 */


;(function(global) {

  global.schemas = {
    users: {
      label: 'ユーザー',
      collection: 'users',

      show: [
        { label: 'index', type: 'index', class: 'col1' },
        { label: 'id',    type: 'id', class: 'col1' },
        { label: 'name',  type: 'label', key: 'screen_name', class: 'col2' },
        { label: 'profile',  type: 'text', key: 'profile' },
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

      show: [
        // { label: 'index', type: 'index', class: 'col1', class: 'w64' },
        { label: 'ID',    type: 'id', class: 'col1', class: 'w64' },
        { label: 'name',  type: 'label', key: 'name', class: 'col3' },
        { label: 'text',  type: 'text', key: 'text' },
      ],
      edit: [
        { key: 'name', label: '成分名', type: 'text', input_type: 'text' },
        { key: 'description', label: '詳細', type: 'multitext' },
        { key: 'amount', label: '成分量', type: 'text', input_type: 'text' },
        { key: 'material', label: '原料名', type: 'text', input_type: 'text' },
        { key: 'memo', label: '備考', type: 'multitext' },
      ],
    },
    attributes: {
      label: '属性',
      collection: 'cards',
      api: 'ygo/attributes',

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

  global.dataTransfer = {
    id: (item) => {
      return item.id;
    },
    value: (item, schema) => {
      return item[schema.key];
    },
    input: (item, schema) => {
      return item;
    },

    list: async (schema, params) => {
      var ref = app.ref.child(schema.api);
      var res = await ref.get();

      var pathes = ref.api.split('/');
      var key = pathes[pathes.length-1];

      return res.data[key];
    },
  };

  global.menus = [
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

})(this);
