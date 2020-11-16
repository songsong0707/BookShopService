var addressDao=require("../DAO/addressDao")
var connection=require("../util/connection")

var addressRouter={
	showBookLimit:async function(req,res){
		console.log("-----------执行关于地址的增删改查----------");
		var conn;
		try{
			// 打开数据库连接
			conn=await connection.getConn();
			// 查看全部地址
			var addressArray=await addressDao.find(conn,{})
			
			// 打印一下传过来的数据
			console.log(req.body);
			
			//数据库中的属性名：booktypeid 分类，bookauthorid作者，moneyStart和moneyEnd 价格区间
			if(req.body.condition.booktypeid!=""
			||req.body.condition.bookauthorid!=""
			||req.body.condition.moneyStart!=""){
				// 先定义一个空条件
				var cond1={$match:{}}
				// 拼接条件
				if(req.body.condition.booktypeid!=""){
					// 传入分类
					cond1.$match.booktypeid=req.body.condition.booktypeid;
				}
				if(req.body.condition.bookauthorid!=""){
					// 传入作者
					cond1.$match.bookauthorid=req.body.condition.bookauthorid;
				}
				if(req.body.condition.moneyStart!=""){
					// 传入价格区间
					cond1.$match.bookprice={$gte:Number(req.body.condition.moneyStart),$lte:Number(req.body.condition.moneyEnd)};
				}
				console.log(cond1);
				// 装载条件
				condition.push(cond1);
				countCondition.push(cond1);
			}
			
			// 计数
			countCondition.push({$group:{"_id":"","count":{$sum:1}}});
			// 分组查询
			condition.push({$skip:(Number(req.body.page)-1)*Number(req.body.pagesize)})
			condition.push({$limit:Number(req.body.pagesize)})
			
			// 查询数量
			var data=await bookDao.aggregate(conn,countCondition)
			var count=0;//默认数量为0
			if(data.length>0){
				//防止下标越界【数组中咩有任何元素，还强行获取就会越界】
				count=data[0].count;
			}
			// 查询数据
			var array=await bookDao.aggregate(conn,condition)
			
			res.status(200);//自定义200是正确码
			var result={
				"authorArray":authorArray,
				"book_typeArray":book_typeArray,
				"array":array,
				"count":count
			}
			res.end(JSON.stringify(result))
		}catch(err){
			console.log(err);
			res.status(400);//返回自定义错误码
		}finally{
			if(conn!=undefined){
				conn.close();//关闭数据库的连接
			}
		}
	}
}


module.exports=addressRouter;
