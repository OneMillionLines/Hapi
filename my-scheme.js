const Boom = require('boom');

exports.plugin = {
  name: 'myScheme',
  version: '1.0.0',
  register: async function (server, options) {

      let impl = function (server, options) {
        const scheme = {
          authenticate: function (request, h) {
            try {
              console.log("Hello Auth user");
              return h.authenticated({
                credentials: { "hello": "world"}
              })
            } catch (err) {
              return h.unauthenticated(err);
            }
          }
        };
        return scheme;
      };
      
      // Create a route for example
      server.auth.scheme('my-scheme', impl);
  }
};