module.exports = {
  software: {
    node: '^12.10.0',
    nginx: {
      semver: '^666.x',
      optional: true // won't fail if missing or wrong version
    }
    // httpd: {
    //   semver: '^2.x',
    //   flag: '-v'       // custom flag to print version
    // },
  }
};
