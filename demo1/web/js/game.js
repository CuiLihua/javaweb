var canvas = document.createElement("canvas");
// var ua=navigator.userAgent;
// var system={
//     win:false,
//     mac:false,
//     x11:false,
//     //mobile
//     iphone:false,
//     ipad:false,
//     ios:false,
//     android:false,
//     winMobile:false
// };
//
// //
// var p=navigator.platform;
// system.win=p.indexOf('Win')==0;
// system.mac=p.indexOf('Mac')==0;
// system.x11=(p=='x11')||(p.indexOf('Linux')==0);
//
// system.iphone=ua.indexOf('iPhone')>-1;
// system.ipad=ua.indexOf('iPad')>-1;
// system.android=ua.indexOf('Android')>-1;
//
// function getViewPort(){
//     var viewHeight=window.innerHeight||document.documentElement.clientHeight;
//     var viewWidth=window.innerWidth||document.documentElement.clientWidth;
//     console.log(viewHeight,viewWidth);
//     if(system.iphone){
//         //alert(viewWidth,viewHeight);
//         document.body.style.width=viewWidth;
//         canvas.width=viewWidth;
//         canvas.height=viewHeight;
//     }
//     else if(system.win){
//         canvas.width=300;
//         canvas.height=500;
//     }
// }
//
// getViewPort();
var width = document.documentElement.clientWidth;
console.log(width);
var height = width*500/300;
if (height > document.documentElement.clientHeight){
	height = document.documentElement.clientHeight;
}
var heightH = document.documentElement.clientHeight;
canvas.setAttribute("width",width);

canvas.setAttribute("height",heightH);
// canvas.width = 300;
// canvas.height = 500;
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");

var biliw = width/300;
var bilih = height/500;



function getEventPosition(ev){
  		var x, y;
  		if (ev.layerX || ev.layerX == 0) {
    		x = ev.layerX;
    		y = ev.layerY;
  		} else if (ev.offsetX || ev.offsetX == 0) { // Opera
    		x = ev.offsetX;
    		y = ev.offsetY;
  		}
  		return {x: x, y: y};
}

var localhost = document.location.hostname;

var w = window;
requestAnimationFrame = w.requestAnimationFrame ||
						w.webkitRequestAnimationFrame || 
						w.msRequestAnimationFrame || 
						w.mozRequestAnimationFrame;


var isBeforeGame = true;
var isPlayingNow = false;
var isDrawNow = false;
var isEndNow = false;

function init() {
	isBeforeGame = true;
	isPlayingNow = false;
	isDrawNow = false;
	isEndNow = false;
}

function reload() {
	init();
    window.location.reload();
}

function queren() {
	var a = document.getElementById("queren").value;
	console.log(a)
    $.ajax({
        url:"/lucky",
        type: "POST",
        data: {"number": a},
        success: function () {
        	window.location.reload();
        },
        error: function (returnValue) {
        }
    })
}




var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero1.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/hero1.png";

// zhadan images
var woodImage = new Image();
woodImage.src = "images/zhadan.png"

// zhangyu images
var netImage = new Image();
netImage.src = "images/zhangyu.png"

//haixing images
var baoxiangImage = new Image();
baoxiangImage.src = "images/haixing.png"

var choujiangImage = new Image();
choujiangImage.src = "images/choujiang.png"

var tvImage = new Image();
tvImage.src = "images/tv.png";

var returnImage = new Image();
returnImage.src = "images/start.png"

var bg2 = new Image();
bg2.src = "images/background3.png"

var top3 = new Image();
top3.src = "images/top.png"

var hero1Image = new Image();
hero1Image.src = "images/hero1.png"

var hero2Image = new Image();
hero2Image.src = "images/hero2.png"

var hero3Image = new Image();
hero3Image.src = "images/hero1.png"

// var gif = new Image();
// gif.src = "images/timg.gif"

var isAjax = true


