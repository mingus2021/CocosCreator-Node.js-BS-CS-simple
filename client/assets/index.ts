import { _decorator, Component, Node, Label, EditBox } from 'cc';
import { http } from './http';
const { ccclass, property } = _decorator;

let editboxcontent = null;
let namecontent = null;

@ccclass('index')
export class index extends Component {
    @property(Label)
    label:Label = null;

    @property(EditBox)
    editBox:EditBox = null;

    //事件处理（获取输入内容）
    callback(editBox:EditBox){
        editboxcontent = this.editBox.string;
    }   
    
    //添加注册按钮点击事件
    OnRegisterClick(){           
        //先登录校验账号是否存在
        http.get("/get_account",{"name":editboxcontent},(res)=>{
            if(res.length){
                this.label.string = "用户已存在";
            }       
            else{
                http.get("/register_account",{"age":0,"name":editboxcontent},(res)=>{          
                    //注册完成重新登录
                    if(res.affectedRows){   
                        this.OnLoginClick();
                    }
                });  
             }
        }); 
    }

    //添加注销按钮点击事件
    OnDeleteClick(){           
        http.get("/delete_account",{"name":editboxcontent},(res)=>{   
            if(res.affectedRows){   
                this.label.string = "已成功删除";
            }   
            else{
                this.label.string = "用户不存在";
            }  
        });  
    }

    //添加更新按钮点击事件
    OnUpdateClick(){   
        //必须要先登录才能更新
        if(namecontent != null)
        {
            http.get("/update_account",{"age":editboxcontent,"name":namecontent},(res)=>{          
                console.log("res:"+res.affectedRows);     
                //更新完成重新登录
                if(res.affectedRows){    
                    http.get("/get_account",{"name":namecontent},(resp)=>{        
                        var objInfos = eval(resp);
                        this.label.string = "id:"+objInfos[0]["id"]+"名字："+objInfos[0]["name"]+"年龄："+objInfos[0]["age"];  
            
                    }); 
                }
                else{
                    this.label.string = "用户不存在";
                }
            });  
        }   
        else{
            this.label.string = "请先登录";
        }     
    }

    //添加登录按钮点击事件
    OnLoginClick(){           
        http.get("/get_account",{"name":editboxcontent},(res)=>{
            if(res.length){
                var objInfos = eval(res);
                //记录当前用户
                namecontent = editboxcontent;
                this.label.string = "id:"+objInfos[0]["id"]+"名字："+objInfos[0]["name"]+"年龄："+objInfos[0]["age"];  
            }       
            else{
                this.label.string = "用户不存在";
            }   
        });  
    }    
}

