module.exports = getSoftware();

function getSoftware() {
    var list = {}

    /**
     * Default
     */
    list['__default__'] = {
        flag: '--version',  // looks like this is the most common flag to print the version
        versionParser: function(v) {
            return _grep(v, /([\d._+-]+\d)/i);
        },
        semverConverter: function(v) {
            return v;
        }
    };

    list['adb'] = {
        flag: ''
    };

    list['gulp'] = {
        versionParser: function(v) {
            return _grep(v, /([\d.]+\.\d)/i);
        },
    };

    list['java'] = {
        flag: '-version',
        semverConverter: function (v) {
            return v.replace('_', '+');
        }
    };

    list['xcode-select'] = {
        semverConverter: function (v) {
            return v + '.0.0';
        }
    };

    return list;
}

function _grep(v, regex) {
    var result = v.match(regex);

    if (result) {
        return result[1];
    }
}
