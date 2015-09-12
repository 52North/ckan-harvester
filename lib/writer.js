var fs = require('fs');
var log = require('./logging')('writer');

function write(filename, json, sync) {
    if (sync) {
        try {
            fs.writeFileSync(filename, JSON.stringify(json, null, 4));
            log.info("The file was saved to " + filename);
        } catch (e) {
            log.warn(e);
        }
    }
    else {
        fs.writeFile(filename, JSON.stringify(json, null, 4), function(err) {
            if (err) {
                log.warn(err);
                return;
            }

            log.info("The file was saved to "+filename);
        });         
    }
}

// Functions which will be available to external callers
exports.write = write;
