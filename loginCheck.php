<?php
header("Content-type:text/html;charset=utf-8");

$username=$_POST["username"];
$userpass=$_POST["userpass"];

$conn = mysql_connect('localhost','root','123456');
if(!$conn){
		die('连接失败');
}
mysql_select_db('checkusername',$conn);

$sqlstr="select * from usernews where userphone='$username' and userpwd='$userpass'";
$result=mysql_query($sqlstr);
$rows=mysql_num_rows($result);
if($rows==1){
	echo "登录成功！";
	// header('Location: index.html');
}else{
	echo "亲，登录失败，请重新登录！";
	// header('Location: login.html');
}
mysql_close($conn);

?>