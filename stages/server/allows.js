Images.allow({
  'insert': function () {
    return true;
  },
  'update': function () {
    return true;
  },
  download: function(userId, fileObj) {
        return true
  }
});
