
/*
 +------------------------------------------------------------------------+
 | 8kana.com JS Tools Kit                                                 |
 +------------------------------------------------------------------------+
 | Copyright (c) 2015-2018 8Kana.com 版权所有                             |
 +------------------------------------------------------------------------+
 */
var _cfg_domain_root = '8kana.com';
if(location.host.indexOf('.cc')>0){
    _cfg_domain_root='8kana.cc';
}else if(location.host.indexOf('.dev')>0){
    _cfg_domain_root='8kana.dev';
}else if(location.host.indexOf('.top')>0){
    _cfg_domain_root='8kana.top';
}
if (typeof String.prototype.trim === "undefined") {
    String.prototype.trim = function() {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}
//修复IE在未F12开启调试工具的时候，console未定义的BUG
window.console = window.console || (function(){ 
	var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile 
	= c.clear = c.exception = c.trace = c.assert = function(){}; 
	return c; 
})();




/*  根据当前图片地址，转换成需要的尺寸的图片地址
 * 自动监测图片的尺寸：s m l */
function getFileUrlByStyle(strFile,strType) {
    var fileType ='s';
    if(strFile.indexOf('_m.')>0)
        fileType='m';
    else if(strFile.indexOf('_l.')>0)
        fileType='l';
    else if(strFile.indexOf('_ori.')>0)
        fileType='ori';

    if(fileType == strType)
        return strFile;
    else
        return strFile.replace('_'+fileType+'.','_'+strType+'.');
}
/*  V1.0 已经更名为 getFileUrlByStyle    */
function getFileUrl(strFile,strType) {
    var fileType ='s';
    if(strFile.indexOf('_m.')>0)
        fileType='m';
    else if(strFile.indexOf('_l.')>0)
        fileType='l';
    else if(strFile.indexOf('_ori.')>0)
        fileType='ori';

    if(fileType == strType)
        return strFile;
    else
        return strFile.replace('_'+fileType+'.','_'+strType+'.');
}

function getPage(index) {
    var url1="";
    switch (index) {
        case 1:
            url1 = '';
            break;
        case 2:
            url1="/community/xzindex/index";
            break;
        case 3:
            url1="/community/ysindex/index";
            break;
        case 4:
            url1 = '';
            break;
        case 20:
            var UserId = GPT.getCookieValue('UserId');
            if((UserId == '') ||(UserId == 0)||(UserId==false)) {
                url1 = '/home/passport/login?returnUrl='+encodeURIComponent(kana.getDomain('www')+'/home/pay/index');
            } else {
                window.location.href = "/home/pay/index";
            }
            break;
        case 30:
            /*      作者中心    */
            var UserId = GPT.getCookieValue('UserId');
            if((UserId == '') ||(UserId == 0)||(UserId==false)) {
                window.location.href = '/home/passport/login';
            } else{
                var isAuth = GPT.getCookieValue('IsAuthor');
                if( isAuth != '1' ){
                    window.location.href="/author/index/apply"
                } else {
                    var auth = GPT.getCookieValue('AuthName');
                    if( auth == '' ){
                        kana.loadAuthLoginForm();
                    }else{
                        window.open('/author')
                    }
                }
            }
            return;
            //url1="/author";
            break;
        case 51:
            url1="/member/bookshelf/index";
            break;
        case 52:
            url1="/member/message/index";
            break;
        case 53:
            url1="/member/comment/commentsub";
            break;
        case 101:
            url1= kana.getDomain('www')+ "/home/passport/logout";
            window.location.href = url1;
            return;
            break;
    }
    if(url1 != '') window.open(kana.getDomain('www')+url1);

}

//每个页面都要执行的东西
$(function(){
    //全站用户更新session，5分钟一次
    if(document.location.host.indexOf(_cfg_domain_root)>-1){

        if(document.location.href.indexOf('/admin')<1){
            kana.updateSession(true);
            setInterval(function(){kana.updateSession()},300000);
        }

    }
    //刷新提示信息
    //kana.flushPopMsg();
    kana.getNotifyCount();
});

    /*  首页: 更新首页头部显示信息
    *   2015/6/8    V1.1
    *   */
    function getHomeHeaderInfo () {
        var UserId = GPT.getCookieValue('UserId');

        /*  获取 首页头部显示信息：  社区人数 + 个人基本信息  */
        //var url1=kana._uri+'/home/Ajax/ajaxGetHomeHeaderInfo';
        var url1='/home/Ajax/ajaxGetHomeHeaderInfo';
        $.ajax({
            type  :   'POST',
            url     :   url1,
            data    : {UserId:UserId},
            dataType:   'json'
        }).done(function (response){
            if (response.status > 0) {
                var coinInfo = response.coinInfo;

                /*  四大社区数据    */
                $("#xzMemberNum").html(coinInfo.xzMemberNum);
                $("#bwMemberNum").html(coinInfo.bwMemberNum);
                $("#qsMemberNum").html(coinInfo.qsMemberNum);
                $("#ysMemberNum").html(coinInfo.ysMemberNum);

                //$(".nav_dw").each(function(){
                //    var index = $(this).attr('dataKey');
                //    $(this).html(coinInfo.bookClassNum[index]);
                //});

                if(UserId < 1){
                    $(".top_dw1").show();
                    $(".top_dw").hide();
                    /*  推荐用Id命名 */
                    $('#LoginInfo').hide();
                    $('#LoginUrl').show();
                    return;
                }

                $("#username").text(GPT.getCookieValue('NickName'));
                $("#username").attr('href','/member/index/index/'+GPT.getCookieValue("UserId"));


                //金币数量
                var gold = coinInfo.coin/100;
                $("#UserCoin").html(gold);

                if(GPT.getCookieValue('Avatar') == ''){
                    if(GPT.getCookieValue('Sex') == 1){
                        $("#UserAvatar").attr('src',kana.getDomain('s')+'/img/common/head/big_headman_default.png');
                        $("#UserAvatar").parent().attr('href','/member/index/index/'+GPT.getCookieValue("UserId"));
                    }else{
                        $("#UserAvatar").attr('src',kana.getDomain('s')+'/img/common/head/big_headwoman_default.png');
                        $("#UserAvatar").parent().attr('href','/member/index/index/'+GPT.getCookieValue("UserId"));
                    }
                }else{
                    var strFile = kana.getDomain('a')+'/'+getFileUrlByStyle(GPT.getCookieValue('Avatar'),'s') ;

                    $("#UserAvatar").attr('src',strFile);

                    $("#UserAvatar").parent().attr('href','/member/index/index/'+GPT.getCookieValue("UserId"));
                }

                if(coinInfo.level>0){
                    $("#UserLevel").show();
                    $("#UserLevel").attr('class','lvMember1_' + coinInfo.level+' topBarR_L_lv');
                    $("#UserLevel").attr('title','积分:' + coinInfo.score);
                    // 酒馆头部用户等级
                    $("#UserLevel_M").show();
                    $("#UserLevel_M").attr('class','lvMember1_' + coinInfo.level+' topBarR_L_lv');
                    $("#UserLevel_M").attr('title','积分:' + coinInfo.score);
                } else {
                    $("#UserLevel").hide();
                    $("#UserLevel_M").hide();
                }

                //  显示用户信息
                $(".top_dw").show();
                $(".top_dw1").hide();
                /*  推荐用Id命名 */
                $('#LoginInfo').show();
                $('#LoginUrl').hide();
            }
        });
    }

    /*  社区、酒馆头部信息 (他人个人空间)、阅读页   */
    function getUserInfo () {
        var UserId = GPT.getCookieValue('UserId');

        /*  获取 首页头部显示信息：  社区人数 + 个人基本信息  */
        //var url1=kana._uri+'/home/Ajax/ajaxGetUserInfo';
        var url1='/home/Ajax/ajaxGetUserInfo';
        $.ajax({
            type  :   'POST',
            url     :   url1,
            data    : {UserId:UserId},
            dataType:   'json'
        }).done(function (response){
            if (response.status > 0) {
                var coinInfo = response.coinInfo;

                /*  四大社区数据    */
                $("#xzMemberNum").html(coinInfo.xzMemberNum);
                $("#bwMemberNum").html(coinInfo.bwMemberNum);
                $("#qsMemberNum").html(coinInfo.qsMemberNum);
                $("#ysMemberNum").html(coinInfo.ysMemberNum);

                if(UserId >0){
                    $('#LoginInfo').show();
                    $('#LoginUrl').hide();
                } else {
                    $('#LoginInfo').hide();
                    $('#LoginUrl').show();
                    return;
                }

                $("#username").text(GPT.getCookieValue('NickName'));
                $("#username").attr('href','/member/index/index/'+GPT.getCookieValue("UserId"));

                //  消息提示
                if(coinInfo.messageCount > 0){
                    $("#MsgNum").html(coinInfo.messageCount);
                    $("#MsgNum").addClass('read_head_R_Hot');
                    $("#MsgNum").siblings('i').addClass('show');
                } else {
                    $("#MsgNum").html('0');
                    $("#MsgNum").removeClass('read_head_R_Hot');
                }
                //  书架提示
                if(coinInfo.bookshelfNum > 0){
                    $("#bookshelf").html(coinInfo.bookshelfNum);
                    $("#bookshelf").addClass('read_head_R_Hot');
                    $("#bookshelf").siblings('i').addClass('show');
                } else {
                    $("#bookshelf").html('0');
                    $("#bookshelf").removeClass('read_head_R_Hot');
                }
                //  书评提示
                if(coinInfo.bookcommentNum > 0){
                    $("#bookcomment").html(coinInfo.bookcommentNum);
                    $("#bookcomment").addClass('read_head_R_Hot');
                    $("#bookcomment").siblings('i').addClass('show');
                } else {
                    $("#bookcomment").html('0');
                    $("#bookcomment").removeClass('read_head_R_Hot');
                }

                //金币数量
                var gold = coinInfo.coin/100;
                $("#UserCoin").html(gold);

                if(GPT.getCookieValue('Avatar') == ''){
                    if(GPT.getCookieValue('Sex') == 1){
                        $("#UserAvatar").attr('src',kana.getDomain('s')+'/img/common/head/big_headman_default.png');
                        $("#UserAvatar").parent().attr('href','/member/index/index/'+GPT.getCookieValue("UserId"));
                    }else{
                        $("#UserAvatar").attr('src',kana.getDomain('s')+'/img/common/head/big_headwoman_default.png');
                        $("#UserAvatar").parent().attr('href','/member/index/index/'+GPT.getCookieValue("UserId"));
                    }
                }else{
                    $("#UserAvatar").attr('src',kana.getDomain('a')+'/'+getFileUrl(GPT.getCookieValue('Avatar'),'s'));
                    $("#UserAvatar").parent().attr('href','/member/index/index/'+GPT.getCookieValue("UserId"));
                }
//console.log(coinInfo.level);
                if(coinInfo.level>0){
                    $("#UserLevel").show();
                    $("#UserLevel").attr('class','LV lvMember' + coinInfo.level);
                    $("#UserLevel").attr('title','积分:' + coinInfo.score);
                    // 酒馆头部用户等级
                    $("#UserLevel_M").show();
                    $("#UserLevel_M").attr('class','LV lvMember1_' + coinInfo.level);
                    $("#UserLevel_M").attr('title','积分:' + coinInfo.score);
                } else {
                    $("#UserLevel").hide();
                    $("#UserLevel_M").hide();
                }
            }
        });
    }


var SenstiveWords = "" ;

/**
 * Kana
 */
var kana = {
    _uri: '',
    _editor: null,
    _search: false
    /*  用户权限状态检测    */
    ,PrivilegeCheck: function(strOpName) {
        var userid = kana.getCookieValue('UserId') ;
        if((userid==0) || (userid=='') || (userid==false)){
            kana.loadLoginForm();
            return false
        }

        var t1 = kana.getCookieValue('LockTime') ;
        if(t1>0){
            var str =new Date();
            str = str.toLocaleDateString();
            var t2=new Date(str.replace(/-/g, '/'));

            /*  只能预约发布一天后的时间    */
            if ( t1 > t2 ) {
                var strRest = (t1 - t2) / 60 ;
                kana.showError('您现在已经被禁言',{'msg':'还有'+strRest+'分钟才能发言','url':'','url_name':''});
                return false;
            }
        }

        /*  检测是否被禁言 */
        if(strOpName == 'cTopic') {

        } else if(strOpName == 'reply'){

        }

        return userid;
    }
    ,SenstiveWordsCheck: function(str) {
//        var filter = /共产党|胡锦涛|习近平|江泽民|李克强|朱镕基|法轮功|毛泽东|管理员/g ;
//        var SenstiveWords ="共产党|胡锦涛|习近平|江泽民|李克强|朱镕基|法轮功|毛泽东|管理员";

        //  <input type='hidden' /> 从当前页面读取禁止字符串

        //SenstiveWords = $('#SenstiveWords').attr('senstivewords');

        if( SenstiveWords == "" ){
            SenstiveWords = GPT.sendAjax('/home/ajax/ajaxGetSenstiveWords','');
        }

        var filter = new RegExp(SenstiveWords,"g") ;

        if (filter.test(str)) {
            var arr=str.match(filter) ;
            for(var k=0;k<arr.length;k++){
                var filter1 = new RegExp(arr[k],'g');
                str = str.replace(filter1, "<span flag='error' style='color:red;'>"+arr[k]+"</span>");
            }
        }
        return str;
    }
    ,HasSenstiveWords: function(str) {
        //var SenstiveWords ="共产党|胡锦涛|习近平|江泽民|李克强|朱镕基|法轮功|毛泽东|管理员";
        if( SenstiveWords == "" ){
            SenstiveWords = GPT.sendAjax('/home/ajax/ajaxGetSenstiveWords','');
        }
        var filter = new RegExp(SenstiveWords,"g") ;

        if (filter.test(str)) {
            return true
        } else {
            return false;
        }

    }

    //检测敏感词库
    ,getNameReserves:function(str){
        var SenstiveWords ="|凌天下|辰东|忘语|李兴禹|本物天下霸唱|崔走召|石章鱼|鸿蒙树|五志|犁天|夏言冰|衣冠胜雪|跳舞|zhttty|小桥老树|百里玺|静夜寄思|三戒大师|凤鸣岐山|蛇吞鲸|高月|8难|韦小宝|流浪的蛤蟆|贼道三痴|不如踢球|天子|墨武|鹅考|傲无常|银河九天|牛笔|柳暗花溟|古剑锋|撞破南墙|尝谕|乌山云雨|步非烟|巅峰残狼|黑天魔神|小妖|南海十四郎|不信天上掉馅饼|猫跳|灰熊猫|铅笔刀|独悠|火星引力|愤怒的香蕉|明寐|神见|叶天南|青狐妖|欲大叔|流牙|红肠发菜|早点吃馒头|言鼎|潇疯|姑苏懒人|鱼不二|乱世狂刀01|七月雪仙人|摩北|庸春|糖衣古典|包亚运|谢金|习风|刘建良|冬雪晚晴|楚慕白|乌啼霜满天|笑笑星儿|周星|陈爱庭|明日复明日|不是蚊子|傲月长空|半步沧桑|步千帆|残剑啊啊啊啊|乘风御剑|赤虎|低手寂寞|多笑天|方想|庚新|拉丁海十三郎|蝴蝶蓝|快餐店|梁七少|了了一生|林海听涛|罗晓|落情泪|沐轶|凝眸七弦伤|怒马照云|七十二翼天使|七月火|沙漠|随轻风去|唐家三少|天蚕土豆|天魔圣|天使奥斯卡|天堂羽|天岩|屠狗者|我吃西红柿|雾外江山|小喇叭|小小青蛇|心梦无痕|朽木可雕|徐公子胜治|盐水煮蛋|妖邪有泪|夜梦寒|原始罪孽|宅猪|之白|属龙语|坠落凡尘|左妻右妾|浴火重生|纷舞妖姬|河马散人|键盘的灰|酒徒|雷云风暴|猛子|枪手1号|水平面|说梦者|午后方晴|小楼明月|夜的邂逅|雨辰宇|猪头七|白马神|黑土冒青烟|鱼楽|煮酒论咖啡|蓝波水|粗黄瓜|天下飘火|端月|隔壁小王|南派三叔|罗森|豆子惹的祸|月关|何常在|雪帝峰|庄不周|雁九|宝石猫|格子里的夜晚|禾丰浪|独步千军|绯炎|府天|东门吹牛|边城 浪子|北冥老鱼|疯狂骷髅|管平潮|圣者晨雷|断刃天涯|风上忍|录事参军|我本疯狂|张小花|叨狼|西方蜘蛛|高楼大厦|蚕室废人|罗霸道|终级BOSS飞|瑞根|任怨|断章|鱼人二代|霞飞双颊|郭怒|月鼠|蓝领笑笑生|石三|闪烁|二十四桥明月夜|浪漫烟灰|大司空|大秦骑兵|二踢脚|二师叔|风雨天下|耳根|发奋图强|幻雨|木易|汉隶|饭饭爱吃饭|赵赶驴|古龙岗|孑与2|李小梨|葵花小子|傲天无痕|柳旭风|齐橙|老白牛|十步行|奥尔良烤鲟鱼堡|望平安|烽火戏诸侯|风宇雪|权掌天下|一丝不苟|青青牧草|王袍|人勿玩人|天地知我心二|轩疯狂|魂圣|石板路|杨老三|圆脸猫|深蓝的国度|EK巧克力|大篷车|火树嘎嘎|天空之承|踏雪真人|凤歌|我本纯洁|云鹤真人|华西里|众生|十十|离人横川|梦入神机|逆苍天|写字板|无罪|打眼|骷髅精灵|七十二编|更俗|烟雨江南|血红|六道|阿越|我是多余人|树下野狐|狂奔的蜗牛|纯情犀利哥|娶猫的老鼠|风岚|司马圣杰|湘西鬼王|风起闲云|跃千愁|油条爱豆浆|西闷庆|陈重|鹅是老五|黑瞳王|秣陵别雪|断桥残雪|胜己|风华爵士|萧鼎|隐为者|吴老狼|金寻者|布老虎吃人|烈阳化海|孤独漂流|天雷猪|蒙白|高坡|十万豆浆|寒香寂寞|说不得大师|风圣大鹏|庄毕凡|和尚用潘婷|高森|张大牛|阿菩|七尺居士|典玄|禹枫|兰帝魅晨|九哼|寒风拂剑|观棋|沧海一梦|情终流水|贼眉鼠眼|长风|真庸|三七开|泛东流|龙马|不乐无语|龙王的贤婿|妖白菜|衣山尽|图穷|越越|寒香小丁|夜·水寒|王小蛮|远征士兵|曾呓|骠骑|关中老人|水里游鱼|夏一流|沧海鲲鹏|古羲|云泪天雨|李家老店|翼V龙|黄晓阳|百世经纶|东一方|华表|御风楼主人|邪影|天净沙秋思|暗黑茄子|大梦泣|黑籍|三十二变|南天一鹤|雪漂|苍天白鹤|尼姑庵的和尚|恋上南山|飞舞激扬|九月阳光|小刀锋利|冰皇傲天|丛林狼|苦涩的甜咖啡|莫默|二蛇|深海游龙|花刺1913|心在流浪|柳下挥|皇甫奇|蓝色蝌蚪|血欲|浮沉|公子诺|发飙的蜗牛|耗子欺负猫|九天云|突然光和热|钟离昧|飞哥带路|无断|疯颠|天墓|肖忉|晴了|猫腻|网络黑侠|野兵|庄秦|寂寞剑客|特别白|冥域天使|老猪|云天空|手枪|逐没|戒念|知宇之乐|随波逐流|荆柯守|月影梧桐|大爆炸|closeads|撒冷|黯然销魂|淡墨青衫|戴小楼|开玩笑|罗森|张君宝|读书之人|紫钗恨|萧潜|卷土|苍穹双鹰|御史大夫|紫气东来|坐墙等红杏|曾经拥有的方向感|豫西山人|影·魔|夜色访者|小小羽|萧玄武|虾米XL|我是赵公明|伟岸蟑螂|万马犇腾|上山打老虎额|木士|莫少卿|明朝无酒|面壁的和尚|可大可小|阚智|开荒|黑眼白发|何不语|格鱼|疙瘩|独孤冷者|点精灵|蔡晋|兵不血刃|天豪|鱼歌|一世风流|歆月|辛夷坞|夏茗悠|明晓溪|化成水的冰|顾漫|匪我思存|东方古雪|安知晓|安妮宝贝|叶非夜|沧月|桐华|饶雪漫|韩寒|郭敬明|四叶铃兰|末果|柳暗花溟|飞烟|风弄|潇湘冬儿|天下归元|寂月皎皎|西子情|长着翅膀的大灰狼|玄色|一世风流|紫月茜纱|周玉|吱吱|云之苑|亦然|忆锦|扬扬|雪舞1987|席月畅畅|吴笑笑|无意宝宝|天琴|唐梦若影|如沫|秋夜雨寒|奶油小核桃|穆丹枫|魅魇star|猫小猫|不可能的世界|不可能の世界|8kana|8kana.com|吕丹|落籽七|落随心|流白靓雪|恋月儿|皎皎|江湖瑶|鬼钕钕|顾盼琼依|丑小鸭|沧海·镜|大风刮过|Fresh果果|天籁纸鸢|蓝白色|人海中|易拉罐|刘小备|鲜橙|忽然之间|紫雪凝烟|月影灯|伊潋忧梦|一缕相思|妖千千|婉转的蓝|桐歌|随心|绕月缠|千岛女妖|齐成琨|墨珞丫头|莫言殇|林依雷|林笛儿|炼狱|蜡笔小民|囧囧有妖|坏妃晚晚|二分之一A|稻花香香|彩信时空|杯具的囡|阿彩|PS：猫宝|l宠爱s|碧玉萧|瞬间倾城|闻情解佩|安以陌|玉朵朵|余姗姗|蜀客|白饭如霜|八月长安|东迷笛|橘花散里|江小湖|林家成|苏素|十四郎|晚歌清雅|欣彤|圆不破|月星汐|若雪三千|十四阙|昨日重现|醉云巅|醉月舞|紫月君|紫琼儿|紫倩幽情|紫凝珠儿|紫伶儿|子尚|周小楠|哲密莱|宅丫头|月下微尘|月光小掬|于诺|游泳的鱼|優雅，窒息|幽幽弱水|优雪|拥海入林|影妙妙|樱淘晓玩字|樱飞扬|瑛子|银饭团|殷小妍|殷鸿|易小天|易嫚|忆水|遗失的虫|壹拾壹|依馨|衣若|伊梦岚|葉雪|野北|也顾偕|妖十三|杨子之爱|杨子有爱|彦茜|烟云殇|雪篱笆|星期七|笑轻尘|晓云|晓潶芯|小芯|小饭团丶|肖仞|夏阳白|吴眉婵|蔚然语风|蔚蓝雨|唯一的迷蝶|为溪伴桥|微思物语|拓拔瑞瑞|天边虹|疼啊疼|泰迪熊VS羽羽|随风清|夙沉烟|苏沫沫1|水汐漓|水流云在|施阳阳|尚莞|姗星|莎含|三元|若儿飞飞|润月晨|裘晚仪|秋紫陌|秋落满园|清涯cxt|清风恋飘雪|轻舞|乔以笙|浅笑梨涡|浅绘淡描|蒲苇如思|扑朔迷离|痞子大叔|裴雪七|泡椒魔芋|诺诺芷琪|奶昔慕丝|纳兰静语|慕容湮儿|木易|木樨|莫弃|魔女恩恩|茗末|明日香|米橙子|靡靡妖妖|靡靡妖娆|迷恋２|梦幻祝福|萌上草|门唧|落茶花|柳风拂叶|流离洛|凌香|琳听|林琳|李李翔|璃珞|冷依依|泪落残雪|懒猫|兰沁|辣辣|空空点|君纤纤|爵诀|九尾野猫|江潭映月|江菲|凰绯色|黄墨奇|花灼灼|花无心|红株|红颜|红了容颜|黑爱丽丝|海棠落|过路人与稻草人|果菲|郭小丫|乖乖小白狐|古雪|古刹|风竹心|风中的叮当|焚香|梵缺|峨嵋|独牧人|冬虫儿|点炕木|淡汐|淡墨菲痕|黛宝|呆呆小猫|大灰狼|初雨后晴|池纪|晨曦|蔡燕红|冰山|彼岸笑|笨袋袋|悲剧的囡|杯具小丸子|薄蝉|半缕阳光|柏婕|安吉拉丁|爱新觉罗氏|阿袭|zj邺水朱华|shisanchun|o滴神|J金夏2|jae~love|abbyahy|（法）菲利普?德莱姆|阿尔伯特·哈伯德|阿来|阿菩|艾柯|艾米|艾米莉·勃朗特|安意如|奥斯卡-王尔德|巴金|白落梅|白岩松|柏杨|鲍鹏山|北岛|毕飞宇|毕淑敏|冰心|薄三郎|蔡骏|蔡澜|蔡智恒|仓央嘉措|沧月|曹建海|曹文轩|曹雪芹|曹禺|陈鲁豫|陈彤|陈志武|陈忠实|成刚|成君忆|池莉|迟子建|川端康成|从维熙|崔曼莉|村上春树|戴旭|戴旭|当年明月|邓一光|丁玲|丁一|董辅礽|杜光辉|渡边淳一|二月河|法布尔|方方|方文山|房忆萝|丰子恺|冯骥才|冯仑|冯梦龙|冯唐|冯小刚|冯友兰|傅雷|傅佩荣|高尔基|高晓松|歌德|格林兄弟|古斯塔夫·施瓦布|顾城|关仁山|郭沫若|哈耶克|海岩|海子|韩寒|韩少功|韩松落|郝洪军|何帆|何建明|洪晃|洪昭光|虹影|黄健翔|黄小琥|纪连海|季羡林|加藤嘉一|贾平凹|贾樟柯|简·奥斯汀|姜得祺|姜得祺|姜戎|姜汝祥|蒋峰|蒋勋|杰克·伦敦|今何在|金错刀|金满楼|金寻者|金羽汐|金韵蓉|靳羽西|静电鱼|居伊·德·莫泊桑|阚治东|克里斯托夫·金|孔二狗|孔子|兰晓龙|老舍|乐嘉|李敖|李承鹏|李德林|李居明|李开复|李令彬|李佩甫|李师江|李叔同|李西闽|李欣频|李幺傻|李银河|李宗吾|厉以宁|连岳|梁凤仪|梁启超|梁实秋|梁文道|梁晓声|廖信忠|廖一梅|列夫·托尔斯泰|林长治|林徽因|林军|林少波|林少华|林夕|林奕华|林语堂|刘慈欣|刘军洛|刘亮程|刘猛|刘庆邦|刘世英|刘索拉|刘同|刘小川|刘心武|刘亚洲|刘彦斌|刘墉|刘震云|流沙河|柳暗花溟|六六|龙一|卢勤|陆琪|陆天明|路遥|闾丘露薇|罗贯中|罗西|罗永浩|马未都|马蔚华|马原|马悦凌|麦家|毛佩琦|茅盾|茅于轼|蒙曼|孟非|米兰·昆德拉|莫言|墨武|慕容雪村|拿破仑·希尔|那多|南怀瑾|南派三叔|闹闹女巫|欧·亨利|欧阳修|彭浩翔|蒲松龄|蒲志兰|七根胡|七堇年|启功|钱理群|钱文忠|秦文君|曲黎敏|人海中|任志强|芮成钢|三毛|申音|沈从文|沈宏非|师永刚|施叔青|石康|石钟山|时寒冰|史铁生|舒乙|司汤达|宋鸿兵|苏芩|苏童|苏小和|苏小懒|素黑|孙皓晖|孙穗芳|孙云晓|孙自筠|泰戈尔|唐骏|天下霸唱|铁凝|汪海林|汪曾祺|王安忆|王臣|王国维|王海鸰|王立群|王蒙|王强|王石|王树增|王小波|王晓方|王晓玉|王跃文|卫慧|魏晓霞|闻一多|吴比|吴承恩|吴淡如|吴甘霖|吴虹飞|吴清忠|吴思|吴晓波|吴晓求|伍美珍|雾满拦江|西岭雪|夏洛蒂·勃朗特|小妮子|熊培云|熊召政|徐德亮|徐贵祥|徐静蕾|徐则臣|徐志摩|许开祯|许知远|雪小禅|雪小禅|押沙龙|亚当·斯密|严歌苓|阎崇年|阎连科|杨红樱|杨澜|杨力|杨树标|杨志军|姚敏|叶倾城|叶圣陶|叶檀|叶文玲|叶永烈|叶兆言|易中天|尹建莉|瑛子|樱雪丸|于丹|于正|余光中|余华|余秋雨|余世存|俞平伯|郁达夫|袁敏|袁岳|约翰·格雷|约翰·梅纳德·凯恩斯|曾仕强|曾子航|詹姆斯·马丁|张德芬|张海迪|张恨水|张劲翀|张抗抗|张翎|张漫|张炜|张五常|张小平|张晓梅|张笑天|张怡筠|张治中|章太炎|赵本夫|赵冬苓|赵格羽|赵玫|赵瑜|赵忠祥|郑作时|中里巴人|重庆老康|周德东|周国平|周立波|周汝昌|周作人|朱德庸|朱光潜|朱军|朱苏进|朱晓平|朱自清|庄秦|庄雅婷|作业本|妖气君|";

        //  检测作者名单
        var strs= new Array(); //定义一数组
        strs = SenstiveWords.split("|"); //字符分割
        for (i=0;i<strs.length ;i++ )
        {
            if (strs[i] == str ) {
                return true;
            }
        }
        //  检测敏感词库
        if (kana.HasSenstiveWords(str)){
            return true;
        }

        return false;
    }

    ,getDomain: function(index){
        var _cfg_domain = "http://"+index+'.'+_cfg_domain_root;
        return _cfg_domain;
    }
    /*  加载登陆窗口  */
    ,loadLoginForm:function() {
        var args ={};
        this.getFile("body", this.getDomain('s') + '/form/LoginForm.html' ,args);
    }
    /*  加载验证窗口  */
    ,loadVerifyForm:function() {
        var args ={};
        this.getFile("body", this.getDomain('s') + '/form/SimpleLoginForm.html' ,args);
    }
    /*  加载作者登陆窗口  */
    ,loadAuthLoginForm:function() {
        var args ={};
        args['static'] = kana.getDomain('s');
        this.getFile("body", this.getDomain('s') + '/form/AuthorLoginForm.html' ,args);
    }
    /*  显示错误信息，如果存在跳转地址，则定时跳转   */
    ,showError:function(strErr,options) {
        if (typeof options === 'undefined')
            var args ={};
        else if ( options != '')
            var args = options;
        else
            var args ={};

        args['title'] = strErr ;



        if(typeof  args['msg'] === 'undefined' ) args['msg']='';
        if(typeof  args['url'] === 'undefined' ) args['url']='';
        if(typeof  args['url_name'] === 'undefined' ) args['url_name']='';

        this.getFile("body", this.getDomain('s') + '/form/MsgError.html' ,args);
    }
    /*  显示操作成功提示信息，如果存在跳转地址，则定时跳转   */
    ,showSuccess:function(strErr,options) {
        if (typeof options === 'undefined')
            var args ={};
        else if ( options != '')
            var args = options;
        else
            var args ={};

        args['title'] = strErr ;

        if(typeof  args['msg'] === 'undefined' ) args['msg']='';
        if(typeof  args['url'] === 'undefined' ) args['url']='';
        if(typeof  args['url_name'] === 'undefined' ) args['url_name']='';

        this.getFile("body", this.getDomain('s') + '/form/MsgSuccess.html' ,args);
    }
    ,showConfirm:function(strTitle,options){
        if (typeof options === 'undefined')
            var args ={};
        else if ( options != '')
            var args = options;
        else
            var args ={};

        args['title'] = strTitle ;
        args['static'] = kana.getDomain('s');
        this.getFile("body", this.getDomain('s') + '/form/ConfirmForm.html' ,args);
    }
    ,showConfirmNoValidate:function(strTitle,options){
        if (typeof options === 'undefined')
            var args ={};
        else if ( options != '')
            var args = options;
        else
            var args ={};

        args['title'] = strTitle ;
        args['static'] = kana.getDomain('s');
        this.getFile("body", this.getDomain('s') + '/form/ConfirmNoValidateForm.html' ,args);
    }
    ,showSendMessage:function(UserId,UserName,options){

        /*  检查 Cookie,为空则提示登录  */
        var loginUser = GPT.getCookieValue('UserId');
        if( (loginUser == false) || (loginUser == 0) || (loginUser == '') ){
            kana.loadLoginForm();
            return false;
        }
        if(loginUser == UserId){
            kana.showErrorLittle('自己不能给自己发消息！');
            return;
        }
        if (typeof options === 'undefined')
            var args ={};
        else if ( options != '')
            var args = options;
        else
            var args ={};

        args['UserId'] = UserId ;
        args['UserName'] = UserName ;
        args['static'] = kana.getDomain('s');

        this.getFile("body", this.getDomain('s') + '/form/SendMessage.html' ,args);
    }
    ,showRewardForm:function(ObjectType,ObjectId,Index,options){
        /*  检查 Cookie,为空则提示登录  */
        var loginUser = GPT.getCookieValue('UserId');
        if( (loginUser == false) || (loginUser == 0) || (loginUser == '') ){
            kana.loadLoginForm();
            return false;
        }

        var PostData = "ActionType=get";
        var result = GPT.sendAjax("/home/book/ajaxRewardAuthor", PostData);
        if (result.status == '0') {
            //kana.showError(result.info, {'msg': result.info, 'url': '', 'url_name': ''});
            kana.showErrorLittle(result.info);
            return;
        }
        //var balance = parseInt(result.info);
        var balance = result.info;

        if (typeof options === 'undefined')
            var args ={};
        else if ( options != '')
            var args = options;
        else
            var args ={};

        if(typeof  args['title'] === 'undefined' ) args['title']='打赏作者';

        args['objecttype'] = ObjectType ;
        args['objectid'] = ObjectId ;
        args['balance'] = balance ;
        args['index'] = Index;
        args['static'] = kana.getDomain('s');
        this.getFile("body", this.getDomain('s') + '/form/RewardForm.html' ,args);
    }
    ,showBookScoreForm:function(BookId,BookName,options){
        var loginUser = GPT.getCookieValue('UserId');
        if( (loginUser == false) || (loginUser == 0) || (loginUser == '') ){
            kana.loadLoginForm();
            return false;
        }

        var PostData = "ActionType=get&BookId="+BookId;
        var result = GPT.sendAjax("/home/book/ajaxSetBookScore",PostData);
        if(result.status == '0'){
            kana.showErrorLittle(result.info);
            return;
        }
        var ReadNum = result.info;

        if (typeof options === 'undefined')
            var args ={};
        else if ( options != '')
            var args = options;
        else
            var args ={};

        args['BookName'] = BookName ;
        args['BookId'] = BookId ;
        args['ReadNum'] = ReadNum ;
        args['static'] = kana.getDomain('s');

        this.getFile("body", this.getDomain('s') + '/form/BookScoreForm.html' ,args);
    }
    ,showChangeMobileForm:function(options){
        /*  检查 Cookie,为空则提示登录  */
        var loginUser = GPT.getCookieValue('UserId');
        if( (loginUser == false) || (loginUser == 0) || (loginUser == '') ){
            kana.loadLoginForm();
            return false;
        }

        if (typeof options === 'undefined')
            var args ={};
        else if ( options != '')
            var args = options;
        else
            var args ={};
        args['static'] = kana.getDomain('s');

        this.getFile("body", this.getDomain('s') + '/form/ChangeMobileForm.html' ,args);
    }

    /*确认删除ONE*/
    ,showConfirmOne:function(strTitle,msg,btnText,btnType){
        /*  检查 Cookie,为空则提示登录  */
        /*if(GPT.getCookieValue('UserId')==false)
             kana.loadLoginForm();
             return false;*/

        var args = {};
        args['title'] = strTitle;
        args['msg'] = msg;
        args['btnText'] = btnText;
        args['btnType'] = btnType;
        args['static'] = kana.getDomain('s');
        this.getFile("body", this.getDomain('s') + '/form/ConfirmOne.html' ,args);
    }
    /* 确认删除卷/取消*/
   ,showNoticeConfirm:function(strTitle,msg,url,url_name,btnText,btnType,fun_name){
        var args ={};
        args['title'] = strTitle;
        args['btnText'] = btnText;
        args['msg'] = msg;
        args['url'] = url;
        args['url_name'] = url_name;
        args['btnType'] = btnType;
        args['fun_name'] = fun_name;

        args['static'] = kana.getDomain('s');
        this.getFile("body", this.getDomain('s') + '/form/showNoticeConfirm.html' ,args);
   }
    /*      通知窗口 ：取消删除
      *     strTitle ： 标题
      *     msg      :  提示内容
      *     btnText  :   按钮文字
      *     btnType  :   按钮样式 :   btn-info, btn-warning, btn-success,
       * */
    ,showNotice:function(strTitle,msg,url,url_name,btnText,btnType,redirectUrl){
        var args ={};
        args['title'] = strTitle;
        args['msg'] = msg;
        args['url'] = url;
        args['url_name'] = url_name;
        args['btnText'] = btnText;
        args['btnType'] = btnType;
        args['redirectUrl'] = redirectUrl;
        args['static'] = kana.getDomain('s');
        this.getFile("body", this.getDomain('s') + '/form/Notice.html' ,args);
    }
    ,showConfirmForm:function(strTitle,msg,btnText,btnType,fun_name){
        var args ={};
        args['title'] = strTitle;
        args['msg'] = msg;
        args['btnText'] = btnText;
        args['btnType'] = btnType;
        args['funName'] = fun_name;
        args['static'] = kana.getDomain('s');
        this.getFile("body", this.getDomain('s') + '/form/showConfirmForm.html' ,args);
    }
    ,showPayConfirmForm:function(strTitle,msg,btnText,btnType,fun_name){
        var args ={};
        args['title'] = strTitle;
        args['msg'] = msg;
        args['btnText'] = btnText;
        args['btnType'] = btnType;
        //args['btn2Text'] = btn2Text;
        //args['btn2Type'] = btn2Type;
        args['fun_name'] = fun_name;

        args['static'] = kana.getDomain('s');
        this.getFile("body", this.getDomain('s') + '/form/showPayConfirmForm.html' ,args);
    }

    ,showConfirmFormOne:function(strTitle,msg,btnText,btnType){
        var args ={};
        args['title'] = strTitle;
        args['msg'] = msg;
        args['btnText'] = btnText;
        args['btnType'] = btnType;
        args['static'] = kana.getDomain('s');
        this.getFile("body", this.getDomain('s') + '/form/showConfirmFormOne.html' ,args);
    }

    /*错误提示*/
    ,showErrorForm:function(strTitle,url,url_name){
        var args ={};
        args['title'] = strTitle;
        args['url'] = url;
        args['url_name'] = url_name;
        args['static'] = kana.getDomain('s');
        this.getFile("body", this.getDomain('s') + '/form/ErrorForm.html' ,args);
    }
    /*成功提示*/
    ,showSuccessForm:function(strTitle,url,url_name){
        var args ={};
        args['title'] = strTitle;
        args['url'] = url;
        args['url_name'] = url_name;
        args['static'] = kana.getDomain('s');
        this.getFile("body", this.getDomain('s') + '/form/SuccessForm.html' ,args);
    }

    /* 成功提示小弹窗*/
    ,showSuccessLittle:function(strMsg){
        if($('#SuccessLittle').length>0){
            return false;
        }
        var args ={};
        args['msg'] = strMsg;
        args['static'] = kana.getDomain('s');
        this.getFile("body", this.getDomain('s') + '/form/SuccessLittle.html' ,args);
    }
    /*删除提示*/
    ,showDelConfirm:function(name,msg,btnText,btnType,callback){

            var args ={};
            args['name'] = name;
            args['msg'] = msg;
            args['btnText'] = btnText;
            args['btnType'] = btnType;
            args['callback'] = callback;
            args['static'] = kana.getDomain('s');

            this.getFile("body", this.getDomain('s') + '/form/showDelConfirm.html' ,args);
    }
    /* 失败提示小弹窗*/
    ,showErrorLittle:function(strMsg){
        if($('#ErrorMsgMain').length>0){
            return false;
        }
        var args ={};
        args['msg'] = strMsg;
        args['static'] = kana.getDomain('s');
        this.getFile("body", this.getDomain('s') + '/form/ErrorLittle.html' ,args);
    }

    /*
        音乐播放窗口
     */
    ,showMusicPlay:function(){
        var args ={};
        //var result = GPT.sendAjax("/community/ysindex/ajaxGetMusicList");
        //var d = result.info;
        //var html = '';
        //for(var i=0;i<d.length;i++){
        //    if(i==0){
        //        args['firstmusicname']=d[i].Title;
        //        args['firstmusicuser']=d[i].UserName;
        //        args['firstmusicimg']=d[i].YsWorksImg;
        //        args['firstmusicid']=d[i].WorksId;
        //        if(!d[i].Up){
        //            args['up']='musicBtn_max_zan_Hot';
        //        }else{
        //            args['up']='';
        //        }
        //
        //    }
        //    html += '<li class="clearfix music_li" id="li_'+d[i].WorksId+'">';
        //    html += '<textarea style="display: none;">'+d[i].WorksId+'</textarea>';
        //    html += '<input type="hidden" class="music_img" name="music_img" value="'+d[i].YsWorksImg+'">';
        //    html += '<div class="left musicList_main_song_name">'+d[i].Title+'</div>';
        //    html += '<div class="left musicList_main_singer_name">'+d[i].UserName+'</div>';
        //    html += '<div class="clearfix left musicList_main_R">';
        //    html += '<div class="left musicList_main_R_zan ';
        //    if(!d[i].Up){
        //        html += 'musicList_main_R_zan_Hot';
        //    }
        //    html += '" title="喜欢"></div>';
        //    html += '<div class="left musicList_main_R_share music_shareBtn" title="分享"></div>';
        //    html += '</div>';
        //    html += '</li>';
        //}
        //
        //args['musiclist'] = html;
        args['static'] = kana.getDomain('s');
        this.getFile("body", this.getDomain('s') + '/form/MusicPlay.html' ,args);
    }


    /*  生成用户头像，如果为空则使用默认头像  */
    ,getUserAvatar:function(Avatar,Sex,Action) {
        var exp = Avatar;
        if (!exp && typeof exp != "undefined" && exp != 0 || exp==''){
            if(Sex == 1){
               return kana.getDomain('s')+'/img/common/head/big_headman_default.png';
            }else{
               return kana.getDomain('s')+'/img/common/head/big_headwoman_default.png';
            }
        }else{
            if(Action > 0){
                return Avatar;
            }else {
                return kana.getDomain('a') + '/' + Avatar;
            }
        }
    }
    ,showBookCoverForm: function(options) {
        /*  权限检测?  */

        /*  检查 Cookie,为空则提示登录  */
        var loginUser = GPT.getCookieValue('UserId');
        if( (loginUser == false) || (loginUser == 0) || (loginUser == '') ){
            kana.loadLoginForm();
            return false;
        }

        if (typeof options === 'undefined')
            var args ={};
        else if ( options != '')
            var args = options;
        else
            var args ={};
        args['static'] = kana.getDomain('s');
        this.getFile("body", this.getDomain('s') + '/form/BookCoverForm.html' ,args);
    }
    //,getMessageCount: function() {
    //    var UserId = GPT.getCookieValue('UserId');
    //    if(UserId == false){
    //        return;
    //    }
    //    var url1=kana._uri+'/author/Ajax/ajaxGetMyMessage/'+UserId;
    //    $.ajax({
    //        method  :   'POST',
    //        url     :   url1,
    //        dataType:   'json'
    //    }).done(function (response){
    //        if (response.status=='success') {
    //            var messages=response.results;
    //            var strHtml="";
    //            var index=Math.min(messages.length,4);
    //            //alert(index);
    //            for(var i=0;i<index;i++) {
    //                if (i==0){
    //                    $('span[id="MessageNumbers"]').attr('MaxId',messages[i].MessageId);
    //                    strHtml = strHtml + '<li class="author_dwli" ><a href="/author/message/index">'+ messages[i].Title +'</a></li>';
    //                } else {
    //                    strHtml = strHtml + '<li><a href="/author/message/index">'+ messages[i].Title +'</a></li>';
    //                }
    //            }
    //
    //            if(messages.length>4) $('div[id="ViewMore"]').show();
    //            else                  $('div[id="ViewMore"]').hide();
    //
    //            //  ----    如果没有消息  ----
    //            if(messages.length==0) {
    //                $(".M_sp3").hide();
    //            }
    //            $("#mynews_num").html(index);
    //            //alert(strHtml);
    //            $('span[id="MessageNumbers"]').text(messages.length);
    //            $('ul[id="messagelist"]').html(strHtml);
    //        } else {
    //            alert('通信错误!');
    //        }
    //    });
    //}
    ////  获取用户未读消息数量
    //,getMessageCount: function() {
    //    var UserId = GPT.getCookieValue('UserId');
    //    if(UserId == false){
    //        return;
    //    }
    //    var url1=kana._uri+'/member/Ajax/ajaxGetMyMessage/'+UserId;
    //    $.ajax({
    //        method  :   'POST',
    //        url     :   url1,
    //        dataType:   'json'
    //    }).done(function (response){
    //        if (response.status=='success') {
    //            var messages=response.results;
    //            var strHtml="";
    //            var index=Math.min(messages.length,4);
    //            //alert(index);
    //            for(var i=0;i<index;i++) {
    //                if (i==0){
    //                    $('span[id="MessageNumbers"]').attr('MaxId',messages[i].MessageId);
    //                    strHtml = strHtml + '<li class="author_dwli" ><a href="/author/message/index">'+ messages[i].Title +'</a></li>';
    //                } else {
    //                    strHtml = strHtml + '<li><a href="/author/message/index">'+ messages[i].Title +'</a></li>';
    //                }
    //            }
    //
    //            if(messages.length>4) $('div[id="ViewMore"]').show();
    //            else                  $('div[id="ViewMore"]').hide();
    //
    //            //  ----    如果没有消息  ----
    //            if(messages.length==0) {
    //                $(".M_sp3").hide();
    //            }
    //            $("#mynews_num").html(index);
    //            //alert(strHtml);
    //            $('span[id="MessageNumbers"]').text(messages.length);
    //            $('ul[id="messagelist"]').html(strHtml);
    //        } else {
    //            alert('通信错误!');
    //        }
    //    });
    //}
    ////  ----    检测新消息    ----
    //,getNewMessage:function(userid,maxMessageId){
    //    //alert(maxMessageId);
    //    var url1=kana._uri+'/author/Ajax/ajaxGetNewMessage/'+userid+'/'+maxMessageId ;
    //    //alert(url1);
    //    $.ajax({
    //        method  :   'POST',
    //        url     :   url1,
    //        dataType:   'json'
    //    }).done(function (response){
    //        if (response.status=='success') {
    //            var messages=response.results;
    //            var strHtml="";
    //            var index=messages.length;
    //            //alert('您有' + index + '条新消息！');
    //
    //            for(var i=0;i<index;i++) {
    //                if (i==0){
    //                    strHtml = strHtml + '<li class="author_dwli" ><a href="#2">'+ messages[i].Title +'</a></li>';
    //                } else {
    //                    strHtml = strHtml + '<li><a href="#2">'+ messages[i].Title +'</a></li>';
    //                }
    //            }
    //
    //            //  ----    如果有新消息,如果下拉箭头是隐藏的，要显示出来  ----
    //            if(messages.length>0) {
    //                $(".M_sp3").show();
    //            }
    //
    //            //alert(strHtml);
    //            //$('span[id="MessageNumbers"]').text(messages.length);
    //            //$('ul[id="messagelist"]').append(strHtml);
    //        } else {
    //            alert('通信错误!');
    //        }
    //    });
    //}
    ,ToDBC: function(txtstring){
        var tmp = "";

        for(var i=0;i<txtstring.length;i++)
        {
            if(txtstring.charCodeAt(i)==32) {
                tmp= tmp+ String.fromCharCode(12288);
            } else if((txtstring.charCodeAt(i)>32) && (txtstring.charCodeAt(i)<64)) {
                tmp = tmp + String.fromCharCode(txtstring.charCodeAt(i) + 65248);
            }else if((txtstring.charCodeAt(i)>122) && (txtstring.charCodeAt(i)<127)) {
                tmp = tmp + String.fromCharCode(txtstring.charCodeAt(i) + 65248);
            } else {
                tmp = tmp + txtstring[i];
            }
        }

        return tmp;
    }
    ,ToCDB: function(str){
        var tmp = "";
        for(var i=0;i<str.length;i++)
        {
            if(str.charCodeAt(i)>65248&&str.charCodeAt(i)<65375) {
                tmp += String.fromCharCode(str.charCodeAt(i)-65248);
            } else {
                tmp += String.fromCharCode(str.charCodeAt(i));
            }
        }
        return tmp
    }
    //  ----    统计字符长度：英文及半角字符算0.5个字符  ----
    ,countWords: function (str) {

        if ((str == "说点什么~") || (str == "打赏寄语") || (str == "祝大家阅读愉快") || (str == "请注意文明用语(●'◡'●)ﾉ♥") || (str == "请把你的心情留下来") || (str == "请输入拒绝理由") || (str == "请输入举报理由") || (str == "请输入理由")){
            return 0 ;
        }

        var totalCount = 0;
        for (var i=0; i<str.length; i++) {
            var c = str.charCodeAt(i);
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
                totalCount++;
            }else {
                totalCount+=2;
            }
        }
        return parseInt(totalCount / 2);
    }
    ,subContent: function (str,len) {

        var totalCount = 0;
        var result= '';

        for (var i=0; i<str.length; i++) {
            var c = str.charCodeAt(i);
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
                totalCount++;
            }else {
                totalCount+=2;
            }
            result = result + str.substring(i,i+1);

            if (totalCount == len*2)
                break;

        }

        return result;
    }

    //  ----    显示发帖时间(段)
    ,countPostHistory: function(strTime){
        var now=new Date();
        var duration=now - strTime;
        duration=Math.floor(duration/(60*1000));
        strResult='1分钟前';
        if(duration>(24*40)) {
            strResult='1天前';
        } else if (duration>605) {
            strResult='60分钟前';
        } else if (duration>30) {
            strResult='30分钟前';
        } else if (duration>10) {
            strResult='10分钟前';
        } else if (duration>1) {
            strResult='1分钟前';
        } else {
            strResult='刚刚';
        }
        //document.write(strResult);
        return strResult;
    }
    //  ----    一键排版    ----
    ,reArrage : function(txtval) {
          //var txtval=element.val();
        //alert(txtval);
            var newStr="";
            var char1=""
            var IsNewLine=0;
            for (var i = 0; i < txtval.length; i++) {
                char1=txtval.charCodeAt(i);
                //console.log(char1);
                if ( (char1==13) || (char1==10) ) {     //  换行
                    IsNewLine=1
                } else if ( (char1>32) && (char1!=12288) ) {                                //  文字部分,去除全角空格
                    if (IsNewLine==1) {                 //  新段落
                        //newStr  =newStr +"\n\n    " + txtval.charAt(i);
                        newStr  =newStr +"</p><p>" + txtval.charAt(i);
                        IsNewLine=0;
                    } else {
                        newStr  =newStr + txtval.charAt(i);
                    }
                }
            }

            //if(newStr.trim()!='') element.val(newStr);
        return newStr;
    }
    /*  异步加载文件/窗体, 对于频繁调用的窗体需要进行判断是否存在！
     *  element:    需要添加内容的元素， eg: body
     *  url    :    需要加载的文件地址
     *  para1  :    需要传递的参数，文件加载后替换相应名称为对应的值
     * */
    ,getFile:function(element,url,args) {

        function createCORSRequest(method, url){
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr){
                xhr.open(method, url, true);
            } else if (typeof XDomainRequest != "undefined"){
                xhr = new XDomainRequest();
                xhr.open(method, url);
            } else {
                xhr = null;
            }
            return xhr;
        }

        var request= createCORSRequest("get", url);
        if (request){
            request.onload = function(){
                var strHtml = request.responseText ;

                for(var key in args) {
                    if((typeof  args[key] == 'string')||(typeof  args[key] == 'number')){
                        strHtml = strHtml.replace(new RegExp(new RegExp('{{'+key+'}}','g')),args[key]);
                    }
                    else if (typeof  args[key] == 'function' ){
                        strHtml = strHtml.replace('{{'+key+'}}',args[key].toString());
                    }
                }
                //alert(strHtml);
                //return ;

                $(element).append(strHtml);
            };
            request.send();
        }
    }

    ,addCallbacks: function()
    {

        $('#Mobile').bind('blur',kana.checkMobile);
        //$('.more').bind('click',kana.GetMoreChapters);
        $('.more').each(function(position, element) {     //  ----    显示多卷时用  ----
            $(element).bind('click', {element: position}, kana.GetMoreChapters);
        });
        $('[edit="true"]').each(function(position,element){
            //alert(position);
            $(element).bind('click',{ element:element },kana.showEdit);
        });

    }

    /**
     * Initializes the view (highlighters, callbacks, etc)
     */
    ,initializeView: function(uri)
    {
        kana._uri = uri;
        kana.addCallbacks();
    }

    ,getQueryString:function getQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]);
        return false;
    }
    /**
     * 更新用户seesion
     * @param force 是否强制更新
     * @return
     */
    ,updateSession:function(force){
        var UserId = GPT.getCookieValue('UserId');
        var url1=kana._uri+'/home/log/ajaxMemberSession/'+UserId;
        if(UserId>0){
            var sessionStatus=GPT.getCookieValue('sessionStatus');
            if(sessionStatus==undefined || sessionStatus==null || force===true){
                $.cookie('sessionStatus', '2',{ expires: 25, path: '/', domain: '.'+_cfg_domain_root});
                $.ajax({
                    type: "GET",
                    url:url1,
                    data:{force:force,title:document.title,url:location.href},
                    dataType:'json',
                    cache:false,
                    repeat:false,
                    repeatKey:'passport:updateSession',
                    success:function(o){
                        if(o.status!=-100){
                            $.cookie('sessionStatus', '1',{ expires: 200, path: '/', domain: '.'+_cfg_domain_root});
                        }
                        if(o.status>0){

                        }else{
                            if(o.status==-100){
                                //kana.showSuccess('登录提示',{'msg':o.info,'url':'','url_name':''});
                                kana.showNotice('登录提示', o.info,'','','知道了','btn-warning');
                            }else{
                                //kana.showSuccess('登录提示',{'msg':o.info,'url':'','url_name':''});
                                kana.showNotice('登录提示', o.info,'','','知道了','btn-warning');
                            }
                        }

                    },error:function(){}
                });
            }
        }
    }
    ,flushPopMsg:function (){
        var popStr=GPT.getCookieValue('popMsg');

        if (popStr == null) {
            return;
        } else if (popStr == undefined) {
            return;
        } else if(popStr == '') {
            return;
        }

        //kana.showSuccessLittle(popStr);
        //$("#SuccessLittle #fade").remove();
        console.log(popStr);

        $.cookie('popMsg','',{path: '/'});
    }
    /**
     * @param page 翻页
     * @param callback
     */
    ,pageSend:function (page){
        ajaxPage(page);
    }
    /**
     *
     * @param page 填写page 跳转
     * @param callback
     */
    ,pageDirect:function () {
        var pageNum = $('#directPageNum').val();
        if( pageNum < 1 ){
            return false;
        }
        ajaxPage(pageNum);
    }
    /*  管理员操作
     *   OpObject: 区块，操作的区域
     *   OpType  : 操作功能代码，见功能对应表
     *   OpItemId: 操作的记录Id
     *   */
    ,AdminOp: function(OpObject,OpType,OpItemId){
        var loginUser = GPT.getCookieValue('UserId');
        if( (loginUser == false) || (loginUser == 0) || (loginUser == '') ){
            kana.loadLoginForm();
            return false;
        }

        var title = '操作提示';
        var content = '';

        switch (OpType){
            case 10:
                content = '确定要置顶吗？';
                break;
            case 11:
                content = '确定取消置顶吗？';
                break;
            case 12:
                content = '确定锁帖吗？锁定之后将无法回复。';
                break;
            case 13:
                content = '确定取消锁帖吗？';
                break;
            case 16:
                content = '确定加精吗？';
                break;
            case 17:
                content = '确定取消精华吗？';
                break;
            case 50:
                content = '确定取消精华吗？';
                break;
            case 51:
                content = '确定取消精华吗？';
                break;
        }
        var strCallback ="kana.AdminAct(" + OpObject + ","+ OpType + "," + OpItemId + ");";
        kana.showConfirmForm(title,content,'确定','btn-warning',strCallback);

    }
    /*  管理员操作
     *   OpObject: 区块，操作的区域
     *   OpType  : 操作功能代码，见功能对应表
     *   OpItemId: 操作的记录Id
     *   */
    ,AdminAct: function(OpObject,OpType,OpItemId){
        var url1 = "/home/log/ajaxAdminOp/" +OpObject + '/' + OpType + '/' + OpItemId;
        var result = GPT.sendAjax(url1,'');
        var msg = '操作成功';

        if( result.status > 0 ) {
            switch (OpType){
                case 10:
                    msg = '置顶成功';
                    break;
                case 11:
                    msg = '取消置顶成功';
                    break;
                case 12:
                    msg = '锁帖成功';
                    break;
                case 13:
                    msg = '取消锁帖成功';
                    break;
                case 16:
                    msg = '加精成功';
                    break;
                case 17:
                    msg = '取消加精成功';
                    break;
            }
            $('#ConfirmForm').remove();
            kana.showSuccessLittle(msg);
            setTimeout("window.location.reload()",3000);
        }else if( result.status == -101 ){
            msg = '无法解除高级管理员的操作';
            $('#ConfirmForm').remove();
            kana.showErrorLittle(msg);
            return false;
        }else{
            switch (OpType){
                case 10:
                    msg = '置顶失败';
                    break;
                case 11:
                    msg = '取消置顶失败';
                    break;
                case 12:
                    msg = '锁帖失败';
                    break;
                case 13:
                    msg = '取消锁帖失败';
                    break;
                case 16:
                    msg = '加精失败';
                    break;
                case 17:
                    msg = '取消加精失败';
                    break;
            }
            $('#ConfirmForm').remove();
            kana.showErrorLittle(msg);
            return false;
        }
    }
    /**
     * 通知系统的数量刷新（包括新短信，新系统短信，新粉丝，新漫画更新）
     * @return
     */
    ,getNotifyCount: function(){
        var userId = GPT.getCookieValue('UserId');
        if(userId == null || userId ==0){
           return;
        }
        var counts=GPT.getCookieValue('notice');
        if(counts==null){
            $.ajax({
                type: "GET",
                url:"/home/ajax/ajaxGetNotice/",
                cache:false,
                dataType:'json',
                success:function(o){
                    kana.flushNotifyCount(o.counts);
                }
            });
        }else{
            kana.flushNotifyCount(counts);
        }

    }
    ,flushNotifyCount: function(counts){
        counts=counts.split(':');

        if(counts[0] > 0){
            $("#MsgNum").html(counts[0]+ '<i class="topBarR_R_div_icon"></i>');
        } else {
            $("#MsgNum").html('0');
        }
        //  书架提示
        if(counts[1] > 0){
            $("#bookshelf").html(counts[1]+ '<i class="topBarR_R_div_icon"></i>');
        } else {
            $("#bookshelf").html('0');
        }
        //  书评提示
        if(counts[2] > 0){
            $("#bookcomment").html(counts[2]+ '<i class="topBarR_R_div_icon"></i>');
        } else {
            $("#bookcomment").html('0');
        }

        //  回复提示
        if(counts[3] > 0){
            $("#commentNew").text(counts[3]);
        }else{
            $("#myCommentTitle").hide();
        }
        if(counts[4] > 0){
            $("#bbsNew").text(counts[4]);
        }else{
            $("#myBbsTitle").hide();
        }
        if(counts[0] > 0){
            $("#messageNew").text(counts[0]);
        }else{
            $("#myMessageTitle").hide();
        }

        if((counts[0]+counts[3]+counts[4])<=0){
            $(".IDphoto_Title").css('display','none');

        }else{
            $(".IDphoto_Title").css('display','block');
            $(".IDphoto").hover(function(){
                $(this).find(".IDphoto_Title").show();
            },function(){
                $(this).find(".IDphoto_Title").hide();
            });
        }

        ////  酒馆回复提示
        //if(counts[4] > 0){
        //    kana.showSuccessLittle('有'+counts[4]+'条回复!');
        //} else {
        //    //$("#bookcomment").html('0');
        //}


    }
};

