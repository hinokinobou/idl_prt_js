<?php


$jsurl = $_GET['jsurl'];


if ( !preg_match('/^[a-z0-9\-]+.js$/', $jsurl) ){
	echo 'Hello World!';
	exit;

}

$jspath = './' . $jsurl;
if ( !file_exists($jspath)){
	echo 'Hello World!!';
	exit;
}

//header('Location:http://idl-prt-js.herokuapp.com/' . $jsurl . '?' . time() );

$jscode = file_get_contents('http://idl-prt-js.herokuapp.com/' . $jsurl . '?' . time());

header('Content-Type: application/javascript');
echo $jscode;

exit;
