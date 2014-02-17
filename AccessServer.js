//ajaxでサーバーにアクセスするクラス


//※事前にjQueryMobileを読み込んでください

/**
 * タイトル無しAlert(iOS)
 *	@note	iOSで普通にAlertを呼び出すとAlertのタイトルにドキュメント名(index.htmlなど)が表示されてしまう対策
 *			Androidでは変化なし
 **/
var ShowNoTitleAlert = function( str )
{
	var tmpFrame = document.createElement('iframe');
	tmpFrame.setAttribute('src', 'data:text/plain,');
	document.documentElement.appendChild(tmpFrame);
	var al = window.frames[0].window.alert(str);
	tmpFrame.parentNode.removeChild(tmpFrame);
	return al;
};

/**
 * タイトル無しConfirm(iOS)
 *	@note	iOSで普通にConfirmを呼び出すとConfirmのタイトルにドキュメント名(index.htmlなど)が表示されてしまう対策
 *			Androidでは変化なし
 **/
var ShowNoTitleConf = function( str )
{
	var tmpFrame = document.createElement('iframe');
	tmpFrame.setAttribute('src', 'data:text/plain,');
	document.documentElement.appendChild(tmpFrame);
	var conf = window.frames[0].window.confirm(str);
	tmpFrame.parentNode.removeChild(tmpFrame);
	return conf;
};