var GPT = {
    getParam: function (par){
        //获取当前URL
        var local_url = document.location.href;
        //获取要取得的get参数位置
        var get = local_url.indexOf(par +"=");
        if(get == -1){
            return false;
        }
        //截取字符串
        var get_par = local_url.slice(par.length + get + 1);
        //判断截取后的字符串是否还有其他get参数
        var nextPar = get_par.indexOf("&");
        if(nextPar != -1){
            get_par = get_par.slice(0, nextPar);
        }
        return get_par;
    }

    /*  表情、打赏图标、打赏数字<i>   */
    ,ReplaceUBBLink: function ReplaceUBBLink(strContent)
    {
        var emotions = Array('微笑','大哭','呆傻','得意','发怒','害羞','汗颜','坏笑','金馆长','挖鼻屎','卖萌','媚眼','喷水','大哭','亲嘴','神烦狗','生气','委屈','笑哭了','心心眼','疑问','晕了','惊讶','蜡烛','赞')
        if(strContent.length<1) return strContent;
        for(var i=1 ;i<=25; i++){
            var UBBCode = '\\[EM01_'+i+'\\]';
            UBBCode = RegExp(UBBCode,'gm');
            URL1 = '<img src="'+ kana.getDomain('s') +'/img/common/emotions/emotion01/img_'+i+'.png" title="'+ emotions[i-1] +'" style="margin-left:2px" />';
            strContent = strContent.replace(UBBCode,URL1);
        }

        var emotions = Array('投食','壁咚','推倒','生猴子');
        //if(strContent.length<1) return strContent;
        for(var i=1 ;i<=4; i++){
            var UBBCode = '\\[Reward01_'+i+'\\]';
            UBBCode = RegExp(UBBCode,'gm');
            URL1 = '<div class="giftPic"><img src="'+ kana.getDomain('s') +'/img/common/emotions/gifts/img_'+i+'.png" title="'+ emotions[i-1] +'" style="margin-left:2px" /></div>';
            //URL1 = '<div class="giftPic"><img src="'+ kana.getDomain('s') +'/img/common/emotions/gifts/img_'+i+'.png" style="margin-left:2px" /><div class="gift_Title"><div class="clearfix gift_Title_In"><div class="left authorDs_L"></div><div class="left authorDs_C">蓑衣烟雨中 给作者投食了 <span class="gift_Member">2</span> 次</div><div class="left authorDs_R"></div><div class="authorDs_jiao"></div></div></div></div>';
            strContent = strContent.replace(UBBCode,URL1);
        }

        UBBCode = RegExp('<i>','gm');
        strContent = strContent.replace(UBBCode,'<i class="GiftNum">');

        return strContent;

    }
    /*  表情、打赏图标、打赏数字<i>   */
    ,ReplaceSmallUBBLink: function ReplaceSmallUBBLink(strContent)
    {
        var emotions = Array('微笑','大哭','呆傻','得意','发怒','害羞','汗颜','坏笑','金馆长','挖鼻屎','卖萌','媚眼','喷水','大哭','亲嘴','神烦狗','生气','委屈','笑哭了','心心眼','疑问','晕了','惊讶','蜡烛','赞')
        if(strContent.length<1) return strContent;
        for(var i=1 ;i<=25; i++){
            var UBBCode = '\\[EM01_'+i+'\\]';
            UBBCode = RegExp(UBBCode,'gm');
            URL1 = '<img src="'+ kana.getDomain('s') +'/img/common/emotions/emotion01/imgMini_'+i+'.png" title="'+ emotions[i-1] +'" style="margin-left:2px" />';
            strContent = strContent.replace(UBBCode,URL1);
        }

        var emotions = Array('投食','壁咚','推倒','生猴子');
        //if(strContent.length<1) return strContent;
        for(var i=1 ;i<=4; i++){
            var UBBCode = '\\[Reward01_'+i+'\\]';
            UBBCode = RegExp(UBBCode,'gm');
            URL1 = '<div class="giftPic"><img src="'+ kana.getDomain('s') +'/img/common/emotions/gifts/imgMini_'+i+'.png" title="'+ emotions[i-1] +'" style="margin-left:2px" /></div>';
            //URL1 = '<div class="giftPic"><img src="'+ kana.getDomain('s') +'/img/common/emotions/gifts/img_'+i+'.png" style="margin-left:2px" /><div class="gift_Title"><div class="clearfix gift_Title_In"><div class="left authorDs_L"></div><div class="left authorDs_C">蓑衣烟雨中 给作者投食了 <span class="gift_Member">2</span> 次</div><div class="left authorDs_R"></div><div class="authorDs_jiao"></div></div></div></div>';
            strContent = strContent.replace(UBBCode,URL1);
        }

        UBBCode = RegExp('<i>','gm');
        strContent = strContent.replace(UBBCode,'<i class="GiftNum">');

        return strContent;

    }

    /*  限定输入框输入数字  */
    ,bindInputLimitFunction: function(){
        $("[inputchk='1']").each(function(){
            var maxAmount = $(this).attr('max');
            /*  绑定按键事件  */
            $(this).keypress(function(event){
                //return /^d$/.test(String.fromCharCode(event.keyCode));
                var keyCode = event.which;

                if (keyCode == 46 || keyCode == 8 || (keyCode >= 48 && keyCode <=57))
                    //if(parseFloat($(this).val()) <= maxAmount)
                        return true;
                    //else
                    //    return false
                else
                    return false;
            });

            /*  绑定失去焦点事件  */
            $(this).change(function(){
                $(this)[0].value = $(this)[0].value.replace(/d+/ig, "");
            });
        })
    }
    /*  通用字符统计 && 限制
     *   <textarea id="textarea" limit="1" words="50" wordcount="wordsNum" >打赏寄语</textarea>
     *   <span id="wordsNum">0</span>/50
     *   */
    ,bindLimitFunction: function(){
        $("[limit='1']").each(function(){

            /*  初始化显示字符串长度  */

            //if (($(this).val() != "说点什么~") && ($(this).val() != "说点什么") ){

                var maxLen = $(this).attr('words');
                var counter = $(this).attr('wordcount');
                var isDiv = false;
                var Nums = kana.countWords($(this).val());

                if( ($(this).get(0).tagName =="DIV") || ($(this).get(0).tagName == 'div') ){
                    isDiv = true;
                    var Nums =kana.countWords(GPT.trim($(this).text()));
                    Nums = Nums + $(this).find('img').length * 2 ;
                }

                if(Nums> maxLen) {
                    if(isDiv){
                        //$(this).html($(this).val().substr(0,maxLen));
                        $('#'+counter).html(Nums);
                        $('#'+counter).css('color','red');
                    }else{
                        $(this).val(kana.subContent($(this).val(),maxLen));
                        $('#'+counter).html(maxLen);
                        $('#'+counter).css('color','red');
                    }

                } else {
                    $('#'+counter).html(Nums);
                    $('#'+counter).css('color','');
                }

            //}

            /*  绑定按键事件  */
            $(this).keyup(function(){
                var maxLen = $(this).attr('words');
                var counter = $(this).attr('wordcount');
                var isDiv = false;
                var Nums = kana.countWords($(this).val());

                if( ($(this).get(0).tagName =="DIV") || ($(this).get(0).tagName == 'div') ){
                    isDiv = true;
                    var Nums =kana.countWords(GPT.trim($(this).text()));
                    Nums = Nums + $(this).find('img').length * 2 ;
                }
                /*  substract */
                if(Nums> maxLen) {
                    if(isDiv){
                        //$(this).html($(this).val().substr(0,maxLen));
                    }else{
                        //$(this).val(kana.subContent($(this).val(),maxLen));
                        Nums = kana.countWords($(this).val());
                    }

                }
               /*   display results */
                if(Nums> maxLen) {
                    $('#'+counter).html(Nums);
                    $('#'+counter).css('color','red');
                } else {
                    $('#'+counter).html(Nums);
                    $('#'+counter).css('color','');
                }

            })

            $(this).change(function(){
                var maxLen = $(this).attr('words');
                var counter = $(this).attr('wordcount')

                //var Nums = kana.countWords(GPT.trim($(this).text()));
                var Nums = kana.countWords(GPT.trim($(this).val()));

                if(Nums> maxLen) {
                    $(this).val(kana.subContent($(this).val(),maxLen));
                    $('#'+counter).html(maxLen);
                    $('#'+counter).css('color','');
                } else {
                    $('#'+counter).html(Nums);
                    $('#'+counter).css('color','');
                }
            })
        })
    }
    /*  DIV编辑内容字数统计（2个字符算一个，表情算2个），与上述计算方法一致   */
    ,DivContentCount:function(item){

        var maxLen = $('#'+item).attr('words');
        var counter = $('#'+item).attr('wordcount')
        var Nums =kana.countWords(GPT.trim($('#'+item).text()));
        Nums = Nums + $('#'+item).find('img').length * 2 ;
        $('#'+counter).html(Nums);
        return Nums;
    }
    ,bindPicturePlugin: function() {
        if($('img[href]').length>0){

            $('img[href]').click(function(){

                var imgUrl = $(this).attr('href');
                var Html = '<div class="white_content6" id="picbox" style="display: block;top:50%;width:auto;height:auto; overflow: hidden; border:0;">'+
                    '<img src="'+imgUrl+'" style="display:none"  />'+
                    '<a href = "javascript:;" class="closeDown" onclick = "javascript:$(\'#picboxfade\').remove(); $(\'#picbox\').remove();" style="width: 44px; line-height: 14px; color:#fff; position: absolute; top:0; right:0;">'+
                    '<i class="left imgCloseDown_Icon"></i>'+
                    '<span class="left">关闭</span>'+
                    '</a>'+
                    '</div>'+
                    '<div id="picboxfade"  class="transparent_bg" onclick="javascript:$(\'#picboxfade\').remove(); $(\'#picbox\').remove();" style="display: block; position: absolute; background-color: black;height: 100%;left: 0;opacity: 0.6;top: 0;width: 100%;z-index: 1001"></div>'
                $("body").append(Html);

                //增加显示效果
                $('#picbox').find('img').fadeIn(100,function(){
                    var imgHeight = $("#picbox").find("img").height();
                    var imgWidth = $("#picbox").find("img").width();
                    $("#picbox").css("margin-top",-imgHeight/2);
                    $("#picbox").css("margin-left",-imgWidth/2);
                });
            })
        }
    }

    /**
     * 从 file 域获取 本地图片 url
     */
    ,getFileUrl: function getFileUrl(sourceId) {
    	
    	//修复sourceId所在的元素不存在的时候IE报错
        var sourceEl = document.getElementById(sourceId);
        if(null==sourceEl || typeof(sourceEl)==undefined){
        	return "";
        }

        var url;
    	if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
            url = document.getElementById(sourceId).value;
            //alert(url);
        } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
            url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
        } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
            url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
        }
        return url;
    }
    /**
     * 将本地图片 显示到浏览器上, 需要用到getFileUrl
     */
    ,showLocalPicture: function showLocalPicture(sourceId, targetId) {
        var url = this.getFileUrl(sourceId);
        var imgPre = document.getElementById(targetId);
        imgPre.src = url;
    }
    ,IsNotNull: function (exp) {
        if (!exp && typeof exp != "undefined" && exp != 0)
        {
            return true;
        } else {
            return false;
        }

    }
    /* 删除所有空格 */
    ,trim: function (str){
        return str.replace(/\s/g,"");
    }
    /*  去掉所有的html标记 */
    ,stripHtml: function(str) {
        return str.replace(/<[^>]+>/g,"");
    }
    ,UserType: function (str) {
        var email = /^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9]+\.[a-z]{2,3}$/;
        var mobile = /^1[34578]{1}[0123456789]{1}\d{8}$|1[34578]{1}[01256]{1}\d{8}$|1[3578]{1}[01379]{1}\d{8}$/;
        var result = '';
        str = GPT.trim(str);
        if ( str == '') {
            return false;
        }
        if (email.test(str)) {
            result = 'Email';
            return result;
        }
        if (mobile.test(str)) {
            result = 'Mobile';
            return result;
        }
    }
    ,isMobile: function () {
        var str = $(this).val();
        var tag = $(this).attr('id');
        str = GPT.trim(str);
        var mobile = /^1[34578]{1}[0123456789]{1}\d{8}$|1[34578]{1}[01256]{1}\d{8}$|1[3578]{1}[01379]{1}\d{8}$/;

        if ( str == '') {
           return false;
        }
        if ( !mobile.test(str) ) {
            return false;
        }
        return true;
    }
    ,isRealName: function (str) {
        alert(str);
    },
    /* 检验表单 */
    checkForm: function (form_id) {
        var check_flag = true;
        $("#" + form_id + " :input").each(function (i) {
            if ($(this).attr("check")) {
                if (!GPT.validate($(this).val(), $(this).attr("check"))) {
                    $("#" + $(this).attr("id") + "_info").html($(this).attr("msg"));
                    $("#" + $(this).attr("id") + "_wrongBox").show();
                    $("#" + $(this).attr("id") + "_wrongBox").siblings(".wrongBox").hide();
                    check_flag = false;
                    return check_flag;
                }else{
                    $("#" + $(this).attr("id") + "_wrongBox").hide();
                }
            }
        })
        return check_flag;
    },

    /* 验证数据类型*/
    validate: function (data, datatype) {
        if (datatype.indexOf("|")) {
            tmp = datatype.split("|");
            datatype = tmp[0];
            data2 = tmp[1];
        }
        //data = GPT.trim(data);
        switch (datatype) {
            case "login":
                data = GPT.trim(data);
                if (data == "请输入手机号或邮箱") {
                    return false;
                } else {
                    return true;
                }
                break;
            case "require":
                data = GPT.trim(data);
                if (data == "") {
                    return false;
                } else {
                    return true;
                }
                break;
            case "email":
                data = GPT.trim(data);
                var reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
                return reg.test(data);
                break;
            case "number":
                data = GPT.trim(data);
                var reg = /^[0-9]+\.{0,1}[0-9]{0,3}$/;
                return reg.test(data);
                break;
            case "html":
                var reg = /<...>/;
                return reg.test(data);
                break;
            case "eqt":
                var oriData = $("#" + data2).val();
                if( data == oriData ){
                    return true;
                }else{
                    return false;
                }
                break;
            case "register_username":
                data = GPT.trim(data);
                if (data == "输入手机号或邮箱注册") {
                    return false;
                } else {
                    return true;
                }
                break;
            case "register_nickame":
                data = GPT.trim(data);
                if (data == "请输入昵称") {
                    return false;
                } else {
                    return true;
                }
                break;
            case "register_smscode":
                data = GPT.trim(data);
                if (data == "请输入手机收到的验证码") {
                    return false;
                } else {
                    return true;
                }
                break;
            case "register_password":
                data = GPT.trim(data);
                if (data == "设置密码") {
                    return false;
                } else {
                    return true;
                }
                break;
        }
    },
    /* 删除所有空格 */
    trim: function (str){
        return str.replace(/\s/g,"");
    }
    /*提交表单*/
    ,SubmitForm: function (formId, post_url) {
        if ($("#ajax").val() == 1) {
            var flag = false;
            var vars = $("#" + formId).serialize();
            $.ajax({
                type: "POST",
                url: post_url,
                data: vars,
                dataType: "json",
                success: function (data) {
                    if (data.status) {
                        //alert('发布成功');
                        $("#" + formId)[0].reset();
                        //$("#upload_form")[0].reset();
                    } else {
                        //alert(data.info);
                        flag = false;
                    }
                }
            });
            return flag;
        }
    }
    ,sendForm: function (formId, post_url, return_url) {
        if ($("#ajax").val() == 1) {
            var flag = false;
            var vars = $("#" + formId).serialize();
            $.ajax({
                type: "POST",
                url: post_url,
                data: vars,
                dataType: "json",
                success: function (data) {
                    //alert(data.info);
                    if (data.status) {
                        if (data.info) {
                            $("#notice_info").html(data.info);
                            $("#notice_info").show();
                        }
                        if (data.return_url) {
                            setTimeout("window.location.href='" + data.return_url + "'", 3000);
                        }
                        if(return_url){
                            setTimeout("window.location.href='" + return_url + "'", 3000);
                        }
                    } else {
                        if( data.code ){
                            $('#validate_code').show();
                        }
                        $("#" + data.tag + "_info").html(data.info);
                        $("#" + data.tag + "_info").css('color','#f45b5b');
                        $("#" + data.tag + "_info").show();
                        $("#" + data.tag + "_info").fadeOut(2500);
                        $("#" + data.tag).focus();
                        flag = false;
                    }
                }
            });
            return flag;
        } else {
            $("#" + formId).attr("action", post_url);
            if (return_url) {
                set_cookie('return_url', return_url);
            }
            $("#" + formId).submit();
        }
    }
    ,sendAjax : function (url, vars) {
        var result = '';
        $.ajax({
            type : "post",
            url : url,
            data : vars ,
            dataType : "json",
            async: false,
            success : function (data){
                result = data;
            }
        });
        return result;
    }
    ,loginUrl: function (lClass,rClass) {
        //var url = href + "?returnUrl="+window.location.href;
        if( lClass == '' && rClass == ''){
            lClass='left LoginL';
            rClass='right LoginR';
        }

        var html = '';
        html += '<a href="'+kana.getDomain('www')+'/home/passport/login?returnUrl='+encodeURIComponent(window.location.href)+'" class="'+ lClass +'">登录 <div class="right"></div></a>';
        html += '<a href="'+kana.getDomain('www')+'/home/passport/register?returnUrl='+encodeURIComponent(window.location.href)+'" class="'+ rClass +'"> 注册 </a>';
        document.write(html);
    }
    //获取指定下标的cookie的值
    ,getUser: function (key){
        var c_name = 'userkey';

        var arr = new Array();
        var c_start = document.cookie.indexOf(c_name+"=");      /*这里因为传进来的的参数就是带引号的字符串，所以c_name可以不用加引号*/
        if( c_start == -1 ){
            var c_name = 'userinfo';
            var c_start = document.cookie.indexOf(c_name+"=");
        }
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);  /*当indexOf()带2个参数时，第二个代表其实位置，参数是数字，这个数字可以加引号也可以不加（最好还是别加吧）*/
            if (c_end == -1) {
                c_end = document.cookie.length;
            }

            var str =  unescape(document.cookie.substring(c_start, c_end));
            arr = str.split('|');
            return decodeURI(arr[key]);
        }else{
            return '';
        }
    }
    /* 取Cookie值 */
    ,getCookieValue : function (key){
        if( key != '' ){
            switch (key){
                case "NickName":
                    return ( GPT.getUser(0));
                    break;
                case "LoginName":
                    return ( GPT.getUser(1));
                    break;
                case "UserId":
                    var userId = GPT.getUser(3) ;
                    if ((userId == '') || (userId == 0) || (userId == 'undefined' ) || (userId == undefined ) || (userId == null) )
                        userId = 0;
                    
                    return ( userId );
                    break;
                case "QQ":
                    return ( GPT.getUser(4));
                    break;
                case "Sex":
                    return ( GPT.getUser(5));
                    break;
                case "RegTime":
                    return ( GPT.getUser(6));
                    break;
                case "Group":
                    return ( GPT.getUser(7));
                    break;
                case "Avatar":
                    return ( GPT.getUser(8));
                    break;
                case "Mobile":
                    return ( GPT.getUser(9));
                    break;
                case "Email":
                    return ( GPT.getUser(10));
                    break;
                case "IsAuthor":
                    return ( GPT.getUser(11));
                    break;
                case "IsVip":
                    return ( GPT.getUser(12));
                    break;
                case "UserGroup":
                    return ( GPT.getUser(13));
                    break;
                case "AuthorName":
                    return ( GPT.getUser(16));
                    break;
                case "sessionStatus":
                    return $.cookie('sessionStatus');
                    break;
                case "popMsg":
                    return $.cookie('popMsg');
                    break;
                case 'AuthId':
                    return (GPT.getAuth(0));
                    break;
                case 'AuthName':
                    return (GPT.getAuth(1));
                    break;
                case 'SavedLoginName':
                    if(document.cookie.indexOf("userinfo=")<0){
                        return ""
                    } else {
                        var str = $.cookie('userinfo');
                        var res = str.split('|');
                        if(res.length>0)
                            return res[1];
                        else
                            return "";
                    }
                    break;
                case 'notice':
                    return $.cookie('notice');
                    break;
            }

        } else {
            return '';
        }
    }
    //获取指定下标的cookie的值
    ,getAuth: function (key){
        var strCookie = $.cookie('authkey');
        if ((strCookie == "")||(strCookie == "null")||(strCookie == null)){
            return '';
        }
        var arr = strCookie.split('|');
        return arr[key];

    }
    /* JS获取字符串的实际长度，区分中英文字符，英文字符计0.5个字 */
    ,strLength: function (textval) {
        var str = GPT.trim(textval);
        str = str.replace(/<\/?[^>]*>/gim,"");//去掉所有的html标记
        str = str.replace(/(^\s+)|(\s+$)/g,"");//去掉前后空格
        str = GPT.ToDBC(str);
        var length = str.length;
        var realLength = 0;
        var temLength = 0;
        for (var i = 0; i < length; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                temLength += 1;
            } else {
                realLength += 1;
            }
            if (temLength == 2) {
                realLength += 1;
                temLength = 0;
            }
        }
        return realLength;
        //alert(realLength);
    }

    //半角转换为全角函数
    ,ToSBC: function (txtstring) {
        var tmp = "";
        for(var i=0;i<txtstring.length;i++)
        {
            if(txtstring.charCodeAt(i)==32)
            {
                tmp= tmp+ String.fromCharCode(12288);
            }
            if(txtstring.charCodeAt(i)<127)
            {
                tmp=tmp+String.fromCharCode(txtstring.charCodeAt(i)+65248);
            }
        }
        return tmp;
    }
    //全角转换为半角函数
    ,ToDBC: function (str){
        var tmp = "";
        for(var i=0;i<str.length;i++)
        {
            if(str.charCodeAt(i)>65248&&str.charCodeAt(i)<65375)
            {
                tmp += String.fromCharCode(str.charCodeAt(i)-65248);
            }
            else
            {
                tmp += String.fromCharCode(str.charCodeAt(i));
            }
        }
        return tmp;
    }
    /* 发送短信验证码 */
    ,sendCaptcha: function (mobile,type) {
        $.ajax({
            type:"post",
            url: "ajaxSendMobileCode",
            data:"mobile="+mobile+"&type="+type,
            dataType:"json",
            success:function(data){
                if( data.status == true ){
                    $('#yanzhengma').html(data.code);
                    $('#yanzhengma').show();
                }else{
                    $('#username_info').css('color','#f45b5b');
                    $('#username_info').html('此手机号码还未在本站注册');
                    $('#username_info').show();
                    $('#username_info').fadeOut(2500);
                }
            }
        });
    }
    ,bindBoxTipFunction: function(){
        $("[boxtip='1']").each(function(){
            if( $(this).is('div') ){
                $(this).html("请注意文明用语(●'◡'●)ﾉ♥");
            }else if( $(this).is('input') ){
                $(this).val("请注意文明用语(●'◡'●)ﾉ♥");
            }else if( $(this).is('textarea') ){
                $(this).text("请注意文明用语(●'◡'●)ﾉ♥");
            }

            $(this).focus(function(){
                if( $(this).is('div') && $(this).html() == "请注意文明用语(●'◡'●)ﾉ♥" ){
                    $(this).html('');
                }else if( $(this).is('input') && $(this).val() == "请注意文明用语(●'◡'●)ﾉ♥" ){
                    $(this).val('');
                }else if( $(this).is('textarea') && $(this).text() == "请注意文明用语(●'◡'●)ﾉ♥" ){
                    $(this).text('');
                }

            })
            $(this).blur(function(){
                if( $(this).is('div') && $(this).html() == "" ){
                    $(this).html("请注意文明用语(●'◡'●)ﾉ♥");
                }else if( $(this).is('input') && $(this).val() == "" ){
                    $(this).val("请注意文明用语(●'◡'●)ﾉ♥");
                }else if( $(this).is('textarea') && $(this).text() == "" ){
                    $(this).text("请注意文明用语(●'◡'●)ﾉ♥");
                }
            })
        });
    }
    //  检查变量是否存在
    ,IsExist: function(obj){
        if ((typeof(obj) == 'undefined') || (obj== null) || (obj == undefined)){
            return false ;
        } else {
            return true ;
        }
    }
};


