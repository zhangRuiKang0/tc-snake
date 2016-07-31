$(function(){
/*	//背景
	for (var i = 0; i < 30; i++) {
var r=Math.floor(Math.random()*255);
var g=Math.floor(Math.random()*255);
var b=Math.floor(Math.random()*255);
var w=Math.floor(Math.random()*30+50);
var left=Math.floor(Math.random()*1300);
var top=Math.floor(Math.random()*500);
$('<div>')
.addClass('zidan')
.width(w)
.height(w)
.css({'backgroundColor':'rgba('+r+','+g+','+b+',0.4)'})
.appendTo('body')
.delay(i*200)
.animate({left:left,top:top});	
};*/
//游戏界面
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
			$('<div>')
			.addClass('block')
			.attr('id',i+'-'+j)
			.css({'backgroundColor':'#8871D8'})
			.appendTo('.box');
		};
	};
	//数据
	var dict={
		'2-2':true,
		'2-3':true,
		'2-4':true
	};
	var snake=[{x:2,y:2},{x:2,y:3},{x:2,y:4}];
	zhaodian=function(obj){
		return  $('#'+obj.x+'-'+obj.y);
	};
	//初始化
	for (var i = 0; i < snake.length; i++) {
		zhaodian(snake[i])
		.addClass('snake');
	};
	//放食物
	var setfood=function(){
		do{var x=Math.floor(Math.random()*20);
		var y=Math.floor(Math.random()*20);
	}while(dict[x+'-'+y]);
		zhaodian({x:x,y:y}).addClass('food');
		return {x:x,y:y};
	}
	var food=setfood();

	//移动函数
	var fangxiang='you';
	move=function(){
		var jiutou=snake[snake.length-1];
	if(fangxiang === 'you'){
      var xintou = {x:jiutou.x,y:jiutou.y+1};
    }
    if(fangxiang === 'zuo'){
      var xintou = {x:jiutou.x,y:jiutou.y-1};
    }
    if(fangxiang === 'xia'){
      var xintou = {x:jiutou.x+1,y:jiutou.y};
    }
    if(fangxiang === 'shang'){
      var xintou = {x:jiutou.x-1,y:jiutou.y};
    };
     if(xintou.y>19||xintou.y<0||xintou.x<0||xintou.x>19){
		 $('.tishi').addClass('show');
		 zanting();
      	return;
     };
    if(dict[xintou.x+'-'+xintou.y]){
    	$('.tishi').addClass('show');
      	zanting();
      	return;
    };
		snake.push(xintou);
    dict[xintou.x+'-'+xintou.y]=true;	
		zhaodian(xintou)
		.addClass('snake');
       if (xintou.x===food.x&&xintou.y===food.y) {
       	zhaodian(food).removeClass('food');
       	food=setfood();
       }else{
       	var weiba=snake.shift();
       	 delete dict[weiba.x+'-'+weiba.y];
		zhaodian(weiba)
		.removeClass('snake')
    	}		
	};

 var t;
  var kaishi = function() {
  	clearInterval(t);
    t = setInterval(move, 150);
  };
  var zanting = function() {
    clearInterval(t);
  };

$('.kaishi').on('click',function(){
	kaishi();
});
$('.zanting').on('click',function(){
	zanting();
});
$('.zailai').on('click',function () {
	location.reload();
});
  $(document).on('keyup',function(e){
    e.preventDefault();
    var biao={
    	'you':39,
    	'zuo':37,
    	'shang':38,
    	'xia':40
    };
     if(Math.abs(e.keyCode-biao[fangxiang])==2){
    	return;
    };
    if(e.keyCode === 37){
      fangxiang = 'zuo';
    }
    if(e.keyCode === 39){
      fangxiang = 'you';
    }
    if(e.keyCode === 38){
      fangxiang = 'shang';
    }
    if(e.keyCode === 40){
      fangxiang = 'xia';
    }
  });



  









})