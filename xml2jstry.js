
const fs = require('fs')
const xmlToJson = require('xml-to-json-stream');
const parser = xmlToJson({attributeMode:false});
const arabic = fs.readFileSync('C:/Users/cheney.tsai/Desktop/BYOC_RSE_v2_27_07_2020/BYOC/Arabic.xml','utf-8')
console.log(arabic)
const xml = `
<employee id="123456">
    <name>Alex</name>
</employee>
`

parser.xmlToJson(arabic, (err,json)=>{
    if(err) {
        console.log(err)        //error handling
    }

    console.log(json)
    //json
    //{
    //  employee: {
    //      name: "Alex"
    //  }    
    //}
});

//the 'id' attribute of employee is ignored. If attributeMode was set to true or omitted, the json would have been:
// {
//   employee: {
//      id: "123456",
//      name: "Alex"
//   }    
// }
