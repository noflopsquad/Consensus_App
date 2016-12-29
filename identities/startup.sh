#!/bin/bash
gem install sinatra
gem install rerun
rerun --background -- rackup --port=8080 -o 0.0.0.0 config.ru
