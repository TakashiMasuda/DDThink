/** ファイル名:event.js
 * 概要　　　:イベントコールバック定義のファイル
 * 作成日　:2015.0109
 * 作成者　:T.Masuda
 * 場所　　:js/global.js
 */

	//HTML配置終了後の処理
	$(document).ready(function() {

		//popStateに変動があれば
	    $(window).on("popstate",function(event){
	        //初回アクセスであれば何もしない。
	    	if (!event.originalEvent.state){
	    		return; // 処理を終える。
	    	}
	    	
	        var url = event.originalEvent.state; 	//stateオブジェクトを取得する。
	        //サイトルートパスを書き換えるので予め抜いておく
	        url = url.replace(/\.\.\/|\.\//g, EMPTY_STRING);

	        //URLをバラす
	        var pathArray = url.split(SLASH);
	        //サイトルートを計算して更新する
	        siteRootPath = pControl.calcSiteRootDirectory(pathArray.length);
å	        //履歴からページを読み込む。
			pagemove(event, siteRootPath + url, true);
	  });
		
		
		//画面遷移用のボタンをクリックした時のイベントコールバック
		$(document).on(EVENT_CLICK, ANCHOR_TAG, function(event) {
			//URLを取り出す
			var url = $(this).attr(ATTR_HREF);
			//外部リンクなら
			if(url !== void(0)
					&& (url.indexOf(HTTP) != -1 
					|| url.indexOf(HTTPS) != -1)) {
				return;	//ここで処理を終えてそのまま外部リンクを開く
			}
			
			//画面遷移をキャンセルする
			event.preventDefault();
			//画面遷移を行う
			pagemove(event, url);
		});
	});

	//サイドメニューのボタンへマウスポインタを重ねたときのボタンの色を変化させる処理
	$(document)	//サイドメニューに対し
	.on('mouseenter', SELECTOR_SIDEMENU_BUTTON, function(e){	//ボタンの部分にマウスポインタを重ねたら
	});
	
