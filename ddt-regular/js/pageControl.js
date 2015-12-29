/** ファイル名:pageControl.js
 * 概要　　　:画面遷移制御用クラスのファイル
 * 作成日　:2016.0104
 * 作成者　:T.Masuda
 * 場所　　:js/pageControl.js
 */

/** クラス名:pageControl
 * 概要　　:画面遷移制御用クラス
 * 引数　　:なし
 * 作成日　:2016.0104
 * 作成者　:T.Masuda
 */
function pageControl() {
	
	/* 
	 * 関数名:callPage
	 * 概要  :コンテンツ領域のDOMを書き換えて画面遷移を行う
	 * 引数  :String url : URL文字列
	 * 　　  :String target : 書き換え対象のコンテンツ領域のセレクタ
	 * 　　  :String getFrom :取得したHTMLファイルのデータ取得対象のタグのセレクタ
	 * 返却値:boolean 中止か否かの判定
	 * 作成日　:2016.0104
	 * 作成者　:T.Masuda
	 */
	this.callPage = function (url, target, getFrom) {
		//取得するファイルの絶対URLを作る
		var absoluteUrl = SITE_ROOT_DIRECTORY + url;
		//ajax通信でHTMLファイルを取得する
		$.ajax({
			url : absoluteUrl,	//絶対URLでファイルを取得する
			async : false,		//同期しない
			cache : false,		//通信結果をキャッシュしない
			//HTMLデータを取得する
			dataType : DATATYPE_HTML,
			//通信成功時の処理。HTMLデータを展開する
			success : function (html) {
				var $html = $(html);
				//コンテンツを取得する
				var $content = $(getFrom, $html);
				//取得できなかった場合
				if (!$content[0]) {
					//再取得を行う
					$content = $html.filter(getFrom);
				}
				
				//コンテンツ領域のDOMを取得したHTMLデータのコンテンツ領域のDOMで書き換える
				$(target).append($content);
			},
			//通信失敗時の処理。引数に通信状態を表すデータが入る
			error : function (xhr, status, error) {
				//エラー結果を出力する
				alert(ALERT_CONNECT_ERROR_FRONT + status + ALERT_CONNECT_ERROR_REAR + error);
			}
		});
	}
	
	/* 
	 * 関数名:addPushState
	 * 概要  :pushStateに履歴を追加する
	 * 引数  :String url : URL文字列
	 * 　　  :String arg :引数の文字列(現在用途不明瞭)
	 * 返却値:なし
	 * 作成日　:2016.0104
	 * 作成者　:T.Masuda
	 */
	this.addPushState = function (url, arg) {
		//pushStateに履歴を追加する
		history.pushState(url, arg, url);
	}
	
}
