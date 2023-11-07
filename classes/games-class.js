let db, config

module.exports = (_db, _config) => {
    db = _db
    config = _config
    return Games
}

let Games = class {
    static getAll() {
        return new Promise((next) => {
            db.query(`
                    SELECT g.id as id, tower, number,
                    first_player, CONCAT(p1.firstname,' ', p1.lastname) as first_player_name,
                    second_player, CONCAT(p2.firstname,' ', p2.lastname) as second_player_name,
                    winner 
                    FROM games g 
                    JOIN players p1 ON g.first_player=p1.id
                    JOIN players p2 ON g.second_player=p2.id
                `)
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
                .then(result => next(game))
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