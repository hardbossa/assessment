
(function () {
    'use strict'; 

    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    assessmentButton.onclick = () => {  //クリックしたあとの処理を開始
        const userName = userNameInput.value;
        if (userName.length == 0) { //userNameが空の時は処理を終了させてしまう処理
            return;
        }   //userNameInputオブジェクトのvalueプロパティから入力された文字列を受け取る

    // 診断結果表示エリアの作成
    removeAllChildren(resultDivided);   // 結果表示欄を初期化


    const header = document.createElement('h3');    //headerは<h3>要素
    header.innerText = '結果だよ';                   //headerの表示テキストを定義
    resultDivided.appendChild(header);  //htmlの<div id=result-area>にheaderを挿入

    const paragraph = document.createElement('p');    //paragraphは<p>要素
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //診断結果ツィート
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
                    + encodeURIComponent('あなたのいいところ診断')
                    + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.setAttribute('data-lang', 'ja');
    anchor.setAttribute('data-show-count', 'false');
    anchor.innerText = '#あなたのいいところ をツイートする';
    tweetDivided.appendChild(anchor);
    twttr.widgets.load();
};  //クリックしたあとの処理ここまで

userNameInput.onkeydown = (event) => {     //Enterでボタンクリックの処理
    if (event.keyCode === 13) {            //キーコード13は Enter
        assessmentButton.onclick();
    }
};

    const answers = [
        '{userName}のいいところは声です。{userName}の特徴的な声はみなを惹きつけ、心に残ります。',
        '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
        '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
        '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
        '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
        '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
        '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
        '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
        '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
        '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
        '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
        '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
        '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
        '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
        '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
        '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
        '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振舞に多くの人が癒やされています。'
        '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
    ];

    /** 【関数定義】assessment
    * 名前の文字列を渡すと診断結果を返す関数
    * @param {string} userName ユーザーの名前
    * @return {string} 診断結果
    */
    function assessment(userName) {
        // 全文字のコード番号を取得してそれを足し合わせる
        let sumOfcharCode = 0;  //letは変数への再代入が行える今はとりあえずゼロを入れておく
        for (let i = 0; i < userName.length; i++) {     //for (初期値; 条件式; 増減式)
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }   //初期値は0なのでuserNameの1文字目のcharCodeを取得してsumOfcharCode（さもきこ）に足しi++でiに+1する
            //仮にuserName.lengthが4（5文字）だとするとここではまだi(1)<4なのでforの処理はiが4になるまで繰り返される。
            //その間にさもきこへは1文字目、2文字目…5文字目までのキャラコードが全て足しあげられる。

        // 文字のコード番号の合計を回答の数で割って添字の数値を求める
        const index = sumOfcharCode % answers.length;   //さもきこ÷回答のパターン数（16）の余り数をindexに代入
        let result = answers[index];                    //answersのパターンから計算の余り数の行をresultに代入

        result = result.replace(/{userName}/g, userName);   //正規表現を使って入力した名前と置き換え
        return result;  //上で置き換えた値をresultに返して（return）おかないと表示されない。
    }

    /**【関数定義】removeAllChildren
    * 指定した要素の子を全て削除する
    * @param {HTMLElement} element HTMLの要素
    */
    function removeAllChildren(element) {
        while (element.firstChild) {  //エリアを初期化 while()の中身が真である限りループ
            element.removeChild(element.firstChild);  //取得した文字を消去
        }   //.firstChildで最初の文字を取得、何もなくなるまで.removeChildをぶん回す
    }

    // テストコード
    console.assert(
        assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
        '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
    );
    console.assert(
        assessment('太郎') === assessment('太郎'),
        '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
    );
})();
