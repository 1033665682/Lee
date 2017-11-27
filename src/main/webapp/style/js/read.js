/*  删除书签    */
function delBookMark(chapterid,bookid){
    var url1    =   '/home/Ajax/ajaxdBookmark';
    var data    =   {};
    data['BookId']  =   bookid;
    data['ChapterId']   =   chapterid;
    $.ajax({
        type  :   'POST',
        url     :   url1,
        dataType:   'json',
        data    :   data
    }).done(function(response){
        if (response.status=='1') {
            window.location.reload();
        }
    });
}

/* 左侧工具栏 动态定位 */
function resize(){

    var AreaHeight=230;
    //var pos_left=$('.readCon').offset().left -  $('.read_side_bar').width() - 20 ;
    //$('.read_side_bar').css('margin-left',pos_left);

    var bar_height=680;
    if($(window).height()<500)
        bar_height=380;
    else if($(window).height()<800)
        bar_height=500;

    $('.read_side_bar').css('height',bar_height );

    if($("#danmu").length > 0) {
        pos_top=$("#danmu").offset().top-117;

    }else{
        pos_top=$(window).scrollTop() +150;
    }

    if( (pos_top + bar_height + 10) >($(window).scrollTop() + $(window).height()) ){
        pos_top =  $(window).scrollTop() + $(window).height() - bar_height - 10 ;
        //console.log('window height:'+$(window).height() + ',scrolltop:'+$(window).scrollTop());
        //console.log('new top:'+pos_top+', height:'+bar_height);
    }

//console.log('pos_top:=' + pos_top + ',scrolltop:='+$(window).scrollTop() + ',height='+$(window).height());

    $('.read_side_bar').animate({'top':pos_top},10);
}

var tucao = {
    reset_window:function(){
        p_index2=-1;
        min_id =-1;
        max_id = -1;
        //console.log(1);
        if($("#danmu").length > 0) {
            $('#danmu').danmu("danmu_stop");
            $('#danmu').remove();
            $('#danmuBg').remove();
        }
        $(".read_spitBox").hide();

        //  吐槽数量关闭
        //    hideTucaoNum();

        //  取消吐槽对象加重显示
        if($(".readcon").find('p[focusflag="1"]').length>0){
            $(".readcon").find('p[focusflag="1"]').removeAttr('style');
            //setReadInfo();
        }
    }
    //  ----    读取吐槽   自己的吐槽[突出]显示 ----
    ,getTucao:function(ChapterId,pIds) {
        var url1="/home/Ajax/ajaxDanmuList";
        var msgList=Array();
        var data={};
        data['ChapterId']=ChapterId;
        data['pIds']=pIds;
        $.ajax({
            type  :   'POST',
            url     :   url1,
            dataType:   'json',
            data    :   data,
            async    :   false
        }).done(function(response){
            if (response.status=='1') {
                for (var i=0 ;i<response.list.length;i++){
                    //alert(response.list[i]['User']['NickName']);

                    if(response.list[i]['msg'].indexOf('{')>=0){
                        var obj1 = eval('('+response.list[i]['msg']+')');
                    } else {
                        var obj1 ={ "text": response.list[i]['msg'] ,"color":"#FFFF", "size":"0", "position":"0" } ;
                    }

                    var temp =Array();
                    temp['msg'] = obj1;
                    temp['isSelf'] = response.list[i]['isSelf'];
                    temp['user'] = response.list[i]['User'];

                    msgList[i] = temp;
                }
            }
        });
        return msgList
    }
    ,tucao:function(pos_top,msg_list,Bg_height) {

        var danmu_height=200;

        if (Bg_height <= danmu_height)
            Bg_height = danmu_height;

        $("#danmu").danmu({
            left: -110, //区域的左边边界位置，相对于父div
            top: pos_top , //区域的上边边界位置，相对于父div
            height: danmu_height, //区域的高度 width: 640, //区域的宽度
            width:1200,
            zindex :200, //div的css样式zindex
            speed:15000, //弹幕速度，飞过区域的毫秒数
            sumtime:50000 , //弹幕运行总时间
            danmuss:msg_list, //danmuss对象，运行时的弹幕内容
            default_font_color:"#ffffff", //弹幕默认字体颜色
            font_size_small:18, //小号弹幕的字体大小,注意此属性值只能是整数
            font_size_big:22, //大号弹幕的字体大小
            opacity:"1", //弹幕默认透明度
            top_botton_danmu_time:10000 //顶端底端弹幕持续时间
        });

        //  与页面背景一致
        var bg = $(".readCon,.readcon").css("background-color");
        $("#danmuBg").css("background-color",bg);
        $("#danmuBg").css("position",'absolute');
        $("#danmuBg").css("left",0);
        $("#danmuBg").css("top",pos_top - (Bg_height - danmu_height));
        $("#danmuBg").css("width",'980px');
        $("#danmuBg").css("height",Bg_height+'px');
        $("#danmuBg").css("z-index",'199px');
        //$("#danmuBg").css("height",danmu_height+'px');
        $("#danmuBg").css("opacity",'0.9');

        $(".read_spitBox").css('top',pos_top+120+danmu_height);
        $(".read_spitBox").css('z-index',300);
        $(".read_spitBox").show();

        //  播放按钮状态： 暂停
        $('.read_spit_play').addClass('read_spit_pause');

        //  Adjust Toolbar's position
        setTimeout(resize,100);
    }
    ,getAndShowTucao:function(p_index1,p_index2){

        var p_index=p_index1>p_index2?p_index2:p_index1;
        //  ----    Save Paragraph id   ----
        var ParagraphId=$(".myContent p").eq(p_index).attr('id');
        $(".read_spit_btn").attr('ParagraphId',ParagraphId);

        //  ----    get Paragraph Id list
        min_id = p_index1>=p_index2?p_index2:p_index1;
        max_id =  p_index1>=p_index2?p_index1:p_index2;

        Ids = "";
        for (var k=p_index; k<=(p_index1>p_index2?p_index1:p_index2); k++){
            var objP=$(".myContent p").eq(k);
            var id = parseInt(objP.attr('id'));
            if (Ids != '') Ids = Ids + ',' + id;
            else         Ids = id;
        }

        if($("#danmu").length > 0) {
            tucao.reset_window();
        }

        //  ----    query tucao list
        var msgArray=new Array()
        msgArray = tucao.getTucao($(".read_label").attr("ChapterId"), Ids);

        //  the first paragraph
        var objP=$(".myContent p").eq(p_index);

        var y = objP.offset().top - 241;
        var space = 0
        p_index = p_index -1 ;
        while ((p_index>0) && (space<190) ){
            var objP1=$(".myContent p").eq(p_index);
            space = objP.offset().top - objP1.offset().top;
            p_index = p_index -1 ;
        }

        var strHtml= '<div id="danmu"></div><div id="danmuBg"></div>' ;
        $(".myContent").before(strHtml);

        $(document).attr('myContent_flag',1);
        tucao.tucao(y ,msgArray,space);

    }
}

