const which = require('which');
const getFlag = require('./get-version-flag.js');
const binVersion = require('bin-version');

module.exports = {
    getSoftwareVersion: getSoftwareVersion
};

function getSoftwareVersion(cmd) {
    return new Promise(function(resolve, reject) {

        which(cmd, function(err, path) {

            if (err) {
                resolve({
                    cmd: cmd,
                    version: undefined
                });

                return;
            }

            let flag = getFlag(cmd);
            let args = flag ? {args: [flag]} : undefined;

            binVersion(cmd, args).then(version => {
                let result = {
                    cmd: cmd,
                    version: {
                        raw: version,
                        original: version,
                        semver: version
                    }
                };

                resolve(result);
            }, reject);
        });

    });
}
