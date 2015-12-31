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
	 * 引数  :array elems : 処理対象の要素。jQueryオブジェクト推奨
	 * 　　  :String attrName : 指定する属性
	 * 作成者:T.Masuda
	 * 作成日:2015.01.09
	 */
	 this.addSiteRootPath = function(elems, attrName) {
		 //対象を走査する
		 $(elems).filter(SQUARE_BRACKET_FRONT + attrName + SQUARE_BRACKET_REAR).each(function(){
			 console.log(this);
			 var path = $(this).attr(attrName);
			 //ローカルのパスであれば(サイトルート、HTTP形式のURLのヘッダー部分が含まれない)
			 if (path !== void(0)
					&& (path.indexOf(siteRootPath) == -1 
					&& path.indexOf(HTTP) == -1 
					&& path.indexOf(HTTPS) == -1)) {
				 //パスを追記する。既にパスにサイトルートが記述されている場合は一度その部分を抜く。
				 $(this).attr(attrName, siteRootPath + path.replace(siteRootPath, EMPTY_STRING));
			 }
		 });
	 }

	/* 
	 * 関数名:addSiteRootPathTogether
	 * 概要  :ヘッダー、フッターといった枠部分の要素にサイトルートのパスの追加を行う
	 * 引数  :なし
	 * 作成者:T.Masuda
	 * 作成日:2015.01.09
	 */
	this.addSiteRootPathForFrame = function() {
		var $headerFooterAnchors = $(HEADER_FOOTER_ANCHOR);	//ヘッダー、フッター内のAタグを取得する
		
		//取得した要素を走査して処理する
		$headerFooterAnchors.each(function() {
			//走査対象の要素から現在のパスを取得する
			var nowPath = $(this).attr(ATTR_HREF);
			//パスから相対パス指定の記述を抜く
			basePath = nowPath.replace(/\.\.\/|\.\//g, EMPTY_STRING);
			//捜査対象に生成したパスを設定する
			$(this).attr(ATTR_HREF, basePath);
		});

		//フレーム内要素のAタグのサイトルートを更新する
		this.addSiteRootPath(HEADER_FOOTER_ANCHOR , ATTR_HREF);
	}
	
	/* 
	 * 関数名:getLastValue
	 * 概要  :対象となる文字列を区切り文字で区切り、最後に来る部分を返す
	 * 引数  :String value : 対象となる文字列
	 * 　　  :String delimiter : 区切り文字
	 * 作成者:T.Masuda
	 * 作成日:2015.0110
	 */
	this.getLastValue = function(value, delimiter) {
		//対象となる文字を区切る
		var valueArray = value.split(delimiter);
		//区切った数を調べる
		var valueLength = valueArray.length;
		//区切った文字の最後の部分を返す
		return valueArray[valueLength - 1];
	}
	
	/* 
	 * 関数名:getCurrentContentName
	 * 概要  :対象となる文字列を区切り文字で区切り、最後に来る部分を返す
	 * 引数  :なし
	 * 作成者:T.Masuda
	 * 作成日:2015.0110
	 */
	this.getCurrentContentName = function() {
		//現在のURLを取得して配列に変換する
		var fullPathArray = location.href.split(SLASH);
		//パスを構成する要素数を取得する
		var pathOrgNum = fullPathArray.length;
		//パスの末尾(ファイル名)を取得する
		var fileName = fullPathArray[pathOrgNum - 1];
		//ファイル名から拡張子部分を削除する
		var contentName = fileName.substring(0, fileName.indexOf(DOT));
		
		return contentName;	//割り出したコンテンツ名を返す
	}
	
	/* 
	 * 関数名:getJSONFile
	 * 概要  :JSONファイルを取得してオブジェクトで返す
	 * 引数  :String url : 対象となるファイルのURL
	 * 作成者:T.Masuda
	 * 作成日:2015.0110
	 */
	this.getJSONFile = function(url) {
		var retObj = {};	//返却用オブジェクトを用意する
		
		//Ajax通信でJSONファイルを取得する
		$.ajax({
			url : url,			//URL指定
			dataType : 'JSON',	//JSONを取得する
			async : false,		//同期通信
			cache : false,		//通信結果をキャッシュしない
			//成功時の処理
			success : function(json) {
				//返ってきたJSONは既にオブジェクトにパース済みなのでそのまま返却用オブジェクトとすげ替える
				retObj = json;	
			},
			//エラー時の処理
			error : function(xhr, status, error) {
				console.log(error);	//エラー内容をコンソールに出力する
			}
		});
		
		return retObj;	//取得の成否に関わらずオブジェクトを返す
	}

	/* 
	 * 関数名:getCategoryFromContentName
	 * 概要  :コンテンツ名からカテゴリ名を取得する。何も合致しないときはトップにしておく
	 * 引数  :Object categoryList : カテゴリの一覧オブジェクト
	 * 作成者:T.Masuda
	 * 作成日:2015.0110
	 */
	this.getConetntNameFromCategory = function(categoryList, conetntName) {
		var categoryName = CATEGORY_TOP;	//カテゴリ名を格納する変数を用意する。トップページ用カテゴリで初期化しておく
		
		//カテゴリリストを走査する
		for (key in categoryList) {
			//カテゴリのコンテンツ一覧配列を取得する
			var contentList = categoryList[key];
			//コンテンツの数を取得する
			var contentListLength = contentList.length;
			//コンテンツ一覧を走査する
			for (var i = 0; i < contentListLength; i++) {
				//一覧からコンテンツ名を取得する
				var gotContentName = contentList[i];
				//対象が見つかった場合
				if (gotContentName == conetntName) {
					//カテゴリが合致しているということで返却用変数にカテゴリ名(走査中のkey)を入れる
					categoryName = key;
					break;	//もうやることないので抜ける
				}
			}
		}
		
		return categoryName;	//カテゴリ名を返す
	}
	
}
