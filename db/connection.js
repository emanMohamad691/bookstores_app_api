const pool = require("./pool");

exports.query = (text, value) => {
    return new Promise((resolve, reject) => {
        pool.query(text, value)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    });
}