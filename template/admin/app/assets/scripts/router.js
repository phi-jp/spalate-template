

;(function(exports) {

  exports.map = {
    '/auth': {
      tag: 'page-auth',
    },
    '/:page(.+)/:id': {
      tag: 'page-detail',
    },
    '/:page': {
      tag: 'page-list',
    },
    '/*': {
      tag: 'page-index',
    }
  };

})(typeof exports === 'undefined' ? this.router = {} : exports);