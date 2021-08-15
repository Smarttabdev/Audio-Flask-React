from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from config import Config
from flask_cors import CORS
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

db = SQLAlchemy(app)
ma = Marshmallow(app)
jwt = JWTManager(app)

from application import routes
