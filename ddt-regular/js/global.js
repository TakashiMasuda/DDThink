/** ファイル名:global.js
 * 概要　　　:汎用関数定義のファイル
 * 作成日　:2015.0104
 * 作成者　:T.Masuda
 * 場所　　:js/global.js
 */

//読み込んだ事があるスクリプトファイルのリスト。当該ファイルの必須ファイル分は最初から用意しておく
var loadedScriptFile = {"global" : STR_TRUE, "constants" : STR_TRUE, "jquery-1.11.0.min" : STR_TRUE};
//当該スクリプトファイルを読み込んだ時点で読み込まれている最低限のスクリプト数(条件つき読み込みのスクリプトは除外する)
var initLoadedScriptNum = Object.keys(loadedScriptFile).length;
//読み込んだ事があるCSSファイルのリスト
var loadedCSSFile = {};
//ページ独自の初期化後処理
var initFuncs = {default : setMainContent};

//サイトルートパス
var siteRootPath = EMPTY_STRING;

/* 
 * 関数名:updateSiteRootPath
 * 概要  :ウェブサイトのルートパスを更新する
 * 引数  :なし
 * 返却値:なし
 * 作成日　:2016.0111
 * 作成者　:T.Masuda
 */
function updateSiteRootPath() {
	//サイトルートへのパスを特定のタグから取得する
	siteRootPath = $(SELECTOR_SITEROOT_PATH).attr(ATTR_HREF);
}

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
 * 　　  :String dir : ファイルのディレクトリ
 * 　　  :? value : 読み込み済みリストに登録するエントリの値
 * 　　  :Function callback : スクリプト取得後のコールバック関数
 * 返却値:boolean : 読み込みを行ったか否かの判定
 * 作成日　:2016.0104
 * 作成者　:T.Masuda
 */
function loadScriptFile (scriptName, dir, value, callback) {
	//引数に文字列に該当するファイルの読み込みを行っていたなら
	if (scriptName in loadedScriptFile) {
		return false;	//二度読みをしないためここで処理を終える
	}

	//先んじてスクリプトファイルを取得する
	$.ajax({
			//URLを指定
			url : siteRootPath + dir + scriptName + EXTEND_JS,
			dataType : SCRIPT_TAG,	//スクリプトを取得する設定
			async : false,			//同期通信
			//通信終了後
			success : function(data) {
				//読み込み済みスクリプトリストに登録する
				addLoadedScriptFileList(scriptName, value);
				//コールバック関数セットされていたら
				if (callback) {
					callback();	//コールバック関数をコールする
				}
			}
	});
	
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
	if (cssName in loadedCSSFile) {
		return false;	//二度読みをしないためここで処理を終える
	}
	
	//headタグを取得する
	var headTag = document.getElementsByTagName(HEAD_TAG);
	//linkタグを作る
	var linkTag = document.createElement(LINK_TAG);
	//linkタグにこのlinkタグがCSS用であるという記述を追加する
	linkTag.setAttribute(ATTR_REL, VALUE_STYLESHEET);
	//linkタグにCSSファイルへのパスを追加する
	linkTag.setAttribute(ATTR_HREF, siteRootPath + DIR_CSS_FILES + SLASH + cssName + EXTEND_CSS);
	//headタグにscriptタグを追加する
	headTag[0].appendChild(linkTag);
	
	//読み込み済みCSSファイルリストに登録する
	addLoadedCSSFileList(cssName, value) ;
	
	return true;	//成功を返す
}

/* 
 * 関数名:init
 * 概要  :ウェブサイト準備の初期処理
 * 引数  :なし
 * 返却値:boolean : 初回実行判定
 * 作成日　:2016.0109
 * 作成者　:T.Masuda
 */
