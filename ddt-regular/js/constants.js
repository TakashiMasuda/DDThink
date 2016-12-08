/** ファイル名:constants.js                                            
 * 概要　　　:定数定義ファイル                                                 
 * 作成日　:2016.0104                                                 
 * 作成者　:T.Masuda                                                  
 * 場所　　:js/constants.js                                           
 */                                                               
                                                                  
//HREF属性                                                          
ATTR_HREF = 'href';                                               
//制御用ボタンのセレクタ                                                     
SELECTOR_CONTROL_BUTTON = '.controler button';                    
//クリックイベント名                                                       
EVENT_CLICK      = 'click';          
//マウスエンターイベント名                                                       
EVENT_MOUSEENTER = 'mouseenter';          
//マウスリーブイベント名                                                       
EVENT_MOUSELEAVE = 'mouseleave';
//popstate変化時の告知文                                                 
NOTICE_ALTER_POPSTATE = 'popstateの状態が変化しました。';                    
//ajax通信オプションのデータタイプ:HTML                                         
DATATYPE_HTML			  = 'HTML';                             
//通信エラー時のメッセージ前部                                                  
ALERT_CONNECT_ERROR_FRONT = 'connect error.¥ncause...¥nstatus : ';
//通信エラー時のメッセージ後部                                                  
ALERFT_CONNECT_ERROR_REAR = '¥nerror : ';                          
//コンテンツ領域のセレクタ                                                    
SELECTOR_MAIN			= '#main';                                
//空文字                                                             
EMPTY_STRING			= '';                                     
//scriptタグ                                                        
SCRIPT_TAG				= 'script';                               
//headタグ                                                          
HEAD_TAG				= 'head';
//aタグ
ANCHOR_TAG				= 'A';
//jQueryコアファイル名
JQUERY_CORE				= 'jquery-1.11.0.min';
//スクリプトファイルのディレクトリ
DIR_SCRIPT_FILES		= 'ddt-regular/js/';
//CSSファイルのディレクトリ
DIR_CSS_FILES			= 'ddt-regular/css/';
//CSSファイル名
STYLE_CSS				= 'style';
DESKTOP_CSS				= 'desktop';
SMARTPHONE_CSS			= 'smartphone';
TABLET_CSS				= 'tablet';
JQUERY_UI_MIN           = 'jquery-ui.min';
TOP_PAGE				= 'ddt-regular/top.html';
//フレームのHTMLファイル
FRAME_HTML				= 'ddt-regular/source/frame.html';
//コンテナのタグ
SELECTOR_CONTAINER		= '#container';
//bodyタグ
BODY_TAG				= 'body';
//記号/
SLASH					= '/';
//jsファイルの拡張子
EXTEND_JS				= '.js';
//CSSファイルの拡張子
EXTEND_CSS				= '.css';
//src属性
ATTR_SRC				= 'src';
//title属性
ATTR_TITLE				= 'title';
//alt属性
ATTR_ALT				= 'alt';
//linkタグ
LINK_TAG				= 'link';
//index.html
INDEX_PAGE				= 'index';
//linkタグのrel属性に設定するCSS利用のための値
VALUE_STYLESHEET		= 'stylesheet';
//rel属性
ATTR_REL				= 'rel';
//trueの文字列
STR_TRUE				= 'true';
//現状メインのタグの前に置かれている要素のセレクタ
BEFORE_MAIN_TAG_ELEM	= 'header.baseinfo';
//デフォルトのエントリを指すキー
KEY_DEFAULT				= 'default';
SELECTOR_CONTENT_IMGS	= '#main img';
SELECTOR_CONTENT_ANCHOR	= '#main a';
//画像タグ
IMG_TAG					= 'img';
//インターネットURLの先頭部分2パターン
HTTP					= 'http://';
HTTPS					= 'https://';
//トップメニューのボタンのセレクター
SELECTOR_TOPMENU_BUTTON	= '#navigation ul li a';
//サイドメニューのボタン
SELECTOR_SIDEMENU_BUTTON = 'nav.sidemenu li';
//サイドメニューのボタンのリンク部分
SELECTOR_SIDEMENU_BUTTON_LINK = 'nav.sidemenu li a';
//トップメニュー領域内リンク要素のセレクタ
SELECTOR_TOPMENU_ANCHOR	= '#navigation a';
//トップメニュープルダウン用のデータのXMLファイルのパス
PATH_PULLDOWNMENU_XML = "ddt-regular/assets/pulldownmenu.xml";
//ワイルドカード
WILDCARD				= '*';
//トップメニューのボタン外枠のセレクタ
SELECTOR_TOPMENU_BUTTON_OUTSIDE	= '#navigation ul li';
//トップメニューのボタン全てのセレクタ
SELECTOR_TOPMENU_BUTTON_ALL	= '#navigation ul li *';
//フォームタグ
FORM_TAG					= 'form';
//フォームタグ
SELECTOR_CONTENT_FORM		= '#main form';
//action属性
ATTR_ACTION					= 'action';
//serviceクラス
CLASS_SERVICE				= 'service';
//CSS読み込み開始から初期化処理の要ディレイ関数コールまでのディレイ
INIT_LASTPROCDDURE_DELAY			= 175;
//HTTPリクエストのGETメソッド
METHOD_GET					= "GET";
//DDTFlowers流用スクリプトファイルのディレクトリ
FLOWER_SCRIPT_DIR			= 'flower/js/';
//角括弧の前後
SQUARE_BRACKET_FRONT		= '[';
SQUARE_BRACKET_REAR			= ']';
//「選択済み」を指すクラス
CLASS_SELECTED				= 'selected';
//カテゴリなしの文字列
NO_CATEGORY					= 'no category';
//ドット
DOT							= '.';
//トップのカテゴリ
CATEGORY_TOP				= 'top';
//HTMLファイルの拡張子
EXTEND_HTML					= '.html';
//liタグ
LI_TAG						= 'li';
//フッター背景
FOOTER_BACKGROUND			= '#footerbg';
//CSSスタイルheight
STYLE_HEIGHT				= 'height';
//フッタータグ
FOOTER_TAG					= 'footer';
//サイトルートパスを持たせておく要素のセレクタ
SELECTOR_SITEROOT_PATH		= '#siteRootPath';
//ヘッダータグ
HEADER_TAG					= 'header';
HEADER_FOOTER_IMG			= 'header img, footer img';
//ヘッダー、フッター内のaタグ、imgタグ
HEADER_FOOTER_ANCHOR		= 'header a, footer a';
SELECTOR_SERVICE_SIDEMENU_BUTTON = 'nav.sidemenu.serviceSidemenu li a';
//#
SHARP						= '#';
//カレントのディレクトリ
CURRENT_DIRECTORY		= './';
//ひとつ上のディレクトリ
PREV_DIRECTORY			= '../';
//ダウンロードダイアログを示すセレクタ
SELECTOR_DOWNLOAD_DIALOG    = '.downloadDialog';
//ダウンロードダイアログの可変テキストを示すセレクタ
SELECTOR_DOWNLOAD_DIALOG_CONTENT = '.downloadDialogContent';
//iPhoneを示すテキスト
TEXT_IPHONE                 = 'iPhone';
//Androidを示すテキスト
TEXT_ANDROID                = 'Android';
//PCを示すテキスト
TEXT_PC                     = 'PC';
//キャンセルを示すテキスト
TEXT_CANCEL                 = 'キャンセル';
//潜水艦ゲームを示すID名
CLASS_SSNMAIN               = 'ssnmain';
//潜水艦ゲームを示すセレクタ名(クラス名)
SELECTOR_SSNIMG             = '.ssnimg';
//鉱石探索ゲームを示すID名
CLASS_OREEXPLORATIONMAIN    = 'oreExplorationMain';
//鉱石探索ゲームを示すセレクタ名(クラス名)
SELECTOR_OREEXPLORATIONIMG  = '.oreExplorationImg';
//ダウンロード準備中のメッセージ
DOWNLOAD_IN_PREPARATION_MEESSAGE = '大変申し訳ありませんが、現在準備中のためダウンロードできません。もうしばらくお待ちください。';
//jQueryのダイアログ、タイトルバーを示すセレクタ
SELECTOR_UI_DIALOG_TITLEBAR = '.ui-dialog-titlebar';
//CSSの設定、display
CSS_DISPLAY                 = 'display';
//CSSの設定、none
CSS_NONE                    = 'none';