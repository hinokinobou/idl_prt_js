//Canvas管理クラス(Singleton)
var CCanvasManager = (function()
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
	
	
	var _canvas		= null;
	var _buffer		= null;
	
	var _ctx		= null;
	var _bufCtx		= null;
	
	//メンバ関数
	_construct.prototype = {
	
		setCanvas	: function( id )
		{
			//html側で配置済みのcanvas取得
			_canvas = document.getElementById(id);
			_ctx	= _canvas.getContext('2d');
		},
		
		getCanvas : function()
		{
			return _canvas;
		},
		
		setBuffer	: function( id )
		{
			_buffer = document.getElementById(id);
			_bufCtx = _buffer.getContext('2d');
		},
		
		getContext : function()
		{
			return _bufCtx ? _bufCtx : _ctx;
		},
		
		clear : function()
		{
			if ( _bufCtx )
			{
				_bufCtx.clearRect(0, 0, _buffer.width, _buffer.height);
			}
			else
			{
				_ctx.clearRect(0, 0, _canvas.width, _canvas.height);
			}
		},
		
		swapBuffer : function()
		{
			if ( !_bufCtx ) return;
			
			var imageData = _bufCtx.getImageData( 0, 0, _buffer.width, _buffer.height );
			_ctx.putImageData(imageData, 0,0);
		},
	};
	
	return _construct;

})();