const fs = require('fs')
const path = require('path')
//http://www.localeplanet.com/icu/zh-Hans-HK/index.html
const i18n_map ={
    "Arabic":"ar_AE",
    "Cantonese":"zh_HK", //not match
    "Chinese Mandarin":"zh_CN", //not match
    "Czech":"cs_CZ",
    "Danish":"da_DK",
    "Dutch":"nl_BE",
    "English (UK)":"en_GB",//not match
    "English (US)":"en_US",
    "French":"fr_FR",
    "French Canadian":"fr_CA",
    "German":"de_DE",
    "Greek":"el_GR",
    "Hungarian":"hu_HU",
    "Italian":"it_IT",
    "Japanese":"ja_JP",
    "Korean":"ko_KR",
    "Norwegian":"nn_NO",
    "Polish":"pl_PL",
    "Portuguese":"pt_PT",
    "Portuguese (Brazilian)":"pt_BR",
    "Romanian":"ro_RO",
    "Russian":"ru_RU",
    "Spanish":"es_ES",
    "Spanish (US)":"es_US",//not match es_mx not found
    "Swedish":"sv_SE",
    "Taiwanese":"zh_TW",
    "Turkish":"tr_TR"
}
/*
let tmp =JSON.parse( fs.readFileSync('./rawjson/English_28US29.json','utf-8') )

console.log(tmp.elements[0].elements)
tmp = tmp.elements[0].elements
result = {}
tmp.forEach(element => {
    result[element.attributes['ID'] ] =element.attributes.Text
});

fs.writeFileSync('en_US.json',JSON.stringify(result,null,'\t'))*/
const origindatapath = './rawjson'
const newfolder = './clientdata'
fs.readdir(origindatapath,(err,files)=>{
    files.forEach(file=>{
        //console.log(i18n_map[path.basename(file,'.json')] )
        //console.log(file)
        const newfilename = i18n_map[path.basename(file,'.json').replace('_BYOC','')] 
        console.log(file)
        console.log(newfilename)
        let tmp =JSON.parse( fs.readFileSync(path.join(origindatapath,file),'utf-8') )

        //console.log(tmp.elements[0].elements)
        tmp = tmp.elements[0].elements
        let result = {}
        tmp.forEach(element => {
        result[element.attributes['ID'] ] =element.attributes.Text
        });

        fs.writeFileSync(path.join(newfolder,newfilename)+'.json',JSON.stringify(result,null,'\t'))
        
    })
})







/*
const BYOC = './BYOC'
const newfolder = './rawjson'
fs.readdir(BYOC, (err, files) => {
   files.forEach(file => {
     console.log(path.basename(file,'.xml'));//去掉副檔名
      const newjsonfilename = path.basename(file,'.xml')+'.json'
      let tmp = fs.readFileSync( path.join(BYOC,file) ,'utf-8')
      //console.log(tmp)

      fs.writeFileSync(path.join(newfolder,newjsonfilename), JSON.stringify( JSON.parse( convert.xml2json(tmp)),null,'\t')  )

   });
 });

*/ 