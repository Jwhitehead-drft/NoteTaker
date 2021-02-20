const path = require("path");


module.exports = (app) => {
    app.get('/notes', function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
}

