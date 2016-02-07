
var Config = {
    mode : "prd",
    localUrl : "http://localhost:3000",
    gceUrl : "http://130.211.249.49:8080",
    getUrl : function(){
        if(this.mode=="dev"){
            return this.localUrl;
        }else{
            return this.gceUrl;
        }
    }

}
module.exports = Config;
