from autocountapp import app
import webbrowser

if __name__ == '__main__':
    webbrowser.open_new_tab("http://192.168.0.180:5000")
    app.run(host='0.0.0.0', port=5000)
