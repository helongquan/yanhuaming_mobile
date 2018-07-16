var  LiveAutoInvite0='您好，来自%IP%的朋友';
var  LiveAutoInvite1='来自首页自动邀请的对话';
var  LiveAutoInvite2=' 网站商务通 主要功能：<br>1、主动邀请<br>2、即时沟通<br>3、查看即时访问动态<br>4、访问轨迹跟踪<br>5、内部对话<br>6、不安装任何插件也实现双向文件传输<br><br><b>如果您有任何问题请接受此邀请以开始即时沟通</b>';
var  LrinviteTimeout  = 15;
var  LR_next_invite_seconds  = 45;
var siteid = 'PWT72443513';
var lng = 'cn';
document.writeln('<script'+' language="javascript" src="http://pwt.zoosnet.net/JS/LsJS.aspx?siteid='+siteid+'&float=1&lng='+lng+'"></script>');

var DGGkefu = {

    //调用对话
    open : function (einfo) {
        var einfo = einfo || '';
        LR_HideInvite();
        openZoosUrl('chatwin','&e='+einfo);
        return false;
    },

    //关闭对话
    close : function () {
        LR_HideInvite();
        LR_RefuseChat();
        return false;
    }

}
