const c = require("constants");

const calculateCost = function (body) {
    let cost = 0;
    for (let part in body) {
        if (!body.hasOwnProperty(part)) continue;
        part = body[part];
        switch (part) {
            case MOVE:
                cost += 50;
                break;
            case CARRY:
                cost += 50;
                break;
            case WORK:
                cost += 100;
                break;
            case ATTACK:
                cost += 80;
                break;
            case RANGED_ATTACK:
                cost += 150;
                break;
            case HEAL:
                cost += 250;
                break;
            case CLAIM:
                cost += 600;
                break;
            case TOUGH:
                cost += 10;
                break;
        }
    }
    return cost;
};

const Bot = class Bot {
    constructor(body, prefix) {
        this.prefix = prefix ? prefix : c.DEFAULT_PREFIX;
        this.body = body ? body : [];
    }

    get body() {
        return this.parts;
    }

    set body(parts) {
        this.parts = parts;
        this.cost = calculateCost(parts);
    }

    static generateName(prefix) {
        let i = 1;
        while (Game.creeps[prefix + " #" + i] != null)
            i += 1;
        return prefix + " #" + i;
    }

    generateBody(maxEnergy) {
        const baseParts = this.body;
        if (!baseParts) {
            return [];
        }

        let baseBody = [];
        baseBody = baseBody.concat(baseParts);

        for (let i = 0; i < baseParts.length / 2; i++)
            baseBody.push(MOVE);

        let times = Math.floor(maxEnergy / calculateCost(baseBody));

        if (times * baseBody.length > c.MAX_PARTS)
            times = Math.floor(c.MAX_PARTS / baseBody.length);
        else if (times == 0)
            return [WORK, CARRY, MOVE];

        let finalBody = [];
        for (let i = 0; i < times; i++)
            finalBody = finalBody.concat(baseBody);

        finalBody.sort();

        return finalBody;
    }

    spawn(spawnID) {
        this.name = Bot.generateName(this.prefix);
        const spawn = Game.getObjectById(spawnID);
        const body = this.generateBody(spawn.energy / 1.5);
        return Game.getObjectById(spawnID).createCreep(body, this.name);
    }
};

module.exports = Bot;