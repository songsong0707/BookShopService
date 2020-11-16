var mongodb=require('mongodb');

var BookDao={
	dbName:"book",
	cllcName:"book",
	aggregate:function(conn,condition){
		return new Promise(function(resolve,reject){
			var database=conn.db(BookDao.dbName);
			database.collection(BookDao.cllcName).aggregate(condition).toArray(function(err,result){
				if (err) {
					reject(err)
				} else{
					resolve(result)
				}
			})
		})
	},
	find:function(conn,condition){
		return new Promise(function(resolve,reject){
			var database=conn.db(BookDao.dbName);
			database.collection(BookDao.cllcName).find(condition).toArray(function(err,result){
				if (err) {
					reject(err)
				} else{
					resolve(result)
				}
			})
		})
	}
}

module.exports=BookDao;