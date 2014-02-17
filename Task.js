//タスクベースクラス

//メモ
//明示的にしていない限り参照の順序はローカルオブジェクトのプロパティ→prototypeの順

function CTask()
{
	//メンバ変数
	//ここでの変数はインスタンス毎に生成されるので注意
	
	//実行時解決なのでここでprototype参照してもOK
	this._mode		= this.MODE_MAIN;
	this._taskNo	= 0;
	
	CTaskManager.getInstance().addTask(this);
	
	
};(function()
{
	dp("CTask 定義");

	//メンバメソッド・定数
	//ここでの変数はクラス単位で保持されるので注意(一度しか呼ばれないクロージャ)
	//varで定義した変数はこのクラスのstaticかつprivateで"子クラスに継承されない"
	//なので継承されるクラスのprototype内でprivate変数を参照しないこと
	
	CTask.prototype = {
	
//		MODE_INIT : 0,	//初期化
		MODE_EXIT : 1,	//終了中
		MODE_DEAD : 2,	//終了済
		MODE_MAIN : 3,	//メイン
		
		setTaskNo : function( no )
		{
			dp("setTaskNo(" + no + ") this="+this);
			this._taskNo = no;
		},
		
		getMode : function()
		{
//			dp("getMode(" + this._mode + ")");
			return this._mode;
		},
		
		setMode : function( mode )
		{
			dp("setMode(" + mode + ")");
			this._mode = mode;
		},
		
		exec : function()
		{
			dp("exec");
		},
		
		draw : function()
		{
			dp("draw");
		},
	};
})();


//継承サンプル
function ChildTask()
{
	//親クラスのコンストラクタ呼び出し(メンバ変数を継承)
	CTask.call(this);
	
	this.LOCAL_MAIN = this.MODE_MAIN;
	
};(function() {

	/*==============================================
		継承
	*///============================================

	//継承用一時クラス生成
	var Super = function Super(){};
	
	//prototypeに親クラスのprototypeを保持(同一のオブジェクトなので変更すると親クラスのprototypeに影響する)
	Super.prototype = CTask.prototype;
	
	//親クラス同等のプロトタイプを生成(newで新しく生成しているので子クラスのprototypeを変更しても親クラスのprototypeに影響しない)
	ChildTask.prototype = new Super();
	
	//親クラスのプロトタイプを保持
	var _super = Super.prototype;
	
	//オーバーライド
	var _proto = ChildTask.prototype;
	_proto.exec = function()
	{
		//親クラスのメソッド呼び出し
		_super.exec.call(this);
	}
	
})();



