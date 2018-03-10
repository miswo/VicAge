module.exports = function(app){

    app.get("/event",(req,res)=>{
        res.send({data:"This is all the events"});
    });
    
    app.get('/event/creat',(req,res)=>{
        console.log("Creating new event");
        console.log(req);
    });
};