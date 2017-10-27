const secrets = require('./secrets');

module.exports = {
  db: {
    // uri: 'mongodb://' + secrets.db.user + ':' + secrets.db.pass + '@' + localhost/express-auth'
    uri: 'mongodb://localhost/express-multi-auth'
  },
  session: {
    secret: secrets.session.secret
  },
  http: {
    enabled: true,
    port: 8080
  },
  https: {
    enabled: true,
    port: 8443,
    crt: 'config/cert/server.crt',
    key: 'config/cert/server.key',
    passphrase: secrets.https.passphrase
  },
  auth: {
    google: {
      enabled: true,
      clientId: secrets.google.clientId,
      clientSecret: secrets.google.clientSecret,
      callbackURL: 'https://example.itgipsy.com:8443/auth/google/callback'
    },
    facebook: {
      enabled: true,
      appId: secrets.facebook.appId,
      appSecret: secrets.facebook.appSecret,
      callbackURL: 'https://example.itgipsy.com:8443/auth/facebook/callback'
    }
  }
};