//ネットワークアクセスクラス(Singleton)
var CNetworkManager = (function()
{
//private

	//メモ：接続用データ
//	{
//		type			: "GET" か "POST"(デフォルトはGET)
//		url				: アクセス先
//		cache			: キャッシュするかどうか(デフォルトはfalse)
//		data			: urlに追加する引数(連想配列)
//		successCallback	: 通信成功時のコールバック
//		failureCallback	: 通信失敗時のコールバック
//		
//		//必要？
//		retry	: エラー時にリトライするかどうか(デフォルトはtrue)
//	}

	var STATE_NONE			= 0;	//非通信
	var STATE_CONNECTING	= 1;	//接続中
	
	//メンバ変数
	var _instance			= null;			//インスタンス
	var _fromGetInstance	= false;		//getInstance呼び出しフラグ
	
    
//	var _dataArray			= [];
//	var _currentData		= null;
//	var _status				= STATE_NONE;
//	
//
//	/**
//	 *	クリア
//	 **/
//	function _clear()
//	{
//		_dataArray			= [];
//		_currentData		= null;
//		_status				= STATE_NONE;
//	}

//	/**
//	 * 通信成功時コールバック
//	 **/
//	function _onSuccess( data, status )
//	{
//		dp("_onSuccess");
//		_currentData.successCallback( data, status );
//		
//		if ( _dataArray.length > 0 )
//		{
//			dp("まだデータが残ってるので処理(あと"+ _dataArray.length +")");
//		
//			_currentData = _dataArray[0];
//			
//			_dataArray.shift();
//			
//			//次のデータを処理
//			CNetworkManager.getInstance().accessStart();
//		}
//		else
//		{
//			dp("全てのデータを処理したのでクリア");
//			
//			//全てのデータを処理したのでクリア
//			_clear();
//		}
//	}
//
//	/**
//	 * 通信失敗時コールバック
//	 **/
//	function _onError()
//	{
////		if ( _currentData.failureCallback != undefined )
////		{
////			//別途エラー時の処理が定義されていたらそちらを優先
////			_currentData.failureCallback();
////		}
////		else
////		{
//			//"¥n"だと文字列として表示されてしまったので文字コード指定
//			ShowNoTitleAlert("通信エラーが発生しました" + String.fromCharCode(13) + "リトライします");
//
//			//再接続
//			CNetworkManager.getInstance().accessStart();
////		}
//	}

	
	/**
	 * コンストラクタ
	 **/
	function _construct()
	{
		if ( _fromGetInstance !== true )
		{
			//getInstance以外の方法で生成しようとした
			throw new Error("This class is Singleton. Please use getInstance method.");
		}
		_fromGetInstance = false;
		
		this._dataArray		= [];
		this._status		= STATE_NONE;
        
	}

//public

	/**
	 *	インスタンス取得
	 **/
	_construct.getInstance = function()
	{
        
		if ( _instance )
		{
			//既にインスタンス生成済みならそれを返す
			return _instance;
		}

		//getInstance経由で生成したフラグtrue
		_fromGetInstance = true;
		
		//インスタンスを生成して返す
		return _instance = new this();
	};

	//メンバ関数
	_construct.prototype = {
		
		/**
		 *	データの追加
		 **/
		addData : function( data )
		{
            
			this._dataArray.push( data );
		},

		/**
		 *	接続開始
		 **/
		accessStart : function()
		{
            
			if ( this._dataArray.length == 0 )
			{
				dp("処理すべきデータが無い");
				//処理すべきデータが無い
				return;
			}
			
			if ( this._state == STATE_CONNECTING )
			{
				dp("もう通信中");
				return;
			}
			
			var currentData = this._dataArray[0];

			//パラメータチェック
			var type_	= currentData.type	== undefined ? "GET"	: currentData.type;
			var cache_	= currentData.cache	== undefined ? false	: currentData.cache;
			var data_	= currentData.data	== undefined ? {}		: currentData.data;
            
            
			$.ajax({
				type	: type_,
				url		: currentData.url,
				cache	: cache_,
				data	: data_,
				success	: this._onSuccess.bind(this),
				error	: this._onError, 
			});
			
			//接続中
			this._state = STATE_CONNECTING;
		},
		
		/**
		 *	接続中かどうか
		 **/
		isConnecting : function()
		{
			return this._state == STATE_CONNECTING;
		},
		
		
		
		
		/**
		 * 通信成功時コールバック
		 **/
		_onSuccess : function( data, status )
		{
			dp("_onSuccess");
            
			this._dataArray[0].successCallback( data, status );
			
			this._dataArray.shift();
			
			if ( this._dataArray.length > 0 )
			{
				dp("まだデータが残ってるので処理(あと"+ this._dataArray.length +")");
				
				this._state = STATE_NONE;
				
				//次のデータを処理
				this.accessStart();
			}
			else
			{
				dp("全てのデータを処理したのでクリア");
				
				//全てのデータを処理したのでクリア
				this._clear();
			}
		},

		/**
		 * 通信失敗時コールバック
		 **/
		_onError : function()
		{
	//		if ( _currentData.failureCallback != undefined )
	//		{
	//			//別途エラー時の処理が定義されていたらそちらを優先
	//			_currentData.failureCallback();
	//		}
	//		else
	//		{
				//"¥n"だと文字列として表示されてしまったので文字コード指定
				ShowNoTitleAlert("通信エラーが発生しました" + String.fromCharCode(13) + "リトライします");

				//再接続
				this.accessStart();
	//		}
		},
		
		
//		_dataArray			: [],
//		_currentData		: null,
//		_status				: STATE_NONE,
		

		/**
		 *	クリア
		 **/
		_clear : function()
		{
			this._dataArray			= [];
			this._state			= STATE_NONE;
		}
	};

	return _construct;

})();

//-- test

function _success(data, status)
{
    
	$.mobile.loading('hide');
	
	ShowNoTitleAlert(data.location.city+"は"+data.forecasts[0].telop+"、ステータスは"+status);
	$.mobile.changePage('#MyPage');
	
	// location.href = 'index.html#okDialog_challenge'
}

function _error()
{
	ShowNoTitleAlert("error");
}


function getWeather()
{
	dp("getWeather");
	var data = {
		url				: "http://weather.livedoor.com/forecast/webservice/json/v1",
		data			: { "city" : 270000 },
		successCallback	: _success
	};
	
	CNetworkManager.getInstance().addData(data);
	CNetworkManager.getInstance().accessStart();
	
	$.mobile.loading('show');
}
