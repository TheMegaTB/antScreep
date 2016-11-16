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
    constructor(body) {
        this.body = body ? body : [];
    }

    get body() {
        return this.parts;
    }

    set body(parts) {
        this.parts = parts;
        this.cost = calculateCost(parts);
    }

    spawn(spawnID) {
        Game.getObjectById(spawnID).createCreep(this.body, this.name, this);
    }
};

module.exports = Bot;