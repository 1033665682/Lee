/**
 * jQuery Generic Plugin Module
 * Version 0.1
 * Copyright (c) 2011 Cyntax Technologies - http://cyntaxtech.com
 * Licensed under the Cyntax Open Technology License
 *     http://code.cyntax.com/licenses/cyntax-open-technology
 */

(function( $ ) {
    $.jQueryPlugin = function( name ) {
        $.fn[name] = function( options ) {
            var args = Array.prototype.slice.call( arguments , 1 );
            if( this.length ) {
                return this.each( function() {
                    var instance = $.data( this , name ) || $.data( this , name , new cyntax.plugins[name]( this , options )._init() );
                    if( typeof options === "string" ){
                        options = options.replace( /^_/ , "" );
                        if( instance[options] ) {
                            instance[options].apply( instance , args );
                        }
                    }
                });
            }
        };
    };
})( jQuery );

var cyntax = {
    plugins : {}
};


/**
 * jQuery Timer Plugin
 * Project page - http://code.cyntaxtech.com/plugins/jquery-timer
 * Version 0.1.1
 * Copyright (c) 2011 Cyntax Technologies - http://cyntaxtech.com
 * dependencies: jquery.plugin.js
 * Licensed under the Cyntax Open Technology License
 *     http://code.cyntax.com/licenses/cyntax-open-technology
 * ------------------------------------
 * For details, please visit:
 * http://code.cyntaxtech.com/plugins/jquery-timer
 */

(function( $ ){
    cyntax.plugins.timer = function( ele , options ){
        this.$this = $( ele );
        this.options = $.extend( {} , this.defaults , options );
        this.timer_info = {id:null, index:null, state:0};
    };
    cyntax.plugins.timer.prototype = {
        defaults : {
            delay: 1000,      // delay in milliseconds (optional)
            repeat: true,    // true to repeat the timer continuously, or a number for repeating this number of times (optional)
            autostart: true,	// timer starts as soon as it is created, set false to start manually
            callback: null,   // callback (optional)
            url: '',          // url to load content from (optional)
            post: ''          // post data (optional)
        },
        _init : function(){
            if (this.options.autostart) {
                this.timer_info.state = 1;
                this.timer_info.id = setTimeout( $.proxy( this._timer_fn, this ) , this.options.delay);
            }
            return this;
        },
        _timer_fn : function() {
            if (typeof this.options.callback == "function")
                $.proxy( this.options.callback, this.$this ).call(this, ++this.timer_info.index);
            else if (typeof this.options.url == "string") {
                ajax_options = {
                    url: this.options.url,
                    context: this,
                    type: (typeof this.options.post == "string" && typeof this.options.post != "" == "" ? "POST": "GET"),
                    success: function(data, textStatus, jqXHR) {
                        this.$this.html(data);
                    }
                };
                if (typeof this.options.post == "string" && typeof this.options.post != "")
                    ajax_options.data = this.options.post;
                $.ajax(ajax_options);
            }
            if ( this.options.repeat && this.timer_info.state == 1 &&
                (typeof this.options.repeat == "boolean" || parseInt(this.options.repeat) > this.timer_info.index) )
                this.timer_info.id = setTimeout( $.proxy( this._timer_fn, this ) , this.options.delay );
            else
                this.timer_id = null;
        },
        start : function() {
            if (this.timer_info.state == 0) {
                this.timer_info.index = 0;
                this.timer_info.state = 1;

                //console.log('delay='+this.options.delay);

                this.timer_id = setTimeout( $.proxy( this._timer_fn, this ) , this.options.delay);
            }
        },

        stop : function(){
            if ( this.timer_info.state == 1 && this.timer_info.id ) {
                clearTimeout(this.timer_info.id);
                this.timer_id = null;
            }
            this.timer_info.state = 0;
        },

        pause : function() {
            if ( this.timer_info.state == 1 && this.timer_info.id )
                clearTimeout(this.timer_info.id);
            this.timer_info.state = 0;
        },

        resume : function() {
            this.timer_info.state = 1;
            this.timer_id = setTimeout( $.proxy( this._timer_fn, this ) , this.options.delay);
        }
    };

    $.jQueryPlugin( "timer" );

})( jQuery );



