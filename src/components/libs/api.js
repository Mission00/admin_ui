import axios from "axios";
import { Message } from "element-ui";
import router from "../../router";

axios.interceptors.response.use(resp=>{
    if(resp.status && resp.status==200){
        if(resp.data.code==-1 || resp.data.code==400){
            Message.error(resp.data.data)
            return;
        }
        
    }
    return resp;
},error=>{
    if(error.response.code==504 || error.response.code==404)
    {
        Message.error('服务器没了')
    }else if(error.response.code==403){
        Message.error('你不配')
    }else if(error.response.code==401){
        Message.error('没登录')
        router.replace('/')
    }else{
        
    }
    
})