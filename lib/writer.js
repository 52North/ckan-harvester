var fs = require('fs');
var log = require('./logging')('writer');

function write(filename, json) {
    fs.writeFile(filename, JSON.stringify(json), function(err) {
        if (err) {
            return log.log(err);
        }

        log.info("The file was saved to "+filename);
    }); 
}

// Functions which will be available to external callers
exports.write = write;