/*!
 * Pause jQuery plugin v0.1
 *
 * Copyright 2010 by Tobia Conforto <tobia.conforto@gmail.com>
 *
 * Based on Pause-resume-animation jQuery plugin by Joe Weitzel
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 2 of the License, or(at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program; if not, write to the Free Software Foundation, Inc., 51
 * Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 */
/* Changelog:
 *
 * 0.1    2010-06-13  Initial release
 */
(function() {
    var $ = jQuery,
        pauseId = 'jQuery.pause',
        uuid = 1,
        oldAnimate = $.fn.animate,
        anims = {};

    function now() { return new Date().getTime(); }

    $.fn.kk = function(prop, speed, easing, callback) {
        var optall = $.speed(speed, easing, callback);
        //console.log(speed);
        //console.log(optall);

        optall.complete = optall.old; // unwrap callback
        //console.log(optall);
        //console.log(this);

        return this.each(function() {
            // check pauseId
            if (! this[pauseId])
                this[pauseId] = uuid++;
            // start animation
            var opt = $.extend({}, optall);
            oldAnimate.apply($(this), [prop, $.extend({}, opt)]);
            // store data
            anims[this[pauseId]] = {
                run: true,
                prop: prop,
                opt: opt,
                start: now(),
                done: 0
            };
        });
    };

    $.fn.easing = {
        linear: function(a) {
            //console.log('linear:'+a);
            return a
        },
        swing: function(a) {
            //console.log(.5 - Math.cos(a * Math.PI) / 2);
            return .5 - Math.cos(a * Math.PI) / 2
        },
        kk: function(a) {
            console.log('kk:'+a);
            //a = 0.5;
            return a
        }
    };

    $.fn.pause = function() {
        //console.log(this);
        return this.each(function() {
            // check pauseId
            if (! this[pauseId])
                this[pauseId] = uuid++;
            // fetch data
            var data = anims[this[pauseId]];
            if (data && data.run) {
                data.done += now() - data.start;
                if (data.done > data.opt.duration) {
                    // remove stale entry
                    delete anims[this[pauseId]];
                } else {
                    // pause animation
                    $(this).stop();
                    $(this).stop();
                    $(this).stop();
                    data.run = false;
                }
            }
        });
    };

    $.fn.resume = function() {
        return this.each(function() {
            // check pauseId
            //console.log('Resume_pauseId:='+this[pauseId]);
            if (! this[pauseId])
                this[pauseId] = uuid++;
            // fetch data
            var data = anims[this[pauseId]];
            //console.log(data);

            if (data && ! data.run) {
                // resume animation
                data.opt.duration -= data.done;
                data.done = 0;
                data.run = true;
                data.start = now();
                //console.log(options.speed);
                oldAnimate.apply($(this), [data.prop, $.extend({}, data.opt)]);
            }
        });
    };
})();



/*
 *   不可能的世界 吐槽系统
 *   2015/4/18
 */

