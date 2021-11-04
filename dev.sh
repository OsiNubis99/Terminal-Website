#!/usr/bin/env bash

watchmedo auto-restart --directory=./ -p "*.py;*.html;*.js" --recursive -- python ./app/server.py
