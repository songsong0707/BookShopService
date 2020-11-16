var mongodb=require('mongodb');

var addressDao={
	dbName:"book",
	cllcName:"address",
	aggregate:function(conn,condition){
		return new Promise(function(resolve,reject){
			var database=conn.db(addressDao.dbName);
			database.collection(addressDao.cllcName).aggregate(condition).toArray(function(err,result){
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
			var database=conn.db(addressDao.dbName);
			database.collection(addressDao.cllcName).find(condition).toArray(function(err,result){
				if (err) {
					reject(err)
				} else{
					resolve(result)
				}
			})
		})
	},
	insertOne:function(conn,data){
		return new Promise(function(resolve,reject){
			var database=conn.db(addressDao.dbName);
			database.collection(addressDao.cllcName).insertOne(data,function(err){
				if (err) {
					reject(err)
				} else{
					resolve()
				}
			})
		})
	},
	deleteMany:function(conn,condition){
		return new Promise(function(resolve,reject){
			var database=conn.db(addressDao.dbName);
			database.collection(addressDao.cllcName).deleteMany(condition,function(err){
				if (err) {
					reject(err)
				} else{
					resolve()
				}
			})
		})
	},
	updateMany:function(conn,condition,data){
		return new Promise(function(resolve,reject){
			var database=conn.db(addressDao.dbName);
			database.collection(addressDao.cllcName).updateMany(condition,{$set:data},function(err){
				if (err) {
					reject(err)
				} else{
					resolve()
				}
			})
		})
	},
}

module.exports=addressDao;