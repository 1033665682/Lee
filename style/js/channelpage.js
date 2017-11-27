$(document).ready(function() {

	var classNum = $("#classNum").val()-1;
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
	});

	/*定时器*/
	var timer=setInterval(autoplay, 8000);
	function autoplay(){
		var classNum = $('#classNum').text();

		$key++;
		if($key>classNum)
		{
			/*alert("aa");*/
			$key=1; /*因为我们到了第5张，其实按道理讲是第一张，我们下次要看的是第二张，所以$key=1;*/
			$(".HotSpot_pic ul").css("left",0);  /*因为我们需要快速复原到原来位置，所以用css()*/
		}
		$(".HotSpot_pic ul").stop().animate({"left":-$key*$(".HotSpot_pic ul li").width()},speed);

		$circle++;  /*先自加后判断*/
		if($circle>classNum-1) /* 我们一共就5个点点，所以只到4*/
		{
			$circle=0;
		}

		$(".HotSpot_pic_circle ol li").eq($circle).addClass('circleBox_Hot').siblings().removeClass('circleBox_Hot');
	}

	/*轮播图*/

	// 当滚动到最底部以上100像素时， 加载新内容
	$(window).scroll(function () {
		if (($(document).height() - 400) <= ($(window).height() + $(window).scrollTop())) {
			var li_num = $("#li_num").val();
			var li_count = $("#li_count").val();
			if (li_num < 2 && li_count > 15) {
				$(".sciload").show();
				setTimeout(function () {
						$(".sciload").hide();
						for (var l = 16; l <= 30; l++) {
							$("#li_" + l).show();
						}
						li_num++;
						$("#li_num").val(li_num);
					},
					1000);
			}
		}
	});

	/*点击图片 ↓*/

	$(".classPage_img ul li a").click(function(event) {
		$(this).parent().addClass('classPage_img_Hot');
		$(this).siblings('.classPage_img_Hot_').show();
		$(this).parent().siblings().removeClass('classPage_img_Hot');
		$(this).parent().siblings().find('.classPage_img_Hot_').hide();
	});

	/*点击图片 ↑*/



	/*重幻想热门书评*/

	/*鼠标经过封面*/

	$(".index_update_In ul li").hover(function() {
		$(this).find('.Black_update').show();
	}, function() {
		$(this).find('.Black_update').hide();
	});

	/*鼠标经过封面*/

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

	/*重幻想热门书评*/

	/*重幻想热门同人*/

	$(".threeHotPeople_Hot").hover(function() {
		$(this).find('.threeHotPeople_Black').show();
	}, function() {
		$(this).find('.threeHotPeople_Black').hide();
	});

	/*重幻想热门同人*/

	///*排行榜*/
    //
	//var $floatKey=0;
	//var $floatLi=0;
	//$(".rankList_Title ul li").click(function(event) {
	//	$(this).addClass('rankList_Title_Hot');
	//	$(this).siblings().removeClass('rankList_Title_Hot');
	//	$floatKey=$(this).index();
	//	$floatLi=$(this).index();
	//	$(".rankList_Title_float").stop().animate({"left":$floatKey*120},300);
	//});

	var ListRheight = $(".rankingList_R").height();
	$(".rankingList_L_Box").css("min-height",ListRheight-29);

	/*排行榜*/


	/*切换 ↓*/

	//$(".classPage_main1_tab ul li a").click(function(event) {
	//	$(this).parent().addClass('classPage_main1_tab_Hot');
	//	$(this).parent().siblings().removeClass('classPage_main1_tab_Hot');
	//});

	/*切换 ↑*/

	/* ===== 分页类（1类） ↓ ===== */

	/*翻页效果 ↓*/

	$(".page_P").click(function(event) {
		$(this).addClass('pageHot');
		$(this).siblings('.page_P').removeClass('pageHot');
	});

	$(".musicBtn").click(function(event) {
		$(this).parent().addClass('musicHot');
		$(this).parent().siblings('.bookContain_r2mus').removeClass('musicHot');
	});

	$(".skipBox").focus(function(event) {
		if($(".skipBox").val()=="1"){
			$(this).val("");
			$(this).css("color","#333");
		}
	}).blur(function(event) {
		if($(".skipBox").val()==""){
			$(this).val("1");
			$(this).css("color","#999");
		}
	});

	/*翻页效果 ↑*/

	/*全部 最新 精华 置顶*/

	$(".main1_In1_Title_L ul li a").click(function(event) {
		$(this).parent().addClass('main1_In1_Title_L_Hot');
		$(this).parent().siblings().removeClass('main1_In1_Title_L_Hot');
	});

	/*全部 最新 精华 置顶*/

	/* ===== 分页类（书库） ↓ ===== */

	$(".books_T_R1_R ul li a").click(function(event) {
		$(this).parent().addClass('books_T_R1_R_Hot');
		$(this).parent().siblings().removeClass('books_T_R1_R_Hot');
	});

	$(".classPage_books_B_R_title ul li a").click(function(event) {
		if($(this).find('span').html()=="↓")
		{
			$(this).find('span').html("↑");
		}
		else if($(this).find('span').html()=="↑")
		{
			$(this).find('span').html("↓");
		}

	});




	/* ===== 分页类（书库） ↑ ===== */

	/* ===== 搜索历史 ↓ ===== */

	$(".results_R_B ul li a").hover(function() {
		$(this).css("background-color","#fff");
		$(this).find('i').css("display","block");
	}, function() {
		$(this).css("background-color","#f6f6f6");
		$(this).find('i').css("display","none");
	});



	/* ===== 搜索历史 ↓ ===== */

	/*搜索结果 滚动*/


	//小图片左右滚动
	var $slider = $('.results_L_Tin ul');
	var $slider_child_l = $('.results_L_Tin ul li').length;
	var $slider_width = $('.results_L_Tin ul li').width()+34;

	$slider.width($slider_child_l * $slider_width);
	if ($slider_child_l < 4) {
		$(this).addClass('results_R_Btn_');
	}

	var slider_count = 0;


	$('.results_R_Btn').click(function() {

		if ($slider_child_l < 4 || slider_count >= $slider_child_l - 4) {

			return false;

		}

		$(".results_L_Btn").removeClass('results_L_Btn_');
		$(this).removeClass('results_R_Btn_');

		slider_count++;
		$slider.animate({left: '-=' + $slider_width + 'px'}, 'fast');

		if (slider_count >= $slider_child_l - 4) {
			$(this).addClass('results_R_Btn_');
			return false;

		}

	});

	$('.results_L_Btn').click(function() {
		if (slider_count <= 0) {
			$(this).addClass('results_L_Btn_');
			return false;
		}
		$(".results_R_Btn").removeClass('results_R_Btn_');
		$(this).removeClass('results_L_Btn_');

		slider_count--;
		$slider.animate({left: '+=' + $slider_width + 'px'}, 'fast');

		if (slider_count <= 0) {
			$(this).addClass('results_L_Btn_');
			return false;

		}

	});

	/*搜索结果 滚动*/

	// //获取要定位元素距离浏览器顶部的距离
	// var cscrollTop = $('.classPage_books_B_L').offset().top;

	// //滚动条事件
	// $(window).scroll(function(){
	// //获取滚动条的滑动距离
	// var scroH = $(this).scrollTop();
	// //滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定

	// if(scroH>=cscrollTop){
	// $(".classPage_books_B_L").css({"position":"fixed","top":0});
	// }else if(scroH<cscrollTop){
	// $(".classPage_books_B_L").css({"position":"static"});
	// }
	// });





});
