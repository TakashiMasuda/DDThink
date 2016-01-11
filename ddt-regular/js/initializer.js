/** ファイル名:initializer.js
 * 概要　　　:初期処理を行うクラスのファイル
 * 作成日　:2015.01010
 * 作成者　:T.Masuda
 * 場所　　:js/global.js
 */

/** クラス名:initializer
 * 概要　　:初期処理を行うクラスのファイル
 * 引数　　:fileReader fReader : ファイル読み込み用クラスインスタンス
 * 作成日　:2015.01010
 * 作成者　:T.Masuda
 */
function initializer(fLoader) {

	this.fLoader = fLoader;	//ファイル読み込みクラスインスタンスを利用する
	
	/* 
	 * 関数名:init
	 * 概要  :ウェブサイト準備の初期処理
	 * 引数  :なし
	 * 返却値:なし
	 * 作成日　:2016.0109
	 * 作成者　:T.Masuda
	 */
	this.init = function(pageName) {
		
		//初回実行でなければ
		if(!this.isInit()) {
			return;	//処理を終了する
		}
		
		//まずは必要なファイルを読み込む
		//読み込み済みスクリプト一覧にJSファイルの名を登録して二度読み込まないようにする
		this.fLoader.loadScriptFile('constants', 'ddt-regular/js', 'true');
		this.fLoader.loadScriptFile('jquery-1.11.0.min', DIR_SCRIPT_FILES, STR_TRUE);
		this.fLoader.loadScriptFile('common', DIR_SCRIPT_FILES, STR_TRUE);
		this.fLoader.loadScriptFile("pagemove", DIR_SCRIPT_FILES, STR_TRUE);
		this.fLoader.loadScriptFile("pageControl", DIR_SCRIPT_FILES, STR_TRUE);
		this.fLoader.loadScriptFile("event", DIR_SCRIPT_FILES, STR_TRUE);
		this.fLoader.loadScriptFile("categorypulldown", DIR_SCRIPT_FILES, STR_TRUE);
		//必要なCSSファイルを読み込む
		this.fLoader.loadCSSFile(STYLE_CSS, DIR_CSS_FILES);
		this.fLoader.loadCSSFile(DESKTOP_CSS, DIR_CSS_FILES);
		this.fLoader.loadCSSFile(SMARTPHONE_CSS, DIR_CSS_FILES);
		this.fLoader.loadCSSFile(TABLET_CSS, DIR_CSS_FILES);
		//必要なJSファイルを読み込む※初期処理時は読み込み順序の都合でloadScriptFile関数を使わない
		//ファイルの読み込みが完了したら
		//クラスインスタンスを作っていく
		commonFuncs = new common();		//共通関数クラス
		pControl = new pageControl(); 	//画面操作クラス
		
		//フレームを読み込む
		loadFrame();
	
		//ページ名が入力されてかつ、該当するコールバック関数が用意されているなら
		if (pageName && pageName in initFuncs) {
			//ページごとの初期化関数をコールする
			initFuncs[pageName]();
		}
			
		//ロゴのサイズの調整を行う。CSSの展開にラグがあるため
		setTimeout(function(){logoSize();}, LOGOSIZE_FIX_DELAY);
	}
	
	/* 
	 * 関数名:loadFrame
	 * 概要  :ページのフレーム部分を読み込む
	 * 引数  :なし
	 * 返却値:なし
	 * 作成日　:2016.0109
	 * 作成者　:T.Masuda
	 */
	function loadFrame () {
		//フレームを読み込む
		pControl.callPage(FRAME_HTML, BODY_TAG, SELECTOR_CONTAINER);
	}
	
	/* 
	 * 関数名:setMainContent
	 * 概要  :メインのコンテンツをセットする
	 * 引数  :なし
	 * 返却値:なし
	 * 作成日　:2016.0109
	 * 作成者　:T.Masuda
	 */
	this.setMainContent = function() {
		//コンテナ内のメインのタグを消す
		$(SELECTOR_MAIN, $(SELECTOR_CONTAINER)).remove();
		//ページに元々あったメインのタグを移動する
		$(BEFORE_MAIN_TAG_ELEM).after($(SELECTOR_MAIN));
		//サイドメニューのサイズを直す
		sidemenuSize();
	}
	
	/* 
	 * 関数名:isInit
	 * 概要  :初回処理前かどうかを判定して返す
	 * 引数  :なし
	 * 返却値:boolean : 判定結果
	 * 作成日　:2016.0109
	 * 作成者　:T.Masuda
	 */
	this.isInit = function() {
		//現在読み込んでいるスクリプトファイルの数を取得する
		var nowScriptNum = Object.keys(loadedScriptFile).length;
		
		//初回処理でのスクリプトの読み込みを判定のキーとする
		return nowScriptNum == initLoadedScriptNum;
	}
}