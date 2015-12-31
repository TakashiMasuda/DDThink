/** ファイル名:decorator.js
 * 概要　　　:画面のレイアウトを変更するクラスのファイル
 * 作成日　:2016.0110
 * 作成者　:T.Masuda
 * 場所　　:js/decorator.js
 */

/** クラス名:decorator
 * 概要　　:画面のレイアウトを変更するクラス
 * 引数　　:なし
 * 作成日　:2016.0110
 * 作成者　:T.Masuda
 */
function decorator() {
	
	/* 
	 * 関数名:hilightSelectedElement
	 * 概要  :指定した要素群の中で指定した属性の末尾の値(/で区切られた最後の文字列)と合致する要素をハイライトする
	 * 引数  :String target : 書き換え対象のセレクタ
	 * 　　  :String attrName : 比較対象となる属性
	 * 　　  :String value : 比較対象となる値
	 * 　　  :String closestSelector : 代わりにクラスを追加する祖先要素
	 * 返却値:なし
	 * 作成日　:2016.0110
	 * 作成者　:T.Masuda
	 */
	this.hilightSelectedElement = function(target, attrName, value, closestSelector) {
		//処理対象となる要素を取得する
		var $targetElems = $(target).filter(SQUARE_BRACKET_FRONT + attrName + SQUARE_BRACKET_REAR);
		
		//セレクタの対象となる要素を走査する
		$targetElems.each(function() {
			//比較対象の該当するattributeから値を取得する
			var attrValue = $(this).attr(attrName);
			//取得した値を区切り、最後の部分を取得する
			var lastValue = commonFuncs.getLastValue(attrValue, SLASH);
			
			//比較対象となる値が合致すれば
			if(lastValue == value) {
				//祖先要素に選択済みのクラスを追加する場合
				if (closestSelector) {
					//選択済みを指すクラスを走査中の要素に追加する
					$(this).closest(closestSelector).addClass(CLASS_SELECTED);
				//クラスの追加対象が要素自身で良いなら
				} else {
					//選択済みを指すクラスを走査中の要素に追加する
					$(this).addClass(CLASS_SELECTED);
				}
				
				return false;	//対象が見つかったら終了する
			}
		});
	}
}
