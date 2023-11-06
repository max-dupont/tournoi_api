let db, config

module.exports = (_db, _config) => {
    db = _db
    config = _config
    return Games
}

/**
 * TO DO :
 * getAll OK
 * addOne OK
 * addAll ?
 * updateOne OK
 * deleteAll OK
 */
let Games = class {
    static getAll() {
        return new Promise((next) => {
            db.query('SELECT * FROM games')
                .then(result => next(result))
                .catch(err => next(err))
        })
    }
    static addOne(game) {
        return new Promise((next) => {
            db.query('INSERT INTO games(tower, number, first_player, second_player) VALUES(?, ?, ?, ?)', [game.tower, game.number, game.first_player, game.second_player])
                .then(result => next(result))
                .catch(err => next(err))
        })
    }
    static updateOne(game, id) {
        return new Promise((next) => {
            db.query('UPDATE games SET first_player = ?, second_player = ?, winner = ? WHERE id = ?', [game.first_player, game.second_player, game.winner, id])
                .then(result => next(result))
                .catch(err => next(err))
        })
    }
    static deleteAll() {
        return new Promise((next) => {
            db.query('DELETE FROM games')
                .then(result => next(result))
                .catch(err => next(err))
        })
    }   
}