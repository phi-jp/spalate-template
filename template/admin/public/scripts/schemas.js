    
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
        { label: 'ID',    type: 'id', class: 'col1' },
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

      show: [
        { label: 'index', type: 'index', class: 'col1' },
        { label: 'ID',    type: 'id', class: 'col1' },
        { label: 'title',  type: 'label', key: 'title', class: 'col2' },
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
    attributes: {
      label: '属性',
      collection: 'attributes',

      show: [
        { label: 'index', type: 'index', class: 'col1' },
        { label: 'ID',    type: 'id', class: 'col1' },
        { label: 'title',  type: 'label', key: 'title', class: 'col2' },
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
  };

  global.dataTransfer = {
    id: (item) => {
      return item.id;
    },
    value: (item, schema) => {
      return item.data[schema.key];
    },
    input: (item, schema) => {
      return item;
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
