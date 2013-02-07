<?php
// PHP Proxy example for Yahoo! Web services. 
// Responds to both HTTP GET and POST requests
//
// Author: Jason Levitt
// December 7th, 2005
//

// Allowed hostname (api.local and api.travel are also possible here)

// Get the REST call path from the AJAX application
// Is it a POST or a GET?
$url=($_POST['url']) ? $_POST['url'] : $_GET['url'];
if (get_magic_quotes_gpc()) {
$url = stripslashes($url);
}
$xml=loadFile($url);

function loadFile($sFilename) {

    $ctx = stream_context_create(array(     
       'http' => array('timeout' => 500,  
       'proxy' => 'tcp://10.40.14.56:80',   
       'request_fulluri' => True)     
    )     
    );  

#    if (floatval(phpversion()) >= 4.3) {
        $sData = @file_get_contents($sFilename,False, $ctx);

#	if (strpos($http_response_header[0], "400")) {
#		echo "400: Bad Request!"; 
#	} elseif (strpos($http_response_header[0], "403")) {
#		echo "403: Access Denied!"; 
#		http_response_code(403);
#	} elseif (strpos($http_response_header[0], "404")) {
#		echo "404: Request URL not Found!"; 
#		http_response_code(404);
#	} elseif (strpos($http_response_header[0], "500")) {
#		echo "Internal Server Error";
#		http_response_code(500);
#	} 
#    } else {
#        if (!file_exists($sFilename)) return -3;                
        
 #       $rHandle = fopen($sFilename, 'r');
 #       if (!$rHandle) return -2;

#        $sData = '';
#        while(!feof($rHandle))
#            $sData .= fread($rHandle, filesize($sFilename));
#        fclose($rHandle);
#    }
    return $sData;
}

if($xml===false) {
	header($_SERVER["SERVER_PROTOCOL"]." 400 Bad Request"); 
} else {
	@header( 'Content-Type:   text/xml '); 
	echo $xml;
}
?>

