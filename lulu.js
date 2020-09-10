var fs = require('fs')
var exec = require('child_process').exec;


exec(`node ./convert_xml_to_json.js`, function(error, stdout, stderr){
    if(error) {
        console.error('error: ' + error,'cp950');
        console.error('error: '+error)
        return;
    }
   if(stdout){
        console.log('success :'+stdout)
   }
    

 });

 exec(`node ./rawtopretty.js`, function(error, stdout, stderr){
    if(error) {
        console.error('error: ' + error,'cp950');
        console.error('error: '+error)
        return;
    }
   if(stdout){
        console.log('success :'+stdout)
   }

 });

 exec(`node ./replace.js`, function(error, stdout, stderr){
    if(error) {
        console.error('error: ' + error,'cp950');
        console.error('error: '+error)
        return;
    }
   if(stdout){
        console.log('success :'+stdout)
   }

 });


 exec(`node ./tabtospace.js`, function(error, stdout, stderr){
    if(error) {
        console.error('error: ' + error,'cp950');
        console.error('error: '+error)
        return;
    }
   if(stdout){
        console.log('success :'+stdout)
   }

 });


 exec(`node ./tabtospace.js`, function(error, stdout, stderr){
    if(error) {
        console.error('error: ' + error,'cp950');
        console.error('error: '+error)
        return;
    }
   if(stdout){
        console.log('success :'+stdout)
   }

 });