var Img={
    _uri: '',
    _imgWidth:420,
    _imgHeight:420,
    /*  文件选择框
     *   FileVal     : 选择后用于存放结果的元素
     *   FileUpload  : FileUpload上传文件框
     * */
    OpenBrowse: function openBrowse(FileVal,FileUpload){
        var ie=navigator.appName=="Microsoft Internet Explorer" ? true : false;
        if(ie){
            document.getElementById(FileUpload).click();

            var sourceEl = document.getElementById(FileVal);
            if(null==sourceEl || typeof(sourceEl)==undefined){

            } else{
                document.getElementById(FileVal).value=document.getElementById("upload_file").value;
            }

        }else{
            var a=document.createEvent("MouseEvents");//FF的处理
            a.initEvent("click", true, true);
            document.getElementById(FileUpload).dispatchEvent(a);
        }

    }
    /*
     *   通用裁剪图片方法,需要引入 outwindow1及样式
     *   图片提交后通过返回图片地址调用此函数来启动裁剪窗口
     * */
    ,showImg:function show_img(filepath) {
        //alert(filepath);
        $('div[class="img_a"]').show();
        //$("form[id='uploadFrom']").hide();
        $('#SaveCropPic').show();
        var newFile=filepath+'?'+Math.random();
        $("#img_2").attr('src',newFile);
        $("#img_1").attr('src',newFile);

        var img=$('#img_1');
        this.CropImg(img);
    },

    /*  显示  图像处理界面  */
    showUploadWindow:function() {
        $("form[id='uploadFrom']").show();
        $('div[class="img_a"]').hide();

        $(".outwindow1").show();
        var img=$('#img_1');
        this.CropImg(img);
    },
    //  ----    载入图片、选择图片区域 ----
    CropImg:function img_sf(simg,parent){

        //alert(simg + '/' + parent);

        //  var db=document.body;
        _imgWidth=simg.width();
        _imgHeight=simg.height();
//console.log(_imgWidth);
        var db= document.getElementById(parent);
        //console.log(simg);

        var img1=document.getElementById('img_1');
        var img3=document.getElementById('img_3');
        var bl=[100/120,150/50,120/24]; //裁剪框为100，预览框为120，显示比例使用100/120,hw()中使用

        var div=document.getElementById('img_b3');
        var d_t=document.getElementById('img_b1');
        var d_y=document.getElementById('img_b4');
        var d_x=document.getElementById('img_b5');
        var d_l=document.getElementById('img_b2');
        var self={};
        var iwh=Math.min(_imgHeight,_imgWidth);
        var sf=document.getElementById('img_dsf');
        var hh = div.offsetHeight;
        var ww= div.offsetWidth;
        if(hh != ww){
            var bl=[100/100,150/50,120/24];//裁剪框为288*164，预览框为288*164，显示比例使用100/100,hw()中使用
        }
        if(_imgWidth<288){
            var bl=[_imgWidth/288,_imgWidth/288,_imgWidth/288];
        }
        hw();
        yd(div.offsetTop,div.offsetLeft);

        div.onmousedown=function(e){

            var e=e||event;
            self.x=e.clientX-this.offsetLeft;
            self.y=e.clientY+document.documentElement.scrollTop-this.offsetTop;
            try{e.preventDefault();}catch(o){e.returnValue = false;}
            document.onmousemove=function(e){
                var e=e||event;
                var t=e.clientY+document.documentElement.scrollTop-self.y ;
                var l=e.clientX-self.x;

                t=Math.min(t,_imgHeight-div.offsetHeight);
                l=Math.min(l,_imgWidth-div.offsetWidth);

                t=Math.max(t,0);
                l=Math.max(l,0);
                //console.log(123);
                yd(t,l);
            }
        }

        sf.onmousedown=div.onmouseup=function(){
            document.onmousemove='';
        }

        sf.onmousedown=function(e){
            var e=e||event;
            self.x=e.clientX-this.offsetLeft;
            self.y=e.clientY+document.documentElement.scrollTop-this.offsetTop;
            try{e.preventDefault();}catch(o){e.returnValue = false;}
            try{e.stopPropagation();}catch(o){e.cancelBubble = true;}
            document.onmousemove=function(e){
                var e=e||event;
                var t=e.clientY+document.documentElement.scrollTop-self.y;
                var l=e.clientX-self.x;

                //
                if(t>_imgHeight-div.offsetTop || l>_imgWidth-div.offsetLeft){
                    document.onmousemove='';
                }

                if(ww==hh){ //正方形用
                    l=Math.max(t,l);
                    l=l>iwh?iwh:l;
                    if(l<100){
                        l=100;
                    }
                    if(t<100)
                        t = 100;
                    sff(l,l);
                }else{//288*164用
                    if(_imgHeight>_imgWidth){
                        //l=l>iwh?iwh:l;
                        //console.log('鼠标t:'+t);
                        //console.log('鼠标l:'+l);
                        if(t>Math.floor(l*hh/ww)){
                            l = Math.floor(t*ww/hh);
                        }else{
                            t = Math.floor(l*hh/ww);
                        }
                    }else{
                        //t=t>iwh?iwh:t;
                        if(l> Math.floor(t*ww/hh)){
                            t = Math.floor(l*hh/ww);
                        }else{
                            l = Math.floor(t*ww/hh);
                        }
                    }
                    sff(t,l);
                }
            }
        }

        function sff(t,l){

            var w=div.offsetWidth;

            if(t==l){//正方形用
                if(l>_imgWidth-div.offsetLeft-10)
                    l = _imgWidth-div.offsetLeft-10;
                if(t>_imgHeight-div.offsetTop-10)
                    t = _imgHeight-div.offsetTop-10;
                t =  t>l?l:t;
                l =  t;
                bl=[w/120,w/50,w/24];
            }else{//288*164用
                if(_imgWidth<_imgHeight){
                    if(l>_imgWidth-div.offsetLeft-10){
                        l = _imgWidth-div.offsetLeft-10;
                        t=l*164/288;
                    }
                    if(t>410){
                        t=410;
                        l=t/164*288;
                    }
                    console.log('t:'+t+",l:"+l);
                }else{
                    if(t>_imgHeight-div.offsetTop-10)
                        t = _imgHeight-div.offsetTop-10;

                    if(l>410){
                        l=410;
                        t=l*164/288;
                    }
                    if(l>_imgWidth-div.offsetLeft-10){
                        l = _imgWidth-div.offsetLeft-10;
                        t = l*164/288;
                    }
                    if(l>(_imgHeight-div.offsetTop-10)/164*288){
                        l=(_imgHeight-div.offsetTop-10)/164*288;

                        t=l*164/288;
                    }
                }
                bl=[w/288,w/140,w/60];
            }

            sf.style.top=t+'px';
            sf.style.left=l+'px';

            div.style.width=(l+10)+'px';
            div.style.height=(t+10)+'px';


            //console.log(div.style.width);
            //console.log(div.style.height);

            yd(div.offsetTop,div.offsetLeft);

            hw();
            db.imgh=l+10;
        }

        //  鼠标移动
        function yd(t,l){
            d_t.style.height=t+'px';
            d_x.style.height=_imgHeight-t-div.offsetHeight+'px';
            d_l.style.top=d_y.style.top=div.style.top=t+'px';
            d_l.style.width=div.style.left=l+'px';
            d_y.style.width=_imgWidth-l-div.offsetWidth+'px';
            d_l.style.height=d_y.style.height=div.offsetHeight+'px';
            //  第一张缩略图
            img1.style.left=-l/bl[0]+'px';
            if(div.offsetWidth==288&&ww!=hh){//288*164用
                img1.style.top=-t+'px';
            }else{//正方形用
                img1.style.top=-t/bl[0]+'px';
            }



            //  第二张缩略图
            if($('.img_c_2').hasClass('img_c_2')){
                var w=div.offsetWidth;
                //bl=[w/164,w/164,w/164];
                img3.style.top=-t/bl[0]+'px';
                img3.style.left=-l/bl[0]+'px';
            }




            db.xy=[t,l];
        }

        //  --  按比例设置图片大小：宽、高
        function hw(){
            //  $("#test123").text('height=' + _imgWidth + '/width=' + img_width + '/ratio=' + bl[0]);

            $("#img_1").css('height',_imgHeight/bl[0]);
            $("#img_1").css('width',_imgWidth/bl[0]);

            if($('.img_c_2').hasClass('img_c_2')) {
                //img3.height= _imgHeight/bl[0];
                //img3.width=_imgWidth/bl[0];
                $("#img_3").css('height',_imgHeight/bl[0]);
                $("#img_3").css('width',_imgWidth/bl[0]);
            }
        }

    },
    //  ----    保存裁剪图片  ----
    SaveCropImg:function(UpSource,UploadUrl) {
        var FileUrl=$('img[id="img_2"]').attr('src');
        var img3=document.getElementById('img_b3');
        var left=img3.offsetLeft;
        var top=img3.offsetTop;
        var width=img3.offsetWidth;
        var height=img3.offsetHeight;
        var url1=UploadUrl;             //  保存图片的地址及类型： community/upload/savepic?type=music&id=100

        $("#left").val(left);
        $("#top").val(top);
        $("#width").val(width);
        $("#height").val(height);
        //alert($("#"+UpSource).val());
        $("#"+UpSource).parent().submit();
    },

    addCallbacks: function()
    {
        $('input[id="SaveCropPic"]').bind('click',book.SaveCropImg);
    },

    /**
     * Initializes the view (highlighters, callbacks, etc)
     */
    initializeView: function(uri)
    {
        this._uri = uri;
        this.addCallbacks();
    }

};


