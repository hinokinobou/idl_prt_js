//背景

function CBackgroundImageTask()
{
	//親クラスのコンストラクタ呼び出し(メンバ変数を継承)
	CTask.call(this);
	
	this._imgPath	= "images/bg.jpg";		//画像パス
	this._img		= CAssetManager.getInstance().getImage( this._imgPath );

	this._x = 0;
	this._y = 0;
	this._w = 0;
	this._h	= 0;
	
	console.log(this);
	
};(function() {

	/*==============================================
		継承
	*///============================================

	//継承用一時クラス生成
	var Super = function Super(){};
	
	//prototypeに親クラスのprototypeを保持(同一のオブジェクトなので変更すると親クラスのprototypeに影響する)
	Super.prototype = CTask.prototype;
	
	//親クラス同等のプロトタイプを生成(newで新しく生成しているので子クラスのprototypeを変更しても親クラスのprototypeに影響しない)
	CBackgroundImageTask.prototype = new Super();
	
	//親クラスのプロトタイプを保持
	var _super = Super.prototype;
	
	/*==============================================
		
	*///============================================
	var _proto = CBackgroundImageTask.prototype;
	
	_proto.LOCAL_MODE_INIT_WAIT	= _proto.MODE_MAIN;
	_proto.LOCAL_MODE_MAIN		= _proto.LOCAL_MODE_INIT_WAIT + 1;
	
	_proto.exec = function()
	{
		switch( this.getMode() )
		{
			case this.LOCAL_MODE_INIT_WAIT: {
				
				if ( this._img.isLoaded() )
				{
					// this._w = this._img.getWidth();
					// this._h	= this._img.getHeight();
					var canvas = CCanvasManager.getInstance().getCanvas();
					this._w = canvas.width;
					this._h = canvas.height;
					this.setMode(this.LOCAL_MODE_MAIN);
				}

			} break;
			
			case this.LOCAL_MODE_MAIN: {
			
				
			} break;
		}
	};
	
	_proto.draw = function()
	{
		if ( this.getMode() != this.LOCAL_MODE_MAIN ) return;
		
		var ctx = CCanvasManager.getInstance().getContext();
		
		ctx.drawImage(	this._img.getImage(),
						0, 0, this._img.getWidth(), this._img.getHeight(),
						this._x,
						this._y,
						this._w, this._h
					);
	};
	
})();
