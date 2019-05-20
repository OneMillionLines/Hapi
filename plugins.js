var plugins=[{
    plugin: require('./plugin1.js'),
    options: {
        name: 'Bob'
    }
  }, {
      plugin: require('./my-scheme'),
      options: {
          name: 'Bob'
      }
}]

module.exports = plugins;