/*  评论回复方法  */
function  postreply(CommentId,ParentId,ToUserId,QuoteId,replyInput,replyFor,replyIdentity,code){

    var loginUser = GPT.getCookieValue('UserId');
    if( (loginUser == false) || (loginUser == 0) || (loginUser == '') ){
        kana.loadLoginForm();
        return false;
    }

    /* 有锁（正在操作中） */
    if($(document).attr('clickflag')==1){
        return;
    }
    /* 加锁（首次操作）*/
    $(document).attr('clickflag',1);

    var TotalWords = GPT.DivContentCount(replyInput);
    var Words   = $("#"+replyInput).attr('words');

    if(TotalWords == 0){
        kana.showErrorLittle('请输入回复内容');
        /* 解锁（操作完成或中断） */
        $(document).attr('clickflag',0);
        return false;
    }else if( GPT.DivContentCount(replyInput) > Words ){
        kana.showErrorLittle('回复内容不能超过'+Words+'字。');
        /* 解锁（操作完成或中断） */
        $(document).attr('clickflag',0);
        return false;
    }

    $("#"+replyInput).find('img').each(function(){

        if(typeof($(this).attr("code"))!="undefined") {
            var code = $(this).attr('code');
            $(this).after(code);
            $(this).remove();
        }

    })

    var Content = $("#"+replyInput).html();

    if(replyFor == 'bbs') {
        var url1 = "/bbs/index/ajaxSaveBbsReply";
    } else if(replyFor == 'activity'){
        var url1 = "/comment/ajaxSaveCommentReply";
    }else{
        var url1 = "/community/comment/ajaxSaveCommentReply";
    }

    //var data = "commentid=" + CommentId + "&parentid="+ParentId+"&touserid="+ToUserId +"&content=" +Content ;
    var data = {};
    data["commentid"] = CommentId;
    data["parentid"]  = ParentId;
    data["touserid"]  = ToUserId;
    data["content"]   = Content;
    data["quoteid"]   = QuoteId;
    data["identity"]  = $('#'+replyIdentity).val();
    data["code"]      = $('#'+code).val();


    $.ajax({
        type : "post",
        url : url1,
        data : data ,
        dataType : "json",
        success : function (data){
            var r = data;
            if(r.code==1){
                if(replyFor == 'list'){
                    ajaxPage(1);
                } else {
                    $('.book_head_rh_n').remove();
                    location.reload();
                }
            }else{
                if( r.info ){
                    kana.showErrorLittle(r.info);
                    if( r.code == -102 ){
                        $('#SubReplyCode').show();
                    }
                }else{
                    kana.showErrorLittle('操作失败');
                }
            }
            /* 解锁（操作完成或中断） */
            $(document).attr('clickflag',0);
        }
    });

}

