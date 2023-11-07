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
                    winner, CONCAT(w.firstname,' ', w.lastname) as winner_name
                    FROM games g 
                    LEFT JOIN players p1 ON g.first_player=p1.id
                    LEFT JOIN players p2 ON g.second_player=p2.id
                    LEFT JOIN players w ON g.winner=w.id
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
    static updateOne(game) {
        let req = 'UPDATE games SET '
        let body = []
        if (game.first_player) {
            req += 'first_player = ?, '
            body.push(game.first_player)
        }
        if (game.second_player) {
            req += 'second_player = ?, '
            body.push(game.second_player)
        }
        req += 'winner = ? WHERE tower = ? AND number = ?'
        body.push(game.winner, game.tower, game.number)

        return new Promise((next) => {
            db.query(req, body)
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