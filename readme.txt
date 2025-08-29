⚫︎exe化について windows上
pipenv shell
pyinstaller autocount.spec

ビルド化コマンド
pyinstaller --noconfirm  --onedir --add-data "autocount/*;autocount" server.py --name autocount