/*绑定回复点击事件*/
function BindReplyClick(event){

    var objReply=$(this);
    var btnTitle = objReply.attr('btntitle');
    var CommentId = objReply.attr('CommentId');
    var ParentId  = objReply.attr('ParentId');
    var ToUserId  = objReply.attr('ToUserId');
    var Quoteid = objReply.attr('Quoteid');
    var ReplyFor = objReply.attr('ReplyFor');

    var BoxPosition = objReply.attr('BoxPosition'); //

    var loginUser = GPT.getCookieValue('UserId');
    if( (loginUser == false) || (loginUser == 0) || (loginUser == '') ){
        kana.loadLoginForm();
        return false;
    }
    //else if( ToUserId == loginUser ){
    //    kana.showErrorLittle('对不起，您不能自己回复自己。');
    //    return false;
    //}

    var strHtml='<div class="book_head_rh_n" style="padding-bottom: 15px;">'+
        '<div class="book_head_rh_nt">'+
        '<div contentEditable=true id="replyInput" words="200" style=" position: relative;border: 1px solid #e7e7e7; padding:5px 10px;font-size: 12px; overflow-y:auto; height:79px; line-height:24px; color: #666666; word-break: break-all;">'+
        '</div>'+
        '</div>'+
        '<div class="bookrack_words_b" style=" height: 38px; position: relative;">'+
        '<a href="javascript:void(0);" class="left bookrack_words_bl" id="btnFace" >'+
        '<span class="left bookrack_look"></span>'+
        '<span class="left bookrack_size">表情</span>'+
        '</a>'+
        '<div class="lookBtn_main" id="lookBtn_main">'+
        '</div>'+
        '<div class="right bookrack_words_br" id="bwbh">'+
        '<a href="javascript:void(0);" onclick="javascript: postreply(' + CommentId + ',' + ParentId + ',' + ToUserId + ',' + Quoteid + ',\'replyInput\',\''+ ReplyFor +'\'); ">'+btnTitle+'</a>'+
        '</div>'+
        '</div>'+
        '</div>';

    $('.book_head_rh_n').remove();

    if(BoxPosition==2)
    /*  楼层的回复   */
        $('.reply_'+ParentId).after(strHtml);
    else
        objReply.parent().parent().after(strHtml);

    $('div .book_head_rh_n').find('#replyInput').focus();

    if($('#emotionBoxParent').length<1)
        kana.getFile('body',kana.getDomain('s')+'/form/EmotionForm.html',{'static':kana.getDomain('s')});

    /*  表情框 */
    $("#btnFace").click(function(event) {

        if($(this).siblings('#emotionBox').length<1){
            var strEmotion=$('#emotionBoxParent').html();
            $(this).siblings("#lookBtn_main").html(strEmotion);
        }
        $("#emotionBox").show();

        $("#emotionBox .lookBox_In ul li").click(function(event) {
            var myImg = $(this).html();
            var objText = $('#replyInput');
            //objText.html(objText.html() + "<img src='"+ $(this).find('img').attr('src') +"' />");
            objText.html(objText.html() + myImg );
            GPT.DivContentCount('replyInput');
            $("#emotionBox").hide();
        });
        //$('#emotionBox').show();
        event.stopPropagation();
    });
}


