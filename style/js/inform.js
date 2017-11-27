
function ajaxPage(id) {
    var url = $('#ajax_url').val();
    url = url+'&page='+id;
    if(url.indexOf("comment/list")>0)
        LoadCommentList(id);
    else
        window.location.href = url ;
}

function getreply(commentid){
    if(commentid == 0){
        return;
    }
    var url = "/community/ajax/ajaxGetCommentReply";
    var data = "commentid="+commentid;
    var r = GPT.sendAjax( url,data);
    return r;
}

function setreplyhtml(d){
    var html = '';
    if(d.length > 0) {
        for (var i = 0; i < d.length; i++) {
            var li = i+1;
            if(i < 10) {
                if(i > 4) {
                    html += '<div class="bookrack_words_Fb_d" id="reply_'+  d[i].CommentId +'_'+ li +'" style="width:705px;display: none;">'
                }else{
                    html += '<div class="bookrack_words_Fb_d" id="reply_'+  d[i].CommentId +'_'+ li +'" style="width:705px;">'
                }
                html += '<div class="book_head_x"><a href="#"></a></div>';
                html += '<p class="pColor"><a href="#" class="left">'+ d[i].NickName +'</a><span class="left lvMember2 lv2"></span>'+ d[i].Content +'</p>';
                html += '<div class="book_head_rh">';
                html += '<a href="#" class="delete">'+ d[i].FloorNo +'楼</a><span style="padding:0 4px;">丨</span>'+ d[i].CreateTime +'天前<span style="padding:0 4px;">丨</span>';
                html += '<a href="javascript:;" CommentId="'+ d[i].CommentId +'" ParentId="'+ d[i].ReplyId +'" ToUserId="'+ d[i].UserId +'" class="reply">回复</a></div>';
                html += '</div>';
            }
        }
        return html;
    }
}

