
///////////////

/**
 * デバッグメッセージ 
 */
var debug = function( msg ){
    console.log( msg );
};
////////////////////////////////////////////////
//


/**
 * 未挑戦ミッション一覧取得
 */
var getNotChellengeMissionList = function( ){

    return debug_not_challenge_mission_list;
};



/**
 * 挑戦済みミッションの取得
 */
var getChallengedMissionList = function(){
    return debug_challenged_mission_list;
};



/**
 * 挑戦済ミッションのログ取得
 */
var getChallengedMissionLogList = function( mission_id ){
    mission_id = parseInt( mission_id );
    return debug_challenged_mission_log_list[ mission_id ];
};

////////////////////////////////////////////////
//
// Event
//

/**
 * 未挑戦ミッションログページの表示
 **/
var onShowNotChallengeMissionListPages = function(){
    ////////
    // 未挑済ミッションのリスト
    var not_challenge_mission_list = getNotChellengeMissionList();

    $('#NotChallengeMissionListView').empty();
    var mission_id;
    var mission_name;
    var each_mission;
    for ( var i in not_challenge_mission_list ){
        each_mission = not_challenge_mission_list[i];
        mission_id = each_mission['mission_id'];
        mission_name = each_mission['mission_name'];
        $('#NotChallengeMissionListView').append('<li><a href="javascript:onChallengePage(' + mission_id + ');" class="show">' + mission_name + "</a></li>");
    }
    
   
    $.mobile.changePage("#NotChallengeMissionListPage");
    $('#NotChallengeMissionListView').listview('refresh');
    
};

/**
 * 挑戦設定ダイアログの表示
 **/
var onChallengePage = function(mission_id){
    $.mobile.changePage("#ChallengePage");
};


/**
 * 挑戦済ミッションログページの表示
 **/
var onShowChallengedMissionLogListPages = function( mission_id ){
    debug('onShowChallengedMissionLogListPages');
    
    debug('mission_id:' + mission_id);
    
    $('#mission_id').val(mission_id);
    $('#MissionTitle').text(mission_id);
    

    //ミッションログリストの更新
    $("#ChallengedMissionLogListView").empty();

    var challenged_mission_log_list = getChallengedMissionLogList(mission_id);
    var each_mission_log;
    var date_matches;
    var date_dic = {};
    
    debug(challenged_mission_log_list);
    
    for ( var i in challenged_mission_log_list ){
        debug('key:' + i);
        
        each_mission_log = challenged_mission_log_list[i];
        debug(each_mission_log);
        
        mission_log_name = each_mission_log['mission_log_name'];
        mission_log_detail = each_mission_log['mission_log_detail'];
        mission_date = each_mission_log['peson_mission_log_date'];
        
        date_matches = mission_date.match(/([0-9]+)月([0-9]+)日 ([0-9]+):([0-9]+):([0-9]+)/);
        date_dic = {
            'm':date_matches[1],
            'd':date_matches[2],
            'h':date_matches[3],
            'i':date_matches[4],
            's':date_matches[5],
        };
        
        debug('mission_log_name:' + mission_log_name);
        
        // $('#ChallengedMissionLogListView').append('<li><h2>' + mission_log_name + '</h2><p>' + mission_log_detail + '</p></li>');
    
        $('#ChallengedMissionLogListView').append('<li><img src="images/icon-mike.png" class="ui-li-icon"><h2>' + date_dic['h'] + ':' + date_dic['i'] + ' ' + mission_log_name + '</h2></li>');
        
        // debug( 'mission_log_detail.length');
        // debug( mission_log_detail.length );
        
        if ( mission_log_detail.length > 0 && mission_log_detail[0] ){
            for ( var j in mission_log_detail ){
                $('#ChallengedMissionLogListView').append('<li><p>' + mission_log_detail[j] + '</p></li>');
            }
        }
    }
    
    
    
    $.mobile.changePage("#ChallengedMissionLogListPage");
    $('#ChallengedMissionLogListView').listview('refresh');
};



