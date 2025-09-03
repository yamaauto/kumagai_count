⚫︎バージョン情報
・python 3.13.3
・pipenv, version 2025.0.2

⚫︎pipenv環境設定
・pip install pipenv でpipenvをインストール
・親フォルダ(kumagai_count)で　pipenv --python 3.13.3　を実行
・VScodeを使用している場合は、インタープリターを変更する必要があるので、ctrl+Shift+pをおして「Python:インタープリターを選択」、kumagaiから始まるインタープリターを選択
・pipenv update　を実行すると、Pipfileに記載された関連パッケージがインストールされる。


⚫︎exe化について windows上
・pipenv shellで仮想環境に入る
・pyinstaller autocount.specでexeファイルを作成(既にdistファイルが存在する場合上書きしてよいか聞かれるのでyと入力)
・distファイル内に.autocount.exe, _internalの2つが生成される
・熊谷精機様の本番環境を変更する場合、autocount.exe, _internalの2つを更新する
・本番環境のautocount.exeと同じ階層に存在するautocountappフォルダには、メッセージや稼働状況を管理するCSVファイルがまとめて入っているので削除・更新しないこと
・exe化時点でそれらのCSVファイルは自動でまとめられないので手動で移動させてください
        ('autocountapp/machines/*.csv', 'autocountapp/machines'),      # CSVファイル
        ('autocountapp/items.csv', 'autocountapp'),                    # ルートのCSV
        ('autocountapp/messages_history.csv', 'autocountapp'),         # メッセージのCSV
        ('autocountapp/id_regist.csv', 'autocountapp'),
    autocountapp内に必要なファイル・フォルダ
    >machines <フォルダ>
    >id_regist <CSV>
    >items <CSV>
    >messages_history <CSV>

⚫︎商品のアップロード方法
・熊谷精機様から提供していただいた商品のエクセルファイルを、品質管理画面からアップロードすることで、アプリ内のitems.csvと、ドライブのスプレッドシートが更新されるようになっています。

⚫︎プレス機の更新方法
・プレス機を更新する場合は、次の4点を変更してください。
1 machinesフォルダ内のCSVファイルを追加もしくは既存ファイルの名前を変更
2 view.py内のグローバル関数machine_orderへの追記・変更
3 スプレッドシート内の「プレス機一覧シート」への追記・変更
4 GASの「const machines」への追記・変更


⚫︎熊谷精機様には　distフォルダー内を共有する




specファイル作コマンド
pyinstaller --noconfirm  --onedir --add-data "autocount/*;autocount" server.py --name autocount