#!/usr/bin/env python3

from flask import Flask, request, redirect, url_for, render_template
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from json import dumps

db_connect = create_engine('sqlite:///database.db')
app = Flask(__name__)
api = Api(app)

class Employees(Resource):
    def get(self, name):
        return redirect(url_for('index'))
    def post(self, name):
        return "Hello " + name

api.add_resource(Employees, '/hello/<name>')

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
     app.run(port='3000')
