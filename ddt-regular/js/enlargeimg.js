//登録された画像をクリックするとページあわせサイズから原寸大に拡大できるJavaScript
$(function(e){
	$(document).on('click', '#enlargeableimg', function(){	//画像の親要素のidをenlargeableimgに指定し、クリックすると
		if($(this).attr('class') != 'enlarged') {				//クラスenlargedがついているかどうかの判断を行い。ついていなければ
			$(this).attr('class', 'enlarged');					//クラスenlargedを画像の親要素に追加し、画像を原寸大に拡大
		} else {												//enlargedクラスがあれば
			$(this).removeClass();								//クラスをを削除し画像を元の大きさに戻す
		}
		console.log(this);
	});
});