/** ファイル名:common.js
 * 概要　　　:汎用関数クラス定義のファイル
 * 作成日　:2015.12.23
 * 作成者　:T.Yamamoto
 * 場所　　:js/common.js
 */

/** クラス名:common
 * 概要　:汎用関数クラス
 * 引数	:なし
 * 設計者:H.Kaneko
 * 作成日:2015.0813
 * 作成者:T.Masuda
 */
function common(){

	/* 
	 * 関数名:fontAdjustment
	 * 概要  :fantasyフォントがないブラウザではフォントを調整する
	 * 引数  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.12.23
	 */
	this.fontAdjustment = function() {
		//ユーザエージェントからブラウザ情報を取得する
		var userAgent = window.navigator.userAgent.toLowerCase();

	    if (userAgent.indexOf('msie') != -1 ||                    //ブラウザがIE
	        navigator.userAgent.indexOf('iPhone') > 0 ||
	        navigator.userAgent.indexOf('iPad') > 0  ||
	        navigator.userAgent.indexOf('iPod') > 0 || 
	        navigator.userAgent.indexOf('Android') > 0 ||
	        navigator.userAgent.indexOf("Firefox") != -1
	        ) {
	        //フォントをメイリオに変える
	        $('.guideLogo').css('font-family', 'メイリオ').css('font-size', '18px').css('font-weight', 'bold');
	    }
	}

}