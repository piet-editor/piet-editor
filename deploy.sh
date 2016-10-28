#!/bin/sh -xe

cd dist

git config --global user.email "nonaroid@nna774.net"
git config --global user.name "nonaroid on Travis-CI"

git init
git add .
git commit -m "Deploy to GitHub Pages@`date`"
git push --force --quiet "https://${GH_TOKEN}@github.com/piet-editor/piet-editor.github.io.git" master:master > /dev/null 2>&1
