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
          label: '成分',
          link: '/ingredients',
        },
        {
          label: 'サプリメント',
          link: '/supplements',
        },
        {
          label: '診断',
          link: '/diagnosis',
        },
        {
          label: 'プロダクト',
          link: '/products',
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
    // 成分
    ingredients: {
      label: '成分',
      collection: 'ingredients',

      show: [
        { label: 'ID',    type: 'id', class: 'col1', class: 'w64' },
        { label: '名前',  type: 'text', key: 'data.name', class: '' },
        { label: '詳細',  type: 'text', key: 'data.description', class: '' },
      ],
      edit: [
        { label: '名前',  type: 'text', key: 'data.name', class: 'col12' },
        { label: '詳細',  type: 'multitext', key: 'data.description', class: 'col12' },
        { label: '原材料名',  type: 'text', key: 'data.material', class: 'col8' },
        { label: '成分量',  type: 'text', key: 'data.amount', class: 'col4' },
        { label: '備考',  type: 'multitext', key: 'data.memo', class: 'col12' },
      ],
    },
    // サプリメント
    supplements: {
      label: 'サプリメント',
      collection: 'supplements',

      show: [
        { label: 'ID',    type: 'id', class: 'col1', class: 'w64' },
        { label: '名前',  type: 'text', key: 'data.name', class: '' },
        { label: '詳細',  type: 'text', key: 'data.description', class: '' },
      ],
      edit: [
        { label: 'サプリ名',  type: 'text', key: 'data.name', class: 'col12' },
        { label: 'サプリ名(日本語)',  type: 'text', key: 'data.name_ja', class: 'col12' },
        { label: '詳細',  type: 'multitext', key: 'data.description', class: 'col12' },
        { label: '形状',  type: 'text', key: 'data.shape', class: 'col4' }, // todo
        { label: '成分量',  type: 'text', key: 'data.capacity', class: 'col4' },
        { label: '栄養成分',  type: 'multitext', key: 'data.component', class: 'col12' },
        { label: '成分一覧',  type: 'text', key: 'data.ingredients', class: 'col12' }, // todo
        { label: 'タイトル1',  type: 'text', key: 'data.01_title', class: 'col12' },
        { label: '説明1',  type: 'multitext', key: 'data.01_description', class: 'col12' },
        { label: 'タイトル2',  type: 'text', key: 'data.02_title', class: 'col12' },
        { label: '説明2',  type: 'multitext', key: 'data.02_description', class: 'col12' },
        { label: 'タイトル3',  type: 'text', key: 'data.02_title', class: 'col12' },
        { label: '説明3',  type: 'multitext', key: 'data.03_description', class: 'col12' },
      ],
    },
    // 診断
    diagnosis: {
      label: '診断',
      collection: 'diagnosis',
      order: 'index',

      show: [
        { label: 'インデックス', type: 'text', key: 'data.index', class: 'w128' },
        { label: '質問',  type: 'text', key: 'data.question', class: '' },
        { label: 'タイプ',  type: 'text', key: 'data.type', class: '' },
        { label: 'アニメーション',  type: 'text', key: 'data.animation', class: '' },
      ],
      edit: [
        { label: '名前',  type: 'text', key: 'data.name', class: 'col12' },
      ],
    },
    // プロダクト
    products: {
      label: 'プロダクト',
      collection: 'products',

      show: [
        { label: 'ID',    type: 'id', class: 'col1', class: 'w64' },
        { label: 'コード',  type: 'text', key: 'data.code', class: '' },
        { label: '詳細',  type: 'text', key: 'data.description1', class: '' },
      ],
      edit: [
        { label: '名前',  type: 'text', key: 'data.name', class: 'col12' },
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
      if (schema.order) {
        ref = ref.orderBy(schema.order);
      }
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

})(this);
