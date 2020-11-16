var mongodb=require('mongodb');

var AuthorDao={
	dbName:"book",
	cllcName:"author",
	find:function(conn,condition){
		return new Promise(function(resolve,reject){
			var database=conn.db(AuthorDao.dbName);
			database.collection(AuthorDao.cllcName).find(condition).toArray(function(err,result){
				if (err) {
					reject(err)
				} else{
					resolve(result)
				}
			})
		})
	}
}

module.exports=AuthorDao;