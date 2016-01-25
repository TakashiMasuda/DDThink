
　 //グローバル変数を宣言する
   balloonPc 	= 'n(w950).';				//balloon.gifの、レイアウト別で変更する部分の文字列をballoonPcに格納
   balloonTb 	= 'n(w600).';		//タブレット用のバルーン画像に必要な文字列をballoonTbに格納
   balloonSp	= 'n(w320).';		//スマフォ用のバルーン画像に必要な文字列をballoonSpに格納
   
   widthFix		= 0;				//ブラウザ別に必要となる横幅の修正のための数値を格納する変数
   tbWidth 		= 768;				//タブレットレイアウトになる横幅の下限値をtbWidthに格納
   pcWidth		= 950;				//PCレイアウトになる横幅の下限値をpcWidthに格納
   //タブレットレイアウト時のメインコンテンツ領域の幅をtbmaincontentSizwに格納
   tbmaincontentSize = 600;			
   iPhoneResolution = 380;			//iPhone用画面幅。現状Android共用
   
	//画面遷移時のコンテンツのURLを格納し、サイドメニューのボタンのURLとの照合を行う変数contenturl
	var contenturl = location.href;	//	コンテンツのURLを格納する変数contenturl。初期値は現在のURLにする
   
   //ウェブサイトの初回読み込み時に画像をあらかじめ読み込むためのメソッドpreload。
   function preload(arrayOfImages) {	//画像のソースパス群を引数にする
    $(arrayOfImages).each(function(){	//引数に指定したソースパスを個別に処理
        $('<img/>')[0].src = this;		//0番目の画像タグにソースを設定することで画像読み込みを開始する
	    });
	}

	//preloadを呼び出す。引数にソースパスをハッシュの形で指定。主に各ページで共通して利用する画像を読み込む
	preload([
		//success(mini).gif。あらかじめ読み込まないとスマホからの初回表示時にずれる
    	siteRootPath + 'ddt-regular/img/success(mini).gif',
		//PC、タブレットレイアウトのサイドメニュー下に挿入されるsuccess.gif
    	siteRootPath + 'ddt-regular/img/success.gif',
		//ヘッダーの会社ロゴ
    	siteRootPath + 'ddt-regular/img/logo(DDThink).gif',
		//ヘッダーのフル表示会社名
    	siteRootPath + 'ddt-regular/img/logo(DDTfull).gif',
		//ヘッダーのゲーム紹介メイン画像
    	siteRootPath + 'ddt-regular/img/ssn-d2124(57).gif',
		//ゲーム紹介文章画像
    	siteRootPath + 'ddt-regular/img/download(freeApp).gif',
		//ゲーム紹介iphoneアプリリンク画像
    	siteRootPath + 'ddt-regular/img/button(iphone).gif',
		//ゲーム紹介Androidアプリリンク画像
		siteRootPath + 'ddt-regular/img/button(Android).gif'
	]);

   
   //ブラウザの判別を行い、名前を取得するメソッドgetBrowserName
   function getBrowserName(){	
   		//ユーザーエージェントの情報を文字列で取得してuserAgentに格納
   	    var userAgent = window.navigator.userAgent.toLowerCase();
		//ブラウザのバージョン情報を文字列で取得してappVersionに格納
		var appVersion = window.navigator.appVersion.toLowerCase();	
		var browserName = '';	//ブラウザ名を格納する変数browserName
		
		if(userAgent.indexOf('opera') != -1) {	//ブラウザがOperaであれば
			  browserName = 'opera';					//ブラウザ名をbrowserNameに格納
		}else if (userAgent.indexOf('msie') != -1) {	//InternetExplorerであれば
			if (appVersion.indexOf("msie 6.") != -1 		//バージョンが9以前であるかどうかを判別
			|| appVersion.indexOf("msie 7.") != -1 
			|| appVersion.indexOf("msie 8.") != -1 
			|| appVersion.indexOf("msie 9.") != -1){
				//最新版での閲覧を促す警告を表示
 			   alert('本サイトを正常にご覧頂くには最新版のブラウザに更新していただく必要があります。\nお手数をおかけしますブラウザの更新を行っていただいてからの再アクセスをしていただきますよう、お願い申し上げます。');
  			}
  				  browserName = 'ie';						//ブラウザ名をbrowserNameに格納
  		}else if (userAgent.indexOf('chrome') != -1) {		//Chromeであれば
	 	 	browserName = 'chrome';								//ブラウザ名をbrowserNameに格納
		}else if (userAgent.indexOf('safari') != -1) {		//Safariであれば
		 	 browserName = 'safari';							//ブラウザ名をbrowserNameに格納
		}else if (userAgent.indexOf('gecko') != -1) {		//Geckoブラウザであれば
 			 browserName = 'gecko';								//ブラウザ名をbrowserNameに格納
		}else {												//対応外のブラウザであれば
	 		 browserName = 'unknown';							//不明であるということで、unknownの文字列を格納
		}
		
		return browserName;									//取得したブラウザ名を返す
   }
	
	browser = getBrowserName();								//ブラウザ名を取得し、browserに格納
	
	//スクロールバーの有無を確認して、あればスクロールバーの幅を返しなければ0を返すメソッド
	var checkScrollbar = function(){
		//処理を行う前にcontainerがIDのタグが存在するかを確認する
		var container = document.getElementById('container');
		
		//containerが取得できなければ
		if (container == null) {
			//処理を終了する
			return;
		}
		
		var returnvalue = 0;									//返却値を格納する変数returnvalueを宣言、0で初期化
		var cHeight = container.scrollHeight;					//コンテンツの高さを取得
		var bHeight = window.parent.screen.height;				//表示されている高さを取得
		
		if((cHeight - bHeight) > 0){	//スクロールバーがあれば
			returnvalue = window.innerWidth - $(window).width();	//returnvalueにスクロールバーの幅を格納
		}
		
		return returnvalue;		//算出した結果を返す
	}
	
	
