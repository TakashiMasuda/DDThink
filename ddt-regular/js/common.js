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

	/* 
	 * 関数名:guideThemeAdjustment
	 * 概要  :iPhoneの場合はTraineeや「研修生　募集内容」などの部分についての高さを調整する
	 * 引数  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.12.28
	 */
	 this.guideThemeAdjustment = function() {
	    if (navigator.userAgent.indexOf('iPhone') > 0 ||
	        navigator.userAgent.indexOf('iPad') > 0  ||
	        navigator.userAgent.indexOf('iPod') > 0 ||
	        navigator.userAgent.indexOf('Android') > 0
	    ) {
	    	//現在の高さを取得する
	    	var currentHeight = $('.guideTheme').css('height');
			//iosは他の端末よりも5pxほど高さが高くなるのでコンテンツの高さを低くして調整する
	    	var iosHeight = parseInt(currentHeight, 10) - 5;
	    	//取得した高さを調整する
			$('.guideTheme').css('height', iosHeight + 'px');
	    }
	 }

	/* 
	 * 関数名:addSiteRootPath
	 * 概要  :指定したタグの属性値にサイトルートのパスを追加する
	 * 引数  :String selector : 指定するタグのセレクタ
	 * 　　  :String attrName : 指定する属性
	 * 作成者:T.Masuda
	 * 作成日:2015.01.09
	 */
	 this.addSiteRootPath = function(selector, attrName) {
		 //対象を走査する
		 $(selector).each(function(){
			 var path = $(this).attr(attrName);
			 //ローカルのパスであれば
			 if (path !== void(0)
					 && (path.indexOf(SITE_ROOT_DIRECTORY) != -1 
					 || path.indexOf(HTTP) == -1
					 || path.indexOf(HTTPS) == -1)) {
				 //パスを追記する。既にパスにサイトルートが記述されている場合は一度その部分を抜く。
				 $(this).attr(attrName, SITE_ROOT_DIRECTORY + path.replace(SITE_ROOT_DIRECTORY, EMPTY_STRING));
			 }
		 });
	 }
	 
	/* 
	 * 関数名:addSiteRootPathTogether
	 * 概要  :一括で属性値にサイトルートのパスの追加を行う
	 * 引数  :なし
	 * 作成者:T.Masuda
	 * 作成日:2015.01.09
	 */
	this.addSiteRootPathTogether = function(selector, attrName) {
		//一括でaddSiteRootPathをコールする。(現状a,img,formタグに対して行う)
		this.addSiteRootPath(IMG_TAG , ATTR_SRC);
		this.addSiteRootPath(ANCHOR_TAG , ATTR_HREF);
		this.addSiteRootPath(FORM_TAG , ATTR_ACTION);
	}
}
