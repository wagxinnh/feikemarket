<?php
	
	header("content-type","text/html;charset=utf-8");
	
	//1、建立连接并选择数据库
	$con = mysql_connect("localhost","root","123456");
	if(!$con){
		die("连接失败".mysql_error());
	}
	mysql_select_db("checkusername",$con);
	
	//2、执行SQL语句
	$sqlStr = "insert into usernews(userphone,userpwd)
              values('13992417680','456128')";
    
      
	mysql_query($sqlStr,$con);
	
	//3、关闭数据库
	mysql_close($con);
	
	echo "亲，添加成功";

?>