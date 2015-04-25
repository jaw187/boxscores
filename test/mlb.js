// Load modules

var Code = require('code');
var Lab = require('lab');

var Mlb = require('../lib/mlb');

// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('Gets data from MLB', function () {

    it('Can get scoreboard', function (done) {

        var options = {
            path: 'year_2011/month_07/day_23/'
        };

        Mlb.getScoreboard(options, function (err, scoreboard) {

            expect(err).to.not.exist();

            //Purdy(scoreboard.data.games.game);

            expect(scoreboard.data).to.exist();
            expect(scoreboard.data.games.game.length).to.equal(15);

            done();
        });
    });

    it('Can get boxscores', function (done) {

        var options = {
            path: 'year_2011/month_07/day_23/'
        };

        Mlb.getScoreboard(options, function (err, scoreboard) {

            expect(err).to.not.exist();

            options.scoreboard = scoreboard;
            Mlb.getBoxscores(options, function (err, boxscores) {

                expect(err).to.not.exist();

                expect(boxscores.length).to.equal(15);
                done();
            });
        });
    });

    it('Can get plays', function (done) {

        var options = {
            path: 'year_2011/month_07/day_23/'
        };

        Mlb.getScoreboard(options, function (err, scoreboard) {

            expect(err).to.not.exist();

            options.scoreboard = scoreboard;
            Mlb.getPlays(options, function (err, games) {

                expect(err).to.not.exist();
                expect(games.length).to.equal(15);
                done();
            });
        });
    });

    it('Can get game events', function (done) {

        var options = {
            path: 'year_2011/month_07/day_23/'
        };

        Mlb.getScoreboard(options, function (err, scoreboard) {

            expect(err).to.not.exist();

            options.scoreboard = scoreboard;
            Mlb.getGameevents(options, function (err, events) {

                expect(err).to.not.exist();
                expect(events.length).to.equal(15);
                done();
            });
        });
    });

    it('Fails to get scoreboard without options', function (done) {

        Mlb.getScoreboard(null, function (err) {

            expect(err).to.exist();
            done();
        })
    });

    it('Fails to get boxscores without options', function (done) {

        Mlb.getBoxscores(null, function (err) {

            expect(err).to.exist();
            done();
        })
    });

    it('Fails to get plays without options', function (done) {

        Mlb.getPlays(null, function (err) {

            expect(err).to.exist();
            done();
        })
    });

    it('Fails to get game events without options', function (done) {

        Mlb.getGameevents(null, function (err) {

            expect(err).to.exist();
            done();
        })
    });

    it('Fails to get resource without callback', function (done) {

        var error = 1;
        try {
            Mlb.getBoxscores();
        }
        catch (e) {
            error = e;
        }

        expect(error).to.not.equal(1);

        done();
    });
});
