import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'test.db')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or "jwt_secret_string"
    MAIL_SERVER = 'smtp.mailtrap.io'
    MAIL_USERNAME = 'mail'
    MAIL_PASSWORD = 'pass'
