#!/usr/bin/env bash

ssh -i ~/Documents/keys/blog.pem ubuntu@ec2-3-75-240-39.eu-central-1.compute.amazonaws.com "mkdir ./games";
ssh -i ~/Documents/keys/blog.pem ubuntu@ec2-3-75-240-39.eu-central-1.compute.amazonaws.com "rm -rf ./games/*";
scp -r -i ~/Documents/keys/blog.pem ./dist/games/browser/* ubuntu@ec2-3-75-240-39.eu-central-1.compute.amazonaws.com:/home/ubuntu/games/;
ssh -i ~/Documents/keys/blog.pem ubuntu@ec2-3-75-240-39.eu-central-1.compute.amazonaws.com "sudo rm -rf /var/www/html/games/*";
ssh -i ~/Documents/keys/blog.pem ubuntu@ec2-3-75-240-39.eu-central-1.compute.amazonaws.com "sudo cp -r ./games/* /var/www/html/games/";