$(document).ready(function(){

       //  初始化 字体、颜色
    setReadInfo()

    /*  如果章节内容太少，高度增加 */
    var contentHeight = $('.readcon').height();
    if( (contentHeight+180) < $(window).height()){
        $('.readcon').css('min-height',$(window).height()-180);
    }

    //  调整左侧工具栏位置
    resize();

    //  点击关闭吐槽窗口，如果有的话
    $(document).click(function(event) {

        if ((event.target.className == "read") || (event.target.className == "clearfix") ) {
            tucao.reset_window();
        } else if(event.target.className == "myContent"){
            if($(document).attr('myContent_flag') != 1){
                tucao.reset_window();
            }
            $(document).attr('myContent_flag',0);
        }

        if ((event.target.className != "read_help") && (event.target.className != "left read_spit_help title_Box")){
            $(".container2").css("display","none");
            $(".read_help").find(".read_triangle3").css("display","none");
            $(".container2").stop().animate({ 'opacity': 0 }, 300);
            $(".read_help").find(".read_triangle3").stop().animate({ 'opacity': 0 }, 300);
        }

    });
    //  左键禁止
    document.oncontextmenu = function(){
        return false;
    }
    //  禁止复制
    document.onkeydown = function(evt) {
        evt = evt ||window.evt;
        var key=evt.which||evt.keyCode;

        if (evt.ctrlKey && key == 67) {
            return false;
        }
    }

    //  ----    鼠标选取处理  ----
    //var p_index1=-1;     //  选择 起始位置
    var p_index2=-1;     //  选择 结束位置
    var Ids='';
    var min_id =-1;     //  上一次选择：起始段落ＩＤ
    var max_id = -1;    //  上一次选择：结束段落ＩＤ

    $("p").mousedown(function(event){
        var obj1 = event.target;
        if(obj1.tagName.toUpperCase() != 'P'){
            return false;
        } else if ($(obj1).parent()[0].className != "myContent"){
            return false;
        }
        /*  如果是右键，退出   */
        if(event.button == 2)
            return false;

        p_index1=$(this).index();

//console.log('mouse down at ' + p_index1 + ',min_id:'+min_id+';max_id:'+max_id);

        if ( (parseInt(min_id) <=parseInt(p_index1)) && (parseInt(p_index1)<=parseInt(max_id)) ){
            p_index1 = -1;
            tucao.reset_window();
        }
        p_index2=-1;
    })

    $("p").mouseup(function(event){
        var obj1 = event.target;
        if(obj1.tagName.toUpperCase() != 'P'){
            return false;
        } else if ($(obj1).parent()[0].className != "myContent"){
            return false;
        }
/*  如果不是左键，退出 IE8.0 返回1
  * 如果是右键，退出
  * */
        if(event.button == 2)
            return false;

        p_index2=$(this).index();
        if(navigator.appName=="Microsoft Internet Explorer"){
            strText=document.selection.createRange().text;
        }else{
            strText=window.getSelection();
        }
//console.log('mouse up at ' + p_index2 + ', 1:' + p_index1);
        var strText1 = "";
        if (typeof strText != undefined)
            strText1 = strText.toString()
//console.log(strText1 + ', p_index1=' + p_index1);
        //  ----    如果选择有文字,显示 吐槽 框 ----
        if ((strText1!='') && (p_index1>0) ) {
            //  吐槽开关； read_spitOn开启是关闭状态，关闭是开启状态
            /*
            if($('.read_spitOn').css('display')=='block'){
                return false;
            }
            */
            tucao.getAndShowTucao(p_index1,p_index2);
        } else {
            tucao.reset_window();
        }
        p_index1=-1;
        p_index2=-1;
    })

    /*  窗体滚动 左侧边栏跟随移到 */
    $(window).scroll(function(){
        //  如果有弹幕，则不滚动
        if($("#danmu").length == 0) {
            resize();
        }
    })

    /*阅读页 上一页、下一页、打赏作者按钮鼠标滑动效果*/
    $(".read_last,.read_next").hover(function(){
        $(this).addClass("last_next_hover")
    },function(){
        $(this).removeClass("last_next_hover")
    })

    $(".read_last,.read_next").mousedown(function(){
        $(this).addClass("last_next_down")
    })
    $(".read_last,.read_next").mouseup(function(){
        $(this).removeClass("last_next_down")
    })

    $(".read_award").hover(function(){
        $(this).addClass("read_award_hover");
    },function(){
        $(this).removeClass("read_award_hover");
    })

    $(".read_award").mousedown(function(){
        $(this).addClass("read_award_down")
    })
    $(".read_award").mouseup(function(){

        $(this).removeClass("read_award_down")
    })

    /*标签鼠标滑动、点击效果*/
    $(".read_label_a").hover(function(){
        $(this).parent().addClass("read_label_hover");
    },function(){
        $(this).parent().removeClass("read_label_hover");
    })

    /*  作品标签  */
    $(".read_label_a").mousedown(function(){
        var loginUser = GPT.getCookieValue('UserId');
        if( (loginUser == false) || (loginUser == 0) || (loginUser == '') ){
            kana.loadLoginForm();
            return false;
        }
        var url1    =   '/home/Ajax/ajaxBookmark';
        var data    =   {};
        data['BookId']  =   $(".read_label").attr("BookId");
        data['ChapterId']   =   $(".read_label").attr("ChapterId");
        $.ajax({
            type  :   'POST',
            url     :   url1,
            dataType:   'json',
            data    :   data
        }).done(function(response){
            if (response.status=='1') {
                /*  操作成功,切换显示状态！  */
                if($('.read_label').hasClass("read_label_down")) {
                    $('.read_label').removeClass ("read_label_down");
                } else {
                    $('.read_label').addClass("read_label_down");
                }
                window.location.reload();
            } else {
                kana.showError(response.msg);
            }
        });
    })

  /*侧栏1 标签、目录鼠标滑动、点击效果,详情显示*/
    $(".read_labelBtn_a").hover(function(){
        $(this).parent().addClass("read_labelBtn_hover");
    },function(){
        $(this).parent().removeClass("read_labelBtn_hover");
    })

    $(".read_labelBtn_a").mousedown(function(){
        $(this).parent().addClass("read_labelBtn_down");
    })
    $(".read_labelBtn_a").mouseup(function(){
        $(this).parent().removeClass("read_labelBtn_down");
    })

    /*书签详情显示、隐藏*/
    $(".read_labelBtn").hover(function(){
        $(".read_Label").css("display","block");
        $(this).find(".read_triangle").css("display","block");
        $(".read_Label").stop().animate({'opacity':1}, 300);
        $(this).find(".read_triangle").stop().animate({'opacity':1}, 300);

    },function(){
        $(".read_Label").css("display","none");
        $(this).find(".read_triangle").css("display","none");

        $(".read_Label").stop().animate({'opacity':0}, 300);
        $(this).find(".read_triangle").stop().animate({'opacity':0}, 300);
    })

    $(".read_listBtn").hover(function(){
        $(".container1").css("display","block");
        $(this).find(".read_triangle1").css("display","block");
        $(".container1").stop().animate({'opacity':1}, 300);
        $(this).find(".read_triangle1").stop().animate({'opacity':1}, 300);

        if($('.div_scroll').find('.mCustomScrollBox').length<1){
            $('.div_scroll').mCustomScrollbar();
        }

    },function(){
        $(".container1").css("display","none");
        $(this).find(".read_triangle1").css("display","none");
        $(".container1").stop().animate({ 'opacity': 0 }, 300);
        $(this).find(".read_triangle1").stop().animate({ 'opacity': 0 }, 300);

    })

    /*背景详情显示、隐藏*/
    $(".read_back").hover(function(){
        $(".read_Back").css("display","block");
        $(this).find(".read_triangle1").css("display","block");
        $(".read_Back").stop().animate({ 'opacity': 1 }, 300);
        $(this).find(".read_triangle1").stop().animate({ 'opacity': 1 }, 300);

    },function(){
        $(".read_Back").css("display","none");
        $(this).find(".read_triangle1").css("display","none");
        $(".read_Back").stop().animate({ 'opacity': 0 }, 300);
        $(this).find(".read_triangle1").stop().animate({ 'opacity': 0 }, 300);

    })

    /*文字详情显示、隐藏*/
    $(".read_word").hover(function(){
        $(".read_Word").css("display","block");
        $(this).find(".read_triangle1").css("display","block");
        $(".read_Word").stop().animate({ 'opacity': 1 }, 300);
        $(this).find(".read_triangle1").stop().animate({ 'opacity': 1 }, 300);

    },function(){
        $(".read_Word").css("display","none");
        $(this).find(".read_triangle1").css("display","none");
        $(".read_Word").stop().animate({ 'opacity': 0 }, 300);
        $(this).find(".read_triangle1").stop().animate({ 'opacity': 0 }, 300);

    })

    $(".read_listBtn_a").hover(function(){

        $(this).parent().addClass("read_listBtn_hover");

    },function(){

        $(this).parent().removeClass("read_listBtn_hover");

    })
    $(".read_listBtn_a").mousedown(function(){

        $(this).parent().addClass("read_listBtn_down");

    })
    $(".read_listBtn_a").mouseup(function(){

        $(this).parent().removeClass("read_listBtn_down");

    })

    /*侧栏2 按钮鼠标滑过、点击效果*/
    /*显示、隐藏吐槽*/
   /* $(".read_spitOn_a").hover(function(){
        $(this).parent().addClass("read_spitOn_hover");
        $(this).siblings().show();
    },function(){
        $(this).parent().removeClass("read_spitOn_hover");
        $(this).siblings().hide();
    })*/

    $(".read_spitOn").hover(function(){
        $(this).find(".close_on").show();
    },function(){
        $(this).find(".close_on").hide();
    })

    $(".read_spitOn_a").mousedown( function(){
        $(this).parent().addClass("read_spitOn_down");
    })
    $(".read_spitOn_a").mouseup( function(){
        $(this).parent().removeClass("read_spitOn_down");
        $(this).parent().hide().next().show();
    })

    /*$(".read_spitClose_a_a").hover(function(){
        $(this).parent().addClass("read_spitClose_hover");
        $(this).siblings().show();
    },function(){
        $(this).parent().removeClass("read_spitClose_hover");
        $(this).siblings().hide();
    })*/

    $(".read_spitClose").hover(function(){
        $(this).find(".close_on").show();
    },function(){
        $(this).find(".close_on").hide();
    })

    $(".read_spitClose_a").mousedown( function(){
        $(this).parent().addClass("read_spitClose_down");
    })

    $(".read_spitClose_a").mouseup( function(){
        $(this).parent().removeClass("read_spitClose_down");
        $(this).parent().hide();
        $(".read_spitOn").show();
    })
    $(".read_spitOn_a").click(function(event){
        getTucaoNum();
        saveReadInfo('','','','',2);
    })
    $(".read_spitClose_a").click(function(event){
        //console.log('click close tucao button...');
        hideTucaoNum();
        $(this).parent().hide();
        $(".read_spitOn").show();
        saveReadInfo('','','','',1);
    })

    $(".read_music_a").hover(function(){

        $(this).parent().addClass("read_music_hover");

    },function(){

        $(this).parent().removeClass("read_music_hover");
    })

    $(".read_music_a").mousedown(function(){

        $(this).parent().addClass("read_music_down");

    })
    $(".read_music_a").mouseup(function(){

        $(this).parent().removeClass("read_music_down");

    })

    $(".read_back_a").hover(function(){

        $(this).parent().addClass("read_back_hover");

    },function(){

        $(this).parent().removeClass("read_back_hover");
    })

    $(".read_back_a").mousedown(function(){

        $(this).parent().addClass("read_back_down");

    })
    $(".read_back_a").mouseup(function(){

        $(this).parent().removeClass("read_back_down");

    })
    $(".read_word_a").hover(function(){

        $(this).parent().addClass("read_word_hover");

    },function(){

        $(this).parent().removeClass("read_word_hover");
    })

    $(".read_word_a").mousedown(function(){

        $(this).parent().addClass("read_word_down");

    })
    $(".read_word_a").mouseup(function(){

        $(this).parent().removeClass("read_word_down");

    })

    $(".read_help_a").hover(function(){

        $(this).parent().addClass("read_help_hover");

    },function(){

        $(this).parent().removeClass("read_help_hover");
    })

    $(".read_help_a").mousedown(function(){

        $(this).parent().addClass("read_help_down");

    })
    $(".read_help_a").mouseup(function(){

        $(this).parent().removeClass("read_help_down");

    })


    /*  帮助  */
    $(".read_help").hover(function(){

        if($("#bg_div").css("backgroundImage") == 'none' ){
            $("#bg_div").css("backgroundImage",'url('+$("#bg_div").attr("helpfile")+')');
        }
        $(".container2").css("display","block");
        $(this).find(".read_triangle3").css("display","block");
        $(this).find(".read_triangle3").stop().animate({ 'opacity': 1 }, 300);
        $(".container2").stop().animate({ 'opacity': 1 }, 300);


    },function(){
        $(".container2").css("display","none");
        $(this).find(".read_triangle3").css("display","none");
        $(".container2").stop().animate({ 'opacity': 0 }, 300);
        $(this).find(".read_triangle3").stop().animate({ 'opacity': 0 }, 300);
    })


    /*侧栏书签鼠标滑动背景颜色改变*/
    $(".read_Label li").hover(function(){

        $(this).addClass("read_Label_li_hover")

    },function(){

        $(this).removeClass("read_Label_li_hover")

    })

    /*  侧栏标签删除点击    */
    $(".read_labelClean_on").hover(function(){

        $(this).addClass("read_labelClean_down")

    },function(){

        $(this).removeClass("read_labelClean_down")

    })
    $(".read_labelClean_on").click(function(){

        var loginUser = GPT.getCookieValue('UserId');
        if( (loginUser == false) || (loginUser == 0) || (loginUser == '') ){
            kana.loadLoginForm();
            return false;
        }

        var data    =   {};
        data['BookId']  =   $(".read_label").attr("BookId");
        data['ChapterId']   =   $(this).attr("ChapterId");
        $.ajax({
            type  :   'POST',
            url     :   url1,
            dataType:   'json',
            data    :   data
        }).done(function(response){
            if (response.status=='1') {
                //alert('标签添加成功！')
                kana.showSuccess('标签添加成功！',{'msg':'','url':'','url_name':''});
                $(this).parent().parent().remove();
                if ($('.read_Label').find('li').length<1 ) {
                    $('.read_Label').remove();
                    $('.read_labelBtn .read_triangle').remove();
                }
            }
        });
    })

    /*标签删除弹出框鼠标滑动、点击效果*/
    $(".read_labelClean_btn").click(function(){

        $(".read_labelClean_btn_choose").show();
    })

    /*  关闭按钮    */
    $(".read_labelClean_btn_choose_sp2").hover(function(){

        $(this).addClass("read_labelClean_btn_choose_sp2_hover");

    },function(){

        $(this).removeClass("read_labelClean_btn_choose_sp2_hover");

    })
    $(".read_labelClean_btn_choose_sp2").click(function(){

        $(".read_labelClean_btn_choose").hide();

    })

    /*  确定按钮    */
    $(".read_labelClean_btn_choose_btn1").hover(function(){

        $(this).addClass("read_labelClean_btn_choose_btn1_hover");

    },function(){

        $(this).removeClass("read_labelClean_btn_choose_btn1_hover");

    })
    $(".read_labelClean_btn_choose_btn1").mousedown(function(){

        $(this).addClass("read_labelClean_btn_choose_btn1_down");

    })
    $(".read_labelClean_btn_choose_btn1").mouseup(function(){

        $(this).removeClass("read_labelClean_btn_choose_btn1_down");

    })
    $(".read_labelClean_btn_choose_btn1").click(function(){
        $(".read_label1").remove();
        $(".read_labelClean_btn_choose").hide();

    })
    /*  取消按钮    */
    $(".read_labelClean_btn_choose_btn2").hover(function(){
        $(this).addClass("read_labelClean_btn_choose_btn2_hover");
    },function(){
        $(this).removeClass("read_labelClean_btn_choose_btn2_hover");
    })
    $(".read_labelClean_btn_choose_btn2").mousedown(function(){
        $(this).addClass("read_labelClean_btn_choose_btn2_down");
    })
    $(".read_labelClean_btn_choose_btn2").mouseup(function(){
        $(this).removeClass("read_labelClean_btn_choose_btn2_down");
    })
    $(".read_labelClean_btn_choose_btn2").click(function(){
        $(".read_labelClean_btn_choose").hide();
    })

    //  设置字体、颜色
    function saveReadInfo(size,color,sizeid,colorid,spit,brush) {
        var str = $.cookie('readsetting');
        var sizeOld = "16px";
        var colorOld = "rgb(255, 255, 255)";
        var sizeOldId = 'read_Word_size3';
        var colorOldId = 'read_Back_white';
        var thespit = 0;
        var thebrush = 1;
        if( typeof str == "string" ){
            var list = str.split('|');
            if (list.length>4){
                sizeOld = list[0];
                sizeOldId = list[1];
                colorOld = list[2];
                colorOldId = list[3];
                thespit = list[4];
                thebrush = list[5];
            }
        }

        if(size  == '') size = sizeOld;
        if(sizeid  == '') sizeid = sizeOldId;
        if(color == '') color = colorOld;
        if(colorid == '') colorid = colorOldId;
        if(spit == '' || spit == undefined) spit = thespit;
        if(brush == '' || brush == undefined) brush = thebrush;

        var expires = new Date();
        expires.setTime(expires.getTime() + 3 * 30 * 24 * 60 * 60 * 1000);
        /* 三个月 x 一个月当作 30 天 x 一天 24 小时
         x 一小时 60 分 x 一分 60 秒 x 一秒 1000 毫秒 */
        //alert(expires.toGMTString());
        //alert(expires);
        $.cookie('readsetting',size + '|' + sizeid+ '|' + color + '|' + colorid + '|' + spit + '|' + brush,  {expires: expires });
    }

    //  读取字体、颜色设置并 初始化
    function setReadInfo(){
        console.log(2);
        var str = $.cookie('readsetting');
        if( typeof str == "string" ){
            var list = str.split('|');
            if(list.length>4){
                var sizeOld = list[0];
                var sizeOldId = list[1];
                var colorOld = list[2];
                var colorOldId = list[3];
                var thespit = list[4];
                var thebrush = list[5];
            }


            //  设置文本属性 、 工具栏默认选中属性
            if(sizeOld !="")  $(".myContent").find('p').css("font-size",sizeOld);
            if(colorOld !="") {
                $(".readCon,.readcon").css("background-color",colorOld);
                $("#danmuBg").css("background-color",colorOld);
                $(".myContent").css("background-color",colorOld);
            }
            if(sizeOldId !=""){
                $('#'+sizeOldId).addClass('read_Word_Hot read_Word_li_down');
                $('#'+sizeOldId).siblings().removeClass('read_Word_Hot read_Word_li_down');
            }
            if(colorOldId !=""){
                $('#'+colorOldId).addClass('read_Back_Hot read_Back_li_down');
                $('#'+colorOldId).siblings().removeClass('read_Back_Hot read_Back_li_down');
            }
            if(thespit==1){
//console.log('spit function closed in setReadInfo to exit....');
                //reset_window();
                $('.read_spitClose_a').parent().hide();
                $(".read_spitOn").show();
            }else{
                //reset_window();
                $(this).parent().hide();
                $(".read_spitClose").show();
            }
            if(thebrush !=""){

                $(".read_spit_color_brush_"+thebrush).addClass('read_spit_color_brush_Hot');
                $(".read_spit_color_brush_"+thebrush).siblings().removeClass('read_spit_color_brush_Hot');

                if(thebrush==1){
                    $(".read_spit_color_brush_icon").css("background-position","-38px 0");
                    $("input.read_spit_box").attr('color1',"#FFFFFF");
                }else if(thebrush==2){
                    $(".read_spit_color_brush_icon").css("background-position","-61px 0");
                    $("input.read_spit_box").attr('color1',"#f4f117");
                }else if(thebrush==3){
                    $(".read_spit_color_brush_icon").css("background-position","-84px 0");
                    $("input.read_spit_box").attr('color1',"#21ff89");
                }else if(thebrush==4){
                    $(".read_spit_color_brush_icon").css("background-position","-107px 0");
                    $("input.read_spit_box").attr('color1',"#17f4f1");
                }else if(thebrush==5){
                    $(".read_spit_color_brush_icon").css("background-position","-130px 0");
                    $("input.read_spit_box").attr('color1',"#f221ff");
                }else if(thebrush==6){
                    $(".read_spit_color_brush_icon").css("background-position","-153px -1px");
                    $("input.read_spit_box").attr('color1',"#f33030");
                }
            }
        }
    }


    /*背景颜色选择鼠标滑动、点击*/
    $(".read_Back li").hover(function(){
        $(this).addClass("read_Back_li_hover")
    },function(){
        $(this).removeClass("read_Back_li_hover")
    })

    $(".read_Back li").click(function(){
        $(this).addClass("read_Back_li_down").siblings().removeClass("read_Back_li_down");
        var m=$(this).css("background-color");
        saveReadInfo('',m,'',this.id);
        setReadInfo();
    })

    /*文字选择鼠标滑动、点击*/
    $(".read_Word li").hover(function(){
        $(this).addClass("read_Word_li_hover")
    },function(){
        $(this).removeClass("read_Word_li_hover")
    })

    $(".read_Word li").click(function(){
        $(this).addClass("read_Word_li_down").siblings().removeClass("read_Word_li_down");
        var size=$(this).css("font-size");
        if(size=="14px"){
            size="12px";
        }else if(size=="16px"){
            size="14px";
        }else if(size=="18px"){
            size="16px";
        }else if(size=="20px"){
            size="18px";
            lh=""
        }else if(size=="22px"){
            size="20px";
        }else if(size=="24px"){
            size="22px";
        }
        //$(".readcon").find("p").css("font-size",size);

        saveReadInfo(size,'',this.id,'');
        setReadInfo();
    })

    /*  打赏  */
    $("#jbText").focus(function(event) {
        $(this).css("box-shadow","0 0 3px rgba(255,255,255,0.06) inset");
        $(this).css("border-color","#fc8813");
        if($(this).val()=="自定义"){
            $(this).val("");
            $(this).css("color","#333");
        }
    }).blur(function(event) {
        $(this).css("box-shadow","0 0 3px rgba(0,0,0,0.06) inset");
        $(this).css("border-color","#dfdfdf");
        if($(this).val()==""){
            $(this).val("自定义");
            $(this).css("color","#999");
        }
    });
    $('#jbText').keyup(function(){
        $(".lightC ul li a").removeClass('jbHot');
    })


    $(".lightC_B_input").focus(function(event) {
        $(this).css("box-shadow","0 0 3px rgba(255,255,255,0.06) inset");
        $(this).css("border-color","#fc8813");
        if($(this).val()=="打赏寄语"){
            $(this).val("");
            $(this).css("color","#333");
        }
    }).blur(function(event) {
        $(this).css("box-shadow","0 0 3px rgba(0,0,0,0.06) inset");
        $(this).css("border-color","#dfdfdf");
        if($(this).val()==""){
            $(this).val("打赏寄语");
            $(this).css("color","#999");
        }
    });
    $(".lightC_B_input").keyup(function(){
        $('#wordsNum').html($(this).val().length);
    })

    /*  金币选择  */
    $(".lightC ul li a").click(function(event) {
        $(this).addClass('jbHot');
        $("#jbText").val($(this).find('span').text());
        $(this).parent().siblings().find('a').removeClass('jbHot');
    });

    /*  打赏  */
    $('#btnReward').click(function(){

        /*  正在操作中，不可用   */
        if($("#btnReward").attr('clickflag')==1)
            return;
        /*  开始处理，设置按钮为正在操作中状态，不可用   */
        $("#btnReward").attr('clickflag',1);
        var chkPass = true;             /*  表单数据是否合格标识   */

        var loginUser = GPT.getCookieValue('UserId');
        if( (loginUser == false) || (loginUser == 0) || (loginUser == '') ){
            kana.loadLoginForm();
            chkPass = false;
            //return false;
        }

        var BookId = $(this).attr('bookid');
        var ChapterId = $(this).attr('chapterid');

        var restCoin = parseFloat($('#restCoin').html()) ;
        var payCoin = parseFloat($('#jbText').val()) ;
        if ((payCoin-restCoin)>0) {
            var url1 ="/home/pay/index";
            window.open(url1);
            chkPass = false;
            //return false;
        }else if(payCoin<=0) {
            kana.showError('请选择要打赏的金额');
            chkPass = false;
            //return false;
        }else if($('#wordsNum').html()>50){
            kana.showError('打赏寄语不要超过50个字');
            chkPass = false;
            //return false;
        }

        if (chkPass == false){
            setTimeout(function(){
                $("#btnReward").attr('clickflag',0);
            },3000);
            return false;
        }

        var PostData = "ActionType=post&ObjectId=" + BookId + "&ObjectType=1&CoinTotal=" + payCoin + "&RewardInfo=" + $(".lightC_B_input").val();
        var result = GPT.sendAjax("/home/book/ajaxRewardAuthor", PostData);
        if(result.status == 1){
            //kana.showSuccess(result.info, {'msg': '', 'url': kana.getDomain('www') + '/home/book/read/' + ChapterId, 'url_name': '阅读页'});
            kana.showSuccessLittle('打赏成功');
            setTimeout(function(){
                window.location.reload();
            },3000)
            //window.location.reload();
        }
        else
            kana.showError(result.info, {'msg': '', 'url': '', 'url_name': ''});


        setTimeout(function(){
            $("#btnReward").attr('clickflag',0);
        },3000);

    })

    /*颜色刷子*/

    $(".read_spit_color_brush").hover(function() {
        $(this).find('.read_spit_color_brush_').show();
    }, function() {
        $(this).find('.read_spit_color_brush_').hide();
    });

    $(".read_spit_color_brush_ ul li a").click(function(event) {
        $(this).parent().addClass('read_spit_color_brush_Hot');
        $(this).parent().siblings().removeClass('read_spit_color_brush_Hot');
    });

    $(".read_spit_color_brush_1").click(function(event) {
        $(".read_spit_color_brush_icon").css("background-position","-38px 0");
        $("input.read_spit_box").attr('color1',"#FFFFFF");
        saveReadInfo('','','','','',1);
    });
    $(".read_spit_color_brush_2").click(function(event) {
        $(".read_spit_color_brush_icon").css("background-position","-61px 0");
        $("input.read_spit_box").attr('color1',"#f4f117");
        saveReadInfo('','','','','',2);
    });
    $(".read_spit_color_brush_3").click(function(event) {
        $(".read_spit_color_brush_icon").css("background-position","-84px 0");
        $("input.read_spit_box").attr('color1',"#21ff89");
        saveReadInfo('','','','','',3);
    });
    $(".read_spit_color_brush_4").click(function(event) {
        $(".read_spit_color_brush_icon").css("background-position","-107px 0");
        $("input.read_spit_box").attr('color1',"#17f4f1");
        saveReadInfo('','','','','',4);
    });
    $(".read_spit_color_brush_5").click(function(event) {
        $(".read_spit_color_brush_icon").css("background-position","-130px 0");
        $("input.read_spit_box").attr('color1',"#f221ff");
        saveReadInfo('','','','','',5);
    });
    $(".read_spit_color_brush_6").click(function(event) {
        $(".read_spit_color_brush_icon").css("background-position","-153px -1px");
        $("input.read_spit_box").attr('color1',"#f33030");
        saveReadInfo('','','','','',6);
    });

    ///*  工具栏帮助   */
    //$('#tucao_help1').hover(function(){
    //    //console.log('hover...');
    //
    //    if($("#bg_div").css("backgroundImage") == 'none' ){
    //        $("#bg_div").css("backgroundImage",'url('+$("#bg_div").attr("helpfile")+')');
    //    }
    //    $(".container2").parent().find(".read_triangle3").stop().fadeIn();
    //    $(".container2").stop().fadeIn();
    //},function(){
    //    $(".container2").stop().fadeOut();
    //    $(".container2").parent().find(".read_triangle3").stop().fadeOut();
    //});
    /*  工具栏帮助   */
    //$('#tucao_help2').click(function(){
    //    //console.log('hover...');
    //
    //    if($("#bg_div").css("backgroundImage") == 'none' ){
    //        $("#bg_div").css("backgroundImage",'url('+$("#bg_div").attr("helpfile")+')');
    //    }
    //    $(".container2").parent().find(".read_triangle3").stop().fadeIn();
    //    $(".container2").stop().fadeIn();
    //},function(){
    //    $(".container2").stop().fadeOut();
    //    $(".container2").parent().find(".read_triangle3").stop().fadeOut();
    //});


    /*$(".redWallet1_In_mian").hover(function() {
        $(".mCSB_scrollTools").show();
    }, function() {
        $(".mCSB_scrollTools").hide();
    });*/

/*--------------------------红包-----------------------------------------*/
/*  发红包 输入框 */
    $(".redWallet2_Box1").click(function(event) {
        $(this).find('.redWallet2_Box1_input').focus();
        if($(this).find('.redWallet2_Box1_input').val()=="填写个数") {
            $(this).find('.redWallet2_Box1_input').val("");
            $(this).find('.redWallet2_Box1_input').css("color","#333");
        }

        $(this).find('.redWallet2_Box2_input').focus();
        if($(this).find('.redWallet2_Box2_input').val()=="填写金额")
        {
            $(this).find('.redWallet2_Box2_input').val("");
            $(this).find('.redWallet2_Box2_input').css("color","#333");
        }

    });
    $(".redWallet2_Box1_input").blur(function(event) {
        if($(this).val()==""){
            $(this).val("填写个数");
            $(this).css("color","#c7c7c7");
        }
    });

    /*  检查余额是否够,不够显示充值按钮 */
    function checkMoney(){

        var RDAmount = parseFloat($('#redwalletAmount').val());
        var balance = parseFloat($('#usercoin').html());
//console.log('I have '+ balance + ', need '+RDAmount);

        if(balance<1){
            $('.redWallet2_Box5_In').eq(1).css('display','inline-block');
            $('.redWallet2_Box5_In').eq(0).css('display','none');
        } else if(RDAmount == 0 ){
            $("#usercoin").parents('.redWallet2_Box5_In').eq(0).css('display','inline-block');
            $("#usercoin").parents('.redWallet2_Box5_In').eq(1).css('display','none');
            $("#usercoin").parents('.redWallet2_Box5_In').eq(0).parent('a').css('background-color','#f9aea5');
        }else if((balance - RDAmount)>=0){
            $('.redWallet2_Box5_In').eq(0).css('display','inline-block');
            $('.redWallet2_Box5_In').eq(0).parent('a').css('background-color','#fa6352');
            $('.redWallet2_Box5_In').eq(1).css('display','none');
            //$('#usercoin').html(balance);
        } else {
            $('.redWallet2_Box5_In').eq(1).css('display','inline-block');
            $('.redWallet2_Box5_In').eq(0).css('display','none');
        }
    }

    $(".redWallet2_Box2_input").blur(function(event) {
        if (($(this).val()=="") || (($(this).val()=="填写金额")) ){
            $(this).val("填写金额");
            $(this).css("color","#c7c7c7");
            $('#totalcoin_new').html(0);
        } else {
            $('#totalcoin_new').html($(this).val());
            checkMoney();
        }
    });

    $(".redWallet2_Box2_input").keyup(function(event) {
        if (($(this).val()=="") || (($(this).val()=="填写金额")) ){
            $(this).val("填写金额");
            $(this).css("color","#c7c7c7");
            $('#totalcoin_new').html(0);
        } else {
            $('#totalcoin_new').html($(this).val());
            checkMoney();
        }
    });

    $(".redWallet2_Box3_text").focus(function(event) {
        if($(this).val()=="祝大家阅读愉快")
        {
            $(this).val("");
            $(this).css("color","#333");
        }
    }).blur(function(event) {
        if($(this).val()=="")
        {
            $(this).val("祝大家阅读愉快");
            $(this).css("color","#c7c7c7");
        }
    });




//  --- 播放 / 暂停 ----
    $(".read_spit_play").click(function(){
        $(this).toggleClass("read_spit_pause")

        //  播放按钮
        if($(this).hasClass('read_spit_pause')){
            $('#danmu').danmu('danmu_resume');

        } else {
         // 暂停按钮
            $('#danmu').danmu('danmu_pause');
        }

    })

    $(".read_spit_play").hover(function(){
        if($(this).hasClass('read_spit_pause')){
            $(this).find('.read_spit_color_brush_title1').show();
        } else {
            // 暂停按钮
            $(this).find('.read_spit_color_brush_title').show();
        }
    },function(){
        $(this).find('.read_spit_color_brush_title').hide();
        $(this).find('.read_spit_color_brush_title1').hide();
    })


    /*吐槽上一页、下一页、播放键鼠标滑动、点击*/

    /*      Previous 上一批    */
    $(".read_spit_last").hover(function(){
        $(this).addClass("read_spit_last_hover");
    },function(){
        $(this).removeClass("read_spit_last_hover");
    })
    $(".read_spit_last").mousedown(function(){
        $(this).addClass("read_spit_last_down");
    });
    $(".read_spit_last").mouseup(function(){
        $(this).removeClass("read_spit_last_down");
    });
    $(".read_spit_last").click(function(){
        $('#danmu').danmu("clear_danmu",{'destination':-500});
    })

    /*      next    下一批     */
    $(".read_spit_next").hover(function(){
        $(this).addClass("read_spit_next_hover");
    },function(){
        $(this).removeClass("read_spit_next_hover");
    })
    $(".read_spit_next").mousedown(function(){
        $(this).addClass("read_spit_next_down");
    });
    $(".read_spit_next").mouseup(function(){
        $(this).removeClass("read_spit_next_down");
    });
    $(".read_spit_next").click(function(){
        $('#danmu').danmu("clear_danmu",{'destination':1800});
    })

    //  ----    吐槽输入框   ----
    $(".read_spit_box").bind('click',function(event) {

        var ParagraphId=$(".read_spit_btn").attr('paragraphid');
        var divObj = $(".readcon");
        var divP = divObj.find("p[id='" + ParagraphId + "']") ;

        //  吐槽对象加重显示
        divP.attr('focusflag',1)
        divP.css('background-color','#6f9ed9');
        //  吐槽段落前10个字
        $(".read_spit_btn").attr('RefContent',divP.text().trim().substr(1,10));

        event.stopPropagation();
    });

    $(".read_spit_box").keypress(function(evt){
        evt = evt ||window.event;
        var key=evt.which||evt.keyCode;

        switch(key){
            case 13:    //  ENTER
                addTucao();
                break;
        }
    });

    //  ----    添加吐槽  ----
    $(".read_spit_btn").click(function(){
        addTucao();
    })

    function addTucao() {

        /*  正在操作中，不可用   */
        if($(".read_spit_btn").attr('clickflag')==1)
            return;
        /*  开始处理，设置按钮为正在操作中状态，不可用   */
        $(".read_spit_btn").attr('clickflag',1);
        var chkPass = true;

        var url1="/home/Ajax/AjaxcDanmu";
        var ParagraphId=$(".read_spit_btn").attr('ParagraphId');
        var ChapterId=$(".read_spit_btn").attr('ChapterId');
        var BookId =$(".read_spit_btn").attr('BookId');

        var loginUser = GPT.getCookieValue('UserId');
        if( (loginUser == false) || (loginUser == 0) || (loginUser == '') ){
            kana.loadLoginForm();
            return false;
        }

        var RefContent=$(".read_spit_btn").attr('RefContent');

        var text = $(".read_spit_box").val().trim();
        var color = $("input.read_spit_box").attr('color1')// $("input.read_spit_box").css('color');  //  "#f7fa12";
        var position = 0;
        var time = 100  ;
        var size =0;

        var len1 = kana.countWords(text);
        //console.log(text);
        //console.log(len1);

        if(len1 < 1) {
            //kana.showError('你好像有话想说吧~');
            //return false;
            kana.showErrorLittle('说点什么吧~');
            chkPass = false;
        }
        else if( len1>20){
            //kana.showError('吐槽字数请不要超过12个字符~');
            kana.showErrorLittle('吐槽字数不要超过20个汉字长度~');
            chkPass = false;
            //return false;
        }
//console.log(chkPass);

        if (chkPass == false){
            setTimeout(function(){
                $(".read_spit_btn").attr('clickflag',0);
            },5000);
            return false;
        }

        var text_obj='{ "text":"'+text+'","color":"'+color+'","size":"'+size+'","position":"'+position+'","isnew":""}';
        var new_obj=eval('('+text_obj+')');
        var temp =Array();
        temp['msg'] = new_obj;
        temp['isSelf'] = '1';
        temp['user'] = Array();
        temp['user']['UserId'] = GPT.getCookieValue('UserId');
        temp['user']['NickName'] = GPT.getCookieValue('NickName');

        if(GPT.getCookieValue('Avatar') != ""){
            temp['user']['Avatar'] =kana.getDomain('a') + '/' + GPT.getCookieValue('Avatar');
        } else {
            if(GPT.getCookieValue('Sex')==1){
                temp['user']['Avatar'] = kana.getDomain('s') + '/img/common/head/big_headman_default.png';
            } else {
                temp['user']['Avatar'] = kana.getDomain('s') + '/img/common/head/big_headwoman_default.png';
            }
        }

        temp['user']['Sex'] = GPT.getCookieValue('Sex');
        temp['user']['Constellation'] = 0;
        //$('#danmu').danmu("add_danmu",temp);

        text_obj='{ "text":"'+text+'","color":"'+color+'","size":"'+size+'","position":"'+0+'"}';
        //  ----    提交吐槽数据到后台   ----
        var data = {};
        data['danmu'] = text_obj;
        data['ParagraphId'] = ParagraphId;
        data['ChapterId']   = ChapterId;
        data['BookId']      = BookId;
        data['Ref']         = RefContent;
        $.ajax({
            type    :   'POST',
            url     :   url1,
            dataType:   'json',
            data    :   data
        }).done(function(response){
            if(response.status == '1'){
                $("input.read_spit_box").val("");  //  清除已发吐槽内容
            console.log(3);
                $('#danmu').danmu("add_danmu",temp);    //  加入到吐槽列表
            } else {
                //kana.showError(response.info);
                kana.showErrorLittle(response.info);
            }
        })

        setTimeout(function(){
            $(".read_spit_btn").attr('clickflag',0);
        },3000);

    }

    //  取吐槽数量并显示
    function getTucaoNum(){
        var url1="/home/Ajax/ajaxGetDanmuNum";
        var data={};
        data['ChapterId']=$(".read_spit_btn").attr("ChapterId");
        $.ajax({
            type  :   'POST',
            url     :   url1,
            dataType:   'json',
            data    :   data,
            async    :   false
        }).done(function(response){
            if (response.status=='1') {
                var listNums = response.ListSum;
                showTucaoNum(listNums);
            }
        });
    }

    //  显示吐槽数量（传吐槽数组）
    function showTucaoNum(listNums){
        var index =-1;
        var paraId = -1 ;
        var strHtml = "";
        var color = "#328efe";

        $(".myContent p").each(function(){
            paraId = -1 ;
            index ++ ;
            if($(this).html().trim() != "" ){
                paraId = $(this).attr("id");
                if((paraId == undefined) || (paraId == null)){

                } else {
                    if(listNums[paraId] != undefined){

                        if ((paraId>min_id) && (paraId<max_id))
                            color = "#3f3f3f";
                        else
                            color = "#328efe";

                        strHtml ="<span flag='tucao' style='color: " + color + ";font-size: 12px;line-height:20px; margin-left: 0px;cursor: pointer' onclick='javascript:tucao.getAndShowTucao("+index+","+index+")' >"+listNums[paraId]+"条吐槽</span>";
                        $(this).append(strHtml);

                            //$(this).append("<span flag='tucao' onclick='getAndShowTucao(\'"+index+"\',\'"+index+"\')' style='color: #328efe;font-size: 12px;line-height:20px; margin-left: 0px;cursor: pointer' >"+listNums[paraId]+"条吐槽</span>");

                    }

                }
            }
        })
    }

    //  隐藏吐槽数量（清除）
    function hideTucaoNum(){
        $(".readcon").find('p span[flag="tucao"]').remove();
    }


    /*title 鼠标经过出现*/
    $(".title_Box").hover(function(){
        $(this).find(".read_spit_color_brush_title").show();
    },function(){
        $(this).find(".read_spit_color_brush_title").hide();
    })
    $(".read_spit_play").hover(function(){
        $(this).find('.read_spit_color_brush_title').show();
    },function(){
        $(this).find('.read_spit_color_brush_title').hide();
    })

    //  吐槽开关； read_spitClose ，开启 表示 当前是显示吐槽数量
    if($('.read_spitClose').css('display')=='block'){
        getTucaoNum();
    }

});