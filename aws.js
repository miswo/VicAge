var aws = require('aws-sdk');


aws.config.update({
    accessKeyId:'AKIAJ5MGKCPMNRYLMT6A',
    secretAccessKey:'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'
})

var state = {
    data: null
};

exports = module.exports={
    sign:function(filename,filetype,callback){
        var s3 = new aws.S3();
        var params={
            Bucket:"vicage-image",
            Key:filename,
            Expires:60,
            ContentType:filetype
        };

        s3.getSignedUrl('putObject',params,(err,data)=>{
            if(err){
                return console.log(err);
            }else{
                callback(data);
            }
        });
    }
}