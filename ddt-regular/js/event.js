/** ファイル名:event.js
 * 概要　　　:イベントコールバック定義のファイル
 * 作成日　:2015.0109
 * 作成者　:T.Masuda
 * 場所　　:js/global.js
 */

	//HTML配置終了後の処理
	$(document).ready(function() {
		//popstateイベントを感知したら
		window.onpopstate= function(event) {
			//popstateに履歴が入っていたら
			if (window.history.state){
				//履歴からURLを取得する
				var url = window.history.state;
				//画面遷移を行う
				pagemove(event, url);
			}
		};
		
		//画面遷移用のボタンをクリックした時のイベントコールバック
		$(document).on(EVENT_CLICK, ANCHOR_TAG, function(event) {
			//URLを取り出す
			var url = $(this).attr(ATTR_HREF);
			console.log(url);
			//外部リンクなら
			if(url !== void(0)
					&& (url.indexOf(HTTP) != -1 
					|| url.indexOf(HTTPS) != -1)) {
				return;	//ここで処理を終えてそのまま外部リンクを開く
			}
			
			//画面遷移をキャンセルする
			event.preventDefault();
			//pushStateに履歴を追加する
			pControl.addPushState(url, EMPTY_STRING);
			//画面遷移を行う
			pagemove(event, url);
		});
	});
