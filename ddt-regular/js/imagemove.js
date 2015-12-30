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
	var offset = $(this).offset();		//クリックしたボタンからoffsetのオブジェクトを取得
	var y = offset.top;					//オブジェクトからボタンのY座標を取得
	var x = offset.left;				//同様にX座標を取得
	//コンテンツの高さを取得しcontentheightに格納
	var contentheight = $('#main > #maincontents').height() / 2;
	//幅も取得しcontentwidthに格納
	var contentwidth = $('#main > #maincontents').width() / 2;
	var contentid = $(this).attr('id');	//ボタンからIDを取得してcontentidに格納
	var contentname = SITE_ROOT_DIRECTORY;		//表示する項目のパスを格納する変数を用意。サーバルートパスを入れておく
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
var ssnhover = function(e){	
		$(this).attr('src',$(this).attr('src').replace(mouseleft,mouseenterd));
}
var ssnleave = function(e){
		$(this).attr('src',$(this).attr('src').replace(mouseenterd,mouseleft));
};
var showSSN = function(){
	if ($('.ssnintroduction')[0]){
			$('.ssnintroduction').remove();
	} else {
		$('#container > #main')
		.prepend($('<div></div>')
			.addClass('ssnintroduction')
			.append($('<img>')
				.attr('src', 'ddt-regular/img/ssn-d2124(ad).gif')
			));
//		var contentheight = $('#main').height() / 2;
		var contentheight = 200;
//		if(contentheight == 0){
//			contentheight = $('#main > #maincontents').height() / 2;
//		}
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
		$(document).on('click', '.ssnintroduction', function(){
			$('.ssnintroduction').remove();
		});
	}
};

var movetoStore = function(e){
	var imgid = $(this).attr('id');
	if(imgid == 'ssnandroid'){
		window.location.href = 'ddt-regular/app/android/SSN_D2124.apk';
	} else if(imgid == 'ssniphone'){
//		window.location.href = '';
		alert('大変申し訳ありませんが、現在App Storeへの登録申請中のためダウンロードできません。もうしばらくお待ちください。');		
	}
};

$(document).on('click', '#testimg', imgClick);
$(document).on('click', '.servicebutton', closeupService);
$(document).on('mouseleave', '#textcircle', hideService);
$(document).on('click', '#textcircle', hideService);
$(document).on('click', '.servicesidebutton', closeupService);
$(document).on('mouseenter', '.ssnimg', ssnhover);
$(document).on('mouseleave', '.ssnimg', ssnleave);
$(document).on('click', '#ssnmain', showSSN);
$(document).on('click', '.ssnimg', movetoStore);
});
