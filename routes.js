module.exports = function(app,io){

    var sess;

    io.on('connection', function(socket){
        console.log("Server connection.io");
        socket.emit('topology',currentTopo);
    });

    io.on('disconnect', function(socket){
        console.log("client dcd");
    });

   
    app.post('/login', function(req, res) {

        sess = req.session;
        sess.username = req.body.user;

        var user_name=req.body.user;
        var password=req.body.password;

        console.log('Checking db for username = '+user_name+' and password = '+password);
        if(user_name=="admin" && password=="admin"){
            res.send("yes");
        }else{
            res.send("no")
        }

    });


    app.get('/logout',function(req,res){

        req.session.destroy(function(err){
            if(err){
                console.log("sess destroy error: "+err);
            }else{
                res.redirect('/');
            }
        });
    });

}