var beforeGame = function() {

	ctx.drawImage(bgImage,0,0,width,height);
	// ctx.drawImage(gif,100,100,100,100);
	ctx.fillStyle = "rgb(250, 250, 250)";
	// ctx.font = "24px Helvetica";
	// ctx.textAlign = "left";
	// ctx.textBaseline = "top";
	// ctx.fillText("登陆界面", 32, 32);
	ctx.drawImage(tvImage,20*biliw,150*bilih,260*biliw,180*bilih);
	ctx.drawImage(returnImage, 30*biliw,340*bilih,70*biliw,68*bilih);
    ctx.drawImage(returnImage, 200*biliw,340*bilih,70*biliw,68*bilih);
	window.requestAnimationFrame(beforeGame);
	// addEventListener("click",function(e) {
	// 	var p = getEventPosition(e);
	// 	if( 30 <p.x && p.x < 100 && 340 < p.y && p.y < 410 && isBeforeGame){
	// 		isBeforeGame = false;
	// 		window.cancelAnimationFrame(beforeGame);
	// 		startGame();
    //
	// 	}
    //
	// }, false);

	canvas.onclick = function (e) {
		var p = getEventPosition(e);
        if( 30*biliw <p.x && p.x < 100*biliw && 340*bilih < p.y && p.y < 410*bilih && isBeforeGame){
            isBeforeGame = false;
            window.cancelAnimationFrame(beforeGame);
            startGame();
            //alert(12);

        }
        if( 200*biliw <p.x && p.x < 270*biliw && 340*bilih < p.y && p.y < 410*bilih && isBeforeGame){
            isBeforeGame = false;
            window.cancelAnimationFrame(beforeGame);
            window.location.href='provider-login.html';

        }

	}



	// canvas.onclick = function(e) {
	// 	var p = getEventPosition(e);
		
	// }


	
}



var stopGame = function() {
	//isPlayingNow = false;
	ctx.drawImage(bgImage,0,0,300*biliw,500*bilih)
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("游戏结束", 32, 32);
	ctx.drawImage(returnImage, 200*biliw,350*bilih,70*biliw,68*bilih);
	//window.requestAnimationFrame(stopGame);
	addEventListener("click",function(e) {
		var p = getEventPosition(e);
		if( 200*biliw <p.x && p.x < 270*biliw && 340*bilih < p.y && p.y < 410*bilih && isEndNow){
			
			init();
			window.location.reload();

		}	

	}, false);

	
}

var startLuckDraw = function() {


	ctx.drawImage(bgImage,0,0,300*biliw,500*bilih)
	ctx.drawImage(choujiangImage, 25*biliw,150*biliw,choujiangImage.width*biliw,choujiangImage.height*bilih)
	ctx.drawImage(returnImage, 200*biliw, 350*bilih,70*biliw,68*bilih)
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("开始抽奖", 32, 32);

	//todo 这里需要添加图片序列   逻辑为通过num改变图片的src  num怎么变？




	addEventListener("click",function(e) {
		var p = getEventPosition(e);
		if( 200*biliw <p.x && p.x < 270*biliw && 340*bilih < p.y && p.y < 410*bilih && isDrawNow){
			
			init();
			window.location.reload();

		}	

	}, false);

    addEventListener("click",function(e) {
        var p = getEventPosition(e);
        if( 25*biliw <p.x && p.x < 275*biliw && 150*bilih < p.y && p.y < 300*bilih && isDrawNow){
			if (isAjax){

            $.ajax({
                url:"/lucky?type=text",
                type: "GET",
                success: function (returnValue) {
                    console.log(returnValue);
                    if (returnValue!="444") {
                        var sjxx = returnValue.split("_")
                        var spms = sjxx[0];
                        var sjmz = sjxx[1];
                        var sjdz = sjxx[2];
                        var sjdh = sjxx[3];
                        console.log(sjxx);
                        var uuu = "http://" + localhost + ":8080" + "/lucky?text=" + spms;
                        console.log(uuu)
                        $.ajax({
                            url: "/lucky?text=" + spms,
                            type: "GET",
                            success: function () {
                                document.getElementById("she").style.display = "block";
                                var bb = new Image();
                                bb.src = uuu;
                                bb.onload = function () {
                                    document.getElementById("printP").innerHTML = "<img src='" + this.src + "' height='80px'/>"
                                        + "<p>商家信息：" + sjdz + "</p>"
                                        + "<p>商家电话：" + sjdh + "</p>"
                                }

                                // document.getElementById("printF").innerHTML = "<img src='"+uuu+"' />"
                                // document.getElementById("ss").innerHTML = "<img src='"+this.src+"' />"


                            },
                            error: function (returnValue) {
                                console.log("error" + returnValue);
                            }
                        })
                    }
                    else {
                        document.getElementById("it").style.display = "block";

                    }
                },
                error: function (returnValue) {
                    console.log("error" + returnValue);
                }
            })
				console.log("nihao")
				isAjax = false;
			}

        }

    }, false);

    setTimeout("isAjax = true", 1000);





	// setTimeout(function() {
	// 	window.location.reload();
	// },5000);


}





