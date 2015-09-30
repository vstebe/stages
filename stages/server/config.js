ServiceConfiguration.configurations.remove({
  service: "ares"
});

ServiceConfiguration.configurations.insert({
  service: "ares",
  clientId: "f660adbe42553f44a49c06d76a26698535156cc1a76adf8c80df08b663c1193f",
  secret: "28dcebdff7d34b26923d1a975846d3e2c15967692db1151c3486db3b771368fe",
  scope:'public'
});

// Reverse
Geo = new GeoCoder({
  httpAdapter: "https",
  apiKey: 'AIzaSyANYyu9DTLhXBQn7Lab3NBK4YS5jO1e2-0'
});