;(function( $ ){

var Danmu= function (element, options) {
    this.$element	= $(element);  
    this.options	= options;

    $(element).data("danmu_array",options.danmuss);
    $(element).data("opacity",options.opacity);
    $(element).data("topspace",0);
    $(element).data("bottomspace",40);
    $(element).data("danmu_list",Array());
    $(element).data("rows_info",Array());
    $(element).data("timer",0);
    $(element).data("stop",0);
    $(element).data("paused",0);

    this.$element .css({
		"position":"absolute",
		"left":this.options.left,
		"top":this.options.top,
		"width":this.options.width,
        //"min-width":1200,
		"height":this.options.height.toString()+"px",
        //"height":'220px',
		"z-index":this.options.zindex,
		"color":options.default_font_color,
		//"font-family":"Microsoft YaHei" ,
		"font-size":options.font_size_big,
		"overflow":"hidden"
	});

    //bindKeyDown();

    this.$element.mousemove(function(){
        $('#danmu').danmu('danmu_pause');
    });

    this.$element.mouseout(function() {
        $('#danmu').danmu('danmu_resume');
    });

    var $this=this;

    //  ----    总行数     ----
    var row_conut = 3;
    //  ----    已分配行数   ----
    var rows_use = new Array(1,0,2);
    //  ----    吐槽对象    ----
    var danmus=this.$element.data("danmu_array");
    //  ----    装载吐槽数据的位置/索引  ----
    for(var k=0;k<danmus.length;k++)
        this.$element.data('danmu_list').push(k);

    $("<div class='timer'></div>").appendTo(this.$element );
    this.$timer=$(".timer");
    this.$timer.timer({
        delay: 100,
        repeat: options.sumtime,
        autostart: true,
        callback: function( index ) {
            //console.log('callback index = '+index);

            if ($('.flying').length < 10) {             //  ----    第一批快速加入
                if($this.$element.data('danmu_list').length>0) {
                    var row = rows_use.shift();
                    rows_use.push(row);
                    var danmu_dom = $this.New(row);
                }
            } else if ($('.flying').length < 20) {      //  ----    第二批慢速加入
                //  10个周期添加一条
                if((index % 10)==0){
                    if($this.$element.data('danmu_list').length>0) {
                        var row = rows_use.shift();
                        rows_use.push(row);
                        var danmu_dom = $this.New(row);
                    }
                }

            }

        }
    });


};

Danmu.DEFAULTS = {
		left: 0,
		top: 220 ,
		height: 200,
		width: 1020,
		zindex :100,
		speed:5000,
		sumtime:65535	,
		danmuss:{},
		default_font_color:"#FFFFFF",
		font_size_small:18,
		font_size_big:22,
		opacity:"0.7",
		top_botton_danmu_time:4000,
        "lineheight":67
	}

Danmu.prototype.New = function(row) {
    var $this=this;
    function getPosX(row) {
        var x = $this.options.width;

        var speed1 = Math.ceil(Math.random()*500)+9000;     //  极速模式
        if($.browser.msie ){
            speed1 = Math.ceil(Math.random()*500)+20000;     //
        }

        var result=new Array(x,speed1);
        //console.log('getPos: ' + $this.$element.data('rows_info')[row] );
        //  之前无记录
        if(!$this.$element.data('rows_info')[row]) return result;
        var index = $this.$element.data('rows_info')[row][2];
        //  没找到元素
        var LatestObj = $("div .flying[index='"+index+"']")
        if(!LatestObj) return result;

        var left1 = parseInt(LatestObj.css('left'));
        var width1 = LatestObj.outerWidth();
        //console.log('x::' + left1 + ':' + width1);
        var boundary_x = left1 + width1;
        if (boundary_x>x) {
            x = boundary_x +200;
            //console.log('new position: ' + x);
        }

        if((x -boundary_x)<300){
            //speed1 = $this.$element.data('rows_info')[row][1] * 0.9;
            speed1 = $this.$element.data('rows_info')[row][1] * 1.1;
        } else if ((x -boundary_x)<500){
            //speed1 = $this.$element.data('rows_info')[row][1] * 1.0;
            speed1 = $this.$element.data('rows_info')[row][1] * 1.0;
        }

        //console.log('now x :'+ x + '  latest x:' + boundary_x + '  speed1:'+ $this.$element.data('rows_info')[row][1] + ' spped1:' + speed1) ;

        result=new Array(x,speed1);
        return result;
    }

//console.log(this.$element.data('danmu_list'));

    var urlAvatar = kana.getDomain('a') + '/' ;
    if(this.$element.data('danmu_list').length<1)
        return;

    index = this.$element.data('danmu_list').shift();
    //alert(index);
    //console.log('添加:' + index + ' #记录');
    var danmu_data= this.$element.data("danmu_array")[index];
    //var danmu_dom="<div class='readCon_Box_main flying flying2' style='left:1200'  id='linshi' row='" + row + "' index='" + index +"'></div>";
    var danmu_dom="<div class='readCon_Box_main flying flying2' style='left:1200'  id='linshi' row='" + row + "' index='" + index +"'>";

    if(danmu_data['user']['Avatar'] == ""){
        var danmu_elements='<div class="left readCon_Box_main_L">' +
            ' <div class="readCon_Box_main_L_head">' +
            '   <a href="javascript:;">' +
            '       <img alt="" src="'+ kana.getDomain('s') + '/img/common/head/big_headwoman_default.png" style="width:100%;height:100%" >' +
            '       </a></div></div>' +
            '<div class="left readCon_Box_main_C readCon_Box_color1">'+danmu_data['msg'].text+'</div>' +
            '   <div class="left readCon_Box_main_R"></div>' ;
    } else {
        var danmu_elements='<div class="left readCon_Box_main_L">' +
            ' <div class="readCon_Box_main_L_head">' +
            '   <a href="javascript:;">' +
            '       <img alt="" src="'+ danmu_data['user']['Avatar']+'" style="width:100%;height:100%" >' +
            '       </a></div></div>' +
            '<div class="left readCon_Box_main_C readCon_Box_color1">'+danmu_data['msg'].text+'</div>' +
            '   <div class="left readCon_Box_main_R"></div>' ;
    }

    danmu_dom = danmu_dom + danmu_elements + '</div>';

    if  ( typeof(danmu_data['msg'].position) == 'undefined') {
        danmu_data['msg'].position = 0 ;
    }

    //this.$element.append(danmu_dom);
    if  ( danmu_data['msg'].position == 2) {
        danmu_dom="<div id='defaultcomedy' class='no_readCon'><img src='"+ kana.getDomain('s') +"/img/home/read/no_read.png' alt=''/></div>";
    }

    this.$timer.append(danmu_dom);
    //  ----    计算起始位置 及 速度 ----
    pos_y = row * this.options.lineheight;
    var PosInfo = getPosX(row);
    //console.log(row + ' : ' + PosInfo);
    var left1 = PosInfo[0];
    var speed1 = PosInfo[1];
    //  ----    保存最后一个元素的信息 ----
    this.$element.data('rows_info')[row] = new Array(row,speed1,index);
    //  ----    构建一个新的吐槽对象  ----
    danmu_dom = $("#linshi");
    danmu_dom.attr('id','danmu_div');
    //danmu_dom.text(danmu_data.text);
    //danmu_dom.find('readCon_Box_color1').text(danmu_data.text);
    danmu_dom.find('.readCon_Box_color1').css({
        "color":danmu_data['msg'].color
        //,"text-shadow":" 2px 2px 2px #000000"
        //,"-moz-opacity":element.data("opacity")
        //,"opacity": element.data("opacity")
        ,"white-space":"nowrap"
    });
    //  ----    新建： 需要突出显示/加框    ----
    if (danmu_data['msg'].hasOwnProperty('isnew')){
        danmu_dom.css({"font-weight":"100"});
        //danmu_dom.css({"border":"2px solid "+danmu_data['msg'].color,'padding-left':'18px','padding-right':'18px'});
    }
    //  ----    使用大号字体  ----
    if( danmu_data['msg'].size == 1)  $("#linshi").css("font-size",18);

    //  1.  滑动
    if  ( danmu_data['msg'].position == 0){
        danmu_dom.css({"position":"absolute"
            ,"top":pos_y
            ,"left":left1
            //,"width":'auto'
            //,"font-weight":"bold"
        });

        //  ----    加速离开    ----
        function leaveoff(tucao) {
            //  ----    加速离场，删除元素， 插入到队尾    ----
            tucao.animate({marginLeft:-300},speed1,"linear",function(){
                var row = tucao.attr('row');
                var index=tucao.attr('index');
                $this.$element.data('danmu_list').push(index);
                tucao.remove();
            })
        }
        //  ----    移动  ----
        function running(tucao){
//console.log('index:'+index+';row:'+row+';speed:'+speed1);
            tucao.kk({left:-200},speed1,"linear"
                ,function(){
                    //leaveoff($(this))
                    var row = tucao.attr('row');
                    var index=tucao.attr('index');
                    $this.$element.data('danmu_list').push(index);
                    $(this).remove();
                }
            );
        }
        function entering(tucao) {
            tucao.animate({left:1000},100,"linear"
                ,function(){
                    running($(this))
                }
            );
        }
        running(danmu_dom);

    }
    //  2. 停留在顶部
    else if ( danmu_data['msg'].position == 1){
        var top_tmp_name="top"+parseInt(10000*Math.random()).toString();
        danmu_dom.attr("id",top_tmp_name)
        danmu_dom.css({
            "text-align":"center"
            ,"position":"absolute"
            ,"left" : this.options.width/2-100
            ,"top":(5+this.$element.data("topspace"))
        });
        //this.$element.data("topspace",$(element).data("topspace")+options.font_size_big);
        danmu_dom.fadeTo(this.options.top_botton_danmu_time,this.$element.data("opacity"),function(){
                $(this).remove();
                //$(element).data("topspace",$(element).data("topspace")-options.font_size_big);
            }
        );
    }
    //  3. 停留在底部
    else if ( danmu_data['msg'].position == 2){
        $("#defaultcomedy").css({
            "text-align":"center"
            ,"position":"absolute"
            ,"left" : this.options.width/2-100
            ,"bottom":0+this.$element.data("bottomspace")
        });

        ////$(element).data("bottomspace",$(element).data("bottomspace")+options.font_size_big);
        //danmu_dom.fadeTo(this.options.top_botton_danmu_time,this.$element.data("opacity"),function(){
        //        $(this).remove();
        //        //$(element).data("bottomspace",$(element).data("bottomspace")-options.font_size_big)
        //    }
        //);
    }

    return ;
}

//Danmu.prototype.launch = function() {
//    //  ----    总行数     ----
//    var row_conut = 3;
//    //  ----    已分配行数   ----
//    var rows_use = new Array(1,0,2);
//    //  ----    吐槽对象    ----
//    var danmus=this.$element.data("danmu_array");
//
//    //  ----    装载吐槽数据  ----
//    for(var k=0;k<danmus.length;k++)
//        this.$element.data('danmu_list').push(k);
//
//    var $this = this;
//    //  ----    第一批快速出现 ----
//    var tucaoNum = danmus.length > 10 ? 10:danmus.length;
//    var timer_first = setInterval(function(){
//    //  ----    快速弹出的吐槽数量   ----
//        if ($('.flying').length < tucaoNum) {
//            var row = rows_use.shift();
//            rows_use.push(row);
//            var danmu_dom = $this.New(row);
//        }
//        else {
//            clearInterval(timer_first);
//        }
//    },'80');
//
//    //  ----    剩余的慢慢出现 ----
//    var timer_main = setInterval(function(){
//
//        if ($('.flying').length>30) return;
//
//        if($this.$element.data('stop')) clearInterval(timer_main);
//
//        if($this.$element.data('danmu_list').length>0) {
//            var row = rows_use.shift();
//            rows_use.push(row);
//            var danmu_dom = $this.New(row);
//        }
//    },'500');
//
//    this.$element.data("timer",timer_main);
//
//}

Danmu.prototype.danmu_start = function(){
    this.$timer.timer('start');
    this.$element.data("paused",0);
};

Danmu.prototype.danmu_stop = function(){
	this.$timer.timer('stop');

    $('#danmu').find('div').each(function(){
        $(this).stop(false,false).animate();
        $(this).remove();
    })
    //console.log('timer id: ' + this.$element.data("timer"));
    clearInterval(this.$element.data("timer"));
    //this.$element.data('stop',1);
    this.$element.data("paused",1);

    //unbindKeyDown();
};

Danmu.prototype.danmu_pause = function(){
    this.$timer.timer('pause');
    $('.flying').pause();
    //$(':animated').pause();
    this.$element.data("paused",1);

    $('.read_spit_play').removeClass('read_spit_pause');
};

Danmu.prototype.danmu_resume = function(){
    this.$timer.timer('resume');
    $('.flying').resume();
    this.$element.data("paused",0);

    $('.read_spit_play').addClass('read_spit_pause');
};

Danmu.prototype.add_danmu = function(arg){

    /*  deduct the default message  */
    if(this.$element.data("danmu_array").length==1){
        var danmu_data= this.$element.data("danmu_array")[0];
        if(danmu_data['user']['UserId']=="0"){
            //this.clear_danmu({'destination':-200});
            this.$element.data("danmu_array").shift();
            this.$element.data("danmu_list").shift();
            $("#defaultcomedy").fadeOut();
        }
    }

    this.$element.data("danmu_array").push(arg);
    this.$element.data('danmu_list').push(parseInt(this.$element.data("danmu_array").length)-1);
};

Danmu.prototype.clear_danmu = function(arg){
    $this = this;
    var pos = arg.destination;
    //alert(pos);
    $('#danmu').find('.flying').each(function(){
        var row = $(this).attr('row');
        var index=$(this).attr('index');
        $this.$element.data('danmu_list').push(index);
        $(this).stop(false,false).animate();
        var tucao = this;
        $(this).animate({'left':pos},1000,function(){
            tucao.remove();
        });
    })
};

function Plugin(option,arg) {
    var obj1 = this.each(function () {
      var $this   = $(this);    // div#danmu对象
      var options = $.extend({}, Danmu.DEFAULTS, typeof option == 'object' && option);
      var data    = $this.data('danmu');    //   danmu对象
      if (!data) $this.data('danmu', (data = new Danmu(this, options))) // 如果danmu对象不存在 创建
      var action  = typeof option == 'string' ? option : NaN;
      if (action)	data[action](arg);  //  执行相应操作，比如 add_danmu
    })
    return obj1;
};

$.fn.danmu             = Plugin;
$.fn.danmu.Constructor = Danmu;

})(jQuery);

