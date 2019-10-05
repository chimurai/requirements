module.exports = {
  software: {
    // java: '>= 1.8.x',
    git: '~1.9.4 || 2.0.0 - 2.10.0',
    node: '8 || 10 || 12',
    npm: '>= 6.x',
    yarn: '>= 1.19.x',
    mvn: '^3.x',
    nginx: {
      semver: '^6.x',
      optional: true
    },
    httpd: {
      semver: '^2.x',
      flag: '-v'
    }
  }
};
