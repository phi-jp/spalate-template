

;(function(exports) {

  exports.map = {
    '/groups/:id': {
      tag: 'page-groups-single',
    },
    '/:page': {
      tag: function(req, res) {
        return 'page-' + req.params.page;
      },
    },
    '/': {
      tag: 'page-index',
    }
  };

})(typeof exports === 'undefined' ? this.router = {} : exports);