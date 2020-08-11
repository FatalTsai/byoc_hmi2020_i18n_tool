const fs =require('fs')
const path =require('path')

const origindatapath = './clientdata'
const oldi18n='./oldi18n'
const newfolder = './i18n'
fs.readdir(origindatapath,(err,files)=>{
    files.forEach(file=>{
        let tmp = JSON.parse( fs.readFileSync(path.join(origindatapath,file),'utf-8') )
        let result = JSON.parse( fs.readFileSync(path.join(oldi18n,file),'utf-8') )
        //console.log(tmp)
        Object.keys(tmp).forEach(function (key) {
            // do something with obj[key]
            result[key] = tmp[key]
            //console.log(key)
         });

         fs.writeFileSync(path.join(newfolder,file),JSON.stringify(result,null,'  '))
    })
})


/*
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


*/ 