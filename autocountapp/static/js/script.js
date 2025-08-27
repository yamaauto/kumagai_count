// ローディング画面用
const loading = document.getElementById('loading');
const buttons = document.querySelectorAll('button');


const ss = document.getElementById('ss');
ss.addEventListener('click', () => {
  window.open('https://docs.google.com/spreadsheets/d/1PNlx_ka3FXjSoifi1iO6SkHq5N45gkZUCg-xqcaardg/edit?gid=243726751#gid=243726751', '_blank'); // 新しいタブを開き、ページを表示
  location.reload();
});
// 各ボタンにクリックイベントを設定
buttons.forEach(button => {
  button.addEventListener('click', () => {
    loading.style.display = 'flex';
  });
});

const container = document.getElementById("data-container");
const statusList = JSON.parse(container.dataset.status);

// データを取得して表示を更新する関数
async function fetchLatestData() {
    try {
        // FlaskのAPIエンドポイント '/getcomment' にリクエストを送信
        let url = new URL(window.location.href);
        let params = url.searchParams;
        console.log('/getcomment?='+params.get('press'))
        const response = await fetch('/getcomment?press='+params.get('press'));
        
        // レスポンスが正常でなければエラーを投げる
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // レスポンスをJSONとして解析
        const data = await response.json();
        
        // id="comment-container"の要素の中身を取得したテキストで書き換える
        document.getElementById('comment-container').textContent = data.text;

    } catch (error) {
        // エラーが発生した場合、コンソールにエラー内容を出力
        console.error('データの取得に失敗しました:', error);
        document.getElementById('comment-container').textContent = 'データの取得に失敗しました。';
    }
}

// ページが読み込まれたら、まず一度データを取得
document.addEventListener('DOMContentLoaded', fetchLatestData);

// 30秒ごと（3000ミリ秒）にfetchLatestData関数を繰り返し実行
setInterval(fetchLatestData, 30000);


// 稼働状況管理表の稼働状況の色分け
document.addEventListener("DOMContentLoaded", function () {
  statusList.forEach(([machine_name, status]) => {
    console.log(status)
    if (status === "稼働中") {
      const el = document.getElementsByClassName(machine_name)[0];
      if (el) {
        el.classList.add("red");
      }
    }
    else if (status === "停止中" || status === "一時停止中"){
      const el = document.getElementsByClassName(machine_name)[0];
      if (el) {
        console.log(el)
        el.classList.add("blue");
      }
    }
    else if (status === "検査中"){
      const el = document.getElementsByClassName(machine_name)[0];
      if (el) {
        console.log(el)
        el.classList.add("green");
      }
    }
    else if (status === "調整中"){
      const el = document.getElementsByClassName(machine_name)[0];
      if (el) {
        console.log(el)
        el.classList.add("orange");
      }
    }
  });
});

