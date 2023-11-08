let db, config

module.exports = (_db, _config) => {
    db = _db
    config = _config
    return Players
}


let Players = class {
    static getAll() {
        return new Promise((next) => {
            db.query('SELECT * FROM players ORDER BY final_place')
                .then(result => next(result))
                .catch(err => next(err))
        })
    }
    static addOne(player) {
        return new Promise((next) => {
            db.query('INSERT INTO players(lastname, firstname, license) VALUES(?, ?, ?)', [player.lastname, player.firstname, player.license])
                .then(result => next(result))
                .catch(err => next(err))
        })
    }
    static updateOne(player) {
        return new Promise((next) => {
            db.query('UPDATE players SET final_place = ? WHERE id = ?', [player.final_place, player.id])
                .then(result => next(player))
                .catch(err => next(err))
        })
    }
    static deleteAll() {
        return new Promise((next) => {
            db.query('DELETE FROM players')
                .then(result => next(result))
                .catch(err => next(err))
        })
    }
}