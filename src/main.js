"use strict";

const async = require("async"),
    Bot = require("bot"),
    c = require("constants");

function initMemory() {
    if (typeof Memory.plugins === "undefined") Memory.plugins = {};
}

module.exports.loop = function () {

    initMemory();

    // var myCreeps = _.filter(Game.creeps, (creep) => creep.my);
    // var population_size = Object.keys(myCreeps).length;

    const mySpawns = async.update(async.data.SPAWNS);

    const defaultBot = new Bot(c.DEFAULT_BODY);
    for (let spawn in mySpawns) {
        if (!mySpawns.hasOwnProperty(spawn)) continue;
        spawn = mySpawns[spawn];

        if (spawn.energy == 1.5 * defaultBot.cost)
            defaultBot.spawn(spawn.id);
    }
    // new Bot([WORK, CARRY, MOVE]).spawn("455cb7e61b8bba8f01ba9e39");
    // console.log(Memory.creeps['Caden'].body); // Creep class has been converted to pure object
};