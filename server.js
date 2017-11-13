var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path')


var server = http.createServer(function(req, res){
  var pathObj = url.parse(req.url, true)

  if(pathObj.pathname === '/'){
    pathObj.pathname += 'index.html'
  }
  var filePath = path.join(__dirname, pathObj.pathname)
    console.log(pathObj)

  switch(pathObj.pathname){

    case '/loadmore':

    var curIdx = pathObj.query.Idx
    var len = pathObj.query.len
    console.log(curIdx)
    console.log(len)
    var data = []
    for(var i = 0; i<len; i++){
      data.push('新闻' + ( parseInt(curIdx) + i))
    }
    console.log(data)
    res.end(JSON.stringify(data))
    break;
    default:
    fs.readFile(filePath, function(err, data){
      if(err){
        res.statusCode = 404
        res.end("Not Found")
      }else{
        res.end(data)
      }
    })

  }




}
)




server.listen(8080)
