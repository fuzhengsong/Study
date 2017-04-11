<?php
	require 'config.php';
	
	$_passWord = sha1($_POST['passWord']);
	
	$query = mysql_query("SELECT user FROM blog_user WHERE user='{$_POST['user_name']}' AND pass='{$_passWord}'") or die('SQL错误！');
	
	if (mysql_fetch_array($query, MYSQL_ASSOC)) {		//用户名和密码正确
		echo 0;
	} else {	//用户名和密码不正确；
		echo 1;
	}
	
	mysql_close();
?>