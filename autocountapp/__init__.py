from flask import Flask
import os

app = Flask(__name__)
# app.config.from_object('autocountapp.config')

app.secret_key = os.environ.get("SECRET_KEY", "dev-key")

import autocountapp.views
