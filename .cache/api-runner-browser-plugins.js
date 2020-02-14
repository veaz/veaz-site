module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-google-analytics/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-remark-images/gatsby-browser.js'),
      options: {"plugins":[],"maxWidth":590,"backgroundColor":"transparent"},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
