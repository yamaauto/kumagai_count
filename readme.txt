⚫︎exe化について windows上
pipenv shell
pyinstaller autocount.spec

⚫︎熊谷精機様には　distフォルダー内を共有する

⚫︎0829更新　飯田
autocountappを_internalの外側に出すように変更
ビルド時にはautocountappが_internal内に入ってしまうのでビルド後に手動でexe,_internalと同じ階層に移動
autocountapp内に必要なファイル・フォルダ
>machines
>id_regist
>items
>messages_history

specファイル作コマンド
pyinstaller --noconfirm  --onedir --add-data "autocount/*;autocount" server.py --name autocount