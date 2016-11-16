"use strict";

const async = require("async"),
    Bot = require("bot"),
    c = require("constants");

function initMemory() {
    if (typeof Memory.plugins === "undefined") Memory.plugins = {};
}

module.exports.loop = function () {

    initMemory();

    for (let name in Memory.creeps) {
        if (!Memory.creeps.hasOwnProperty(name)) continue;
        if (!Game.creeps[name]) delete Memory.creeps[name];
    }

    const mySpawns = async.update(async.data.SPAWNS);
    const myCreeps = async.update(async.data.CREEPS);
    const population_size = Object.keys(myCreeps).length;

    const defaultBot = new Bot(c.DEFAULT_BODY);
    for (let spawn in mySpawns) {
        if (!mySpawns.hasOwnProperty(spawn)) continue;
        defaultBot.spawn(mySpawns[spawn].id);
    }
};