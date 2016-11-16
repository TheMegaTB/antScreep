module.exports = {
    generateName: function (prefix) {
        let i = 1;
        while (Game.creeps[prefix + " #" + i] != null) {
            i += 1;
        }
        return prefix + " #" + i;
    }
};