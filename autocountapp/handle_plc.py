from pymodbus.client.tcp import ModbusTcpClient

def get_count(machine_name): #1行追加 本当は引数にプレス機の番号を渡す
    try:
        # client = ModbusTcpClient("192.168.1.5", port=502)
        #1:A-500, 2:P-300, 3:S-250, 4:R-150, 5:K-150, 6:J-300, 7:E-150, 8:M-45
        machine_names = {'A-500':1, 'P-300':2, 'S-250':3, 'R-150':4, 'K-150':5, 'J-300':6, 'E-150':7, 'M-45':8}
        client = ModbusTcpClient("192.168.0.188", port=502)

        client.connect()

        # アドレス100（D100）を1ワード読む。unit_id=1 は .unit_id に設定
        client.unit_id = 1
        response = client.read_holding_registers(machine_names[machine_name])
        

        if not response.isError():
            print("DT1 =", response.registers[0])
            count = int(response.registers[0])
        else:
            print("読み取りエラー:", response)
            count = -1

        client.close()

        return count
    except Exception as e:
        return -10
