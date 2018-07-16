document.writeln('<script src="http://cdn.bootcss.com/layer/3.0.1/layer.js"></script>');

/*-----------------------------------*\
  留言功能
\*-----------------------------------*/


/*
 *direction：1、2、3、4 对应上右下左
 *tips：提示内容
 *
 */
function validator_msg(attr,bool){
    var default_options = {
        'name' : {'direction':3,'tips':'请输入您的姓名'},
        'tel' : {'direction':3,'tips':'请输入您的电话'},
        'code' : {'direction':3,'tips':'请输入6位数字验证码'},
    };
    var v_name = $(attr + " input[name='info[name]']");
    var v_tel  = $(attr + " input[name='info[tel]']");
    var v_code  = $(attr + " input[name='info[code]']");
    var v_name_direction,v_name_tips,v_tel_direction,v_tel_tips,v_code_direction,v_code_tips;

    if( !/^[\u4e00-\u9fa5]{2,}$/.test(v_name.val()) ){

        if( typeof(v_name.attr('direction'))=='undefined' || v_name.attr('direction')=='' ){
            v_name_direction = default_options.name.direction;
        }else{
            v_name_direction = v_name.attr('direction');
        }

        if( typeof(v_name.attr('tips'))=='undefined' || v_name.attr('tips')=='' ){
            v_name_tips = default_options.name.tips;
        }else{
            v_name_tips = v_name.attr('tips');
        }
        layer.tips(v_name_tips, v_name ,{tips:v_name_direction} );
        return 0;
    }

    if( !/^(1)[3,4,5,7,8][0-9]{9}$/.test(v_tel.val()) ){
        if( typeof(v_tel.attr('direction'))=='undefined' || v_tel.attr('direction')=='' ){
            v_tel_direction = default_options.tel.direction;
        }else{
            v_tel_direction = v_tel.attr('direction');
        }

        if( typeof(v_tel.attr('tips'))=='undefined' || v_tel.attr('tips')=='' ){
            v_tel_tips = default_options.tel.tips;
        }else{
            v_tel_tips = v_tel.attr('tips');
        }
        layer.tips(v_tel_tips, v_tel ,{tips:v_tel_direction} );
        return 0;
    }
    var code = $(attr + " input[name='info[code]']").length;
    if(code>0&&bool==1){
       if( !/^\d{6}$/.test(v_code.val()) ){
            if( typeof(v_code.attr('direction'))=='undefined' || v_code.attr('direction')=='' ){
                v_code_direction = default_options.code.direction;
            }else{
                v_code_direction = v_code.attr('direction');
            }

            if( typeof(v_code.attr('tips'))=='undefined' || v_code.attr('tips')=='' ){
                v_code_tips = default_options.code.tips;
            }else{
                v_code_tips = v_code.attr('tips');
            }
            layer.tips(v_code_tips, v_code ,{tips:v_code_direction} );
            return 0;
        }
    }
    return 1;

}

function submit_msg(attr,str,info){
    //初始检测对象是否存在
    if ( $(attr).length <= 0 ) {
        layer.msg('参数错误：对象不存在');
        return false;
    }

    //检测是否存在多个ID、class及属性
    if ( attr.indexOf('#')>-1 ) {
        var idStr = attr.substring( attr.indexOf('#')+1 );
        if ($('[id='+idStr+']').length>1) {
            layer.msg('参数错误：存在相同ID');
            return false;
        }
    }else{
        if ($(attr).length>1) {
            layer.msg('参数错误：存在相同CLASS或属性');
            return false;
        }
    }
    var info = info || '您的信息已提交成功';
    if( validator_msg(attr,1) ) {

        var name = $(attr + " input[name='info[name]']").val();
        var tel = $(attr + " input[name='info[tel]']").val();
        var code = $(attr + " input[name='info[code]']").val();
        //检测短信验证码
        var checkCode = true;
        if($(attr + " input[name='info[code]']").length>0){
            if (code==$.cookie("verify") && tel==$.cookie("mobile")) {
                checkCode = true;
                $.cookie("verify","");
                $.cookie("mobile","");
            }else {
                layer.tips('验证码不正确',$(attr + " input[name='info[code]']"),{tips:3});
                return false;
            }
        }
        if (checkCode) {
            var strObj = str.split("|");
            var msgData = {
                "name"      : name,
                "tel"       : tel,
                "type"      : strObj[0],
                "place"     : strObj[1],
                "device"    : strObj[2],
                "web"       : strObj[3]
            };
            $.ajax({
                //url: 'http://172.16.1.6:8085/api/consult/add.do',
                url: 'http://admin.dggjqw.com/api/consult/add.do',
                timeout:5000,
                type: 'get',
                data: msgData,
                dataType: 'JSONP',
                jsonp:'callback',
                success: function(data){
                    $(attr + " input[name='info[name]']:not(:hidden)").val('');
                    $(attr + " input[name='info[tel]']").val('');
                    if (!data.error) {
                        if (info && info!=1) {
                            layer.msg(info);
                        }

                    }else{
                        layer.msg(data.msg);
                    }
                },
                error:function(XMLHttpRequest,textStatus,errorThrown){
                    layer.msg('暂时不能留言，请在线或者电话咨询，敬请谅解！');
                }

            });
            return true;
        }else{
            return false;
        }
    }
}

/**
 * 点击发送验证短信
 * mobile:手机号码
 * content:短信内容的类型:1(小顶网融资贷款),2(顶呱呱工商核名)
 */
function submit_code(attr,obj,content){
    if( validator_msg(attr,0) ) {
        settime(obj);
        var tel = $(attr + " input[name='info[tel]']").val();
        $.ajax({
                url: 'http://api.dgg.net/sendPhone',
                timeout:5000,
                type: 'get',
                data: {mobile:tel,content:content},
                dataType: 'JSONP',
                jsonp:'callback',
                success: function(data){
                    layer.msg(data.msg);
                    if (data.code==0) {
                        $.cookie("verify",data.verify);
                        $.cookie("mobile",data.mobile);
                    }
                },
                error:function(XMLHttpRequest,textStatus,errorThrown){
                    layer.msg('暂时不能留言，请在线或者电话咨询，敬请谅解！');
                }

            });
    }
}

/**
 * 倒计时
 */
var countdown=60;
function settime(obj) {
    if (countdown == 0) {
        $(obj).removeClass("disabled").removeAttr("disabled");
        $(obj).text("重新发送");
        countdown = 60;
        return;
    } else {
         //$(".authLayer").show();
        $(obj).addClass("disabled").attr("disabled","true");
        $(obj).text(countdown + "秒后重新发送");
        countdown--;
    }
    setTimeout(function() {
        settime(obj)
    },1000)
}

jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};