function init(pageName) {
	
	//初回実行でなければ
	if(!isInit()) {
		return false;	//処理を終了し非初回処理判定を返す
	}

	//まずは必要なファイルを読み込む
	$.when(
		//読み込み済みスクリプト一覧にJSファイルの名を登録して二度読み込まないようにする
		loadScriptFile('common', DIR_SCRIPT_FILES, STR_TRUE),
		loadScriptFile("pagemove", DIR_SCRIPT_FILES, STR_TRUE),
		loadScriptFile("pageControl", DIR_SCRIPT_FILES, STR_TRUE),
		loadScriptFile("event", DIR_SCRIPT_FILES, STR_TRUE),
		loadScriptFile("categorypulldown", DIR_SCRIPT_FILES, STR_TRUE),
		loadScriptFile("imagemove", DIR_SCRIPT_FILES, STR_TRUE),
		loadScriptFile("decorator", DIR_SCRIPT_FILES, STR_TRUE),
		loadScriptFile("createTag", FLOWER_SCRIPT_DIR, STR_TRUE),
		//必要なCSSファイルを読み込む
		loadCSSFile(STYLE_CSS),
		loadCSSFile(DESKTOP_CSS),
		loadCSSFile(SMARTPHONE_CSS),
		loadCSSFile(TABLET_CSS)
		//必要なJSファイルを読み込む※初期処理時は読み込み順序の都合でloadScriptFile関数を使わない
	//ファイルの読み込みが完了したら
	).always(function (a){

		//クラスインスタンスを作っていく
		commonFuncs = new common();			//共通関数クラス
		pControl = new pageControl(); 		//画面操作クラス

		//createTagクラスのインスタンスを生成する
		var creator_top = new createTag();
		creator_top.getJsonFile(siteRootPath + 'ddt-regular/json/common.json');          // 共通パーツのjsonを取得する。
		creator_top.getDomFile(siteRootPath + 'ddt-regular/template/common.html');       // 共通パーツのDOMを取得する。

		//ページのヘッダーを作る
		creator_top.outputTag('pageHeader', 'pageHeader', '#container');

		//ページのフッターを作る
		creator_top.outputTag('pageFooter', 'pageFooter', '#container');

		//ページのフッターを作る
		creator_top.outputTag('footerbg', 'footerbg', '#container');

		//メインのタグをヘッダー次に配置する
		$(SELECTOR_MAIN).insertAfter(HEADER_TAG);
		
		//ページ名が入力されてかつ、該当するコールバック関数が用意されているなら
		if (pageName && pageName in initFuncs) {
			//ページごとの初期化関数をコールする
			initFuncs[pageName]();
		}

		//ロゴのサイズの調整を行う。(CSSの展開にラグがあるため)調整が終わったコンテナを表示する
		setTimeout(function(){
			hilightSelectedCategory(); 		//選択済みのトップメニューのボタンをハイライトする
			hilightSelectedSidemenuItem(); 	//選択済みのサイドメニューのボタンをハイライトする
			$(SELECTOR_CONTAINER).show(); 	//隠していたコンテンツを表示する
			logoSize();						//ロゴのサイズを修正する 
		}, INIT_LASTPROCDDURE_DELAY);
	});
	
	return true;	//初回処理判定を返す
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
function setMainContent () {
//	//コンテナ内のメインのタグを消す
//	$(SELECTOR_MAIN, $(SELECTOR_CONTAINER)).remove();
//	//ページに元々あったメインのタグを移動する
//	$(BEFORE_MAIN_TAG_ELEM).after($(SELECTOR_MAIN));
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
function isInit() {
	//現在読み込んでいるスクリプトファイルの数を取得する
	var nowScriptNum = Object.keys(loadedScriptFile).length;
	
	//初回処理でのスクリプトの読み込みを判定のキーとする
	return nowScriptNum == initLoadedScriptNum;
}

/* 
 * 関数名:hilightSelectedCategory
 * 概要  :選択中のページのカテゴリに対応したトップメニューのボタンをハイライトする
 * 引数  :なし
 * 返却値:なし
 * 作成日　:2016.0110
 * 作成者　:T.Masuda
 */
function hilightSelectedCategory() {
	//サイトのカテゴリとコンテンツの一覧を取得する
	var siteCategory = commonFuncs.getJSONFile(siteRootPath + 'ddt-regular/json/siteCategory.json');
	//現在のコンテンツ名を取得する
	var contentName = commonFuncs.getCurrentContentName();
	//カテゴリ名を取得する
	var categoryName = commonFuncs.getConetntNameFromCategory(siteCategory, contentName);
	//カテゴリ名を実際に使われているURLと同じ様に加工する
	categoryName = categoryName == CATEGORY_TOP ? EMPTY_STRING : categoryName + EXTEND_HTML;
	var dc = new decorator();	//レイアウト変更クラスインスタンスを生成する
	//カテゴリ名をハイライトする
	dc.hilightSelectedElement(SELECTOR_TOPMENU_BUTTON, ATTR_HREF, categoryName);
}

/* 
 * 関数名:hilightSelectedSidemenuItem
 * 概要  :選択中のページに対応した再度メニューのボタンをハイライトする
 * 引数  :なし
 * 返却値:なし
 * 作成日　:2016.0110
 * 作成者　:T.Masuda
 */
function hilightSelectedSidemenuItem() {
	var dc = new decorator();	//レイアウト変更クラスインスタンスを生成する
	//カテゴリ名をハイライトする
	dc.hilightSelectedElement(SELECTOR_SIDEMENU_BUTTON_LINK, ATTR_HREF, commonFuncs.getLastValue(location.href, SLASH), LI_TAG);
}