/*（新）绑定回复点击事件 - Alone 2015-08-15 */
function BindReplyClick2(event){

    var objReply=$(this);
    var btnTitle = objReply.attr('btntitle');
    var CommentId = objReply.attr('CommentId');
    var ParentId  = objReply.attr('ParentId');
    var ToUserId  = objReply.attr('ToUserId');
    var Quoteid = objReply.attr('Quoteid');
    var ReplyFor = objReply.attr('ReplyFor');

    var BoxPosition = objReply.attr('BoxPosition'); //

    var loginUser = GPT.getCookieValue('UserId');
    if( (loginUser == false) || (loginUser == 0) || (loginUser == '') ){
        kana.loadLoginForm();
        return false;
    }
    //else if( ToUserId == loginUser ){
    //    kana.showErrorLittle('对不起，您不能自己回复自己。');
    //    return false;
    //}

    var IsAuthor = GPT.getCookieValue('IsAuthor');

    var strHtml='<div class="comment_Text">'+
        '<form>'+
        '<input type="hidden" name="replyIdentity" id="replyIdentity" value="0">'+
        '<div class="comment_Text_In">'+
        '<div boxtip="1" contenteditable="true" rows="" cols="" id="replyInput" class="comment_Text_input" limit="1" wordcount="words_count"  words="200" style="overflow-y:auto"></div>'+
        '</div>'+
        '<div class="clearfix comment_Text_B">'+


        '<div class="clearfix left smiley_img_Box">'+
        '<a class="left lookBtn" href="javascript:;" id="face_icon">'+
        '<span class="left lookBtn_Icon"></span>'+
        '<span class="left lookBtn_size">表情</span>'+
        '</a>'+
        '</div>'+

        '<div class="clearfix left Verification_code" id="SubReplyCode" style="margin-top: 14px;display: none">'+
        '<input type="text" class="left Verification_code_input" name="subreplyverification" id="subreplyverification">'+
        '<div class="left Verification_code_Img">'+
        '<a href="javascript:"><img src="'+kana.getDomain('www')+'/community/comment/getCode"' + ' onclick="javascript:this.src=\'/community/comment/getCode?tm=\'+Math.random()" width="80" height="30" /></a>'+
        '</div>'+
        '</div>'+

        '<div class="right submitBtn">'+
        '<a href="javascript:;" class="right" onclick="javascript: postreply(' + CommentId + ',' + ParentId + ',' + ToUserId + ',' + Quoteid + ',\'replyInput\',\''+ ReplyFor +'\',\'replyIdentity\',\'subreplyverification\'); ">'+btnTitle+'</a>'+
        '<span class="right"><span id="words_count">0</span>/200</span>'+
        '</div>';
        if( IsAuthor == 1 ){

            strHtml +=  '<div class="clearfix right identityBox">'+
                        '<div class="left clearfix identityBox_In">'+
                        '<a href="javascript:;" class="left identityBox_Btn identityBox_Btn_Hot"></a>'+
                        '<a href="javascript:;" class="left identityBox_Name manColor" rel="0">'+ GPT.getCookieValue('NickName') +'</a>'+
                        '<span class="left">发表</span>'+
                        '</div>'+
                        '<div class="left clearfix identityBox_In">'+
                        '<a href="javascript:;" class="left identityBox_Btn"></a>'+
                        '<a href="javascript:;" class="left identityBox_Name manColor" rel="1">'+ GPT.getCookieValue('AuthorName') +'</a>'+
                        '<span class="left">作者身份发表</span>'+
                        '</div>'+
                        '</div>';
        }
    strHtml +='</div></form></div>';

    $('.comment_Text').remove();

    if(BoxPosition==2)
    /*  楼层的回复   */
        $('.reply_'+ParentId).after(strHtml);
    else
        objReply.parent().parent().after(strHtml);

    $('div .book_head_rh_n').find('#replyInput').focus();

    if($('#emotionBoxParent').length<1)
        kana.getFile('body',kana.getDomain('s')+'/form/EmotionForm.html',{'static':kana.getDomain('s')});

    GPT.bindLimitFunction();
    GPT.bindBoxTipFunction();
    //$("#replyInput").keyup(function(){
    //
    //    var content = kana.countWords($(this).text());
    //    if( content >= 200 ){
    //        var str = kana.subContent($(this).text(),200);
    //        $(this).text(str);
    //        $(this).focus();
    //        $(this).blur();
    //        $('#words_count').html('200/200');
    //    }else{
    //        $('#words_count').html(content+'/200');
    //    }
    //
    //});

    /*  表情框 */
    $("#face_icon").click(function(event) {
        if($(this).siblings('#emotionBox').length<1){
            var strEmotion=$('#emotionBoxParent').html();
            //$(this).siblings("#lookBtn_main").html(strEmotion);
            $(this).parent().append(strEmotion);

            $("#emotionBox").show();

            $("#emotionBox .lookBox_In ul li").click(function(event) {
                $('#replyInput').focus();
                var myImg = $(this).html();
                var objText = $('#replyInput');
                //objText.html(objText.html() + "<img src='"+ $(this).find('img').attr('src') +"' />");
                objText.html(objText.html() + myImg );
                GPT.DivContentCount('replyInput');
                $("#emotionBox").hide();
            });

        }
        $("#emotionBox").show();

        //$("#emotionBox .lookBox_In ul li").click(function(event) {
        //    var myImg = $(this).html();
        //    var objText = $('#replyInput');
        //    //objText.html(objText.html() + "<img src='"+ $(this).find('img').attr('src') +"' />");
        //    objText.html(objText.html() + myImg );
        //    GPT.DivContentCount('replyInput');
        //    $("#emotionBox").hide();
        //});

        //$('#emotionBox').show();
        event.stopPropagation();
    });
    $(".identityBox_Btn").click(function(event) {
        $(this).addClass('identityBox_Btn_Hot');
        $(this).parent().siblings().find('.identityBox_Btn').removeClass('identityBox_Btn_Hot');
        var Identity = $(this).siblings("a").attr('rel');
        $('#replyIdentity').val(Identity);
    });

    var TextWidth = $(".comment_Text_In").width();
    $(".comment_Text_input").css("width",TextWidth-20);

}

