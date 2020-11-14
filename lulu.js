var exec = require('child_process').exec;


 exec(`rm -rf ./clientdata ; rm -rf ./i18n ; rm -rf ./rawjson; rm -rf ./oldi18n`, function(error, stdout, stderr){
    if(error) {
        console.error('error: ' + error,'cp950');
        console.error('error: '+error)
        return;
    }
   if(stdout){
        console.log('success :'+stdout)
   }
 });




 exec(`mkdir ./clientdata; mkdir ./i18n; mkdir ./rawjson`, function(error, stdout, stderr){
    if(error) {
        console.error('error: ' + error,'cp950');
        console.error('error: '+error)
        return;
    }
   if(stdout){
        console.log('success :'+stdout)
   }
 });

 exec(`node ./convert_xml_to_json.js && node rawtopretty.js`, function(error, stdout, stderr){ //BYOC to rawdata
    if(error) {
        console.error('error: ' + error,'cp950');
        console.error('error: '+error)
        return
    }
   if(stdout){
        console.log('success :'+stdout)
   }


   exec(`cp -r ./i18n  oldi18n/ && rm -rf ./i18n/*  && node ./replace.js`, function(error, stdout, stderr){
    if(error) {
        console.error('error: ' + error,'cp950');
        console.error('error: '+error)
        return;
    }
   if(stdout){
        console.log(`in replace command!!`)
        console.log('success :'+stdout)
   }

 });
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


