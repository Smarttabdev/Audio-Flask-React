# `Music Web Service` - React & Flask

## How to run the project locally

---

## `React Frontend`

Install the dependencies...

```bash
cd client
npm install
```

Setting environment...

```bash
cp .env.example .env
```
<!-- Setting [Google OAuth API](https://console.cloud.google.com/apis/credentials?pli=1) Key... ([help here](https://www.mattbutton.com/2019/01/05/google-authentication-with-python-and-flask/)) -->

Start client...

```bash
npm start
```
---

## `Flask Backend`

Download and install [Python](http://www.python.org/downloads)...

Configuring Flask...

```bash
cd server
py -m venv venv 
```
Install the dependencies...

```bash
venv\Scripts\activate
pip install -r requirements.txt
```

Create `Sqlite` database...

```bash
flask db_create
```

Start server...

```bash
flask run
```