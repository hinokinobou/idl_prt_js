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

header('Location:http://idl-prt-js.herokuapp.com/' . $jsurl . '?' . time() );

exit;
