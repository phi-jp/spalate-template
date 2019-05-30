    
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

})(this);
