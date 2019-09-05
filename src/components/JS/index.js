import Vue from 'vue'
import msgBox from './msgBox'
export var MsgBox = (function(){
    var MyComponent = Vue.extend(msgBox)//结合Msg组件
    return function(opts){//配置参数
        var defaults = {//默认值
            title:'',
            content:'',
            cancel:'',
            ok:'',
            handleCancel:Function,
            handleOk:Function
        };
         for(var attr in opts){
             defaults[attr] = opts[attr];
         }
         var vm = new MyComponent({
             el:document.createElement('div'),
             data:{
                 title:defaults.title,
                 content:defaults.content,
                 cancel:defaults.cancel,
                 ok:defaults.ok
             },
             methods : {
                handleCancel(){
                    defaults.handleCancel && defaults.handleCancel.call(this)
                    document.body.removeChild(vm.$el)//点击取消
                },
                handleOk(){
                    defaults.handleOk && defaults.handleOk.call(this)
                    document.body.removeChild(vm.$el)//点击取消
                }
             }
         })
        document.body.appendChild(vm.$el)//添加到body
    }
})()

