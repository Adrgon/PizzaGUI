/*
 * Worker-related tasks
 *
 */

//Dependencies
var _data = require('./data');
var helpers = require('./helpers');
var util = require('util');
//var debug = util.debuglog('workers');
var config = require('./config');

var workers = {};

// Init script
workers.init = function () {

    //Send to console in yellow
    console.log('\x1b[33m%s\x1b[0m', 'Background workers are running');

    //Delete expired tokens
    workers.deleteExpiredFiles();

    //Call the loop so deleteExpiredFiles() will be executed later on too
    workers.loop();
};

workers.deleteExpiredFiles = function () {

    //debug("\n\nStarting to delete expired tokens...\n");

    workers.gatherAll(config.tokensFolder, "expires", function (date) {
        return (date && date <= Date.now()) ? true : false;
    });
};

//Timer to execute the deletion once time set in config
workers.loop = function () {
    setInterval(function () {
        workers.deleteExpiredFiles();
    }, config.workersLoopTime);
};

//Lookup files and send them to validator
workers.gatherAll = function (folder, fieldToValidate, validationFunction) {

    //Get all the files that exist in the folder
    _data.list(folder, function (err, fileNames) {

        if (!err && fileNames && fileNames.length > 0) {

            fileNames.forEach(function (fileName) {
                //Read in the data
                _data.read(folder, fileName, function (err, data) {

                    //Remove all the files where the field exceed maxValue
                    if (!err && data) {
                        workers.validateData(folder, fileName, data, fieldToValidate, validationFunction);
                    } else {
                        //debug("Error reading from file: " + fileName);
                        console.log("Error reading from file: " + fileName);
                    }
                });
            });

        } else {
            //debug("Error: Could not find any orders to process.");
            console.log("Error: Could not find any orders to process.");
        }
    });
};

workers.validateData = function (folder, fileName, data, fieldToValidate, validationFunction) {

    data = helpers.validateObject(data);
    var fieldValue = data[fieldToValidate];

    //debug("Field value as date: " + (new Date(fieldValue)).toString());
    //debug("File " + fileName + " should be deleted: " + validationFunction(fieldValue));

    //If the orderDate is invalid or it exceeds its lifespan, delete the file
    //If the token 'expires' is greater than Date.now(), delete the file
    if (fieldValue == null || validationFunction(fieldValue)) {
        _data.delete(folder, fileName, function (err) {

            if (!err) {
                //debug("Successfully deleted file by workers: " + fileName);
                console.log("Successfully deleted file by workers: " + fileName);
            } else {
                //debug("Error deleting one of files by workers.");
                console.log("Error deleting one of files by workers.");
            }
        });
    }
};

module.exports = workers;