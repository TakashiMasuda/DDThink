//イベントに合わせて画像に変更を加えるJavaScript
$(function(){
	
	$(document).on('mouseenter', '#thevoice', function(){
		$(this).attr('src', 'ddt-regular/img/theVoice(push).gif');
	});
	
	$(document).on('mouseleave', '#thevoice', function(){
		$(this).attr('src', 'ddt-regular/img/theVoice.gif');
	});

	var imgClick = function(e){
		if($(this).attr('class') != 'clicked'){
			$(this).addClass('clicked');
		} else {
			$(this).removeClass('clicked');
		}
		
		$.ajax({
			type: 'GET',
			url: 'ddt-regular/outline.html',
			dataType: 'html',
			async : false,				//同期通信を行う
			cache : false,				//通信結果をキャッシュしない
			success: function(data) {
	          $('#main').html($(data));
	        },
			  error: function(){
				  alert("ページのロードに失敗しました。");
			  }
	     });
	}

var closeupService = function(e){		//Serviceコンテンツの項目紹介サークル表示
	var imgwidth = 452;		//画像の幅
	var imgheight = 452;	//画像の高さ
	var offset = $(e.target).offset();		//クリックしたボタンからoffsetのオブジェクトを取得
	var y = offset.top;					//オブジェクトからボタンのY座標を取得
	var x = offset.left;				//同様にX座標を取得
	//コンテンツの高さを取得しcontentheightに格納
	var contentheight = $('#main > #maincontents').height() / 2;
	//幅も取得しcontentwidthに格納
	var contentwidth = $('#main > #maincontents').width() / 2;
	var contentid = $(e.target).attr('id');	//ボタンからIDを取得してcontentidに格納
	var contentname = siteRootPath;		//表示する項目のパスを格納する変数を用意。サーバルートパスを入れておく
	var switchvalue = parseInt(contentid.substring(1, 2));	//先ほど取得したIDから数値を取り出す
	switch(switchvalue){									//取り出した数値が
		case 0: contentname += 'ddt-regular/img/service(development).gif';	//0であれば開発内容のパスを
				break;															//contentnameに格納
		case 1: contentname += 'ddt-regular/img/service(skills).gif'	;		//1であれば開発スキルのパスを
				break;															//contentnameに格納
		case 2: contentname += 'ddt-regular/img/service(results).gif';		//2であれば開発実績のパスを
				break;															//contentnameに格納
	}
	
	/* スマフォレイアウト時ではコンテンツ幅が画像幅以下になるので別個に調整する */
	if($('article').width() <= imgwidth){	
		// 画像の幅の半分をcontentwidthに格納。座標設定時に0になるようにする
		contentwidth = imgwidth / 2;
		// 画像の高さの半分をcontentheightに格納。こちらも座標設定時に0になるようにする
		contentheight = imgheight / 2;
	}
	
	$('#textcircle').attr('src', contentname);		//項目紹介サークルの画像にパスを与える
	
	//非表示であった場合は移動アニメーションを行う
	if(!$('#textcircle').filter(':visible').length) {
		$('#servicebg').animate({						//背景の歯車画像をゆっくり透過していく
			opacity :'0.7'
			}, 'normal');
		$('#textcircle').css({								//項目紹介サークルのスタイルシートを設定
			top : (contentheight - (imgwidth / 2)) + 'px',	
			left : (contentwidth - (imgheight / 2)) + 'px'	
		});
		$('#textcircle').animate({
			width: '100%',
			top : (contentheight - (imgwidth / 2)) + 'px',
			left : (contentwidth - (imgheight / 2)) + 'px'
		}, 'normal');
	}
	
	e.preventDefault();
}

var hideService = function(){
	$('#textcircle').animate({
		width: '0px',
		top: '0px',
		left: '0px'
	}, 'normal');	
	$('#servicebg').animate({
		opacity :'1.0'
		}, 'normal');
}
	var mouseenterd = '-push)';
	var mouseleft = ')';
//潜水艦ゲームの画像にマウスオーバーしたとき
var ssnhover = function(e){	
		//サイトルートパスを抜いた状態でソースパスを取得する
		var src = $(this).attr('src').replace(/\.\.\/|\.\//g, EMPTY_STRING);
		//マウスオーバー時の画像に変化させる。サイトルートパスは一旦抜いて再度付ける
		$(this).attr('src', siteRootPath + src.replace(mouseleft,mouseenterd));
}
//マウスが離れた時
var ssnleave = function(e){
		//サイトルートパスを抜いた状態でソースパスを取得する
		var src = $(this).attr('src').replace(/\.\.\/|\.\//g, EMPTY_STRING);
		//マウスオーバー時の画像パスを元に戻す
		$(this).attr('src', siteRootPath + src.replace(mouseenterd,mouseleft));
};
var showSSN = function(){
	if ($('.ssnintroduction')[0]){
			$('.ssnintroduction').remove();
	} else {
		$('#container > #main')
		.prepend($('<div></div>')
			.addClass('ssnintroduction')
			.append($('<img>')
				.attr('src', siteRootPath + 'ddt-regular/img/ssn-d2124(ad).gif')
			));
		var contentheight = 200;
		var contentwidth = $('#main').width() / 2;

		$('.ssnintroduction').css({
			width: '100%',
			height: 'auto',
			display: 'none',
			position: 'relative'
		});	

		$('.ssnintroduction img').css({
			position: 'absolute',
			display: 'block',
//			top: contentheight + 'px',
			left: (contentwidth - 150) + 'px',
			zIndex: '30'
		});
		$('.ssnintroduction').animate({
			display: 'block'
		}, 500);
		$(document).on(EVENT_CLICK, '.ssnintroduction', function(){
			$('.ssnintroduction').remove();
		});
	}
};

var movetoStore = function(e){
	var imgid = $(this).attr('id');
	if(imgid == 'ssnmain'){
		window.location.href = siteRootPath + 'ddt-regular/app/android/SSN_D2124.apk';
	} else if(imgid == 'ssniphone'){
//		window.location.href = '';
		alert('大変申し訳ありませんが、現在App Storeへの登録申請中のためダウンロードできません。もうしばらくお待ちください。');		
	}
};

/* 
 * 関数名:showDownloadDialog
 * 概要  :ダウンロードダイアログを表示する。クリックされた画像ID名を条件に開くダイアログ種類を決定する
 * 引数  :event e: イベントオブジェクト。クリックイベントの結果が格納されている
 * 返却値:なし
 * 作成日　:2016.09.23
 * 作成者　:R.Shibata
 */
var showDownloadDialog = function(e){
	// 画像id名を取得する
	var imgid = $(this).attr('id');
	//ダイアログのボタンの設定を読み込む
	downloadDialogSettings.buttons = downloadDialogButtonSettings[imgid];
	//ダイアログのテキストにダウンロードするコンテンツ名を設定する
	$(SELECTOR_DOWNLOAD_DIALOG_CONTENT).text($(this).attr(ATTR_TITLE));
	//イメージIDに該当するダイアログの設定を読み込む
	$(SELECTOR_DOWNLOAD_DIALOG).dialog(downloadDialogSettings);
	//ダイアログを開く
	$(SELECTOR_DOWNLOAD_DIALOG).dialog('open');
	//ダイアログのタイトルバーを削除(非表示)にする
}

/* 
 * 関数名:showDownloadDialog
 * 概要  :ダウンロードダイアログを表示する。クリックされた画像ID名を条件に開くダイアログ種類を決定する
 *        また、コンテンツの内容をイメージのタイトルから値を取得し、設定する
 * 引数  :event e: イベントオブジェクト。クリックイベントの結果が格納されている
 * 返却値:なし
 * 作成日　:2016.09.28
 * 作成者　:R.Shibata
 */
var showDownloadDialogAddContentMessage = function(e){
	// 画像id名を取得する
	var imgid = $(this).attr('id');
	//ダイアログのボタンの設定を読み込む
	downloadDialogSettings.buttons = downloadDialogButtonSettings[imgid];
	//ダイアログのテキストにダウンロードするコンテンツ名を設定する
	$(SELECTOR_DOWNLOAD_DIALOG_CONTENT).text($(this).attr(ATTR_TITLE));
	//イメージIDに該当するダイアログの設定を読み込む
	$(SELECTOR_DOWNLOAD_DIALOG).dialog(downloadDialogSettings);
	//ダイアログを開く
	$(SELECTOR_DOWNLOAD_DIALOG).dialog('open');
	//ダイアログのタイトルバーを削除(非表示)にする
}

/* 
 * 関数名:dialogClose
 * 概要  :指定されたダイアログを閉じる
 * 引数  :selector selector: 閉じる対象のダイアログを指すセレクタを設定する
 * 返却値:なし
 * 作成日　:2016.09.23
 * 作成者　:R.Shibata
 */
var dialogClose = function(selector){
	$(selector).dialog("close")
}

/* 
 * 関数名:downloadSSNGame
 * 概要  :潜水艦ゲームをダウンロードする
 * 引数  :なし
 * 返却値:なし
 * 作成日　:2016.09.23
 * 作成者　:R.Shibata
 */
var downloadSSNGame = function(){
	window.location.href = siteRootPath + 'ddt-regular/app/android/SSN_D2124.apk';
}

/* 
 * 関数名:downloadOreExplorationGame
 * 概要  :鉱石探索ゲーム(OreExploration)をダウンロードする。
 * 引数  :string deviceType: ダウンロードするデバイスのタイプを指定する
 * 返却値:なし
 * 作成日　:2016.09.23
 * 作成者　:R.Shibata
 */
var downloadOreExplorationGame = function(deviceType){
	//デバイスのタイプを条件として分岐する
	switch (deviceType){
		// デバイス名がPCの場合
		case TEXT_PC:
	    	//準備中のメッセージを表示する
	    	window.location.href = siteRootPath + 'ddt-regular/app/win/Ore_exPloration.zip'
	    	break;
	    // デバイス名がAndroidの場合
		case TEXT_ANDROID:
	    	//準備中のメッセージを表示する
	    	window.location.href = siteRootPath + 'ddt-regular/app/android/OreExploration.apk';
	    	break;
	    // デバイス名が上記以外の場合
	    default:
	    	//準備中のメッセージを表示する
	    	alert(DOWNLOAD_IN_PREPARATION_MEESSAGE)
	    	break;
	}
};
/* 
 * 関数名:serviceSidemenuButtonClicked
 * 概要  :serviceページのサイドメニューをクリックしたときの処理
 * 引数  :event e: イベントオブジェクト。クリックイベントの結果が格納されている
 * 返却値:なし
 * 作成日　:2016.0112
 * 作成者　:T.Masuda
 */
function serviceSidemenuButtonClicked(e){
	e.preventDefault(); 	//画面遷移を阻止する
	e.stopPropagation(); 	//aタグ領域でもliタグ領域でもクリックしても同じ動作をさせる
	var $parent = $(this).parent();		//親のliタグを取得する
	$parent.siblings().removeClass(CLASS_SELECTED);	//selectedクラスを全てのアンカータグから外し
	$parent.addClass(CLASS_SELECTED);		//クリックしたボタンにselectedクラスを追加してボタンの色を変える
	closeupService(e);		//詳細説明の要素を出す
}

$(document).on(EVENT_CLICK, '#testimg', imgClick);
$(document).on(EVENT_CLICK, '.servicebutton', closeupService);
//serviceページでサイドメニューのボタンをクリックした時に詳細を出す。aタグが発火元なので画面遷移、バブリングを抑止しておく
$(SELECTOR_CONTAINER).on(EVENT_CLICK, '.servicesidebutton', serviceSidemenuButtonClicked);
$(document).on(EVENT_MOUSELEAVE, '#textcircle', hideService);
$(document).on(EVENT_CLICK, '#textcircle', hideService);
$(document).on(EVENT_MOUSEENTER, '.ssnimg:not(#ssncopy)', ssnhover);
$(document).on(EVENT_MOUSELEAVE, '.ssnimg:not(#ssncopy)', ssnleave);

//鉱石探索ゲームのダウンロード追加による処理の追加 start 2016.09.25 r.shibata 
//ダイアログの初期設定、自動で開かないように設定する
$(SELECTOR_DOWNLOAD_DIALOG).dialog({autoOpen:false});
//ダイアログの初期設定、タイトルバーを表示しないようにする
$(SELECTOR_UI_DIALOG_TITLEBAR).css(CSS_DISPLAY, CSS_NONE);
//潜水艦ゲームの画像をクリックしたときのイベントを登録する
$(document).on(EVENT_CLICK, SELECTOR_SSNIMG, showDownloadDialogAddContentMessage);
//鉱石探索ゲームの画像をクリックしたときのイベントを登録する
$(document).on(EVENT_CLICK, SELECTOR_OREEXPLORATIONIMG, showDownloadDialogAddContentMessage);
//ダイアログのオプション設定を作成する
var downloadDialogSettings = {
	autoOpen: false,  // 自動的に開かないように設定
    width: 310,       // 横幅のサイズを設定
    modal: true,      // モーダルダイアログにする
    buttons: []	      // ボタンの設定(デフォルトは無し)

};
//ダウンロードダイアログ用ボタン設定の連想配列を宣言する
var downloadDialogButtonSettings = {};
//潜水艦ゲーム用ダイアログのボタン設定を宣言する
downloadDialogButtonSettings[CLASS_SSNMAIN] = [
	//テキスト：Android     クリック時イベント、ダウンロード処理
	{text:TEXT_ANDROID , click: function(){downloadSSNGame()}},
	//テキスト：キャンセル     クリック時イベント、ダイアログを閉じる
	{text:TEXT_CANCEL  , click: function(){dialogClose(this)}}
];
//鉱石探索ゲーム用ダイアログのボタン設定を宣言する
downloadDialogButtonSettings[CLASS_OREEXPLORATIONMAIN] = [
	//テキスト：PC          クリック時イベント、ダウンロード処理
	{text:TEXT_PC      , click: function(){downloadOreExplorationGame(TEXT_PC)}},
	//テキスト：Android     クリック時イベント、ダウンロード処理
	{text:TEXT_ANDROID , click: function(){downloadOreExplorationGame(TEXT_ANDROID)}},
	//テキスト：キャンセル     クリック時イベント、ダイアログを閉じる
	{text:TEXT_CANCEL  , click: function(){dialogClose(this)}}
];
//鉱石探索ゲームのダウンロード追加による処理の追加 end 2016.09.25 r.shibata 

});
