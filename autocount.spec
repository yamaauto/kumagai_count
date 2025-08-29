# -*- mode: python ; coding: utf-8 -*-

block_cipher = None

a = Analysis(
    ['server.py'],
    pathex=[],
    binaries=[],
    datas=[
        ('autocountapp/*', 'autocountapp'),
        ('autocountapp/templates/*.html', 'autocountapp/templates'),  # HTML テンプレート
        ('autocountapp/static/css/*.css', 'autocountapp/static/css'),  # CSS
        ('autocountapp/static/js/*.js', 'autocountapp/static/js'),     # JS
        ('autocountapp/static/img/*.*', 'autocountapp/static/img'),    # 画像
        ('autocountapp/machines/*.csv', 'autocountapp/machines'),      # CSVファイル
        ('autocountapp/items.csv', 'autocountapp'),                    # ルートのCSV
        ('autocountapp/messages_history.csv', 'autocountapp'),                    # ルートのCSV
        ('autocountapp/id_regist.csv', 'autocountapp'),
        ('kumagaiseiki-823b66fbc076.json', '.'),
    ],
    hiddenimports=[],
    hookspath=[],
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
)

pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='autocount',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=True,  # ← GUI アプリの場合は False に
)

coll = COLLECT(
    exe,
    a.binaries,
    a.zipfiles,
    a.datas,
    strip=False,
    upx=True,
    name='autocount'
)