var startGame = function() {
	document.getElementById('zhantai1*3').style.display = "none";

var bili = 0;
var direcion = 1;

// Game objects
var hero = {
	speed: 100, // movement in pixels per second
	width: 70,
	height: 55
};
var monster = {};
var net1 = {};
var net2 = {};
var net3 = {};
var net4 = {};
var net5 = {};
var net6 = {};
var net7 = {};
var net8 = {};
var net9 = {};
var net10 = {};

var baoxiang1 = {};
var baoxiang2 = {};
var baoxiang3 = {};
var baoxiang4 = {};
var baoxiang5 = {};

var baoxiangs = new Array(baoxiang1,baoxiang2,baoxiang3,baoxiang4,baoxiang5);


var fly1 = {
	speed: 100
}	
var fly2 = {
	speed: 130
}
var fly3 = {
	speed: 160
}
var fly4 = {
	speed: 190
}
var fly11 = {
	speed: 90
}	
var fly22 = {
	speed: 120
}
var fly33 = {
	speed: 160
}
var fly44 = {
	speed: 190
}

var bgp = {
	speed: 100
}

var bgpyy = -425*bilih;

var flys = new Array(fly1, fly2)
var flyss = new Array(fly11, fly22)
var flyssisok = false;


var nets = new Array(net1,net2,net3,net4,net5);

var monstersCaught = 0;

var directionTouch = 0;
    var startx, starty;
    //获得角度
    function getAngle(angx, angy) {
        return Math.atan2(angy, angx) * 180 / Math.PI;
    };

    //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
    function getDirection(startx, starty, endx, endy) {
        var angx = endx - startx;
        var angy = endy - starty;
        var result = 0;

        //如果滑动距离太短
        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
            return result;
        }

        var angle = getAngle(angx, angy);
        if (angle >= -135 && angle <= -45) {
            result = 1;
        } else if (angle > 45 && angle < 135) {
            result = 2;
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 3;
        } else if (angle >= -45 && angle <= 45) {
            result = 4;
        }

        return result;
    }
    //手指接触屏幕
    document.addEventListener("touchstart", function(e) {
        startx = e.touches[0].pageX;
        starty = e.touches[0].pageY;
    }, false);
    //手指离开屏幕
    document.addEventListener("touchend", function(e) {
        var endx, endy;
        endx = e.changedTouches[0].pageX;
        endy = e.changedTouches[0].pageY;
		directionTouch = getDirection(startx, starty, endx, endy);
        return directionTouch;
    }, false);

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var resetBgp = function() {
	bgp.x = 0;
	bgp.y = -425*bilih
}

var resetHero = function () {
	hero.x = canvas.width / 2;
	hero.y = 410*bilih;
}


// first flys team
var resetFly = function () {
	for (var i = flys.length - 1; i >= 0; i--) {
		flys[i].x = Math.random() * (canvas.width - 64*biliw);
		flys[i].y = 0;
	}
}

