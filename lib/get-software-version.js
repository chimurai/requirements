const which = require('which');
const Software = require('./software.js');
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

            let flag = (Software[cmd] && Software[cmd].flag);
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
