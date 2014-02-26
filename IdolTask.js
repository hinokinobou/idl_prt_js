//アイドル単体クラス

function CIdolTask()
{
	//親クラスのコンストラクタ呼び出し(メンバ変数を継承)
	CTask.call(this);
	
	this._imgPath	= "images/idol.png";		//画像パス
	this._img		= CAssetManager.getInstance().getImage( this._imgPath );

	this._x = 0;
	this._y = 0;
	
	this._w = 0;
	this._h	= 0;
	
	this._mx = (Math.floor(Math.random()*5+1)+5) * ( Math.floor(Math.random()*2+1)%2 ? -1 : 1 );
	this._my = 10;
	
	var canvas = CCanvasManager.getInstance().getCanvas();
	this._floor = Math.floor(Math.random()*200+1)+canvas.height-200;
	
};(function() {

	/*==============================================
		継承
	*///============================================

	//継承用一時クラス生成
	var Super = function Super(){};
	
	//prototypeに親クラスのprototypeを保持(同一のオブジェクトなので変更すると親クラスのprototypeに影響する)
	Super.prototype = CTask.prototype;
	
	//親クラス同等のプロトタイプを生成(newで新しく生成しているので子クラスのprototypeを変更しても親クラスのprototypeに影響しない)
	CIdolTask.prototype = new Super();
	
	//親クラスのプロトタイプを保持
	var _super = Super.prototype;
	
	/*==============================================
		
	*///============================================
	var _proto = CIdolTask.prototype;
	
	_proto.LOCAL_MODE_INIT_WAIT	= _proto.MODE_MAIN;
	_proto.LOCAL_MODE_MAIN		= _proto.LOCAL_MODE_INIT_WAIT + 1;
	
	_proto.exec = function()
	{
		switch( this.getMode() )
		{
			case this.LOCAL_MODE_INIT_WAIT: {
				
				if ( this._img.isLoaded() )
				{
					//位置とかサイズの初期化
					var canvas = CCanvasManager.getInstance().getCanvas();
					
					this._x = Math.floor(Math.random()*canvas.width+1);
					this._y = Math.floor(Math.random()*canvas.height+1);
					
					this._w = this._img.getWidth();
					this._h	= this._img.getHeight();
					
					
					this.setMode(this.LOCAL_MODE_MAIN);
				}
			} break;
			
			case this.LOCAL_MODE_MAIN: {
			
				this.move();
			} break;
		}
	};
	
	_proto.draw = function()
	{
		var ctx = CCanvasManager.getInstance().getContext();
		
		var x = this._x;
		if ( this._mx < 0 ){
			ctx.setTransform(-1, 0, 0, 1, 0, 0);
			x = -x;
		}
		
		ctx.drawImage(	this._img.getImage(),
						0, 0, this._img.getWidth(), this._img.getHeight(),
						x - this._w/2,
						this._y - this._h/2,
						this._w, this._h
					);
					
		if ( this._mx < 0 ){
			ctx.setTransform(1, 0, 0, 1, 0, 0);
		}
	};
	
	_proto.move = function()
	{
		var canvas = CCanvasManager.getInstance().getCanvas();
		
		var width = canvas.width;
		var height = canvas.height;
		
		this._y += this._my;
		
		if ( this._y > this._floor )
		{
			this._y = this._floor;
			
			this._x += this._mx;
			if ( this._x > width || this._x < 0 ){
				this._x = Math.floor(Math.random()*canvas.width+1);
				this._mx = (Math.floor(Math.random()*5+1)+5) * ( Math.floor(Math.random()*2+1)%2 ? -1 : 1 );
				this._y = 0;
				this._floor = Math.floor(Math.random()*200+1)+canvas.height-200;
			}
		}
	}
	
})();
