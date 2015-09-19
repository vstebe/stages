Collections = {
  companies: new Mongo.Collection("companies")
}
Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images")]
});
