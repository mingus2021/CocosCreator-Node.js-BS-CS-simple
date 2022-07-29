import { _decorator, Component, Node, loader } from 'cc';
const { ccclass, property } = _decorator;
const url = "http://127.0.0.1:8080";

@ccclass('http')
export class http {
    static get(path,data,callBack){
        var requestUrl = url + path;
        var xhr = loader.getXMLHttpRequest();    
        
        let parma ='?';
        for(var key in data){
            var paramStr = key+"="+data[key];
            if(parma == "?"){
                parma += paramStr;
            }else{
                parma += "&" + paramStr;
            }
        }

        xhr.open("GET",requestUrl+parma);
        xhr.timeout = 5000;
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
        xhr.onreadystatechange = function(){
            if(xhr.readyState ===4 && xhr.status ==200){
                var respone =xhr.responseText;
                callBack(JSON.parse(respone));
            }
        };
        xhr.send();
    }

}