/**
 * 挑戦ボタン押下時の処理
 */
var onClickChallengeBtn = function( event, ui ){
    debug('onClickChallengeBtn');
    
    $("#okDialog_challenge").popup("open", {positionTo: event.target});
    
    //20130205 tmt
    // $("#okDialog_challenge").popup("open", {positionTo: event.target}).click(function(event)
    //     {
    //         // $('#ChallengedMissionListView').append('<li>' + mission_name + '</li>');
    //         //$.mobile.changePage('#TopPage');
    //         
    //         //通信テスト
    //         getWeather();
    //         
    //         this.click = null;
    //         return false;
    //     }
    // );
    //20130205 tmt end
    
};

////////////////////////////////////////////////
//
// DOMContentLoaded 
//

$(function() {

    //イベントの割付
    debug('イベントの割付');
    
    //20130205 tmt
    $('#ChallengeBtn').click( onClickChallengeBtn );

    $("#okDialog_challenge").click(function(event)
        {
            // $('#ChallengedMissionListView').append('<li>' + mission_name + '</li>');
            //$.mobile.changePage('#TopPage');
            
            //通信テスト
            getWeather();
            
            this.click = null;
            return false;
        }
    );
    //20130205 tmt end
    
    //20140216 yas
    var isFirst = true;    //手抜きフラグ
    $("#idol").click( function(){
        
        if ( isFirst )
        {
            isFirst = false;
            
            CCanvasManager.getInstance().setCanvas('world');
            CTaskManager.getInstance().start();
            new CBackgroundImageTask();

            for ( var i=0; i<110; i++ )
            {
                new CIdolTask();
            }
        }
        
        // 20140217 $("#idol").click　の外に移動
        // 20140217 tmt change to comment
        // $('#IdolDetail').bind('touchend', function() {
        //     $.mobile.changePage('#MyPage');
        //     
        //     //バブリング停止
        //     // cf) http://webtech-walker.com/archive/2012/09/event_handler_return_false.html
        //     return false;
        // });
        // 20140217 tmt change to comment
        
        // 20140216 tmt change to comment
        // document.getElementById('IdolDetail').addEventListener("touchend", function(event){
        //     // x = event.touches[0].pageX
        //     // y = event.touches[0].pageY
        //     
        //     document.getElementById('IdolDetail').removeEventListener("touchend", arguments.callee, false);
        //     
        //     $.mobile.changePage('#MyPage');
        // }, false);
        // 
        // 20140216 tmt change to comment end
        
        $.mobile.changePage('#IdolDetail');
        
    } );
    //20140216 yas end
    
    
    // 20140217 tmt add
    $('#IdolDetail').bind('touchend', function() {
        $.mobile.changePage('#MyPage');
        
        //バブリング停止
        // cf) http://webtech-walker.com/archive/2012/09/event_handler_return_false.html
        return false;
    });
    // 20140217 tmt add
        
        
    ////////
    // 挑戦済ミッションのリスト
    var challenged_mission_list = getChallengedMissionList();
    debug( challenged_mission_list );
    
    var mission_id;
    var mission_name;
    var each_mission;
    // $('#ChallengedMissionListView').empty();
    for ( var i in challenged_mission_list ){
        each_mission = challenged_mission_list[i];
        mission_id = each_mission['mission_id'];
        mission_name = each_mission['mission_name'];
        debug( each_mission );
        debug( mission_id );
        debug( mission_name );
         
        $('#ChallengedMissionListView').append('<li><a href="javascript:onShowChallengedMissionLogListPages(' + mission_id + ');" class="show">' + mission_name + '</a></li>');
    }
    
    
    
    $('#ChallengedMissionListView').listview('refresh');
}); // on DOMContentLoaded


//iOSはhideStatusBarを呼ぶ
if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0){
    window.StatusBar.hideStatusBar();
}
