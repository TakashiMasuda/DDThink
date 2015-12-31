/** ファイル名:fileLoader.js
 * 概要　　　:ファイルを読み込み展開するクラスのファイル
 * 作成日　:2015.01010
 * 作成者　:T.Masuda
 * 場所　　:js/global.js
 */

/** クラス名:fileLoader
 * 概要　　:ファイルを読み込み展開するクラス。シングルトンで使う
 * 引数　　:なし
 * 作成日　:2015.01010
 * 作成者　:T.Masuda
 */
function fileReader() {
	
	//スクリプトファイルのディレクトリ
	this.DIR_SCRIPT_FILES		= 'ddt-regular/js';
	//CSSファイルのディレクトリ
	this.DIR_CSS_FILES			= 'ddt-regular/css';
	//記号/
	this.SLASH					= '/';
	//jsファイルの拡張子
	this.EXTEND_JS				= '.js';
	//CSSファイルの拡張子
	this.EXTEND_CSS				= '.css';
	//rel属性
	this.ATTR_REL				= 'rel';
	//HREF属性                                                          
	this.ATTR_HREF = 'href';
	//データタイプ「script」
	this.DATATYPE_SCRIPT		= 'script';
	//scriptタグ                                                        
	this.SCRIPT_TAG				= 'script';                               
	//headタグ                                                          
	this.HEAD_TAG				= 'head';
	//linkタグ
	this.LINK_TAG				= 'link';
	//空文字                                                             
	this.EMPTY_STRING			= '';                                     
	//HTTPリクエストのGETメソッド
	this.METHOD_GET				= "GET";
	
	//読み込んだ事があるスクリプトファイルのリスト。当該ファイルの必須ファイル分は最初から用意しておく
	this.loadedScriptFile = {};
	//読み込んだ事があるCSSファイルのリスト
	this.loadedCSSFile = {};
	//ページ独自の初期化後処理
	this.initFuncs = {default : setMainContent};

	/* 
	 * 関数名:addLoadedScriptFileList
	 * 概要  :読み込んだ事があるスクリプトファイルのリストに追加を行う
	 * 引数  :String scriptName : スクリプト名。拡張子やパスはない。
	 * 　　  :String value : リストのエントリに対応する値。現状ではキーだけあれば十分
	 * 返却値:なし
	 * 作成日　:2016.0109
	 * 作成者　:T.Masuda
	 */
	function addLoadedScriptFileList(scriptName, value) {
		//リストへのエントリの追加を行う
		loadedScriptFile[scriptName] = value;
	}

	/* 
	 * 関数名:addLoadedScriptFileList
	 * 概要  :読み込んだ事があるCSSファイルのリストに追加を行う
	 * 引数  :String cssName : CSS名。拡張子やパスはない。
	 * 　　  :String value : リストのエントリに対応する値。現状ではキーだけあれば十分
	 * 返却値:なし
	 * 作成日　:2016.0109
	 * 作成者　:T.Masuda
	 */
	function addLoadedCSSFileList(cssName, value) {
		//リストへのエントリの追加を行う
		loadedCSSFile[cssName] = value;
	}

	/* 
	 * 関数名:loadScriptFile
	 * 概要  :スクリプトファイルを読み込む。一度ロードしたファイルを読み込まない。
	 * 引数  :String scriptName : スクリプト名。拡張子やパスはない。
	 * 　　  :String dir : スクリプトファイルのディレクトリ
	 * 　　  :? value : 読み込み済みリストに登録するエントリの値
	 * 　　  :Function callback : スクリプト取得後のコールバック関数
	 * 返却値:boolean : 読み込みを行ったか否かの判定
	 * 作成日　:2016.0104
	 * 作成者　:T.Masuda
	 */
	function loadScriptFile (scriptName, dir, value, callback) {
		
		//引数に文字列に該当するファイルの読み込みを行っていたなら
		if (scriptName in this.loadedScriptFile) {
			return false;	//二度読みをしないためここで処理を終える
		}

		//URLを設定する
		var url = this.siteRootPath + dir + this.SLASH + scriptName + this.EXTEND_JS;
		//XMLHTTPRequest送信の準備を始める
		var req = new XMLHttpRequest();
		//指定したファイルとのコネクションを確立する。同期通信に固定してコードの実行順序を守る
		req.open(this.METHOD_GET, url, false);
		//リクエストを送る
		req.send(this.EMPTY_STRING);
		
		//レスポンスを評価してスクリプトとして展開する
		eval(req.responseText);
		//読み込み済みスクリプトリストに登録する
		addLoadedScriptFileList(scriptName, value);
		
		//コールバック関数セットされていたら
		if (callback) {
			callback();	//コールバック関数をコールする
		}
		
		return true;	//成功を返す
	}

	/* 
	 * 関数名:loadCSSFile
	 * 概要  :CSSファイルを読み込む。一度ロードしたファイルを読み込まない。
	 * 引数  :String cssName : CSS名。拡張子やパスはない。
	 * 　　  :? value : 読み込み済みリストに登録するエントリの値
	 * 返却値:boolean : 読み込みを行ったか否かの判定
	 * 作成日　:2016.0109
	 * 作成者　:T.Masuda
	 */
	function loadCSSFile (cssName, value) {
		//引数に文字列に該当するファイルの読み込みを行っていたなら
		if (cssName in this.loadedCSSFile) {
			return false;	//二度読みをしないためここで処理を終える
		}

		//headタグを取得する
		var headTag = document.getElementsByTagName(this.HEAD_TAG);
		//linkタグを作る
		var linkTag = document.createElement(this.LINK_TAG);
		//linkタグにこのlinkタグがCSS用であるという記述を追加する
		linkTag.setAttribute(this.ATTR_REL, this.VALUE_STYLESHEET);
		//linkタグにCSSファイルへのパスを追加する
		linkTag.setAttribute(this.ATTR_HREF, this.siteRootPath + this.DIR_CSS_FILES + this.SLASH + cssName + this.EXTEND_CSS);
		//headタグにscriptタグを追加する
		headTag[0].appendChild(linkTag);

		//読み込み済みCSSファイルリストに登録する
		this.addLoadedCSSFileList(cssName, value) ;

		return true;	//成功を返す
	}
}