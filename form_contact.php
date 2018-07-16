<?php

    if (is_array($_GET))

	extract($_GET);

    if (is_array($_POST))

	extract($_POST);

	$to=  "123456789@qq.com";

	$subject = "某某律师团队留言板";

	$headers = 'From: 某某律师团队移动端'. "\r\n" ;

	$headers .= "Content-type: text/html; charset=utf-8\n";

	   $body = "<html>";

	   $body .= "<head>";

	   $body .= "<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>";

	   $body .= "</head>";

	   $body .= "<body>";

	   $body .= "以下是手机用户的留言信息:<br>";

	   $body .= '

	    <span>姓名：</span>'.$name.'<br>
		<span>电话：</span>'.$shouji.'<br>
		<span>詳細內容：</span>'.$messages.'<br>

	   ';

	   $body .= '';

	   $body .= "</body>";

	   $body .= "</html>";

       mail($to, $subject , $body, $headers);
?>
<script LANGUAGE="javascript">

//setTimeout(''window.close();'', 5000);
alert('你的留言已经成功发送!');
history.go(-1);

</script>