// 表の選択された行の背景色を変更、ラジオボタンを選択状態にする
function selectRow(row, groupName) {
      // 同じ groupName の全ての行から selected クラスを除去
      const rows = document.querySelectorAll(`table[data-group="${groupName}"] tbody tr`);
      rows.forEach(tr => tr.classList.remove("selected"));

      // この行のラジオボタンをチェックして selected を付与
      const radio = row.querySelector(`input[type="radio"][name="${groupName}"]`);
      if (radio) {
        radio.checked = true;
        if (groupName=="machine"){
          const radios = document.querySelectorAll('input[type="radio"][name="machine"]');
          const setupBtn = document.getElementById('setup');
          const fixBtn = document.getElementById('fix');
          const checkBtn = document.getElementById('check');
          const startBtn = document.getElementById('start');
          const endBtn = document.getElementById('end');
          const nxtdayBtn = document.getElementById('nxtday');
          const enddayBtn = document.getElementById('endday');

          const selectedId = radio.id;
          const stat = statusList.find(item => item[0] === selectedId);
          const itemradio = document.querySelectorAll('input[type="radio"][name="item"]');
          const rows = document.querySelectorAll("#item-table-body tr");
          const searchbox = document.querySelectorAll("div.search-box")


          if (stat && stat[1] === "稼働中") {
            setupBtn.disabled = true;
            fixBtn.disabled = false;
            checkBtn.disabled = true;
            startBtn.disabled = true;
            endBtn.disabled = false;
            nxtdayBtn.disabled = false;
            // enddayBtn.disabled = true;
            itemradio.forEach(radio => {
                radio.disabled = true;
            });
            rows.forEach((row) => {
              row.style.display = "none";
            })
            searchbox.forEach((row) => {
              row.style.display = "none";
            })
          } else if (stat && stat[1] === "停止中") {
            setupBtn.disabled = false;
            fixBtn.disabled = true;
            checkBtn.disabled = false;
            startBtn.disabled = true;
            endBtn.disabled = true;
            nxtdayBtn.disabled = true;
            // enddayBtn.disabled = false;
            itemradio.forEach(radio => {
              radio.disabled = false;
            });    
            rows.forEach((row) => {
              row.style.display = "";
            })
            searchbox.forEach((row) => {
              row.style.display = "";
            })
          } else if (stat && stat[1] === "段取り中") {
            setupBtn.disabled = false;
            fixBtn.disabled = true;
            checkBtn.disabled = true;
            startBtn.disabled = true;
            endBtn.disabled = true;
            nxtdayBtn.disabled = true;
            // enddayBtn.disabled = true;
            itemradio.forEach(radio => {
              radio.disabled = true;
            });    
            rows.forEach((row) => {
              row.style.display = "none";
            })
            searchbox.forEach((row) => {
              row.style.display = "none";
            })
          } else if (stat && stat[1] === "検査中") {
            setupBtn.disabled = true;
            fixBtn.disabled = true;
            checkBtn.disabled = false;
            startBtn.disabled = true;
            endBtn.disabled = true;
            nxtdayBtn.disabled = true;
            // enddayBtn.disabled = true;
            itemradio.forEach(radio => {
              radio.disabled = true;
            });    
            rows.forEach((row) => {
              row.style.display = "none";
            })
            searchbox.forEach((row) => {
              row.style.display = "none";
            })
          } else if (stat && stat[1] === "段取り済") {
            setupBtn.disabled = true;
            fixBtn.disabled = true;
            checkBtn.disabled = false;
            startBtn.disabled = true;
            endBtn.disabled = true;
            nxtdayBtn.disabled = true;
            // enddayBtn.disabled = true;
            itemradio.forEach(radio => {
              radio.disabled = true;
            });    
            rows.forEach((row) => {
              row.style.display = "none";
            })
            searchbox.forEach((row) => {
              row.style.display = "none";
            })
          } else if (stat && stat[1] === "調整中") {
            setupBtn.disabled = true;
            fixBtn.disabled = false;
            checkBtn.disabled = true;
            startBtn.disabled = true;
            endBtn.disabled = true;
            nxtdayBtn.disabled = true;
            // enddayBtn.disabled = true;
            itemradio.forEach(radio => {
              radio.disabled = true;
            });    
            rows.forEach((row) => {
              row.style.display = "none";
            })
            searchbox.forEach((row) => {
              row.style.display = "none";
            })
          } else if (stat && stat[1] === "一時停止中") {
            setupBtn.disabled = true;
            fixBtn.disabled = true;
            checkBtn.disabled = true;
            startBtn.disabled = false;
            endBtn.disabled = true;
            nxtdayBtn.disabled = true;
            // enddayBtn.disabled = false;
            itemradio.forEach(radio => {
              radio.disabled = true;
            });
            rows.forEach((row) => {
              row.style.display = "none";
            })
            searchbox.forEach((row) => {
              row.style.display = "none";
            })
          } else{
            setupBtn.disabled = true;
            fixBtn.disabled = true;
            checkBtn.disabled = true;
            startBtn.disabled = true;
            endBtn.disabled = true;
            nxtdayBtn.disabled = true;
            // enddayBtn.disabled = true;
            itemradio.forEach(radio => {
              radio.disabled = false;
            });
            rows.forEach((row) => {
              row.style.display = "none";
            })
            searchbox.forEach((row) => {
              row.style.display = "none";
            })
          }
        }


        row.classList.add("selected");
      }
    }


// アイテムテーブルから検索して表示する
document.getElementById("search").addEventListener("input", function endoperation() {
    const keyword = this.value.toLowerCase();
    const rows = document.querySelectorAll("#item-table-body tr");

    rows.forEach((row) => {
      const customerText = row.querySelector(".customer-name").textContent.toLowerCase();
      const rotText = row.querySelector(".rot-no").textContent.toLowerCase();
      const skuText = row.querySelector(".sku-no").textContent.toLowerCase();
      const itemText = row.querySelector(".item-name").textContent.toLowerCase();
      if (itemText.includes(keyword)) {
        row.style.display = "";
      }else if (customerText.includes(keyword)) {
        row.style.display = "";
      }else if (rotText.includes(keyword)) {
        row.style.display = "";
      }else if (skuText.includes(keyword)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });

  document.getElementById('end').addEventListener("click", function () {
    var result = window.confirm('生産を終了しても宜しいですか？');
    console.log(result);
    if (!result) { // resultがfalse（キャンセルボタンが押された）の場合
        event.preventDefault(); // ボタンのデフォルト動作（フォーム送信）を中止
    } else {
        // resultがtrueの場合は、何もせずフォームの送信を続行
    }
  })
  document.getElementById('nxtday').addEventListener("click", function () {
    var result = window.confirm('本日の生産を終了しても宜しいですか？翌日生産開始ボタンを押すことで再開されます');
    console.log(result);
    if (!result) { // resultがfalse（キャンセルボタンが押された）の場合
      event.preventDefault(); // ボタンのデフォルト動作（フォーム送信）を中止
    } else {

    }
  })