var resetFlyIndex = function(i) {
	if (bgpyy < -120*bilih) {
		flys[i].x = Math.random() * (canvas.width - 64*biliw);
		flys[i].y = 0;
	}
	if (bgpyy >= -120*bilih) {
		flys[i].x = Math.random() * (canvas.width - 64*biliw);
		flys[i].y = bgpyy + 120*bilih;
	}
}

// secend flys team
var resetFly2 = function() {
	for (var i = flyss.length - 1; i >= 0; i--) {
		flyss[i].x = Math.random() * (canvas.width - 64*biliw);
		flyss[i].y = 0;
	}
	flyssisok = true;
} 

var resetFly2Index = function(i) {
	if (bgpyy < -120*bilih) {
		flyss[i].x = Math.random() * (canvas.width - 64*biliw);
		flyss[i].y = 0;
	}
	if (bgpyy >= -120*bilih) {
		flyss[i].x = Math.random() * (canvas.width - 64*biliw);
		flyss[i].y = bgpyy + 120*bilih;
	}
}

var resetNets = function() {
	for (var i = baoxiangs.length - 1; i >= 0; i--) {
		if (i % 2 == 0) {
			baoxiangs[i].x = (25 + (Math.random() * canvas.width/2))*biliw;
		}
		else {
			baoxiangs[i].x = (150 + (Math.random() * canvas.width/2 - 75))*biliw;
		}
		
		baoxiangs[i].y = (-200 + (Math.random() * 600))*bilih;
	}

	for (var i = nets.length - 1; i >= 0; i--) {
		nets[i].x = (50 + (Math.random() * (canvas.width - 100)))*biliw;
		nets[i].y = (-200 + (Math.random() * 600))*bilih;
	}
}

// var resetBaoxiangIndex = function(i) {
// 	baoxiangs[i].x = 50 + (Math.random() * (canvas.width - 100));
// 	baoxiangs[i].y = 130 + (Math.random() * (canvas.height - 230));
// },

// var resetNetIndex = function(i) {
// 	nets[i].x = 50 + (Math.random() * (canvas.width - 100));
// 	nets[i].y = 130 + (Math.random() * (canvas.height - 230));
// }

// var resetMonster = function() {
// 	// Throw the monster somewhere on the screen randomly
// 	monster.x = 50 + (Math.random() * (canvas.width - 100));
// 	monster.y = 130 + (Math.random() * (canvas.height - 230));
// };

