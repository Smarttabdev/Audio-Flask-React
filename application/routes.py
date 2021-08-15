from application import app
from application.controllers.auth import register, login, loginWithGoogle


@app.route("/")
def index():
    return "Welcome to server!"


@app.route("/api/auth/login", methods=['POST'])
def _login():
    return login()


@app.route('/api/auth/register', methods=['POST'])
def _register():
    return register()


@app.route('/api/auth/loginWithGoogle', methods=['POST'])
def _loginWithGoogle():
    return loginWithGoogle()