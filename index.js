const Hapi = require('hapi'),
    //sample = require('./sample.js');
    plugins= require('./plugins.js')
    path   = require('./path.js')
    const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: true
          }
    });

    
    //await server.register(require('./plugin1.js'));
    
    await server.register(plugins);
    server.auth.strategy("my-strategy", "my-scheme", {})

    server.ext('onPreAuth', function (request, h){
        console.log("This is in PreAuth");
        return h.continue;
    });

    server.ext('onPostAuth', function (request, h){
        console.log("This is in onPostAuth");
        return h.continue;
    });
    
    path.forEach(route=>{
        server.route(route);
    });
    

    await server.start();

    console.log('Server running on %s', server.info.uri);
};


process.on('unhandledRejection', (err) => {
    console.log(err);
    console.log("ingaya");
    process.exit(1);
});

init();