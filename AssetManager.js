

//画像クラス
function CImage( path )
{
	this._path		= path;			//画像パス
	this._loaded	= false;		//読み込み完了フラグ
	this._img		= new Image();	//画像データ
	
	//画像読み込み
	this._img.src	= this._path;
	this._img.onload = function()
	{
		dp( "Image loaded = " + this._path );
		this._loaded = true;
	}.bind(this);
	
	
};(function()
{
	CImage.prototype = {
		isLoaded : function()
		{
			return this._loaded;
		},
		
		getImage : function()
		{
			return this._img;
		},
		
		getWidth : function()
		{
			return this._img.naturalWidth;
		},
		
		getHeight : function()
		{
			return this._img.naturalHeight;
		}
	};
})();

//アセット管理クラス(Singleton)
var CAssetManager = (function()
{
	var _instance			= null;			//インスタンス
	var _fromGetInstance	= false;		//getInstance呼び出しフラグ
	
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
	}
	
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
	
	
	var _assets		= {};
	
	//メンバ関数
	_construct.prototype = {
		
		/**
		 *	画像取得
		 *	@return	CImageインスタンス
		 **/
		getImage : function( path )
		{
			if ( !_assets[path] )
			{
				//無かったら読み込む
				_assets[path] = new CImage(path);
			}
			return _assets[path];
		},
		
		/**
		 *	画像削除
		 **/
		delImage : function( path )
		{
			_assets[path] = void 0;
		},
		
		/**
		 *	全削除
		 **/
		clear : function()
		{
			for ( var key in _assets )
			{
				_assets[key] = void 0;
			}
		},
	};
	
	return _construct;

})();