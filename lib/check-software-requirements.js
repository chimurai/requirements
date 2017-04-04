const rc = require('rc');
const semver = require('semver');
const {getSoftwareVersion} = require('./get-software-version.js');
const conf = require('rc')('requirements');

module.exports = {
    checkSoftware: checkSoftwareRequirements
}

function checkSoftwareRequirements(customConfig) {
    console.info('\n[R] Checking software requirements...');

    let config = customConfig || conf;

    getSoftwareRequirements(config.software).then(function(results) {
        softwareRequirementsConsoleReporter(results);
        softwareRequirementsExitReporter(results);
    }, function(err) {
        console.log(err);
    });
}

function getSoftwareRequirements(softwareList) {
    return new Promise(function(resolve, reject) {
        var softwareVersions = [];
        let results = [];

        for(var name in softwareList) {
            softwareVersions.push(getSoftwareVersion(name));
        }

        Promise.all(softwareVersions).then(function(versions) {
            for(let item of versions) {

                let requiredVersion = softwareList[item.cmd];
                let satisfies = (item.version) ? semver.satisfies(item.version.semver, requiredVersion) : false;
                let installed = (item.version) ? true : false;

                results.push({
                    software: item.cmd,
                    requiredVersion: requiredVersion,
                    installed: installed,
                    installedVersion: item.version,
                    satisfies: satisfies,
                });
            }

            resolve(results);
        }).catch(reject)
    });
}

function softwareRequirementsExitReporter(list) {
    const chalk = require('chalk');
    let meetRequirements = list.every(item => item.satisfies === true);

    if (meetRequirements) {
        list.length && console.info('\n[R] Good to go!\n');
    } else {
        console.error(chalk.red.bold('\n[R] Software requirements are not fully met.\n'));

        process.exit(0);
    }
}

function softwareRequirementsConsoleReporter(list) {
    const Table = require('cli-table');
    const logSymbols = require('log-symbols');
    const chalk = require('chalk');


    if (list.length) {
        let table = new Table({
            head: ['Software', 'Required', 'Installed'],
            colAligns: ['left', 'right', 'left'],
            style: {
                head: ['bold'],
                border: ['grey'],
                compact : true
            }
        });

        list.forEach(function(item) {
            let required  = chalk.dim(item.requiredVersion);
            let installed = (item.installed) ?
                    (item.satisfies ? _ok(item.installedVersion.original) : _nok(item.installedVersion.original)) :
                    _nok('Not installed');

            table.push([item.software, required, installed]);
        });

        console.log(table.toString());
    } else {
        console.log('[R] No software requirements found.');
    }

    function _ok(v) {
        return `${chalk.green(logSymbols.success)} ${chalk.gray(v)}`;
    }

    function _nok(v) {
        return chalk.red(`${logSymbols.error} ${chalk.bold(v)}`);
    }
}
