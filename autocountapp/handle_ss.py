import gspread
from oauth2client.service_account import ServiceAccountCredentials
import sys, os

# 認証スコープ
scope = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
]

# spreadsheet_key = '1Q7MMcfARDBEBwAmpH-F6wGZUCGJq9F_YMveiCijrFnQ' #テスト用
# item_spreadsheet_key = '1Hr1HBB6c_mugMQbs0pbDGk6JMVaQonB-GYQEiQGCRm8' #テスト用
spreadsheet_key = '1PNlx_ka3FXjSoifi1iO6SkHq5N45gkZUCg-xqcaardg'
item_spreadsheet_key = '1z79vsacTi9QMzC0f4GzXruJFVMOEK80AfXmp6dt4ixw'
json_name = "kumagaiseiki-823b66fbc076.json"

# サービスアカウント用の認証情報ファイル（JSON形式）のパス
if hasattr(sys, '_MEIPASS'):
    base_path = sys._MEIPASS
else:
    base_path = os.path.abspath(".")

credentials_file = r''+os.path.join(base_path, json_name)#r文なので、jsonファイルのディレクトリをそのまま〇〇部分に代入r'〇〇.json'orr"〇〇.json"になるように記載すること

def add_new_row(data, sheet): #1行追加
    credentials = ServiceAccountCredentials.from_json_keyfile_name(credentials_file, scope)
    gc = gspread.authorize(credentials)

    try:
        global spreadsheet_key
        worksheet = gc.open_by_key(spreadsheet_key).worksheet(sheet)
        worksheet.append_row(data)
        print("新しいデータが追加されました。",data)

    except Exception as e:
        print("スプレッドシートへのアップロードでエラーが発生しました:", e)


def update_row(data, sheet, row): #1行追加
    credentials = ServiceAccountCredentials.from_json_keyfile_name(credentials_file, scope)
    gc = gspread.authorize(credentials)

    try:
        global spreadsheet_key
        worksheet = gc.open_by_key(spreadsheet_key).worksheet(sheet)
        worksheet.update(f'A{row}', [data])
        print("更新しました")

    except Exception as e:
        print("スプレッドシートへのアップロードでエラーが発生しました:", e)



def get_all_row(sheet): #全件取得
    credentials = ServiceAccountCredentials.from_json_keyfile_name(credentials_file, scope)
    gc = gspread.authorize(credentials)

    try:
        global spreadsheet_key
        worksheet = gc.open_by_key(spreadsheet_key).worksheet(sheet)
        data = worksheet.get_all_values()

        return data
    
    except Exception as e:
        print("スプレッドシートへのアップロードでエラーが発生しました:", e)

def get_a_col(sheet, col_num): #全件取得
    credentials = ServiceAccountCredentials.from_json_keyfile_name(credentials_file, scope)
    gc = gspread.authorize(credentials)

    try:
        global spreadsheet_key
        worksheet = gc.open_by_key(spreadsheet_key).worksheet(sheet)
        data = worksheet.col_values(col_num)

        return data
    
    except Exception as e:
        print("スプレッドシートへのアップロードでエラーが発生しました:", e)


def update_count_ed(sheet, row, count, time_ed, flg_nxtday): #終了時カウントと終了時刻のみをアップデートする
    credentials = ServiceAccountCredentials.from_json_keyfile_name(credentials_file, scope)
    gc = gspread.authorize(credentials)

    try:
        global spreadsheet_key
        worksheet = gc.open_by_key(spreadsheet_key).worksheet(sheet)
        worksheet.update_acell(f'F{row}', time_ed)
        worksheet.update_acell(f'I{row}', count)
        worksheet.update_acell(f'L{row}', flg_nxtday)

    
    except Exception as e:
        print("スプレッドシートへのアップロードでエラーが発生しました:", e)


def update_item_ss(items_data):
    credentials = ServiceAccountCredentials.from_json_keyfile_name(credentials_file, scope)
    gc = gspread.authorize(credentials)
    try:
        global item_spreadsheet_key
        sheet = 'items'
        worksheet = gc.open_by_key(item_spreadsheet_key).worksheet(sheet)
        worksheet.clear()
        worksheet.append_rows(items_data)

    except Exception as e:
        print("スプレッドシートへのアップロードでエラーが発生しました:", e)


# if __name__ == "__main__":
#     main()