//
////快捷键操作
//var keydowntc = function(evt){
//    evt = evt ||window.event;
//    var key=evt.which||evt.keyCode;
//
//    switch(key){
//        case 90://z 上一页
//            if(!shortcut_check_input() && !evt.ctrlKey) {
//                $('.read_spit_next').click();
//            }
//            break;
//        case 88://x 下一页
//            if(!shortcut_check_input() && !evt.ctrlKey) {
//                $('.read_spit_last').click();
//            }
//            break;
//        //case 67://c 隐藏显示
//        //    if(!shortcut_check_input() && !evt.ctrlKey) {
//        //        if($(".read_spitClose_a").css('display')=='block')
//        //            $(".read_spitClose_a").click();
//        //        else
//        //            $(".read_spitOn_a").click();
//        //    }
//        //    break;
//        case 68://d 暂停
//            if(!shortcut_check_input() && !evt.ctrlKey) {
//                $('.read_spit_play').click();
//            }
//            break;
//    }
//}
//
//function bindKeyDown(){
//    $(document).bind('keydown', keydowntc);
//}
//
//function unbindKeyDown(){
//    $(document).unbind('keydown', keydowntc);
//    //alert('unbind');
//}
//
//function shortcut_check_input(){
//    if(typeof document.activeElement != 'undefined'){
//        if(typeof document.activeElement.tagName != 'undefined'){
//            var tag=document.activeElement.tagName.toUpperCase();
//            if(tag=='INPUT' || tag=='TEXTAREA'){
//                return true;
//            }
//        }
//    }
//    return false;
//}