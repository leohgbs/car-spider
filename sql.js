// mysql 操作
const mysql = require('mysql')
const pool = mysql.createPool({
	host     : 'localhost',
	user     : 'root',
	// password : 'Qkhc_2018',
	password : '',
	database : 'car_config'
})

let query = function( sql, values ) {
	return new Promise(( resolve, reject ) => {
		pool.getConnection(function(err, connection) {
			if (err) {
				console.log(err)
				reject( err )
			} else {
				if (values) {
					connection.query(sql, values, ( err, rows) => {
						if ( err ) {
							reject( err )
						} else {
							resolve( rows )
						}
						// 结束会话
						connection.release()
					})
				} else {
					connection.query(sql, ( err, rows) => {
						if ( err ) {
							reject( err )
						} else {
							resolve( rows )
						}
						// 结束会话
						connection.release()
					})
				}
			}
		})
	})
}

module.exports =  query