$(document).ready(function(){
    /*var Height = $(".informR_Main1_B").height();
    alert(Height)*/

    /*插图 图片滚动*/
    //linum = $('.mainlist li').length;//图片数量
    //liwid=$('.mainlist li').outerWidth(true);
    //w = linum * liwid;//ul宽度
    //
    //$('.piclist').css('width', w + 'px');//ul宽度
    //$('.swaplist').html($('.mainlist').html());//复制内容
    //
    //$('.informL_subarea_Illustrations_next').click(function(){
    //
    //    if($('.swaplist,.mainlist').is(':animated')){
    //        $('.swaplist,.mainlist').stop(true,true);
    //    }
    //
    //    if($('.mainlist li').length>3){//多于4张图片
    //        ml = parseInt($('.mainlist').css('left'));//默认图片ul位置
    //        sl = parseInt($('.swaplist').css('left'));//交换图片ul位置
    //
    //        if(ml<=0 && ml>w*-1){//默认图片显示时
    //            $('.swaplist').css({left: '894px'});//交换图片放在显示区域右侧
    //            $('.mainlist').animate({left: ml - 873 + 'px'},'slow');//默认图片滚动
    //
    //            if(ml==(w-873)*-1){//默认图片最后一屏时
    //                $('.swaplist').animate({left: '0px'},'slow');//交换图片滚动
    //            }
    //        }else{//交换图片显示时
    //            $('.mainlist').css({left: '894px'})//默认图片放在显示区域右
    //            $('.swaplist').animate({left: sl - 873 + 'px'},'slow');//交换图片滚动
    //            if(sl==(w-873)*-1){//交换图片最后一屏时
    //                $('.mainlist').animate({left: '0px'},'slow');//默认图片滚动
    //            }
    //        }
    //    }
    //})
    //$('.informL_subarea_Illustrations_prev').click(function(){
    //
    //    if($('.swaplist,.mainlist').is(':animated')){
    //        $('.swaplist,.mainlist').stop(true,true);
    //    }
    //
    //    if($('.mainlist li').length>3){
    //        ml = parseInt($('.mainlist').css('left'));
    //        sl = parseInt($('.swaplist').css('left'));
    //        if(ml<=0 && ml>w*-1){
    //            $('.swaplist').css({left: w * -1 + 'px'});
    //            $('.mainlist').animate({left: ml + 873 + 'px'},'slow');
    //            if(ml==0){
    //                $('.swaplist').animate({left: (w - 873) * -1 + 'px'},'slow');
    //            }
    //        }else{
    //            $('.mainlist').css({left: (w - 873) * -1 + 'px'});
    //            $('.swaplist').animate({left: sl + 873 + 'px'},'slow');
    //            if(sl==0){
    //                $('.mainlist').animate({left: '0px'},'slow');
    //            }
    //        }
    //    }
    //})

    $(".bookContain_introduce a").hover(function(){
        $(this).find(".bookContain_introduce_All i").css("background-position","-21px 0")
    },function(){
        $(this).find(".bookContain_introduce_All i").css("background-position","0 0")
    })

    /*点击收藏按钮*/

    $(".bookContain_l_conbtn2").click(function(event) {
        if($(this).find("i").hasClass('addCollection'))
        {
            $(this).find("i").removeClass('addCollection');
            $(this).find("i").addClass('removeCollection');
        }
        else if($(this).find("i").hasClass('removeCollection'))
        {
            $(this).find("i").removeClass('removeCollection');
            $(this).find("i").addClass('addCollection');
        }
    });

    /*点击收藏按钮*/

    /*讨论区/书评区*/

    //$(".regionBox_talk").click(function(event) {
    //    $(this).addClass('regionBox_talk_Hot');
    //    $(this).siblings().removeClass('regionBox_talk_Hot');
    //});

    /*讨论区/书评区*/

    /*国度资料*/

    $(".DetaVideo_Main_T ul li").hover(function() {
        $(this).find('.DetaVideo_Main_cover_hover').show();
        $(this).find(".DetaVideo_Main_B_float").stop().animate({"bottom":-22},150);
        $(this).find(".DetaVideo_Main_B_size").css("color","#00a1d6");
    }, function() {
        $(this).find('.DetaVideo_Main_cover_hover').hide();
        $(this).find(".DetaVideo_Main_B_float").stop().animate({"bottom":0},150);
        $(this).find(".DetaVideo_Main_B_size").css("color","#333");
    });

    $(".DetaPic_Main_T ul li").hover(function() {
        $(this).find('.Black_DetaPic').show();
    }, function() {
        $(this).find('.Black_DetaPic').hide();
    });

    $(".DetaSd_Main_T ul li").hover(function() {
        $(this).find('.Black_DetaSd').show();
    }, function() {
        $(this).find('.Black_DetaSd').hide();
    });

    $(".DetaCos_Main_T ul li").hover(function() {
        $(this).find('.Black_DetaCos').show();
    }, function() {
        $(this).find('.Black_DetaCos').hide();
    });

    $(".DetaSg_Main_T ul li").hover(function() {
        $(this).find('.Black_DetaSg').show();
    }, function() {
        $(this).find('.Black_DetaSg').hide();
    });

    $(".DetaGame_Main ul li").hover(function(){
        $(this).find(".DetaGame_font a").css("color","#00a1d6");
    },function(){
        $(this).find(".DetaGame_font a").css("color","#333");
    });

    /*国度资料*/

    /*以什么身份发表*/

    $(".identityBox_Btn").click(function(event) {
        $(this).addClass('identityBox_Btn_Hot');
        $(this).parent().siblings().find('.identityBox_Btn').removeClass('identityBox_Btn_Hot');
    });

    /*信息页右侧 大家都在送/本书豪粉排名 点击切换*/
    var FloatWidth1 = $(".informR_Main1_Title1").width();
    $(".informR_Main1_Title_float").css("width",FloatWidth1);

    $(".informR_Main1_Title1").click(function(event) {
        $(this).parent().parent().siblings(".informR_Main1_B").show();

        $("#rewarelist1").show();
        $("#rewarelist2").hide();

        $(this).parent().parent().siblings(".informR_Main1_rank_B").hide();
        $(this).addClass('informR_Main1_Title_Hot');
        $(this).siblings().removeClass('informR_Main1_Title_Hot');
        var FloatWidth1 = $(".informR_Main1_Title1").width();
        $(".informR_Main1_Title_float").css("width",FloatWidth1);
        $(".informR_Main1_Title_float").stop().animate({"left":16},500);
    });
    $(".informR_Main1_Title2").click(function(event) {
        $(this).parent().parent().siblings(".informR_Main1_rank_B").show();

        $("#rewarelist2").show();
        $("#rewarelist1").hide();

        $(this).parent().parent().siblings(".informR_Main1_B").hide();
        $(this).addClass('informR_Main1_Title_Hot');
        $(this).siblings().removeClass('informR_Main1_Title_Hot');
        var FloatWidth2 = $(".informR_Main1_Title2").width();
        $(".informR_Main1_Title_float").css("width",FloatWidth2);
        $(".informR_Main1_Title_float").stop().animate({"left":118},500);
    });

    var FloatWidth3 = $(".informR_Main1_Title3").width();
    $(".recommendBook_float").css("width",FloatWidth3);
    $(".recommendBook_float").stop().animate({"left":10},500);

    $(".classPage_b_main_").hover(function() {
        $(this).find('.threeHotBook_Box').stop().show();
    }, function() {
        $(this).find('.threeHotBook_Box').stop().hide();
    });

    /*信息页右侧 大家都在送/本书豪粉排名 点击切换*/

    /*角色英雄 tab栏点击切换*/
    var PageWidth2=$(".informPage2").width()-$(".informPageIn2").width();
    $(".informPageIn2").css("left",PageWidth2/2);
    /*  角色英雄    */
    $(".menu_L").click(function(event) {
        $(this).addClass('menu_L_hot');
        $(this).removeClass('menu_R_hot');
        $(this).siblings().addClass('menu_R_hot');
        $(this).siblings().removeClass('menu_L_hot');

        $(this).parent().parent().siblings('.informLtalk').hide();
        $(this).parent().parent().siblings('.informL_subarea_con').show();
    });

    /*角色英雄区*/

    $(".roleHeroBox_B_Main ul li").hover(function() {
        $(this).find(".roleHeroBox_B_head").css("border-color","#fbb142");
    }, function() {
        $(this).find(".roleHeroBox_B_head").css("border-color","#c8c8c8");
    });

    /*  书评  */
    $(".menu_R").click(function(event) {
        $(this).addClass('menu_L_hot');
        $(this).removeClass('menu_R_hot');
        $(this).siblings().addClass('menu_R_hot');
        $(this).siblings().removeClass('menu_L_hot');

        $(this).parent().parent().siblings('.informLtalk').show();
        $(this).parent().parent().siblings('.informL_subarea_con').hide();
        var PageWidth1=$(".informPage1").width()-$(".informPageIn1").width();
        $(".informPageIn1").css("left",PageWidth1/2);

        if($('#myFrame1').contents().find("body").html() == ""){
            //console.log($('#myFrame1').attr('url'));
            $('#myFrame1').attr("src",$('#myFrame1').attr('url'));
        }

    });

    /*正序倒叙*/
    /*$(".main_T4").click(function(){
     if($(this).html=="↑正序")
     {
     $(this).html("↓倒序");
     }
     else if($(this).html=="↓倒序")
     {
     $(this).html("↑正序");
     }
     })*/


    /*打赏点击选中金币数量*/
    //
    //$(".lightC a").click(function(event) {
    //    /*alert("qq")*/
    //    $(this).addClass('jbHot');
    //    $(this).parent().siblings().find('a').removeClass('jbHot');
    //});
    //
    //
    ///*自定义设置金币数量*/
    //
    //
    //$("#jbText").focus(function(event) {
    //    $(this).parent().siblings().find('a').removeClass('jbHot');
    //    if($(this).val()=="自定义"){
    //        $(this).val("");
    //        /*$(this).css("border-color","#dfdfdf");*/
    //    }
    //}).blur(function(event) {
    //    /*$(this).parent().siblings().find('a').addClass('jbHot');*/
    //    if($(this).val()==""){
    //        $(this).val("自定义");
    //        /*$(this).css("border-color","#fc8813");*/
    //    }
    //});
    //
    //
    //$("#textarea").focus(function(event) {
    //    if($(this).val()=="打赏寄语"){
    //        $(this).val("");
    //        $(this).css("border-color","#dfdfdf");
    //        $(this).css("background-color","none");
    //        $(this).css("background","url(../img/lightBottom_bg.png) repeat-x");
    //        $(this).siblings('span').hide();
    //    }
    //}).blur(function(event) {
    //    if($(this).val()==""){
    //    }
    //});


    $("#wStextarea").focus(function(event) {
        /*alert("11")*/
        if($(this).val()=="评价这本书吧"){
            $(this).val("");
            $(this).css("border-color","#dfdfdf");
            $(this).css("background-color","none");
            $(this).css("background","url(img/wStextareaBg.png) repeat-x");
            $(this).siblings('span').hide();
        }
    }).blur(function(event) {
        if($(this).val()==""){
            $(this).val("评价这本书吧");
            $(this).css("border-color","#fc8813");
            $(this).css("background-color","#fff");
            $(this).siblings('span').show();
        }
    });

    $("#Deltextarea").focus(function(event) {
        /*alert("11")*/
        if($(this).val()=="请注意文明用语"){
            $(this).val("");
            $(this).css("border-color","#dfdfdf");
            $(this).css("box-shadow","0 0 5px #fff inset");
            $(this).parent().parent().parent().siblings('.inform_pl_Ts').find('.inform_pl_Ts_R').hide();

        }
    }).blur(function(event) {
        if($(this).val()==""){
            $(this).val("请注意文明用语");
            $(this).css("border-color","#fc8813");
            $(this).css("box-shadow","0 0 5px #eae8e8 inset");
            $(this).parent().parent().parent().siblings('.inform_pl_Ts').find('.inform_pl_Ts_R').show();
        }
    });


    /*点击讨论区切换*/

    $(".informL_subarea_contopL ul li").click(function(event) {
        $(this).addClass('contopL_liHot').siblings().removeClass('contopL_liHot');
    });


    /*参战类型切换*/
    $(".informR_fight_top>li:first").next().addClass("cur");
    $(".informR_fight_Con>div:not(:eq(1))").hide();

    $(".informR_fight_top>li").click(function(){
        $(".informR_fight_Con").children(":eq("+$(this).index()+")").show().siblings().hide();
        $(this).addClass().addClass("cur").siblings().removeClass("cur")
    });

    /*阅读页*/
    /*阅读页头部鼠标经过效果*/
    $(".readtop_name").hover(function(){
        $(this).css({'border':"1px solid #57c6eb",'border-top':"none"});
        $(this).find(".readtop_name_txt").css('color',"#57c6eb");

    },function(){
        $(this).css({'border':"1px solid #3d3c3c",'border-top':"none"});
        $(this).find(".readtop_name_txt").css('color',"#efefef");

    });

    $(".reader ul li").hover(function(){

        $(this).css({'background':"#606060","border-radius":"3px"})

    },function(){

        $(this).css({'background':"none","border-radius":"0"})

    });

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
    $(".read_label_a").mousedown(function(){

        $(this).parent().addClass("read_label_down");

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

        $(".read_Label").show();

    },function(){

        $(".read_Label").hide();

    })

    /*目录详情显示、隐藏*/
    $(".read_listBtn").hover(function(){

        $(".container1").show();
        $(this).find(".read_triangle1").show();

    },function(){

        $(".container1").hide();
        $(this).find(".read_triangle1").hide();

    })

    /*背景详情显示、隐藏*/
    $(".read_back").hover(function(){

        $(".read_Back").show();
        $(this).find(".read_triangle1").show();

    },function(){

        $(".read_Back").hide();
        $(this).find(".read_triangle1").hide();

    })

    /*文字详情显示、隐藏*/
    $(".read_word").hover(function(){
        $(".read_Word").show();
        $(this).find(".read_triangle1").show();
    },function(){
        $(".read_Word").hide();
        $(this).find(".read_triangle1").hide();
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
    $(".read_spitOn_a").hover(function(){
        $(this).parent().addClass("read_spitOn_hover");
        $(this).siblings().show();
    },function(){
        $(this).parent().removeClass("read_spitOn_hover");
        $(this).siblings().hide();
    })

    $(".read_spitOn_a").mousedown( function(){
        $(this).parent().addClass("read_spitOn_down");
    })

    $(".read_spitOn_a").mouseup( function(){
        $(this).parent().removeClass("read_spitOn_down");
        $(this).parent().hide().next().show();
    })
    $(".read_spitClose_a").hover(function(){
        $(this).parent().addClass("read_spitClose_hover");
        $(this).siblings().show();
    },function(){

        $(this).parent().removeClass("read_spitClose_hover");
        $(this).siblings().hide();
    })

    $(".read_spitClose_a").mousedown( function(){
        $(this).parent().addClass("read_spitClose_down");
    })

    $(".read_spitClose_a").mouseup( function(){
        $(this).parent().removeClass("read_spitClose_down");
        $(this).parent().hide();
        $(".read_spitOn").show();
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
    /*侧栏书签鼠标滑动背景颜色改变*/
    $(".read_Label li").hover(function(){
        $(this).addClass("read_Label_li_hover")
    },function(){
        $(this).removeClass("read_Label_li_hover")
    })

    /*侧栏标签删除点击*/
    $(".read_labelClean_on").hover(function(){
        $(this).addClass("read_labelClean_down")
    },function(){
        $(this).removeClass("read_labelClean_down")
    })

    /*标签删除弹出框鼠标滑动、点击效果*/
    $(".read_labelClean_btn").click(function(){
        $(".read_labelClean_btn_choose").show();
    })

    $(".read_labelClean_btn_choose_sp2").hover(function(){
        $(this).addClass("read_labelClean_btn_choose_sp2_hover");
    },function(){
        $(this).removeClass("read_labelClean_btn_choose_sp2_hover");
    })
    $(".read_labelClean_btn_choose_sp2").click(function(){
        $(".read_labelClean_btn_choose").hide();
    })

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


    /*音乐列表背景颜色设置*/

    $(".read_musicCon .read_music_con:even").addClass("even");
    $(".read_musicCon .read_music_con:odd").addClass("odd");
    $(".read_music_con").hover(function(){

        $(this).addClass("read_music_con_hover")

    },function(){

        $(this).removeClass("read_music_con_hover")

    })

    /*背景颜色选择鼠标滑动、点击*/

    $(".read_Back li").hover(function(){

        $(this).addClass("read_Back_li_hover")

    },function(){

        $(this).removeClass("read_Back_li_hover")

    })
    $(".read_Back li").click(function(){

        $(this).addClass("read_Back_li_down").siblings().removeClass("read_Back_li_down");
        var m=$(this).css("background-color");
        $(".readCon,.readcon").css("background-color",m);

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

        $(".readcon").find("p").css("font-size",size);

    })
    /*点赞点击*/
    $(".read_zan").click(function(){

        $(this).addClass("read_zan_down");
        $(this).find(".read_zan_span").show();
        $(this).find(".read_zan_span").animate({top:"-40px",opacity:0},2000)
    })

    /*吐槽上一页、下一页、播放键鼠标滑动、点击*/
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

    $(".read_spit_play").click(function(){

        $(this).toggleClass("read_spit_pause")

    })
    /*吐槽输入框切换*/
//	$('.read_spit_box"]').bind('propertychange input',function(){
//    $(".read_spit_box").keyup(function(){
//        //  1-12个 汉字/字符
//        var pattern = /^[\u0000-\u005A|\u0061-\u007A|\u4E00-\u9FA5]{13,100}$$/;
//        var str=$(this).val();
//        if ( pattern.test( str ) ) {
//            $(".read_spit_box").hide();
//            $(".read_spit_Box1").show();
//            $(".read_spit_box1").val(str);
//        }
//    });
//    //	大变小
//    $(".read_spit_box1").keyup(function(){
//        //  1-12个 汉字/字符
//        var pattern = /^[\u0000-\u005A|\u0061-\u007A|\u4E00-\u9FA5]{0,12}$$/;
//        var str=$(this).val();
//        if ( pattern.test( str ) ) {
//            $(".read_spit_Box1").hide();
//            $(".read_spit_box").show();
//            $(".read_spit_box").val(str);
//        }
//    });

    /*  作品角色滚动事件    */
    $(".dw2clickA").click(function(event) {
        //$(this).hide();
        $(this).parent().siblings('.dw2click_b').show();
        $(this).parent().siblings('.bookContain_l_dw2Con').css("height","248px");
        $('.dw2clickA').hide();
        $('.dw2clickB').show();
        var jsList = $(this).parent().siblings('.bookContain_l_dw2Con').find('.dw2ConIn').find('.bookContain_l_dw2con');

        if(jsList.length>4)
            $('.dw2clickC').show();
        else
            $('.dw2clickC').hide();

    });

    var $key=0;
    $(".dw2clickC").click(function(event) {
        $key++;
        if($key>3){
            $key=4;
            $(".dw2ConIn").css("top",-248);
        }
        $(".dw2ConIn").stop().animate({"top":-$key*60},500);
    });

    $(".dw2clickB").click(function(event) {
        $key--;
        if($key<0){
            $key=0;
            $(".dw2ConIn").css("top",0);
            $(this).parent().siblings('.bookContain_l_dw2Con').css("height","118px");
            $('.dw2clickA').show();
            $('.dw2clickB').hide();
            $('.dw2clickC').hide();
        }
        $(".dw2ConIn").stop().animate({"top":-$key*60},500);
    });



    /*登录/注册鼠标经过框变色*/
    $(".LoginL").hover(function() {
        $(this).siblings('a').css("border-left","none");
        $(this).siblings('a').css("margin-left","0");
    }, function() {
        $(this).siblings('a').css("border-left","1px solid #b8b1b1");
        $(this).siblings('a').css("margin-left","-1px");
    });
    $(".LoginR").hover(function() {
        $(this).css("border-left","1px solid #e77420");
    }, function() {
        $(this).css("border-left","1px solid #b8b1b1");
    });


    /*正序/倒序点击效果*/

    $(".chapter_top_order").click(function(event) {
        $(this).css("display","none");
        $(this).siblings('a').css("display","block");
    });
    $(".zxBox").click(function(event) {
        $(this).css("display","none");
        $(this).siblings('a').css("display","block");
    });

    /*回复收起*/

    $(".reply").click(function(event) {
        if($(this).html()=="回复")
        {
            $(this).html("收起");
        }
        else if($(this).html()=="收起")
        {
            $(this).html("回复");
        }
    });

    $(".Ftrb_h").click(function(event) {
        if($(this).html()=="回复")
        {
            $(this).html("收起");
        }
        else if($(this).html()=="收起")
        {
            $(this).html("回复");
        }
    });


    /*收起效果*/
    $("#Fb_d_last_right a").click(function(event) {
        /*alert("qq")*/
        // console.log('收起效果');
        var objList=$(this).parent().parent().parent();
        //console.log(objList);
        objList.find('.bookrack_words_Fb_d:gt(4)').slideDown('5000', function() {
            $(this).remove();
        });

        $(this).parent().css("display","none");
        $(this).parent().siblings('#Fb_d_last').hide();
        $(this).parent().siblings('#click_look').show();
    });

    /*收起效果结束*/
    $("#bwbh a").click(function(event) {
        $(this).parents(".book_head_rh_n").siblings('.book_head_rh').children('a').css("display","block");
    });


    /*上一页/下一页效果*/
    function funcircle(objPage){

        var $circle=0;

        $('#nextPage').bind('click', function(event) {
            /* Act on the event */
        });

        $(objPage).find("#nextPage").click(function(event) {

            obj1=$(this).siblings('div').find('a.Fb_d_last_hot');
            obj2=$(this).siblings('div').find('a');
            $circle=obj2.index(obj1);

            $circle++;  /*先自加后判断*/
            if($circle>4) /* 我们一共就4个点点，所以直到3*/
            {
                $circle=4;
            }
            // console.log($(".bookrack_words_page a"));

            $(this).siblings('div').find('a').eq($circle).addClass('Fb_d_last_hot').siblings().removeClass('Fb_d_last_hot');
            $(this).siblings('#previousPage').css("display","block");
        });

        $(objPage).find("#previousPage").click(function(event) {

            obj1=$(this).siblings('div').find('a.Fb_d_last_hot');
            obj2=$(this).siblings('div').find('a');
            $circle=obj2.index(obj1);

            $circle--;  /*先自加后判断*/
            if($circle<0) /* 我们一共就4个点点，所以直到3*/
            {
                $circle=0;
            }

            $(this).siblings('div').find('a').eq($circle).addClass('Fb_d_last_hot').siblings().removeClass('Fb_d_last_hot');
        });

        $(objPage).find(".bookrack_words_page a").click(function(event) {

            $(this).addClass('Fb_d_last_hot').siblings().removeClass('Fb_d_last_hot');

        });

        /*上一页/下一页效果结束*/
    }


    /*上一页的效果开始*/


    $(".bookrack_words_page a").click(function(event) {

        $(this).parent().siblings("#previousPage").css("display","block");
        $(this).parent().siblings("#nextPage").css("display","block");
    });

    $(".bookrack_words_page a").click(function () {
        var num=$(this).nextAll().length, max=$(".bookrack_words_page a").length;
        if($(this).index() == 0)
        {
            $(this).parent().siblings("#previousPage").css("display","none");
            $(this).parent().siblings("#nextPage").css("display","block");
        }
        if(num==0)
        {
            $(this).parent().siblings("#nextPage").css("display","none");
            $(this).parent().siblings("#previousPage").css("display","block");
        }
    });



    /*上一页的效果结束*/


    /*评论翻页切换*/

    $(".commentBox_Page ul .commentBox_Page_Member").click(function(event) {
        $(this).addClass('commentBox_Page_Member_Hot');
        $(this).siblings().removeClass('commentBox_Page_Member_Hot');
    });

    var $PageBtn=0;

    $(".commentBox_Page_Previous").click(function(event) {
        obj1=$(this).siblings('li.commentBox_Page_Member_Hot');
        obj2=$(this).siblings('li.commentBox_Page_Member');
        $PageBtn=obj2.index(obj1);

        $PageBtn--;
        if($PageBtn<0)
        {
            $PageBtn=0;
        }
        if($PageBtn<1)
        {
            $(this).hide();
        }
        else if($PageBtn<4)
        {
            $(".commentBox_Page_Next").show();
        }

        $(this).siblings('li.commentBox_Page_Member').eq($PageBtn).addClass('commentBox_Page_Member_Hot').siblings().removeClass('commentBox_Page_Member_Hot');
    });

    $(".commentBox_Page_Next").click(function(event) {
        obj1=$(this).siblings('li.commentBox_Page_Member_Hot');
        obj2=$(this).siblings('li.commentBox_Page_Member');
        $PageBtn=obj2.index(obj1);

        $PageBtn++;
        if($PageBtn>4)
        {
            $PageBtn=5;
        }
        if($PageBtn>3)
        {
            $(this).hide();
        }
        else if($PageBtn>0)
        {
            $(".commentBox_Page_Previous").show();
        }

        $(this).siblings('li.commentBox_Page_Member').eq($PageBtn).addClass('commentBox_Page_Member_Hot').siblings().removeClass('commentBox_Page_Member_Hot');

    });



    /*评论翻页切换*/


    /*贤者弹窗 翻页定位*/
    function fun1(event){
        document.getElementById('light4').style.display='block';
        document.getElementById('fade').style.display='block' ;
        var atnPageWidth=$(".atnPage").width()-$(".atnPageIn").width();
        $(".atnPageIn").css("left",atnPageWidth/2);
    }

    $('#xz').each(function(position,element){
        $(element).unbind('click').bind('click',{ element:element },fun1);
    });

    /*评论详情页 翻页定位*/
    var DelPageWidth=$(".DelinformPage").width()-$(".DelinformPageIn").width();
    $(".DelinformPageIn").css("left",DelPageWidth/2);

    $("#cSmore").click(function(event) {
        $(".cSMore").show();
        var cSPageWidth=$(".cSinformPage").width()-$(".cSinformPageIn").width();
        $(".cSinformPageIn").css("left",cSPageWidth/2);

    });

    $(".skipBox").focus(function(event) {
        if($(this).val()=="1"){
            $(this).val("");
        }
    }).blur(function(event) {
        if($(this).val()==""){
            $(this).val("1");
        }
    });

    $(".informL_subarea_video_dlcon dl.dl_all").hover(function() {
        $(this).addClass('informL_subarea_dlcur');
        $(this).siblings().removeClass('informL_subarea_dlcur');
    });

    /*翻页点击效果*/

    $(".page_P").click(function(event) {
        $(this).addClass('pageHot');
        $(this).siblings('.page_P').removeClass('pageHot');
    });

    /*鼠标经过贤者书评推荐*/
    $(".conBox").click(function(event) {
        $(this).removeClass('informR_comment_con_Box conBox').addClass('informR_comment_con_');
        $(this).siblings().removeClass('informR_comment_con_').addClass('informR_comment_con_Box conBox');
    });

    $(".conBox").hover(function() {
        $(this).removeClass('informR_comment_con_Box conBox').addClass('informR_comment_con_');
        $(this).siblings().removeClass('informR_comment_con_').addClass('informR_comment_con_Box conBox');
    }, function() {
        $(this).removeClass('informR_comment_con_').addClass('informR_comment_con_Box conBox');
    });

    var $key1=0;
    $("#to_R").click(function(event) {

        $key1++;
        if($key1>3){
            $key1=4;
            $(".coverSetT_in_ul").css("left",-678);
        }
        $(".coverSetT_in_ul").stop().animate({"left":-$key1*226},500);
    });
    $("#to_L").click(function(event) {
        $key1--;
        if($key1<0){
            $key1=0;
            $(".coverSetT_in_ul").css("left",0);
        }
        $(".coverSetT_in_ul").stop().animate({"left":-$key1*226},500);
    });

    /*点赞 心变红*/
    $(".cSzanIcon").click(function(event) {
        $(this).css("background-position","-575px -543px")
    });

    /*充值切换*/
    $(".rhg_cz").click(function(event) {
        $(this).addClass('rhgMin1').removeClass('rhgMin2');
        $(this).siblings('.rhg_jl').addClass('rhgMin2').removeClass('rhgMin1');
        $(this).parent().siblings('.rhgMainIn').find('.rhgMainZf').show();
        $(this).parent().siblings('.rhgMainIn').find('.rhgMainZf').siblings().hide();

    });

    $(".rhg_jl").click(function(event) {
        $(this).addClass('rhgMin1').removeClass('rhgMin2');
        $(this).siblings('.rhg_cz').addClass('rhgMin2').removeClass('rhgMin1');
        $(this).parent().siblings('.rhgMainIn').find('.rhgMainJl').show();
        $(this).parent().siblings('.rhgMainIn').find('.rhgMainJl').siblings().hide();
    });

    $(".rhgZfName_r ul li input[type='radio'] ").click(function(event) {
        $(this).siblings('.rhgts').show();
        $(this).parent().siblings('li').find('.rhgts').hide();
    });

    /*作品价值评判弹窗*/

    $(".popUp_Br a").click(function(event) {
        if($(this).hasClass('popUp_Br_A'))
        {
            $(this).removeClass('popUp_Br_A');
        }
        else{
            $(this).addClass('popUp_Br_A');
        }
    });

    /*作品价值评判弹窗*/

    /*我要打分 starts*/
    //ReadNum = 0;
    //$('#btnScore').on('click',function(){
    //
    //    if(GPT.getCookieValue('UserId')=="") {
    //        kana.loadLoginForm();
    //        return false
    //    }
    //
    //    var PostData = "ActionType=get&BookId="+BookId;
    //    var result = GPT.sendAjax("/home/book/ajaxSetBookScore",PostData);
    //    if(result.status == '0'){
    //        kana.showError(result.info,{'msg':result.info});
    //    }else{
    //        ReadNum = result.info;
    //        $("#light5").show();
    //        $("#fade").show();
    //    }
    //});

    //验证评论长度
    //$("#wStextarea").on('keyup',function(){
    //    html = $(this).val();
    //    length = parseInt(GPT.strLength(html));
    //    if(length > 100){
    //        //alert('字数已经超过！');
    //        kana.showError('字数已经超过了100!');
    //        $('#wStextareaLenght').html(length);
    //        return;
    //    }else{
    //        $('#wStextareaLenght').html(length);
    //    }
    //});
    ///*      评分提交    */
    //$('.wSbtnR').on('click',function(){
    //    var Score1 = $(".wstSIze1").html();
    //    var Score2 = $(".wstSIze2").html();
    //    var Score3 = $(".wstSIze3").html();
    //    var ScoreNote = $("#wStextarea").val();
    //    if(ScoreNote == '' || ScoreNote == '评价这本书吧'){
    //        //alert('评价不能为空');
    //        kana.showError('评价不能为空');
    //        $("#wStextarea").focus();
    //        return;
    //
    //    }
    //    html = $("#wStextarea").val();
    //    length = parseInt(GPT.strLength(html));
    //    if(length > 100){
    //        kana.showError('字数已经超过了100!');
    //        return;
    //    }
    //    var PostData = "ActionType=post&BookId="+ BookId +"&Score1="+ Score1 +"&Score2="+ Score2 +"&Score3="+ Score3 +"&ScoreNote="+ ScoreNote +"&ReadNum="+ReadNum;
    //    //alert(PostData);return;
    //    var result = GPT.sendAjax("/home/book/ajaxSetBookScore",PostData);
    //    //alert(result.info);
    //    kana.showError(result.info);
    //    $("#light5").hide();
    //    $("#fade").hide();
    //});
    /*我要打分 end*/

    $(".chooseBtn_Box a").click(function(){
        $(this).addClass("chooseBtn1_Hot");
        $(this).parent().siblings().find("a").removeClass("chooseBtn1_Hot");
    })

    ///*图片*/
    //$(".picBox ul li").hover(function(){
    //    $(this).find('.picBox_hover').show();
    //},function(){
    //    $(this).find('.picBox_hover').hide();
    //})


    /*支付方式的选择*/
    $(".rhgZfb").click(function(){
        $(this).addClass("rhgFsHot");
        $(this).siblings().removeClass("rhgFsHot");
    })

    $(".weixinPayment").click(function(){
        $(".weixinPay").show();
        $(".alipayPay").hide();
        $(".bankPay").hide();
        $('#pay_form').find('#payway').val('weixin');
        $('#pay_form').find('#bankcode').val('');
    })

    $(".alipayPayment").click(function(){
        $(".alipayPay").show();
        $(".weixinPay").hide();
        $(".bankPay").hide();
        $('#pay_form').find('#payway').val('alipay');
        $('#pay_form').find('#bankcode').val('');
    })

    $(".bankPayment").click(function(){
        $(".bankPay").show();
        $(".alipayPay").hide();
        $(".weixinPay").hide();
        $('#pay_form').find('#payway').val('bankpay');
    })

    $(".bankPay ul li").click(function(){
        $(this).find("div").addClass("bankPay_li_Hot");
        $(this).siblings().find("div").removeClass("bankPay_li_Hot");
        var code = $(this).attr('code');
        $('#pay_form').find('#bankcode').val(code);
    })

    /*保荐弹窗*/

    $(".Sponsor_Pic ul li").hover(function(){
        $(this).find(".Sponsor_Pic_T").show();
    },function(){
        $(this).find(".Sponsor_Pic_T").hide();
    });

});

