#!/usr/bin/env bash

WORKING_DIRECTORY="~/www/ibexpertdeploy"

USERNAME="ibexpert"
SSH_HOST="ssh-ibexpert.alwaysdata.net"

scp -r ./data ./package.json ./package-lock.json ./tsconfig.json ./src "$USERNAME@$SSH_HOST:$WORKING_DIRECTORY"
ssh "$USERNAME@$SSH_HOST" "cd $WORKING_DIRECTORY && npm install --only=production"