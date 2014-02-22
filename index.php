<?php


$jsurl = $_GET['jsurl'];


if ( !preg_match('/^[a-z0-9_\-]+.js$/', $jsurl) ){
	echo 'Hello World!';
	exit;

}

$jspath = './' . $jsurl;
if ( !file_exists($jspath)){
	echo 'Hello World!!';
	exit;
}

//header('Location:http://idl-prt-js.herokuapp.com/' . $jsurl . '?' . time() );

$jscode = file_get_contents($jspath);


header("Content-Type: text/html; charset=文字コード");
header("Expires: Thu, 01 Dec 1994 16:00:00 GMT");
header("Last-Modified: ". gmdate("D, d M Y H:i:s"). " GMT");
header("Cache-Control: no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

header('Content-Type: application/javascript');
echo $jscode;

exit;
