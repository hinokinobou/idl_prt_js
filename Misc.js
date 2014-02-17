// デバッグログ
var DP_LOG_ENABLE = true;
var dp = function( message ) {
	if ( DP_LOG_ENABLE === true )
	{
		console.log("-- " + message);
	}
};