from application import db
from flask import jsonify, request
from flask_jwt_extended import create_access_token
from application.models.user import User, user_schema


def register():
    data = request.get_json(force=True)
    print(data)
    email = data['email']
    test = User.query.filter_by(email=email).first()
    if test:
        return jsonify(message='That email already exists.'), 409
    else:
        first_name = data['first_name']
        last_name = data['last_name']
        password = data['password']
        user = User(first_name=first_name, last_name=last_name, email=email, password=password)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        return jsonify(message="User created successfully."), 201


def login():
    data = request.get_json(force=True)
    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()
    if user and user.get_password(password):
        access_token = create_access_token(identity=email)
        userInfo = user_schema.dump(user)
        return jsonify(message="Login succeeded!", access_token=access_token, userInfo=userInfo)
    else:
        return jsonify(message="Bad email or password"), 401


def loginWithGoogle():
    data = request.get_json(force=True)

    email = data['email']
    access_token = create_access_token(identity=email)
    return jsonify(message="Login with Google succeeded!", access_token=access_token, userInfo=data)