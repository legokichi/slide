var express   = require('express'),
    url       = require('url')

express()
  .disable('x-powered-by')
  .set('view engine', 'ejs')
  .set('views', __dirname + '/views')
  .use(express["static"](__dirname + '/public'))
  .get(/^\/reveal\/?$/, function(req, res) {
    res.redirect("../reveal.html");
  }).get(/^\/reveal\/(.+)$/, function(req, res) {
    var success = function(_res) {
      var body = "";
      _res.on("data", function(chunk) {
        body += chunk;
      });
      _res.on("error", function() {
        res.status(_res.statusCode).send(_res.statusCode);
      });
      _res.on("end", function() {
        res.render("reveal", {
          host: req.protocol + "://" + req.host + "/",
          md_url: req.params[0],
          md_body: body
        });
      });
    };
    var protocol = url
      .parse(req.params[0])
      .protocol
      .trim()
      .toLowerCase()
      .replace(/:$/, '');
    switch (protocol) {
      case "http": http.get(req.params[0], success);
      case "https": https.get(req.params[0], success);
      default: res.send("wrong url");
    }
  }).listen(8083);