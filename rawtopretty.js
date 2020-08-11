const fs = require('fs')
const path = require('path')
//http://www.localeplanet.com/icu/zh-Hans-HK/index.html
const i18n_map ={
    "Arabic":"ar_AE",
    "Cantonese":"zh_HK", //not match
    "Chinese_Mandarin":"zh_CN", //not match
    "Czech":"cs_CZ",
    "Danish":"da_DK",
    "Dutch":"nl_BE",
    "English_28UK29":"en_GB",//not match
    "English_28US29":"en_US",
    "French":"fr_FR",
    "French_Canadian":"fr_CA",
    "German":"de_DE",
    "Greek":"el_GR",
    "Hungarian":"hu_HU",
    "Italian":"it_IT",
    "Japanese":"ja_JP",
    "Korean":"ko_KR",
    "Norwegian":"nn_NO",
    "Polish":"pl_PL",
    "Portuguese":"pt_PT",
    "Portuguese_28Brazilian29":"pt_BR",
    "Romanian":"ro_RO",
    "Russian":"ru_RU",
    "Spanish":"es_ES",
    "Spanish_28US29":"es_US",//not match es_mx not found
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

        const newfilename = i18n_map[path.basename(file,'.json')] 

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