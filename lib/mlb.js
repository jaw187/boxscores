// Load modules

var Wreck = require('wreck');
var Hoek = require('hoek');
var Insync = require('insync');

// Declare internals

var internals = {};


internals.mlb = require('./mlb.json');
internals.baseUrl = internals.mlb.protocol + '://' + internals.mlb.host + internals.mlb.basepath + '/';


internals.get = function (options, callback) {

    Hoek.assert(callback, 'Callback is required');
    
    if (!options.path) {
        return callback(new Error('Path is required'));
    }

    var url = internals.baseUrl + options.path + internals.mlb.files[options.which];
    Wreck.get(url, { json: true }, function (err, response, payload) {

        return callback(err, payload);
    });
};


module.exports.getScoreboard = internals.getScoreboard = function (options, callback) {

    options = options || {};
    options.which = 'scoreboard';

    return internals.get(options, callback);
};


module.exports.getBoxscores = internals.getBoxscores = function (options, callback) {

    options = options || {};

    var games = Hoek.reach(options, 'scoreboard.data.games.game');

    if (!(options.path && games)) {
        return callback(new Error('Path and Scoreboard with games are required'));
    }

    var getBoxscore = function (game, next) {

        var boxscoreOptions = {
            path: options.path + 'gid_' + game.gameday + '/'
        };

        return internals.getBoxscore(boxscoreOptions, next);
    };

    Insync.map(games, getBoxscore, function (err, boxscores) {

        return callback(err, boxscores);
    });
};


internals.getBoxscore = function (options, callback) {

    options.which = 'boxscore';

    return internals.get(options, callback);
};