//	logoSize();		//ウェブサイト初回ロード時に一度logoSizeを呼び出す
	
  $('#navigation ul li:first a').addClass('selected');	//ページ読み込み時にトップメニューの全体の1つめのアンカータグにselectedクラスを追加。トップページへのリンクボタンが対象となる
  $('#main').load(				//そのアンカータグからURLを抽出し、そのページを表示する
    $('a.selected').attr('href'));   
	


 	function pagemove(e, url, isPopstate) {	//Ajaxによる画面遷移を挟まないコンテンツ切り替えの関数記述し、変数pagemoveに格納する
 		//社員の声でページャをクリックした場合、ページャのテキスト(番号)を利用するためイベント発火元の要素を取得する
		var voicebutton = $(e.target);
		//URLが取得できれば設定する。できなければ第二引数を利用する。
 		contenturl = url !== void(0) ? url : $(this).attr('href');
 		if(contenturl){
  		$('#navigation').after('<div id="temporary"></div>');	//トップメニューの部分の次にHTMLを一時的に保存する領域を作る
		$.ajax({							//Ajax通信を開始
          type: 'GET',						//データを取得する
          url: contenturl,					//コンテンツのURLを設定
          dataType: 'html',					//htmlを取得する
          async : false,				//同期通信を行う
　 		  cache : false,				//通信結果をキャッシュしない
          success: function(data) {		//データの取得に成功したら
        	  
        	  //popstateによるブラウザバック・フォワードに対応した当該関数のコールでなければ
        	  if (!isPopstate){
       			 //pushStateに履歴を追加する
       			 pControl.addPushState(url, EMPTY_STRING);
        	  }

        	  //メインのタグを取得する
        	  var mainElem = $(SELECTOR_MAIN, data);
        	  //取得できなかった場合は取得対象の階層を変えて再度取得を試みる
        	  mainElem = mainElem[0] ? mainElem[0] : $(data).filter(SELECTOR_MAIN);
        	  //メインのタグを書き出す	
	          $(SELECTOR_MAIN).html($(mainElem));
	          
	          updateSiteRootPath();		//サイトルートパスを更新する
	          
			  //読み込んだコンテンツに応じて独自の処理を行う
			 $('#container').removeClass('service');
			  if(contenturl.indexOf('ddt-regular/voice.html') != -1){	//研修生の声コンテンツであったら
				  createVoice(voicebutton);		//クリックしたボタンの要素を引数に研修生の声を生成するメソッドを呼び出す
		 	 } else if(contenturl.indexOf('ddt-regular/toppage.html') != -1){
				imgSize();
			}
			 
			//トップメニューーの選択済み項目から選択済みを指すクラスを除去する
			$(SELECTOR_TOPMENU_BUTTON).removeClass(CLASS_SELECTED);
			
			//トップメニュー、サイドメニューの選択済みの項目をハイライトする
			hilightSelectedCategory();
			hilightSelectedSidemenuItem();
			
			//ヘッダー、フッターの内の要素のリンクを書き直す
			commonFuncs.addSiteRootPathForFrame()
       	 　},
			  error: function(){				//データの取得に失敗したら
				  alert("ページ「" +contenturl + "」のロードに失敗しました。");	//ロード失敗の旨を伝える
		　 }
   	  });
	} else {
		if (e != null) {
			e.preventDefault();
		}
	}
	

	if (e != null) {
		e.preventDefault();
	}
		
		$(document).ajaxStop(function() {	//コンテンツ切り替え後の後処理
			$('#temporary').children().unwrap();	//一時保存領域から読み込んだコンテンツを出す
			$('#temporary').remove();				//一時保存領域を消去する
			//選択したコンテンツに対応するサイドメニューのボタンの色を変える処理
			$('.sidemenu ul li').each(function() {			//サイドメニューのリスト全てを個別処理する
				if($('a' ,this).attr('href') == contenturl) {	//コンテンツ切り替え時に取得したURLとボタンのURLが一致したら
					$(this).addClass('selected');			//selectedクラスをアンカータグに追加して選択状態にする
				}
			});
			if(contenturl.indexOf('ddt-regular/access.html#' != -1)) {	//マップボタンを押してコンテンツがロードされていたら
			accessmove(contenturl);		//accessmoveメソッドを呼び出して引数に応じた座標へのスクロールを行う
			}
			if(0 < $(".sidemenu").size()){
				sidemenuSize();		//サイドメニューのリサイズを行う
				articleheadSize();				
			}
			//ロゴサイズを調整する関数をコールする
	        //logoSize();
	        
		 });  
  	}

	function accessmove(place) {	//ロードされたコンテンツのURLを引数にする
			if(contenturl.indexOf('shinjuku') != -1){	//新宿本社のボタンが押されていれば
				$('html,body').animate({ scrollTop: $('#shinjuku').offset().top}, 0);	//新宿本社のマップへスクロール
			} else if(contenturl.indexOf('sagamihara') != -1) {	//相模原事業所のボタンが押されていれば
				$('html,body').animate({ scrollTop: $('#sagamihara').offset().top}, 0);	//相模原事業所のマップへスクロール
			}
	}

	//画面の状態に応じてロゴの配置を調整する
	function logoSize (){												//ヘッダーのコンテンツの滑り込みを制御する

				var smalllogoPadding = parseInt($('#smalllogo').css('padding-right'));		//会社小ロゴの幅を取得
				var biglogoWidth = parseInt($('#biglogo').width());						//会社大ロゴの幅を取得
				var ssnWidth =  $('#ssn-d2124').width();									//ゲーム紹介の枠の幅を取得
				var logoleftmargin =  parseInt($('#companylogo').css('margin-left'));		//会社ロゴ枠の左marginを取得
				//ゲーム紹介の枠の左marginを取得。このmarginは左右同じ値に指定していなければ不具合が発生する
				var ssnPadding = parseInt($('#ssn-d2124').css('padding-left'));						

				var smalllogoWidth = $('#smalllogo').width();
				if(smalllogoWidth == 0){
					smalllogoWidth = $('#smalllogo').css('width');
				}
				var headerWidth = parseInt($('#headercontents').width());			//現在のウィンドウのサイズを取得
				var scrollbar = checkScrollbar();
				scrollfix = 80; 									//ずれの修正の値を変数に格納
				var shiftWidth = $('#biglogo-substitute').width()					//ウィンドウがこの幅になったらロゴを縦に並べる
				+ smalllogoWidth + smalllogoPadding + ssnWidth　+ scrollfix;
				if(shiftWidth >= headerWidth){						//ウィンドウ(ヘッダー)の幅が一定値を下回れば
					//ゲーム紹介の枠の横paddingを算出して変数に格納
					var variablepaddingSSN = (headerWidth - smalllogoWidth - ssnWidth - scrollbar) / 2 - logoleftmargin;
					//それがデフォルト設定のゲーム紹介枠の横padding以下であれば(ずれ防止のためロゴ枠左のmarginも計算に入れる)
					if(variablepaddingSSN - logoleftmargin <= ssnPadding){	
						$('#ssn-d2124').css({						//ゲーム紹介の枠のスタイルシートを変更
						paddingRight : variablepaddingSSN + 'px',	//右paddingを現在のウィンドウサイズにあった大きさにする
						paddingLeft  : variablepaddingSSN + 'px'	//同様に左paddingも設定
						});
					}
					$('#smalllogo').css({	//小ロゴに対するスタイルシート
						float: 'none',		//float属性を取り消し
						clear: 'both',		//大ロゴへの回り込みも解除する
						paddingRight: '0'	//右paddingをなくす
					});
				} else{						//ウィンドウの幅が一定値を上回れば
					$('#smalllogo').css({	//小ロゴに対しスタイルを指定する
						float:'',			//float属性を指定
						clear: 'none',		//回り込みを通常通りに設定し、大ロゴの右に配置
						paddingRight: 0 + 'px'	//グローバル変数に保存したデフォルトの右marginを設定
					});
					$('#ssn-d2124').css({		//ゲーム紹介枠のスタイルを指定
						paddingRight : ssnPadding + 'px',	//デフォルトの右padding
						paddingLeft  : ssnPadding + 'px'		//デフォルトの左paddingを設定
					});
				}
	}

	//クラスをswitchに設定した画像タグに対する処理
    var imgSize = function(){			//メソッドimgSizeを定義
	   		if($('.switch').length < 1){	//switchクラスを設定した要素がなければ
				return false;					//処理に入らず終了する
			}
       var allwindowWidth = window.innerWidth;	//画面サイズを取得し変数windowWidthに格納。これを基準に条件分岐する
       if(allwindowWidth >= pcWidth) {						//PCレイアウトであれば
			//画像のタグのsrc属性の値となるソースパスを書き換えPC用画像を設定する
            $('.switch').attr('src',$('.switch').attr('src')
			   .replace(balloonTb,balloonPc)).css({visibility:'visible'});
       } else if(allwindowWidth >= tbWidth && allwindowWidth < pcWidth) {			//タブレットレイアウトであれば
				if($('.switch').attr('src').indexOf(balloonSp) != -1){				//スマフォレイアウトからの移行なら
					//スマフォ用のパスをタブレット用のパスに書き換える
            		$('.switch').attr('src',$('.switch').attr('src')
					.replace(balloonSp,balloonTb)).css({visibility:'visible'});
				} else{																//PCレイアウトからの移行なら
					//PC用のパスをタブレット用に書き換える
					$('.switch').attr('src',$('.switch').attr('src')
					.replace(balloonPc,balloonTb)).css({visibility:'visible'});
				}
       		} else if(allwindowWidth < tbWidth + widthFix){																//スマフォレイアウトであれば
		 		//タブレット用パスをスマフォ用パスに書き換える
			 	$('.switch').attr('src',$('.switch').attr('src')
				.replace(balloonTb,balloonSp)).css({visibility:'visible'});
       		}
     }

    //serviceページの画面サイズに合わせてコンテナにserviceクラスを付与してCSSの切り替えを行う
	var serviceSize = function(){
		//コンテナのクラスを取得する
		var containerClass = $('#container').attr('class');
		//コンテナがserviceクラスを持っていて、画面サイズがIPhone適正サイズよりおおきければ
		if(containerClass == 'service' && $(window).width() <= iPhoneResolution){
			//コンテナからserviceクラスを削除してCSSを変更する	
			 $('#container').removeClass('service');
		//現在がserviceページであり、画面サイズがIPhone適正サイズの範疇であれば
		} else if (contenturl.indexOf('ddt-regular/service.html') != -1
		 && $(window).width() > iPhoneResolution){
			//コンテナにserviceクラスがなければ
			if (containerClass == void(0) || containerClass.indexOf('service') == -1) {
				//コンテナにserviceクラスを追加して固定幅にする
				$('#container').addClass('service');
			}
		}
	}

	//タブレットレイアウト時のサイドメニューを適正な大きさにするメソッド
	var sidemenuSize = function(){
			var windowWidth = $(window).width();			//現在のウィンドウのサイズを取得
			var allwindowWidth = window.innerWidth;
			if(browser == 'safari'){
				widthFix = allwindowWidth - windowWidth;
			}
			
				//タブレットレイアウトのサイズであれば
				if(tbWidth + widthFix <= allwindowWidth && pcWidth + widthFix > allwindowWidth){		
					//サイドメニューの幅を伸縮する
					//サイドメニューのリサイズ後の大きさのベースの値を算出し、変数newsizeに格納
					var newsize=	 windowWidth - tbmaincontentSize;
					//サイドメニューの左marginを変数sideleftに格納
					var sideleft=  parseInt($('.sidemenu').css('margin-left'));
					//サイドメニューの右のmarginを変数siderightに格納
					var sideright= parseInt($('.sidemenu').css('margin-right'));
					//メインコンテンツ領域の左marginを変数maincleftに格納
					var maincleft= parseInt($('#maincontents').css('margin-left'));
					//メインコンテンツ領域の右marginを変数maincrightに格納
					var maincright=  parseInt($('#maincontents').css('margin-right'));
					//それぞれのmarginをnewsizeから差し引いて、正確なリサイズ後のサイドメニュー
					//のサイズを導き出す。
					newsize = newsize - sideleft - sideright - maincleft - maincright;	
					$('.sidemenu').css('width', (newsize + 'px'));	//算出した値でサイドメニューの幅を設定
				//スマートフォンのサイズであれば
				} else if(tbWidth - (allwindowWidth - windowWidth) + widthFix > windowWidth){	
					$('.sidemenu').css('width', '100%');				//画面に対し100%の幅にする
				}
			}

	//企業理念コンテンツを構築するメソッドcreatePhilosophy
	 var createPhilosophy = function(){
		//企業理念コンテンツのソースファイルのパスを変数xmlurlに格納
		var xmlurl = siteRootPath + 'ddt-regular/assets/philosophy.xml';
		$.ajax({			//ajax関数によるajax通信を開始
	       	type: 'GET',	//データを取得する
			url: xmlurl,	//xmlurlに格納されたパスからデータを取得
 	        dataType: 'xml',	//xml形式のデータを取得する
 	        async : false,		//同期通信を行う
			cache : false,				//通信結果をキャッシュしない
			success: function(xml) {		//ajax通信に成功した時の処理の記述
				var atopic = '';			//現在指すtopicタグのセレクタを格納する変数atopic
				$('article#simplearticle')
				.append($('<div></div>')
					.attr('id', 'responsivehead')
					.append($('<div></div>')	//articleタグにdivタグを追加
						.addClass('articlehead')							//それを見出しとするため、articleheadクラスを追加
						.append($('<h3></h3>')								//見出し文字を格納するタグを追加して
							//xmlに入っている見出しの文章を格納して見出し完成)
							.append($(xml).find('articlehead').text())))
					//success(mini).gifを見出し横に置くためのimgタグ
					.append($('<a></a>')									//画像はアンカータグで囲む
					.attr('href', siteRootPath + 'ddt-regular/induction.html')				//研修制度コンテンツへのリンクを与える
						.append($('<img>')									//画像タグを追加
						.attr('src', siteRootPath + 'ddt-regular/img/success(mini).gif')	//success(mini).gifのパスを追加
						.attr('id', 'successmini')))						//スタイル指定のためのIDを追加
				);
				//xmlの中から個別記事を1つずつ拾い上げ、順次処理していく。
	    		$(xml).find('topic').each(function() {
					 atopic = $(this);					//atopicに現在指すtopicタグを格納
					 //articleタグの中に記事を順次追加していく。各記事はsectionタグで囲む
					$('article#simplearticle').append($('<section></section>')
						.append($('<div></div>')		//divタグを追加し
							.addClass('articlehead2')	//記事見出しとするためarticlehead2クラスを追加し
							.append($('<h3></h3>')		//記事見出し文字を格納するタグを追加して
								.append($('headtext' ,atopic).text()))	//取り出した記事見出しテキストを格納する
							.append($('<span></span>')	//記事本文を格納するspanタグをsectionタグ直下に追加し
								.addClass('simpletext')		//simpletextクラスを追加して
								.append($('maintext', atopic).text()))));	//記事本文を格納する
				});
			},
			error: function(){		//通信エラー時の処理
				alert("XMLのロードに失敗しました。");	//ロード失敗の旨を出力
			}
		});
	 }
		var articleheadSize = function(){		//success(mini)と見出しを並べて表示するためのメソッドarticleheadSize
			allwindowWidth = window.innerWidth;		//現在のウィンドウのサイズを取得
			headWidth = parseInt($('.articlehead').css('width'));						//見出しのサイズをセット
			headFix　= 20;							//ずれ修正のための数値。
			//社員・研修生の声コンテンツにおける、success(mini).gifの右margin調整
			if(contenturl.indexOf('voice.html') != -1){	//現在のコンテンツが社員・研修生の声であれば
				headFix += parseInt($('section').css('margin-right'));	//個別記事の右marginをずれ修正値に加え
				//success(mini).gifの右端と個別記事の右端を合わせる
				$('#successmini').css('margin-right', parseInt($('section').css('margin-right')) + 'px');
			}
			var successminiWidth = $('#successmini').width()	//success(mini).gifの取る幅を取得し変数に格納
			 + parseInt($('#successmini').css('margin-right'))	
			 + parseInt($('#successmini').css('margin-left'));
			 //見出しの適切な幅を算出して変数に格納
			var newheadWidth = headWidth - (headWidth + successminiWidth - allwindowWidth) - headFix;
			$('.articlehead').css('width', newheadWidth);	//算出した数値を見出しの幅に設定
		}
		
		//研修生の声のコンテンツを作成するメソッドcreateVoice
		 var createVoice = function(voicebutton){
			 //ページャの場合はIDがページ番号になっているため、クリックしたものがある場合は対象のIDを取り出す
			var pagenumText = $(voicebutton).attr('id');
			var pagenum = pagenumText && !isNaN(pagenumText) ? $(voicebutton).attr('id'): 1;	//ページ番号を変数pagenumに格納
			//研修生の声記事のソースファイルのパスを変数xmlurlに格納
			var xmlurl = siteRootPath + 'ddt-regular/assets/voice.xml';
			$.ajax({			//ajax関数によるajax通信を開始
		       	type: 'GET',	//データを取得する
				url: xmlurl,	//xmlurlに格納されたパスからデータを取得
	  	        dataType: 'xml',	//xml形式のデータを取得する
				cache : false,				//通信結果をキャッシュしない
	 			success: function(xml) {		//ajax通信に成功した時の処理の記述
					//1～2桁目に男性、3～4桁目に女性の画像番号を示す数値を格納する変数sexcountを宣言
					var sexcount = 0;
					//現在imgフォルダにある男性用の人物画像の枚数を変数numberofmenimgに格納
					var numberofmenimg = 2;
					//同様に女性用の人物画像の枚数を変数numberofwomimgに格納
					var numberofwomimg = 2;
					//文字列に変換された画像番号を格納する変数imgnumを宣言、空文字で初期化	
					var imgnum = "";
					//性別の文字列配列
					var sextext = ['男性', '女性'];
					//取得したXMLから1人1人のデータをデータを取り出して処理する
					var memberelem = "";
					//読み込んだテキストの大きさを順次ためていく変数textsize
					var textsize = 0;
					//1度に表示する記事の大きさの限界
					var pagesize = 4000;
					//表示するページの大きさの限界を表す変数pagelimit
					var pagelimit = pagenum * pagesize - pagesize;
					//記事作成が始まったら、作成回数をカウントするための変数counter
					var counter = 1;

					//ページング出力対象key一覧配列
					var exportVoiceKeyList = new Array();
					//ページングのkey
					var paging_key = 1;
					//デフォルトで配列を作っておく
					exportVoiceKeyList[paging_key] = new Array();
					//1つのページに表示する人数の数。1ページに2人ずつの社員の声を表示するように設定
					var display_voice_count = 2;
					//社員の声に登録されている数を取得し、ループの最終値として使う
					var members_count = $(xml).find('member').length;
					for(var j=0; j<members_count; j++) {
						//対象値を指定する
						exportVoiceKeyList[paging_key].push(j);
						counter++;
						//1ページに最大人数まで表示したならkeyをインクリメントする
						if (counter > display_voice_count) {
							paging_key++;
							//新しい配列を作る
							exportVoiceKeyList[paging_key] = new Array();
							//カウンターをリセットする
							counter = 1;
						}
					}

					var members = $(xml).find('member');

					//xmlの中から個別記事を1つずつ拾い上げ、順次処理していく。
		    		$(xml).find('member').each(function(i) {
						//人物画像のパスを格納する変数portraitを宣言、サイトルートパスで初期化する
						var portrait = siteRootPath;

		    			//表示対象でない人はループを飛ばす
		    			if($.inArray(i, exportVoiceKeyList[pagenum]) == -1 ) {
		    				//contiueの代わりeachのときの書き方;
		    				return true;
		    			}
							//今指しているthisのセレクターをmemberelemに保存する
							memberelem = $(this);
							//現在の対象が男性ならば
							if($('sex', this).text() == '1'){
								sexcount += 1;	//男性の番号カウントを増やす
								//男性の番号カウントが男性の画像の数を上回ったら
								if(sexcount % 100 > numberofmenimg){
									sexcount -= numberofmenimg;	//番号のカウントを0にする
								}
								if(sexcount% 100 < 10){				//カウントが1桁であれば
								//カウントの頭に0をつけて文字列にした後imgnumに格納
									imgnum = "0" + String(sexcount % 100);	
								} else {							//カウントが2桁ならば
									imgnum = String(sexcount % 100);	//カウントを文字列にしてimgnumに格納
								}
								//男性の画像名に番号を付け足して、変数portraitに格納
								portrait += 'ddt-regular/img/theVoice(men'+ imgnum +').gif';
							} else {
								sexcount += 100;
								//女性の番号カウントが男性の画像の数を上回ったら
								if(sexcount / 100 > numberofmenimg){
									sexcount -= numberofmenimg * 100;	//番号のカウントを0にする
								}
								if(sexcount/ 100 < 10){				//カウントが1桁であれば
								//カウントの頭に0をつけて文字列にした後imgnumに格納
									imgnum = "0" + String(parseInt(sexcount / 100));	
								} else {							//カウントが2桁ならば
									//カウントを文字列にしてimgnumに格納
									imgnum = String(sexcount / 100);	
								}
								//女性の画像名に番号を付け足して、変数portraitに格納
								portrait += 'ddt-regular/img/theVoice(wom'+ imgnum +').gif';
							}
							//articleタグに記事を囲むsectionタグを追加
							$('article#voice').append($('<section></section>')	
											.append($('<img>')			//画像タグを追加し
												.attr('src', portrait))	//画像ソースのパスを与える
											.append($('<div></div>')	//記事見出しに来る個人情報を格納する
												.addClass('voicehead')	//divタグに記事見出しとしてのクラスを追加
												.append($('<div></div>')	//画像内に滑り込ませる文章を格納するdivタグを格納
													.addClass('intoimg')	//それを示すintoimgクラスを追加
													.append($('<span></span>')	//性別を格納するspanタグを追加
														.addClass('membersex')	//そのタグを示すこととなるmembersexクラスを追加
														//配列sextextから性別に対応する文字列を取得し格納する
														.append(sextext[parseInt($('sex', memberelem).text()) - 1])
														.append('<br>'))		//改行タグを挿入
													.append($('<span></span>')	//年齢を格納するspanタグを追加
														.addClass('memberage')	//年齢を示すmemberageクラスを追加
														.append($('age', memberelem).text())	//年齢を取得して格納する
														.append('<br>'))		//改行タグを挿入
													.append($('<span></span')	//名前(イニシャル)を格納するタグを追加
														.addClass('membername')	//名前を表すmembernameクラスを追加
														.append($('initial', memberelem).text()))	//取得したイニシャルを格納
														))
											.append($('<p></p>')		//本文を格納するpタグを追加
												.addClass('voicetext')	//本文を表すvoicetextクラスを追加
												.append($('text', memberelem).text()))	//本文を取得して格納
							); 
//						}
						textsize += $(this).text().length;		//textsizeに今回読み込んだ情報量を足す

					});			//voice登録人数についてのループend

					//ページングのための領域を確保するため、idをpagingにしたdivタグをarticleタグの最後に追加
					$('article#voice').append($('<div></div>').attr('id', 'paging'));
					var pagernumber = 1;	//ページ尾の番号を表す変数pagernumを宣言、1で初期化
					//ページングをループで作る
					for (pagernumber; pagernumber<=paging_key; pagernumber++) {
						//次のページにコンテンツがある時のみ次のページングを作る
						if (exportVoiceKeyList[pagernumber].length > 0){
							$('#paging')				//ページング領域に
							.append($('<a></a>')		//アンカータグを追加して
							.append(pagernumber)		//ページ番号を格納
							.addClass(pagernumber == pagenum ? 'pager selected' : 'pager')			//ページャを表すpagerクラスを追加し
							.attr('href', siteRootPath + 'ddt-regular/voice.html')	//研修生の声ページのアドレスを格納し
							.attr('id', pagernumber));	//idにもページ番号を格納
						}
					}

				},
				error: function(){		//通信エラー時の処理
					alert("データのロードに失敗しました。");	//ロード失敗の旨を出力
				}
			});
		 }
		
		 //フッター背景の高さを再調整する
		function footerBackgroundResize() {
			//フッター背景の高さをフッターと同じにする
			$(FOOTER_BACKGROUND).css(STYLE_HEIGHT, $(FOOTER_TAG).height());
		}
		 
		//リサーズイベントコールバックをまとめて登録する
		$(window).resize(sidemenuSize);		//ウィンドウサイズ変更時にsidemenuSizeを呼び出す
		$(window).resize(articleheadSize);	//ウインドウの大きさの変更に合わせてarticleheadSizeを呼び出す	
		//$(window).resize(logoSize);			//ウィンドウのサイズ変更時にlogoSizeを呼び出す
		$(window).resize(serviceSize);		//serviceページのcontainerの幅の変化具合を変える
	    $(window).resize(imgSize);			//画面サイズを変更したときにimgSizeを呼び出す
	  //画面サイズを変更したときにフッター背景の高さをフッターに合わせて調整する
	    $(window).resize(footerBackgroundResize);			

	