// Update game objects
var update = function (modifier) {
	if (38 in keysDown || directionTouch == 1) { // Player holding up
		direcion = 1;
		if (bgp.y < 0) {
			bgp.y += bgp.speed * modifier;
			bgpyy = bgp.y;
			for (var i = baoxiangs.length - 1; i >= 0; i--) {
				baoxiangs[i].y += bgp.speed * modifier;
			}

			for (var i = nets.length - 1; i >= 0; i--) {
				nets[i].y += bgp.speed * modifier;
			}

			for (var i = flys.length - 1; i >= 0; i--) {
				if (flys[i].y > 470*bilih) {
					resetFlyIndex(i);
				}

			/**
		 	TODO:这个地方有个相对运动的问题
		 	*/
			
				flys[i].y += bgp.speed  * modifier;
			}
			
			for (var i = flyss.length - 1; i >= 0; i--) {
				if (flyss[i].y > 470*bilih) {
					resetFlyIndex(i);
				}

	
			
				flyss[i].y += bgp.speed  * modifier;
			}


		}


		else{
			if (hero.y>87*bilih) {
				hero.y -= hero.speed * modifier;
			}
		}


		
		
		
	}
	if (40 in keysDown || directionTouch == 2) { // Player holding down
		direcion = 1;
		if (hero.y<420*bilih)
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown || directionTouch == 3) { // Player holding left
		direcion = 2;
		if (hero.x>0)
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown || directionTouch == 4) { // Player holding right
		direcion = 3;
		if (hero.x<245*biliw)
		hero.x += hero.speed * modifier;
	}

	for (var i = flys.length - 1; i >= 0; i--) {
		if (flys[i].y > 470*bilih) {
			resetFlyIndex(i);
		}
		flys[i].y += flys[i].speed * modifier;
	}

	for (var i = flyss.length - 1; i >= 0; i--) {
		if (flyss[i].y > 470*bilih) {
			resetFly2Index(i);
		}
		flyss[i].y += flyss[i].speed * modifier;
	}


	// touch the net
	for (var i = nets.length - 1; i >= 0; i--) {
		if (
			((hero.x + 32*biliw) >= nets[i].x) && (hero.x <= (nets[i].x + 32*biliw))
			&& ((hero.y <= (nets[i].y + 32*bilih)) && ((hero.y +32*bilih ) >= nets[i].y))
		) {
			//resetNetIndex(i);
			hero.speed -= 20;
			nets.splice(i,1);
		}
	}

	for (var i = flys.length - 1; i >= 0; i--) {
		if (
			((hero.x + 20*biliw) >= flys[i].x) && (hero.x <= (flys[i].x + 20*biliw))
			&& ((hero.y <= (flys[i].y + 20*bilih)) && ((hero.y +20*bilih) >= flys[i].y))
		) {
			//resetNetIndex(i);
			isPlayingNow = false;
			isEndNow = true;;
		}
	}

	for (var i = flyss.length - 1; i >= 0; i--) {
		if (
			((hero.x + 25*biliw) >= flyss[i].x) && (hero.x <= (flyss[i].x + 25*biliw))
			&& ((hero.y <= (flyss[i].y + 25*bilih)) && ((hero.y +25*bilih) >= flyss[i].y))
		) {
			//resetNetIndex(i);
			isPlayingNow = false;
			isEndNow = true;;
		}
	}


	// touch the baoxiang
	for (var i = baoxiangs.length - 1; i >= 0; i--) {
		if (
			((hero.x + 32*biliw) >= baoxiangs[i].x) && (hero.x <= (baoxiangs[i].x + 32*biliw))
			&& ((hero.y <= (baoxiangs[i].y + 32*bilih)) && ((hero.y +32*bilih ) >= baoxiangs[i].y))
		) {
			//resetNetIndex(i);
			baoxiangs.splice(i,1);
			bili += 100;
			hero.speed += 10;
			hero.width += 5
			hero.height += 5;
		}
	}

	if (hero.y < 89*bilih) {
		isPlayingNow = false;
		isDrawNow = true;
	}

	
};

var updateFlys2 = function(modifier) {
	
}

    var renderPlayer = function () {
        switch(direcion) {
            case 1:
                ctx.drawImage(hero1Image, hero.x, hero.y, hero.width*biliw, hero.height*bilih)
                break;
            case 2:
                ctx.drawImage(hero2Image, hero.x, hero.y, hero.width*biliw, hero.height*bilih)
                break;
            case 3:
                ctx.drawImage(hero1Image, hero.x, hero.y, hero.width*biliw, hero.height*bilih)
                break;
            default:
                ctx.drawImage(hero1Image, hero.x, hero.y, hero.width*biliw, hero.height*bilih)

        }
    }

// Draw everything
    var render = function () {
        // if (bgReady) {
        //     ctx.drawImage(bg2, 0, -349);
        //     console.log(bg2.y);
        // }

        ctx.drawImage(bg2, bgp.x, bgp.y, width,bg2.height*bilih);

        //if (monsterReady) {
        //ctx.drawImage(monsterImage, monster.x, monster.y);
        for (var i = baoxiangs.length - 1; i >= 0; i--) {
            ctx.drawImage(baoxiangImage, baoxiangs[i].x, baoxiangs[i].y, 60*biliw, 63*bilih)
        }
        for (var i = nets.length - 1; i >= 0; i--) {
            ctx.drawImage(netImage, nets[i].x, nets[i].y,60*biliw ,64*bilih);
        }
        for (var i = flys.length - 1; i >= 0; i--) {
            ctx.drawImage(woodImage, flys[i].x, flys[i].y, 60*biliw, 67*bilih);
        }
        ctx.drawImage(top3, 0, 0,top3.width*biliw,top3.height*bilih);
        renderPlayer();


        //}

        // ctx.drawImage(monsterImage, fly1.x, fly1.y);

        // ctx.drawImage(heroImage, hero.x, hero.y);










        ctx    // Score
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("宝藏值: " + bili, 32, 32);
    };

    var renderflyss = function() {
        for (var i = flyss.length - 1; i >= 0; i--) {
            ctx.drawImage(woodImage, flyss[i].x, flyss[i].y, 60*biliw, 67*bilih);
        }

    }

