<?php
// Is it a POST or a GET?
$url=($_POST['url']) ? $_POST['url'] : $_GET['url'];

$xml=loadFile(stripslashes($url));

//print_r(stripslashes($url));




function loadFile($sFilename) {
    $ctx = stream_context_create(array(     
       'http' => array('timeout' => 500,  
       'proxy' => 'tcp://10.40.14.23:80',   
       'request_fulluri' => True)     
    )     
    );  

    $sData = file_get_contents($sFilename,False, $ctx);
    return $sData;
}

if($xml===false) {
	header($_SERVER["SERVER_PROTOCOL"]." 400 Bad Request"); 
} else {
	@header( 'Content-Type:   text/xml '); 
	echo $xml;
}
?>

