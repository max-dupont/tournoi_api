let db, config

module.exports = (_db, _config) => {
    db = _db
    config = _config
    return Rooms
}

let Rooms = class {
    static getAll() {
        return new Promise((next) => {
            db.query('SELECT * FROM rooms')
                .then(result => next(result))
                .catch(err => next(err))
        })
    }
    static addOne(room) {
        return new Promise((next) => {
            db.query('INSERT INTO rooms(number) VALUES(?)', [room.number])
                .then(result => next(result))
                .catch(err => next(err))
        })
    }
    static deleteAll() {
        return new Promise((next) => {
            db.query('DELETE FROM rooms')
                .then(result => next(result))
                .catch(err => next(err))
        })
    }
}