// The main game loop
    var main = function () {
        var now = Date.now();
        var delta = now - then;

        update(delta / 1000);
        render();
        if (flyssisok) {

            renderflyss();
            ctx.drawImage(top3, 0, 0,top3.width*biliw,top3.height*bilih);
            renderPlayer();
        }

        then = now;

        // Request to do this again ASAP

        requestAnimationFrame(main);

        if (isEndNow) {
            window.cancelAnimationFrame(main);
            stopGame();
        }

        if (isDrawNow) {
            window.cancelAnimationFrame(main);
            startLuckDraw();

        }
    };

// Cross-browser support for requestAnimationFrame


// Let's play this game!
    var start = Date.now();
    var then = Date.now();
    resetHero();
    resetBgp();
    resetFly();
// resetFly2();
    resetNets();
    isPlayingNow = true;
//resetMonster();
    main();
    setTimeout(function() {resetFly2()},1000);

}

var callPicture = function (returnValue) {
    var gifts = returnValue.split("#");
    var picture = new Array();
    var tupian = new Array();
    for (var i = 0; i < gifts.length; i ++){
        var temp = gifts[i].split("=");
        picture.push(temp[0])
    }
    console.log(picture);
    var url1 = "/rewardInfo?type=2&fileName=" + picture[0]
    $.ajax({
        url:"/rewardInfo?type=2&fileName=" + picture[0],
        type: "GET",
        success: function () {
            var aa = new Image();
            aa.src = "http://"+localhost+":8080" + url1;
            aa.onload = function () {
                document.getElementById("zt1").innerHTML = "<img src='"+this.src+"' width='100%'/>"
            }
        },
        error: function (returnValue) {
            console.log("error*****" + returnValue);
        }
    })

    var url2 = "/rewardInfo?type=2&fileName=" + picture[1]
    $.ajax({
        url:"/rewardInfo?type=2&fileName=" + picture[1],
        type: "GET",
        success: function () {
            var aa = new Image();
            aa.src = "http://"+localhost+":8080"+ url2;
            aa.onload = function () {
                document.getElementById("zt2").innerHTML = "<img src='"+this.src+"' width='100%' />"
            }
        },
        error: function (returnValue) {
            console.log("error*****" + returnValue);
        }
    })

    var url3 = "/rewardInfo?type=2&fileName=" + picture[2]
    $.ajax({
        url:"/rewardInfo?type=2&fileName=" + picture[2],
        type: "GET",
        success: function () {
            var aa = new Image();
            aa.src = "http://"+localhost+":8080" + url3;
            aa.onload = function () {
                document.getElementById("zt3").innerHTML = "<img src='"+this.src+"' width='100%'/>"
            }
        },
        error: function (returnValue) {
            console.log("error*****" + returnValue);
        }
    })






}

var drawGift = function (url, tupian) {
    var aa = new Image();
    aa.src = "http://localhost:8080" + url;
    aa.onload = function () {
        document.getElementById("ss").innerHTML = "<img src='"+this.src+"' />"
        tupian.push(aa);
    }

}

//beforegame
var start = function () {
    beforeGame()
    $.ajax({
        url:"/rewardInfo?type=1",
        type: "GET",
        success: function (returnValue) {
            callPicture(returnValue);
        },
        error: function (returnValue) {
            console.log("error*****" + returnValue);
        }
    })
}
start();
//startGame();
//stopGame();
//