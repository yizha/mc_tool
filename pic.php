<?php
	$picurl=$_REQUEST["picurl"];
	$token=$_REQUEST["token"];
	echo "<img src=\"$picurl?token=".urlencode($token)."\""." />";
?>
