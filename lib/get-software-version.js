const shell = require('shelljs');
const Software = require('./software.js');

module.exports = {
    getSoftwareVersion: getSoftwareVersion
};

function getSoftwareVersion(cmd) {
    return new Promise(function(resolve, reject) {
        if (!shell.which(cmd)) {
            resolve({
                cmd: cmd,
                version: undefined
            });
        }

        var software = _get(Software, cmd);
        var flag = _get(software, 'flag', Software.__default__.flag);

        var command = [cmd, flag].join(' ');

        var result  = shell.exec(command, {silent:true});
        var rawVersion = (result.stdout || result.stderr);  // somehow java outputs version in stderr...

        var result = {
            cmd: cmd,
            version: getVersion(cmd, rawVersion)
        };

        resolve(result);
    });
}

function getVersion(cmd, rawVersion) {
    var software = _get(Software, cmd);
    var versionParser = _get(software, 'versionParser', Software.__default__.versionParser);
    var semverConverter = _get(software, 'semverConverter', Software.__default__.semverConverter);

    var originalVersion = versionParser(rawVersion)        // parse software version
    var semverVersion = semverConverter(originalVersion);  // convert to semver for internal comparison

    var version = {
        raw: rawVersion,
        original: originalVersion,
        semver: semverVersion
    }

    return version;
}


// tiny lodash _.get
function _get(o, p, defaults) {
    return (o && o[p]) || defaults;
}
