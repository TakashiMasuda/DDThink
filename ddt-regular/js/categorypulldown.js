//トップメニューのボタンにマウスカーソルをあわせることで対応したカテゴリーのページのリストをプルダウンメニューで表示する
$(function() {							//jQueryを開始
	$('#navigation ul li')
	.on('mouseenter', 'a', function(e){	//トップメニューのボタンにマウスポインタを重ねたら
		if($(window).width() < 768 && $('#container').attr('class') != 'service') {	/* PCレイアウトでなければ */
			return;		//プルダウンメニューを表示せずイベントを終える
		}
		
		$(this)			//そのセレクタの
		.next()			//次の要素<ul>を
		.addClass('on')	//onクラスを追加してdisplay属性をblockに設定し表示する
		.end()			//セレクタを初期状態に戻す
		.addClass('on');	//ボタンにonクラスを追加してマウスポインタを乗せたときに色が変わる仕組みを適用する
  	})
	.on('click', function(e){		//ボタンをクリックしたら
		$('ul',this)	//プルダウンメニューから
		.removeClass();	//onクラスを外してdisplay属性をnoneにし隠す
		$('#navigation ul li a').removeClass();		//クリック時に一旦全てのクラスを削除し、selectedクラスを付ける対象をなくす
		$(':first', this).addClass('selected');	//そして、その後に選択したカテゴリートップメニューのボタンにselectedクラスを追加して色を変化させる
	})
	.on('mouseleave', function(e){			//マウスポインタがカテゴリーのボタンから離れたら
		$('ul',this)						//表示中のプルダウンメニューから
		.removeClass('on');	//onクラスを外してdisplay属性をnoneにし隠す
  	});
	//トップメニュー、プルダウンメニューからマウスポインタが外れたら
	$('#navigation').on('mouseleave', 'a', function(e){
		$(this).removeClass('on');			//onクラスを外してmouseenterマウスポインタを重ねたときの色の変化を戻す
	});

	//サイドメニューのボタンへマウスポインタを重ねたときのボタンの色を変化させる処理
	$('nav.sidemenu')	//サイドメニューに対し
	.on('mouseenter', 'li', function(e){	//ボタンの部分にマウスポインタを重ねたら
//		$(this)	.addClass('on');			//そのボタンのアンカータグにonクラスを追加して色を変える
	})
//	.on('#mouseleave', function(e){
//			$(this).removeClass('on');
//	})
	.on('click', function(e) {				//ボタンをクリックしたら
		$('li').removeClass('selected');	//selectedクラスを全てのアンカータグから外し
		$(this).addClass('selected');		//クリックしたボタンにselectedクラスを追加してボタンの色を変える
	});
	
	//Ajax通信を利用してXMLからデータを引き出しプルダウンメニューを生成する
	$.ajax({	//Ajax通信でXMLからデータを取り出して処理する
   		url: "ddt-regular/assets/pulldownmenu.xml",	//pulldownmenu.xmlを読み込む
        type:'get',					//XMLからデータを取得する
        dataType:'xml',  			//XMLデータを扱う
        timeout:1000, 				//1000ミリ秒以内に通信が成立しなければ通信を切る
  		error: function(){			//通信に失敗した場合の処理を設定
       	 console.log('Error loading XML document');	/* XMLの取得に失敗したということをコンソールに出力 */
    	},
	    success: function(xml){	//通信に成功した場合の処理を設定
			//トップメニュー直下のulタグに対するセレクタを指定したjQueryオブジェクトを変数topmenuに格納
			var topmenu = $('#navigation > ul');
			var counter = 1;	//処理対象となるトップメニューのボタンを指定するためのカウンター用変数を宣言、1で初期化
			//読み込んだxmlファイルのcategoryタグでマークアップされた要素をループで順次処理する
			$(xml).find('category').each(function() {	
			//XML内のカテゴリーに対応する要素を含んだcategoryタグの要素が空でなければ
				if( $(this).find('content').text()) {	
					//対象のトップメニューボタン内にulタグを置く。この中にプルダウンメニューのボタンを入れていく
					$('> :nth-child(' + counter + ')', topmenu).append('<ul></ul>');
					//XMLのcategoryタグ内の要素を示すタグelementを順次処理していき、ボタンを配備する
       				$(this).find('element').each(function() {
						//処理対象となる要素を指すjQueryオブジェクトを変数elemに保存
					 	var elem = $(this);
						$(':nth-child(' + counter + ') > ul', topmenu)	//対象となるプルダウンメニューに対し
						.append($('<li></li>')							//ボタンとなるliタグを追加
							.append($('<a></a>')							//更にアンカータグを入れて
							.attr('href', $('url', elem).text())			//urlを設定し
							.append($('content', this).text())				//ボタンのテキストを挿入してボタンが完成する
						));
					})
          		}
				counter++;	//カウンターに1を加え、次のトップメニューボタンに処理を移行させる
        	});
   		}
	});
});