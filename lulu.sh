#!/bin/bash


PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

rm -rf ./clientdata 
rm -rf ./rawjson
rm -rf ./oldi18n

mkdir ./clientdata; 
mkdir ./rawjson

node ./convert_xml_to_json.js  
node rawtopretty.js

cp -r ./i18n  oldi18n/ && rm -rf ./i18n/*  && node ./replace.js
node ./tabtospace.js && node ./tabtospace.js

exit 0