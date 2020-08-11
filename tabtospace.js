const fs =require('fs')
const path =require('path')

const origindatapath = './clientdata'
const oldi18n='./i18n'
const newfolder = './i18n'
fs.readdir(origindatapath,(err,files)=>{
    files.forEach(file=>{
        let tmp = JSON.parse( fs.readFileSync(path.join(oldi18n,file),'utf-8') )
        //let result = JSON.parse( fs.readFileSync(path.join(oldi18n,file),'utf-8') )
        let result = JSON.stringify(tmp,null,'  ')
        result = result.replace(/\\\\n/g,'\\n')
         fs.writeFileSync(path.join(newfolder,file),result)
    })
})

