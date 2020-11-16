var mongodb=require('mongodb');

var book_typeDao={
	dbName:"book",
	cllcName:"boot_type",
	find:function(conn,condition){
		return new Promise(function(resolve,reject){
			var database=conn.db(book_typeDao.dbName);
			database.collection(book_typeDao.cllcName).find(condition).toArray(function(err,result){
				if (err) {
					reject(err)
				} else{
					resolve(result)
				}
			})
		})
	}
}

module.exports=book_typeDao;