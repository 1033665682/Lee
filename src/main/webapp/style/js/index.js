$(document).ready(function() {

	/*精选区/渡劫区 切换*/

	var AreaWidth1 = $(".indexArea1_member").width();
	$(".indexArea1_member").css("margin-left",-(AreaWidth1+14)/2)

	var AreaWidth2 = $(".indexArea2_member").width();
	$(".indexArea2_member").css("margin-left",-(AreaWidth2+14)/2)

	/*精选区/渡劫区 切换*/


    $(window).scroll(function(){
		if ($(window).scrollTop() > $(window).height() / 3){

            var space_y = $(document).height() - ($(window).scrollTop() + $(window).height());
            if( space_y > 255){
                $(".returnTop").css("bottom","70px")
            } else {
                $(".returnTop").css("bottom", 255- space_y + 70 );
            }

            $(".returnTop").fadeIn(500);

		}
		else
		{
			$(".returnTop").fadeOut(500);
		}
    });

    function adjustToolbar(){
        var windowWidth = $(window).width();
        var returnTopRight = ($(window).width()-1200)/2-86; //如果窗体右边空白区域 > 86
        if(windowWidth< 1372){                              //
            returnTopRight = 0;
        }

        $(".returnTop").css("right",returnTopRight);
    }
    adjustToolbar();

    $(window).resize(function(){
        adjustToolbar();
    })


    $(".returnTop_Btn").click(function(){
		$('body,html').animate({scrollTop:0},500);
		return false;
    });

    $("#feedback_Btn").click(function(){
        window.open(kana.getDomain('www') + '/bbs/index/idea');
        return false;
    })

		$('.lazyload').imagelazyload({
		threshold : 1000,
		load: function(self, settings){
			$(self).find('img').each(function(){
				var $this=this;
				if(typeof($($this).attr("original"))!='undefined'){
					$("<img />").bind("load", function() {
						//$($this).attr("src", $($this).attr("xsrc")).removeAttr('xsrc');
						$($this).attr("src", $($this).attr("original"));
					}).attr("src", $($this).attr("original"));
				}
			});
			self.loaded = true;
		}
	});

	/*  字符串宽度自适应 */
	$(".threeHotBook_In_name").each(function(){
		var title_width = $(this).find('a').eq(0).width();
		title_width = parseInt(title_width);
            //console.log('title_width:=' + title_width);
		$(this).find('a').eq(0).css('width',(title_width));
		$(this).find('span').css('margin-left',title_width+3);
		$(this).find('a').eq(1).css('width',(175-title_width-20));
	});
	/*轮播图*/
	var $key=0; 
	var $circle=0; 
	var speed=500;

	/*点击小点*/
	$(".HotSpot_pic_circle ol li").click(function(event) {
		/*alert("qq")*/
		$key=$(this).index();
		$circle=$(this).index();
		$(".HotSpot_pic ul").stop().animate({"left":-$key*$(".HotSpot_pic ul li").width()},speed);
		$(".HotSpot_pic_circle ol li").eq($circle).addClass('circleBox_Hot').siblings().removeClass('circleBox_Hot');
		$(".HotSpot_pic_circle_size").fadeOut(0).eq($key).fadeIn(0);
	});

	/*定时器*/
	var timer=setInterval(autoplay, 6000);
      function autoplay(){
          var recomedNum = $('#recomedNum').text();
          $key++;
          if($key>recomedNum-1)
          {
              $key=0; /*因为我们到了第classNum张，其实按道理讲是第一张，我们下次要看的是第二张，所以$key=1;*/
              $(".HotSpot_pic ul").css("left",0);  /*因为我们需要快速复原到原来位置，所以用css()*/
          }
          $(".HotSpot_pic ul").stop().animate({"left":-$key*$(".HotSpot_pic ul li").width()},speed);
          $(".HotSpot_pic_circle_size").fadeOut(0).eq($key).fadeIn(0);
          $circle++;  /*先自加后判断*/
          if($circle>recomedNum-1) /* 我们一共就classNum个点点，所以只到4*/
          {
              $circle=0;
          }
          $(".HotSpot_pic_circle ol li").eq($circle).addClass('circleBox_Hot').siblings().removeClass('circleBox_Hot');
      }

	/*轮播图*/

	/*鼠标经过出现等级星星*/

	/*$(".xzRecommend_In_B").hover(function() {
		$(this).find('.xzRecommend_In_B_star').show();
	}, function() {
		$(this).find('.xzRecommend_In_B_star').hide();
	});*/
	/*鼠标经过出现等级星星*/

	/*鼠标经过世界补完*/

	$(".worldBox ul li").hover(function() {
		$(this).find('.worldBox_Black').show();
	}, function() {
		$(this).find('.worldBox_Black').hide();
	});

	$(".threeHotPeople_Hot").hover(function() {
		$(this).find('.threeHotPeople_Black').show();
	}, function() {
		$(this).find('.threeHotPeople_Black').hide();
	});
	
	/*鼠标经过出现刷新按钮 ↓*/

	$(".index_main1_tj ul li").hover(function() {
		$(this).find('.index_main1_tj_icon').show();
	}, function() {
		$(this).find('.index_main1_tj_icon').hide();
	});

	/*鼠标经过出现刷新按钮 ↑*/

	$(".classPage_b_main_").hover(function() {
		$(this).find('.threeHotBook_Box').stop().show();
	}, function() {
		$(this).find('.threeHotBook_Box').stop().hide();
	});

	$(".threeHotPeople_In").hover(function() {
		$(this).find('.threeHotPeople_Box').stop().show();
	}, function() {
		$(this).find('.threeHotPeople_Box').stop().hide();
	});

	/*不看 切换*/

	$(".index_main2_title_nav_ul1 ul li a").click(function() {
		if($(this).parent().hasClass('index_main2_title_nav_ul1_Hot')) {
			$(this).parent().removeClass('index_main2_title_nav_ul1_Hot');
			//alert($(this).attr('rel'))
			if( $(this).attr('rel') == 'looked' ){
				$('#filter_form').find('#looked').val('');
			}else if( $(this).attr('rel') == 'newbook' ){
				$('#filter_form').find('#newbook').val('');
			}
		}else{
			$(this).parent().addClass('index_main2_title_nav_ul1_Hot');
			if( $(this).attr('rel') == 'looked' ){
				$('#filter_form').find('#looked').val('1');
			}else if( $(this).attr('rel') == 'newbook' ){
				$('#filter_form').find('#newbook').val('1');
			}
		}
		var param = $('#filter_form').serialize();
		var res = GPT.sendAjax("/home/index/ajaxGetUpdateList",param);
		if( res.code > 0 ){
			updateListHtml(res.data);
		}else{
			var data = [];
			updateListHtml(data);
		}
	});


	$(".index_update_title_nav_ul ul li").click(function(event) {

		if($(this).hasClass('title_nav_li_Hot'))
		{
			return;
		}else{
			var rel = $(this).attr('rel');
			$('#filter_form').find('#classid').val(rel);
			var param = $('#filter_form').serialize();
			var res = GPT.sendAjax("/home/index/ajaxGetUpdateList",param);
			if( res.code > 0 ){
				updateListHtml(res.data);
			}else{
				var data = [];
				updateListHtml(data);
			}
			$(this).addClass('title_nav_li_Hot');
			$(this).siblings().removeClass('title_nav_li_Hot');
		}
	});

	/*精选区和预选区切换*/

	$(".index_update_title_R").click(function(event) {
		if($(this).hasClass('R_Icon_Hot')){
			return;
		}
		var rel = $(this).attr('rel');

		$('#filter_form').find('#typeId').val(rel);
		var param = $('#filter_form').serialize();
		var res = GPT.sendAjax("/home/index/ajaxGetUpdateList",param);
		//console.log(res);
		if( res.code > 0 ){
			updateListHtml(res.data);
		}else{
			var data = [];
			updateListHtml(data);
		}
		$(this).addClass('R_Icon_Hot');
		$(this).siblings().removeClass('R_Icon_Hot');
	});

	$(".index_update_In ul li .index_update_In_cover").hover(function() {
		$(this).find('.Black_update').show();
	}, function() {
		$(this).find('.Black_update').hide();
	});

	$(".index_science_In ul li .index_science_In_T").hover(function() {
		$(this).find('.Black_science').show();
	}, function() {
		$(this).find('.Black_science').hide();
	});

	/*底部音乐盒子*/

	$(".Music_Btn").click(function(event) {
		if($(this).hasClass('MusicPlayer_Btn'))
		{
			$(this).hide();
			$(this).siblings('.MusicPause_Btn').show();
		}
		if($(this).hasClass('MusicPause_Btn'))
		{
			$(this).hide();
			$(this).siblings('.MusicPlayer_Btn').show();
		}
	});

	$(".volume_Btn").click(function(event) {
		if($(this).hasClass('musicBtn_max_volumeBtn1'))
		{
			$(this).hide();
			$(this).siblings('.musicBtn_max_volumeBtn2').show();
		}
		if($(this).hasClass('musicBtn_max_volumeBtn2'))
		{
			$(this).hide();
			$(this).siblings('.musicBtn_max_volumeBtn1').show();
		}
	});

	$(".musicBtn_max_style").click(function(event) {
		$(this).find(".musicBtn_max_style_In").show();
	});

	$(".musicBtn_min").click(function(event) {
		$(".musicBtn_min").stop().animate({left:-28},"50");
		setTimeout(function () {
			$(".musicBtn_max").stop().animate({left:0},"1000");
		}, 500);
	});

	$(".musicBtn_max_R").click(function(event) {
		$(".musicList").hide();
		$(".musicBtn_max").stop().animate({left:-670},"1000");
		setTimeout(function () {
			$(".musicBtn_min").stop().animate({left:0},"100");
		}, 500);
	});

	$(".musicBtn_max_zan").click(function(event) {
		if($(this).hasClass('musicBtn_max_zan_Hot'))
		{
			$(this).removeClass('musicBtn_max_zan_Hot');
		}
		else{
			$(this).addClass('musicBtn_max_zan_Hot');
		}
	});

	$(".musicList_title_li1").click(function(event) {
		$(this).addClass('musicList_title_li_Hot');
		$(this).siblings().removeClass('musicList_title_li_Hot');
		$(".musicList_float").animate({left:10},"500");
		$(".musicList_main_HotRecommend").show();
		$(".musicList_main_List").hide();
	});
	$(".musicList_title_li2").click(function(event) {
		$(this).addClass('musicList_title_li_Hot');
		$(this).siblings().removeClass('musicList_title_li_Hot');
		$(".musicList_float").animate({left:87},"500");
		$(".musicList_main_HotRecommend").hide();
		$(".musicList_main_List").show();
	});

	$(".musicList_main ul li").click(function(event) {
		$(this).addClass('musicList_main_Hot');
		$(this).siblings().removeClass('musicList_main_Hot');
	});

	$(".musicList_main ul li").hover(function() {
		$(this).find('.musicList_main_R').show();
	}, function() {
		$(this).find('.musicList_main_R').hide();
	});

	$(".musicList_main_R_zan").click(function(event) {
		if($(this).hasClass('musicList_main_R_zan_Hot'))
		{
			$(this).removeClass('musicList_main_R_zan_Hot');
		}
		else{
			$(this).addClass('musicList_main_R_zan_Hot');
		}
	});

	$(".musicBtn_max_list").click(function(event) {
		/*$(".musicList").css("display","block");
		$(".musicList").stop().animate({'opacity':1}, 2000);*/
		$(".musicList").show();
		$(".musicList_B").addClass('content');
        $(".content").mCustomScrollbar();
	});

	$(".musicList_title_X").click(function(event) {
		$(".musicList").hide();
		/*$(".musicList").css("display","none");
		$(".musicList").stop().animate({'opacity':0}, 2000);*/
	});

	$(".music_shareBtn").click(function(event) {
		$(".music_share").show();
		$(".MusicPopUp_bg").show();
	});

	$(".music_share_In_X").click(function(event) {
		$(".music_share").hide();
		$(".MusicPopUp_bg").hide();
	});

	

	/*var maxWidth = $(".musicBtn_max").width();*/

	/*底部音乐盒子*/

	/*科学与艺术*/

	//var nameWidth = $(".index_science_In_name").width();
	//$(".index_science_In_name_").css("width",288-nameWidth);

	//$(".index_main2_title_nav_L ul li a").click(function(event) {
	//	$(this).parent().addClass('title_nav_li_Hot');
	//	$(this).parent().siblings().removeClass('title_nav_li_Hot');
	//	if( $(this).parent().hasClass('title_nav_li_Hot') ){
	//		console.log($(this).attr('rel'));
	//	}
    //
	//});
	/*$(".index_main2_title_nav_ul1 ul li a").click(function(event) {

		if($(this).parent().hasClass('index_main2_title_nav_ul1_Hot')) {
			$(this).parent().removeClass('index_main2_title_nav_ul1_Hot');
			//alert($(this).attr('rel'))
			if( $(this).attr('rel') == 'looked' ){
				$('#filter_form').find('#looked').val('');
			}else if( $(this).attr('rel') == 'newbook' ){
				$('#filter_form').find('#newbook').val('');
			}
		}else{
			$(this).parent().addClass('index_main2_title_nav_ul1_Hot');
			if( $(this).attr('rel') == 'looked' ){
				$('#filter_form').find('#looked').val('1');
			}else if( $(this).attr('rel') == 'newbook' ){
				$('#filter_form').find('#newbook').val('1');
			}
		}
		var param = $('#filter_form').serialize();
		var res = GPT.sendAjax("/home/index/ajaxGetUpdateList",param);
		if( res.code > 0 ){
			updateListHtml(res.data);
		}else{
			var data = [];
			updateListHtml(data);
		}
	});*/

	// 只看 切换
	$(".index_main2_title_nav_R ul li a").click(function(event) {
		$(this).parent().addClass('title_nav_li_Hot');
		$(this).parent().siblings().removeClass('title_nav_li_Hot');
		var rel = $(this).attr('rel');
		$('#filter_form').find('#classid').val(rel);
		var param = $('#filter_form').serialize();
		var res = GPT.sendAjax("/home/index/ajaxGetUpdateList",param);
		//console.log(res);
		if( res.code > 0 ){
			updateListHtml(res.data);
		}else{
			var data = [];
			updateListHtml(data);
		}
	});

	/*不看/只看 切换*/
	function updateListHtml(result){
		var html = '<ul class="clearfix">';
		for(var i=0 ; i<result.length ; i++ ){
			if(i%6 == 5){
				html += '<li style="margin-right:0;">';
			}else{
				html += '<li>';
			}
			html += '<a href="/book/'+result[i].BookId+'" target="_blank">';
				html += '<div class="index_update_In_cover">';
					html += '<img src="'+result[i].BookCover+'" alt="'+result[i].BookName+'" style="width:100%;height:100%;"/>';
					html += '<div class="Member_'+result[i].Score+'"></div>';
					html += '<div class="Black_update">';
						html += '<div class="Black_update_In">';
							html += '<div class="clearfix Black_update_T">';
								html += '<div class="left Black_update_Head">';
								html += '<img src="'+result[i].AuthorAvatar+'" alt="图片丢失" style="width:100%;height:100%;"/>';
								html += '</div>';
								html += '<div class="left Black_update_Name">'+result[i].AuthorName+'</div>';
							html += '</div>';
							html += '<div class="Black_update_C">';
								html += '<P>'+result[i].Note+'</P>';
							html += '</div>';
							html += '<div class="Black_update_B">追更人数<span>'+result[i].FavoriteNum+'</span></div>';
						html += '</div>';
					html += '</div>';
				html += '</div>';
				html += '<p class="updateCover_Name">'+result[i].BookName+'</p>';
				html += '<p class="updateCover_Inform">'+result[i].TotalWords+'  |   '+result[i].ClassName+'</p>';
			html += '</a>';
			html += '</li>';
			if((i==11) || (i==23)){
				html += '<div class="left update_ge"></div>';
			}
		}
		html += '</ul>';
		$('#updateBook').html(html);
		$(".index_update_In ul li .index_update_In_cover").hover(function() {
			$(this).find('.Black_update').show();
		}, function() {
			$(this).find('.Black_update').hide();
		});
	}

	/*实时更新 ↓*/

	$(".index_main2_In ul li").hover(function() {
		$(this).find('.index_main2_In_li').css("border-color","#89cdad");
	}, function() {
		$(this).find('.index_main2_In_li').css("border-color","#ddd");
	});

	/*多行文本溢出效果*/

	/*$(".index_main3_In_T_R h3").each(function(i){
	    var divH = $(this).height();
	    var aH = $(this).find('a').height();
	    while (aH > divH) {
	        $(this).find('a').text($(this).find('a').text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
	    };
	});*/

	/*多行文本溢出效果*/

	/*实时更新 ↑*/

	/*滑块滑动切换*/

	/*$(".index_main_R_listBox1_title ul li a").click(function(event) {
		var Aleft = $(this).parent().offset().left - $(".index_main_R_listBox1_title").offset().left;
		if(Aleft<57)
		{
			$(".index_floatr").css("background-color","#e26470");
		}
		else if(Aleft<114)
		{
			$(".index_floatr").css("background-color","#38a7e8");
		}
		else if(Aleft<171)
		{
			$(".index_floatr").css("background-color","#e3b042");
		}
		else if(Aleft<228)
		{
			$(".index_floatr").css("background-color","#7ac5a0");
		}
		$(".index_floatr").stop().animate({"left": Aleft}, 400);
	});*/

	/*佳作榜/吐槽榜*/

	/*$(".Hot_li1").click(function(event) {

		$(this).parent().siblings('.index_floatr').stop().animate({"left": 0}, 400);
		$(this).parent().siblings('.index_floatr').css("background-color","#e26470");
		var rel = $(this).find('a').attr('rel');
		if( rel > 10 && rel < 20 ){
			var showId = 'hotrank_'+rel;
		}else if( rel > 20 && rel < 30 ){
			var showId = 'showrank_'+rel;
		}
		if( $('#'+showId).text() == '' ){
			var param = 'classid='+rel;
			var res = GPT.sendAjax('/home/index/ajaxGetTopList',param);
			if( res.code > 0 ){
				topListHtml(res.data,showId);
			}else{
				topListemptyHtml(showId);
			}
		}
		$(this).parent().parent().siblings().find(".Hot_li_Box").show();
		$(this).parent().parent().siblings().find(".Hot_li_Box").siblings().hide();
	});*/
	$(".Cold_li1").click(function() {
		$(this).parent().siblings('.index_floatr').stop().animate({"left": 0}, 400);
		$(this).parent().siblings('.index_floatr').css("background-color","#e26470");
		var rel = $(this).find('a').attr('rel');
		if( rel > 10 && rel < 20 ){
			var showId = 'hotrank_'+rel;
		}else if( rel > 20 && rel < 30 ){
			var showId = 'showrank_'+rel;
		}

		if( $('#'+showId).html() == '' ){
			var param = 'classid='+rel;
			var res = GPT.sendAjax('/home/index/ajaxGetTopList',param);
			if( res.code > 0 ){
				topListHtml(res.data,showId);
			}else{
				topListemptyHtml(showId);
			}
		}
		$(this).parent().parent().siblings().find(".Cold_li_Box").show();
		$(this).parent().parent().siblings().find(".Cold_li_Box").siblings().hide();
	});
	$(".Warm_li1").click(function(event) {
		$(this).parent().siblings('.index_floatr').stop().animate({"left": 125}, 400);
		$(this).parent().siblings('.index_floatr').css("background-color","#38a7e8");

		var rel = $(this).find('a').attr('rel');
		if( rel > 10 && rel < 20 ){
			var showId = 'hotrank_'+rel;
		}else if( rel > 20 && rel < 30 ){
			var showId = 'showrank_'+rel;
		}
		if( $('#'+showId).html() == '' ){
			var param = 'classid='+rel;
			var res = GPT.sendAjax('/home/index/ajaxGetTopList',param);
			if( res.code > 0 ){
				topListHtml(res.data,showId);
			}else{
				topListemptyHtml(showId);
			}
		}
		$(this).parent().parent().siblings().find(".Warm_li_Box").show();
		$(this).parent().parent().siblings().find(".Warm_li_Box").siblings().hide();
	});

	/*佳作榜/吐槽榜*/

	$(".Hot_li").click(function(event) {

		$(this).parent().siblings('.index_floatr').stop().animate({"left": 0}, 400);
		$(this).parent().siblings('.index_floatr').css("background-color","#e26470");
		var rel = $(this).find('a').attr('rel');
		if( rel > 10 && rel < 20 ){
			var showId = 'hotrank_'+rel;
		}else if( rel > 20 && rel < 30 ){
			var showId = 'showrank_'+rel;
		}
		if( $('#'+showId).text() == '' ){
			var param = 'classid='+rel;
			var res = GPT.sendAjax('/home/index/ajaxGetTopList',param);
			if( res.code > 0 ){
				topListHtml(res.data,showId);
			}else{
				topListemptyHtml(showId);
			}
		}
		$(this).parent().parent().siblings().find(".Hot_li_Box").show();
		$(this).parent().parent().siblings().find(".Hot_li_Box").siblings().hide();
	});
	$(".Cold_li").click(function() {
		$(this).parent().siblings('.index_floatr').stop().animate({"left": 62}, 400);
		$(this).parent().siblings('.index_floatr').css("background-color","#38a7e8");
		var rel = $(this).find('a').attr('rel');
		if( rel > 10 && rel < 20 ){
			var showId = 'hotrank_'+rel;
		}else if( rel > 20 && rel < 30 ){
			var showId = 'showrank_'+rel;
		}

		if( $('#'+showId).html() == '' ){
			var param = 'classid='+rel;
			var res = GPT.sendAjax('/home/index/ajaxGetTopList',param);
			if( res.code > 0 ){
				topListHtml(res.data,showId);
			}else{
				topListemptyHtml(showId);
			}
		}
		$(this).parent().parent().siblings().find(".Cold_li_Box").show();
		$(this).parent().parent().siblings().find(".Cold_li_Box").siblings().hide();
	});
	$(".Warm_li").click(function(event) {
		$(this).parent().siblings('.index_floatr').stop().animate({"left": 124}, 400);
		$(this).parent().siblings('.index_floatr').css("background-color","#e3b042");

		var rel = $(this).find('a').attr('rel');
		if( rel > 10 && rel < 20 ){
			var showId = 'hotrank_'+rel;
		}else if( rel > 20 && rel < 30 ){
			var showId = 'showrank_'+rel;
		}
		if( $('#'+showId).html() == '' ){
			var param = 'classid='+rel;
			var res = GPT.sendAjax('/home/index/ajaxGetTopList',param);
			if( res.code > 0 ){
				topListHtml(res.data,showId);
			}else{
				topListemptyHtml(showId);
			}
		}
		$(this).parent().parent().siblings().find(".Warm_li_Box").show();
		$(this).parent().parent().siblings().find(".Warm_li_Box").siblings().hide();
	});
	$(".Glad_li").click(function(event) {
		$(this).parent().siblings('.index_floatr').stop().animate({"left": 186}, 400);
		$(this).parent().siblings('.index_floatr').css("background-color","#7ac5a0");

		var rel = $(this).find('a').attr('rel');
		if( rel > 10 && rel < 20 ){
			var showId = 'hotrank_'+rel;
		}else if( rel > 20 && rel < 30 ){
			var showId = 'showrank_'+rel;
		}
		if( $('#'+showId).html() == '' ){
			var param = 'classid='+rel;
			var res = GPT.sendAjax('/home/index/ajaxGetTopList',param);
			if( res.code > 0 ){
				topListHtml(res.data,showId);
			}else{
				topListemptyHtml(showId);
			}
		}
		$(this).parent().parent().siblings().find(".Glad_li_Box").show();
		$(this).parent().parent().siblings().find(".Glad_li_Box").siblings().hide();
	});

	$(".phb_li").click(function(event) {
		$(this).parent().siblings('.index_floatr').stop().animate({"left": 0}, 400);
		$(this).parent().siblings('.index_floatr').css("background-color","#e26470");
		var rel = $(this).find('a').attr('rel');
		var showId = 'otherrank_'+rel;

		if( $('#otherrank_'+rel).html() == '' ){
			var param = 'classid='+rel;
			var res = GPT.sendAjax('/home/index/ajaxGetTopList',param);
			if( res.code > 0 ){
				topListHtml(res.data,'otherrank_'+rel);
			}else{
				topListemptyHtml(showId);
			}
		}
		$(this).parent().parent().siblings().find(".phb_li_Box").show();
		$(this).parent().parent().siblings().find(".phb_li_Box").siblings().hide();
	});
	$(".xfb_li").click(function(event) {
		$(this).parent().siblings('.index_floatr').stop().animate({"left": 125}, 400);
		$(this).parent().siblings('.index_floatr').css("background-color","#38a7e8");

		var rel = $(this).find('a').attr('rel');
		if( $('#otherrank_'+rel).html() == '' ){
			var param = 'classid='+rel;
			var showId = 'otherrank_'+rel;
			var res = GPT.sendAjax('/home/index/ajaxGetTopList',param);
			if( res.code > 0 ){
				topListHtml(res.data,'otherrank_'+rel);
			}else{
				topListemptyHtml(showId);
			}
		}
		$(this).parent().parent().siblings().find(".xfb_li_Box").show();
		$(this).parent().parent().siblings().find(".xfb_li_Box").siblings().hide();
	});


	/*滑块滑动切换*/
	function topListHtml(result,showId){
		$('#'+showId).html('');
		var html = '';
		if(showId == 'otherrank_92') {
			for (var i = 0; i < result.length; i++) {
				var lv = result[i].Userlv;
				var UserScore = result[i].UserScore;
				var UserSex = result[i].UserSex;
				if (result[i].UserCoin == 0) {
					result[i].UserCoin = '-- --';
				}
				html += '<div class="clearfix classPage_b_main_"">';
				if (i == 0) {
					html += '<i class="left b_main1_member rankingList_one">' + (i + 1) + '</i>';
				}else if(i == 1){
					html += '<i class="left b_main1_member rankingList_two">' + (i + 1) + '</i>';
				}else if(i == 2){
					html += '<i class="left b_main1_member rankingList_three">' + (i + 1) + '</i>';
				}else{
					html += '<i class="left b_main1_member">' + (i + 1) + '</i>';
				}
				html += '<a href="/member/personal/index/' + result[i].UserId + '" class="left rankingList_member_name" target="_blank" title="积分：'+UserScore+'">';
				if(UserSex == 1){
					html += '<span class="left manColor" style="margin-left: 5px">'+result[i].UserName+'</span>';
				}else{
					html += '<span class="left womanColor" style="margin-left: 5px">'+result[i].UserName+'</span>';
				}
				html += '<i class="left lvMember3_'+lv+' b_main1_icon"></i>';
				html += '</a>';
				html += '<div class="clearfix right rankingList_member_size">';
				html += '<span class="left">'+result[i].UserCoin+'</span>';
				html += '<i class="left MoneyIcon" style="margin-left:2px;"></i>';
				html += '</div>';
				html += '</div>';
			}
		}else {
			for (var i = 0; i < result.length; i++) {
				if (result[i].BookScore == '--') {
					var BsStyle = 'style="font-size:18px;"';
				} else {
					var BsStyle = '';
				}
				html += '<div class="clearfix classPage_b_main_">';
				if (i == 0) {
					html += '<i class="left b_main1_member rankingList_one">' + (i + 1) + '</i>';
					html += '<a href="/book/' + result[i].BookId + '.html" class="left rankingList_name" target="_blank">【' + result[i].BookClass + '】' + result[i].BookName + '</a>';
					html += '<i class="right rankingList_size rankingList_size_one" ' + BsStyle + '>' + result[i].BookScore + '</i>';
				} else if (i == 1) {
					html += '<i class="left b_main1_member rankingList_two">' + (i + 1) + '</i>';
					html += '<a href="/book/' + result[i].BookId + '.html" class="left rankingList_name" target="_blank">【' + result[i].BookClass + '】' + result[i].BookName + '</a>';
					html += '<i class="right rankingList_size rankingList_size_two" ' + BsStyle + '>' + result[i].BookScore + '</i>';
				} else if (i == 2) {
					html += '<i class="left b_main1_member rankingList_three">' + (i + 1) + '</i>';
					html += '<a href="/book/' + result[i].BookId + '.html" class="left rankingList_name" target="_blank">【' + result[i].BookClass + '】' + result[i].BookName + '</a>';
					html += '<i class="right rankingList_size rankingList_size_three" ' + BsStyle + '>' + result[i].BookScore + '</i>';
				} else {
					html += '<i class="left b_main1_member">' + (i + 1) + '</i>';
					html += '<a href="/book/' + result[i].BookId + '.html" class="left rankingList_name" target="_blank">【' + result[i].BookClass + '】' + result[i].BookName + '</a>';
					html += '<i class="right rankingList_size" ' + BsStyle + '>' + result[i].BookScore + '</i>';
				}
				html += '</div>';
			}

		}
		$('#'+showId).html(html);

	}

	function topListemptyHtml(showId){
		var html ='';
		html += ' <div class="threeHotBook_main_No" style="display: block">';
		html += ' <div class="threeHotBook_main_No_Img"></div>';
		html += ' <p class="BrankBox_mian_No_size">还没有作品哟</p>';
		html += ' </div>';
		$('#'+showId).html(html);
	}
	$("#searchbox").focus(function(){
		$(this).css("color","#333");
	})

	function Compute(v) {
		var d = document.getElementById('dvCompute');
		d.innerHTML = v;
		return { w: d.offsetWidth, h: d.offsetHeight };
	}

});