/* 禁言弹窗 [Developed By zhanglong - 2015-08-07] - START */
function DisableSpeak(OpObject,OpType,OpItemId,userName,AdminLevel){

    var loginUser = GPT.getCookieValue('UserId');
    if( (loginUser == false) || (loginUser == 0) || (loginUser == '') ){
        kana.loadLoginForm();
        return false;
    }
    var community = '';
    switch (OpObject){
        case 1:
            community = '正义骑士团';
            break;
        case 2:
            community = '贤者之城';
            break;
        case 3:
            community = '科学艺术坊';
            break;
        case 4:
            community = '天下布武团';
            break;
        case 5:
            community = '综合讨论区';
            break;
        case 6:
            community = '意见反馈区';
            break;
        case 7:
            community = '世界议会';
            break;
    }
    var html = '';
    html += '<div id="forbid_window" class="popUp2" style="width:477px;">';
    html += '<div class="popUp2Box" style="width:465px;">';
    html += '<div class="popUp2Box_title"  style="width:463px;">';
    html += '<h1  style="width:439px;">禁言 <span class="color_36ade5"> '+userName+' </span></h1>';
    html += '<a href = "javascript:;" class="closeDown cancel_btn">';
    html += '<i class="left"></i>';
    html += '<span class="left" >关闭</span>';
    html += '</a>';
    //html += '<a href="javascript:;" class="admin">*'+community+'管理员制度</a>';
    html += '</div>';
    html += '<div class="popUp2Box_main" style="padding:22px 17px 0; width:431px; position:relative;">';
    html += '<form id="forbid_from">';
    html += '<input type="hidden"  name="OpObject" value="'+ OpObject +'" />';
    html += '<input type="hidden"  name="OpType"   value="'+ OpType +'" />';
    html += '<input type="hidden"  name="OpItemId" value="'+ OpItemId +'" />';
    html += '<input type="hidden" name="forbidtime" id="forbidtime" value="3" />';
    html += '<input type="text" class="current_Account_password_input_2" name="forbidreason" id="forbidreason" placeholder="请输入封停理由"/>';
    html += '<span class="font_num">0/20</span>';
    html += '</form>';
    html += '<div class="clearfix">';
    if( AdminLevel == 10 ){
        html += '<ul class="left fengting communityOp" style="margin-left:30px;">';
        html += '<li><i class="Round_1 Round_2" rel="3"></i>'+community+'禁言 3 天</li>';
        html += '<li><i class="Round_1" rel="7"></i>'+community+'禁言 7 天</li>';
        html += '<li><i class="Round_1" rel="31"></i>'+community+'禁言 30 天</li>';
        html += '</ul>';
        html += '<ul class="left fengting allwebOp" style="margin-left:30px;">';
        html += '<li><i class="Round_1" sign="99" rel="3"></i>全站禁言 3 天</li>';
        html += '<li><i class="Round_1" sign="99" rel="7"></i>全站禁言 7 天</li>';
        html += '<li><i class="Round_1" sign="99" rel="30"></i>全站禁言 30 天</li>';
        html += '</ul>';
    }else{
        html += '<ul class="left fengting">';
        html += '<li><i class="Round_1 Round_2" rel="3"></i>'+community+'禁言 3 天</li>';
        html += '<li><i class="Round_1" rel="7"></i>'+community+'禁言 7 天</li>';
        html += '<li><i class="Round_1" rel="31"></i>'+community+'禁言 30 天</li>';
        html += '<li><i class="Round_1" sign="99" rel="24"></i>全站禁言 24 小时</li>';
        html += '</ul>';
    }

    html += '</div>'
    html += '<div class="clearfix popUp1Box_main_Btn">';
    html += '<a href="javascript:;" class="left popUp1Box_main_Btn1" onclick="submitAdminOp(\'forbid_from\');">禁言</a>';
    html += '<a href="javascript:;" class="right popUp1Box_main_Btn2 cancel_btn" >取消</a>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '<div id="forbid_fade" class="black_overlay" style="display: block;"></div>';
    $('body').append(html);

    $(".cancel_btn").click(function(){
        $('#forbid_window').remove();
        $("#forbid_fade").remove();
    });
    $(".Round_1").click(function(event) {
        $(this).addClass('Round_2');
        $(this).parent().siblings().find(".Round_1").removeClass('Round_2');
        var rel = $(this).attr('rel');
        var sign = $(this).attr('sign');
        if( sign == 99 ){
            $('.communityOp').find(".Round_1").removeClass('Round_2');
            $('#forbid_from').find('input[name="OpObject"]').val(sign);
        }else{
            $('.allwebOp').find(".Round_1").removeClass('Round_2');
            $('#forbid_from').find('input[name="OpObject"]').val(OpObject);
        }
        $('#forbid_from').find('#forbidtime').val(rel);
    });
    $("#forbidreason").keyup(function(){
        $(this).css('color','black');
        $(this).css('border-color','#d4d4d4');
        var title = kana.countWords($(this).val());
        if ( title > 20 ){
            var str = kana.subContent($(this).val(),20);
            $(this).val(str);
            var num = kana.countWords($(this).val());
            $(this).siblings('span').html(num+'/20');
        }else if( title >= 5 && title <= 20 ){
            $(this).siblings('span').html(title+'/20');
        }else{
            $(this).siblings('span').html(title+'/20');
        }
    });

}


