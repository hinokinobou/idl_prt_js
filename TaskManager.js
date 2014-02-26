//毎フレーム処理

//タスク管理クラス(Singleton)
var CTaskManager = (function()
{
//private
	
	var FPS					= 1000 / 20;
	
	//メンバ変数
	var _instance			= null;		//インスタンス
	var _fromGetInstance	= false;	//getInstance呼び出しフラグ
	
	var _tasks				= [];		//タスクリスト
	var _taskCount			= 0;		//タスク生成カウント
	var _pause				 = false;	//ポーズフラグ
	
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
	 * タスク実行
	 **/
	function _exec()
	{
		if ( _pause ) return;
		
		for ( var key in _tasks )
		{
			if ( !_tasks[key] ){ console.log("無効なタスクがあるんだが"); return; }
			
			_tasks[key].exec();
		}
		
		_draw();
		
		setTimeout( _exec.bind(this), FPS );
	}
	
	function _draw()
	{
		CCanvasManager.getInstance().clear();
		
		for ( var key in _tasks )
		{
			if ( !_tasks[key] ){ console.log("無効なタスクがあるんだが"); return; }
			
			_tasks[key].draw();
		}
		
		CCanvasManager.getInstance().swapBuffer();
	}

//public

	/**
	 *  インスタンス取得
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
		 *  タスクの追加
		 *  @note	タスク生成時に自動で呼ばれる
		 **/
		addTask : function( task )
		{
			dp("task="+task);
			++_taskCount;
			task.setTaskNo( _taskCount );
			_tasks[_taskCount] = task;
		},
		
		/**
		 *  タスクの削除
		 *  @note   タスク削除時に自動で呼ばれる
		 **/
		delTask : function( task )
		{
			_tasks[task.getTaskNo()] = void 0;  //void 0の代入でdeleteとほぼ同じらしい
		},

		/**
		 *  全タスクの削除
		 **/
		clear : function()
		{
			//終了処理呼び出し
//		  for ()
//		  {
//			  
//		  }
			
			_tasks = [];
			_taskCount = 0;
		},
		

		
		start : function()
		{
			_pause = false;
			
			_exec();
		},
		
		pause : function()
		{
			_pause = true;
		}
	};

	return _construct;

})();