function reportWindow(ObjectType,ObjectId){
    var loginUser = GPT.getCookieValue('UserId');
    if( loginUser == 0 ){
        kana.loadLoginForm();
        return false;
    }
    var html = '';
    html += '<div class="ReportReason_popUp">';
    html += '<div class="clearfix AuditThrough_title">';
    html += '<span class="left">请输入举报理由：</span>';
    html += '<a class="right closeDown closeReportWindow" href="javascript:;" style="margin: 0; width: 20px;">';
    html += '<i class="Sponsor_closeDown_Btn"></i>';
    html += '</a>';
    html += '</div>';
    html += '<div class="ReportReason_Main">';
    html += '<div class="ReportReason_Main_text">';
    html += '<div class="ReportReason_Main_input" id="reportReason" contenteditable="true" limit="1" wordcount="reportWords" words="140" style="margin-top: 10px;">请输入举报理由</div>';
    html += '<div class="ReportReason_Main_Member"><label id="reportWords">0</label>/140</div>';
    html += '</div>';
    html += '<form id="report_from">';
    html += '<input type="hidden"  name="ObjectType" value="'+ ObjectType +'" />';
    html += '<input type="hidden"  name="ObjectId"   value="'+ ObjectId +'" />';
    html += '<input type="hidden"  name="ReportContent" id="ReportContent"/>';
    html += '</form>';
    html += '<div class="AuditThrough_button popUpBtn_Blue">';
    html += '<a href="javascript:;" id="submitReportBtn">确定</a>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    $('body').append(html);
    $('#fade').show();
    GPT.bindLimitFunction();
    $('#reportReason').focus(function(){
        if( $(this).html() == '请输入举报理由' ){
            $(this).html('');
        }
    });
    $('#reportReason').blur(function(){
        if( $(this).html() == ''  ){
            $(this).html('请输入举报理由');
        }
    });
    $(".closeReportWindow").click(function(){
        $('.ReportReason_popUp').remove();
        $("#fade").hide();
    });
    //【审核页面】 提交结果按钮 （是）
    $("#submitReportBtn").click(function(event) {

        if( GPT.DivContentCount('reportReason') < 1 ){
            kana.showErrorLittle('请输入举报理由');
            return false;
        }else if( GPT.DivContentCount('reportReason') > 140  ){
            kana.showErrorLittle('举报理由请保持在140字以内');
            return false;
        }
        $('#report_from').find('#ReportContent').val($('#reportReason').html());
        var param = $('#report_from').serialize();
        var data = GPT.sendAjax("/community/ajax/ajaxSaveReport",param);
        if( data.code > 0 ){
            $('.ReportReason_popUp').remove();
            $("#fade").hide();
            kana.showSuccessLittle(data.info);
        }else if( data.code == -100 ) {
            $('.ReportReason_popUp').remove();
            $("#fade").hide();
            kana.loadLoginForm();
        }else{
            kana.showErrorLittle(data.info);
        }
    });

}

function submitAdminOp(formId){

    if( $('#'+formId).find('#forbidreason').val() == '' ){
        $('#'+formId).find('#forbidreason').css('border-color','red');
        return false;
    }

    var OpObject = $('#'+formId).find("input[name='OpObject']").val();
    var OpType   = $('#'+formId).find("input[name='OpType']").val();
    var OpItemId = $('#'+formId).find("input[name='OpItemId']").val();
    var param = $('#'+formId).serialize();
    var res = GPT.sendAjax('/home/log/ajaxAdminOp/'+OpObject+'/'+OpType+'/'+OpItemId,param);
    if( res.status > 0 ){
        $('#forbid_window').remove();
        $("#forbid_fade").remove();
        kana.showSuccessLittle('禁言成功');
        setInterval(function(){
            window.location.reload();
        },3000);

    }else{
        if( res.status == -1 ){
            kana.loadLoginForm();
            return false;
        }else if( res.status == -101 ){
            $('#forbid_window').remove();
            $("#forbid_fade").remove();
            kana.showErrorLittle('您无法对此用户进行禁言操作。');
        }else{
            $('#forbid_window').remove();
            $("#forbid_fade").remove();
            kana.showErrorLittle('禁言失败');
        }

    }
}
/* 禁言弹窗 - END */

$(document).ready(function(){

    setTimeout(function(){
            kana.showMusicPlay();
    },2000);
    
    /*首页导航*/
    //
    //$(".navBar li a").click(function(event) {
    //    $(this).addClass('navHot');
    //    $(this).parent().siblings().find("a").removeClass('navHot');
    //});

    /*首页导航*/


    /*  top条鼠标悬浮    */
    $(".topBar_name").click(function(){
        $(this).addClass("topBar_name_Hot");
        $(this).siblings().removeClass("topBar_name_Hot");
    })

    $(".topBar1_name").click(function(){
        $(this).addClass("topBar1_name_Hot");
        $(this).siblings().removeClass("topBar1_name_Hot");
    })

    /*  回复框 */
    $('a[flag="reply"]').each(function(position,element){
        $(element).unbind('click').bind('click',{ element:element },BindReplyClick);
    });
    /*  回复框 */
    $('a[flag="reply2"]').each(function(position,element){
        $(element).unbind('click').bind('click',{ element:element },BindReplyClick2);
    });

    $(document).click(function(event) {
        /*  Hide Emotion Box  */
        if($("#emotionBox").length>0)
            $("#emotionBox").hide();

        if($("#emotionFixBox").length>0)
            $("#emotionFixBox").hide();

        if($('iframe[class="ke-edit-iframe"]').length>0)
            $('iframe[class="ke-edit-iframe"]').contents().find("body").find("#emotionBox").hide();
    });

    /*底部二维码*/

    $(".li_weixin_").hover(function() {
        $(this).find(".li_weixin").show();
    }, function() {
        $(this).find(".li_weixin").hide();
    });

    //  QQ 微博 登录url
    //var qqHref = "/home/passport/qqlogin?returnUrl="+kana.getQueryString('returnUrl');
    var qqHref = "/home/passport/qqlogin?returnUrl="+encodeURIComponent(window.location.href);
    //var weiboHref = "/home/passport/weibologin?returnUrl="+kana.getQueryString('returnUrl');
    var weiboHref = "/home/passport/weibologin?returnUrl="+encodeURIComponent(window.location.href);
    $('.qqLogin1').attr('href',qqHref);
    $('.wbLogin1').attr('href',weiboHref);


    $("#searchbox").focus(function(){
        $(this).css("color","#333");
    })

    /* 为回复窗添加默认文字 */
    GPT.bindBoxTipFunction();

    ///*  如果没有登录，盖住整个页面   */
    //function getLoginPass(){
    //    var c_name = 'loginpass';
    //    var c_start = document.cookie.indexOf(c_name+"=");      /*这里因为传进来的的参数就是带引号的字符串，所以c_name可以不用加引号*/
    //
    //    if (c_start >= 0) {
    //        return true;
    //    }else{
    //
    //        kana.loadVerifyForm();
    //        return false;      // COOKIE不存在
    //    }
    //}
    ////getLoginPass();

    //cnzz统计
    //cnzz全景统计

    $.each(['http://w.cnzz.com/c.php?id=1255943409'],function(i, v){
        $('<script>').attr({src: v}).appendTo(document.body);
    });

    $(".feedback_Btn_APP a").hover(function(){
        $(this).find(".APPerweima").fadeIn(300);
    }, function () {
        $(this).find(".APPerweima").fadeOut(300);
    })


    /*      Baidu 推广    */
    var _hmt = _hmt || [];
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?8e5c267d09f366bed9ed2b29a40a3798";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);

    var bp = document.createElement('script');
    bp.src = '//push.zhanzhang.baidu.com/push.js';
    s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);


});


//  ------------------------------- 返回顶部、意见反馈 共用控制方法------------------------



//$(window).scroll(function(){
//    if ($(window).scrollTop() > $(window).height() / 3){
//
//        var space_y = $(document).height() - ($(window).scrollTop() + $(window).height());
//        if( space_y > 255){
//            $(".returnTop").css("bottom","70px")
//        } else {
//            $(".returnTop").css("bottom", 255- space_y + 70 );
//        }
//
//        $(".returnTop").fadeIn(500);
//
//    }
//    else
//    {
//        $(".returnTop").fadeOut(500);
//    }
//});
//
//function adjustToolbar(){
//    var windowWidth = $(window).width();
//    var returnTopRight = ($(window).width()-1200)/2-86; //如果窗体右边空白区域 > 86
//    if(windowWidth< 1372){                              //
//        returnTopRight = 0;
//    }
//    console.log(returnTopRight);
//
//    $(".returnTop").css("right",returnTopRight);
//}
//adjustToolbar();
//
//$(window).resize(function(){
//    adjustToolbar();
//})
//
//
//$(".returnTop_Btn").click(function(){
//    $('body,html').animate({scrollTop:0},500);
//    return false;
//});
//
//$(".feedback_Btn").click(function(){
//    window.open(kana.getDomain('www') + '/bbs/index/idea');
//    return false;
//})

//验证图片类型
function checkImgType(ths){
        if (!/\.(jpg|jpeg|JPG)$/.test(ths)) {
            //alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
            return false;
        }
    return true;
}