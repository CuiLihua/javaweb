var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// canvas.width = 300;
// canvas.height = 500;
// document.body.appendChild(canvas);


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

var beforeGame = function() {

	ctx.drawImage(bgImage,0,0,300,500);
	// ctx.drawImage(gif,100,100,100,100);
	ctx.fillStyle = "rgb(250, 250, 250)";
	// ctx.font = "24px Helvetica";
	// ctx.textAlign = "left";
	// ctx.textBaseline = "top";
	// ctx.fillText("登陆界面", 32, 32);
	ctx.drawImage(tvImage,20,150,260,180);
	ctx.drawImage(returnImage, 30,340,70,68);
    ctx.drawImage(returnImage, 200,340,70,68);
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
        if( 30 <p.x && p.x < 100 && 340 < p.y && p.y < 410 && isBeforeGame){
            isBeforeGame = false;
            window.cancelAnimationFrame(beforeGame);
            startGame();
            //alert(12);

        }
        if( 200 <p.x && p.x < 270 && 340 < p.y && p.y < 410 && isBeforeGame){
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
	ctx.drawImage(bgImage,0,0,300,500)
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("游戏结束", 32, 32);
	ctx.drawImage(returnImage, 200,350,70,68);
	//window.requestAnimationFrame(stopGame);
	addEventListener("click",function(e) {
		var p = getEventPosition(e);
		if( 200 <p.x && p.x < 270 && 340 < p.y && p.y < 410 && isEndNow){
			
			init();
			window.location.reload();

		}	

	}, false);

	
}

var startLuckDraw = function() {


	ctx.drawImage(bgImage,0,0,300,500)
	ctx.drawImage(choujiangImage, 25,150)
	ctx.drawImage(returnImage, 200, 350,70,68)
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("开始抽奖", 32, 32);
	//document.getElementById('getsth').style.display = 'block';
	var boom = new Image();
	var num = 1
	//todo 这里需要添加图片序列   逻辑为通过num改变图片的src  num怎么变？
	boom.src = "images/boom/"+ num +".png";
	ctx.drawImage(boom,0,0,100,100)



	addEventListener("click",function(e) {
		var p = getEventPosition(e);
		if( 200 <p.x && p.x < 270 && 340 < p.y && p.y < 410 && isDrawNow){
			
			init();
			window.location.reload();

		}	

	}, false);





	// setTimeout(function() {
	// 	window.location.reload();
	// },5000);


}





var startGame = function() {

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

var bgpyy = -425;

var flys = new Array(fly1, fly2)
var flyss = new Array(fly11, fly22)
var flyssisok = false;


var nets = new Array(net1,net2,net3,net4,net5);

var monstersCaught = 0;

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
	bgp.y = -425
}

var resetHero = function () {
	hero.x = canvas.width / 2;
	hero.y = 410;
}


// first flys team
var resetFly = function () {
	for (var i = flys.length - 1; i >= 0; i--) {
		flys[i].x = Math.random() * (canvas.width - 64);
		flys[i].y = 0;
	}
}

var resetFlyIndex = function(i) {
	if (bgpyy < -120) {
		flys[i].x = Math.random() * (canvas.width - 64);
		flys[i].y = 0;
	}
	if (bgpyy >= -120) {
		flys[i].x = Math.random() * (canvas.width - 64);
		flys[i].y = bgpyy + 120;
	}
}

// secend flys team
var resetFly2 = function() {
	for (var i = flyss.length - 1; i >= 0; i--) {
		flyss[i].x = Math.random() * (canvas.width - 64);
		flyss[i].y = 0;
	}
	flyssisok = true;
} 

var resetFly2Index = function(i) {
	if (bgpyy < -120) {
		flyss[i].x = Math.random() * (canvas.width - 64);
		flyss[i].y = 0;
	}
	if (bgpyy >= -120) {
		flyss[i].x = Math.random() * (canvas.width - 64);
		flyss[i].y = bgpyy + 120;
	}
}

var resetNets = function() {
	for (var i = baoxiangs.length - 1; i >= 0; i--) {
		if (i % 2 == 0) {
			baoxiangs[i].x = 25 + (Math.random() * canvas.width/2);
		}
		else {
			baoxiangs[i].x = 150 + (Math.random() * canvas.width/2 - 75);
		}
		
		baoxiangs[i].y = -200 + (Math.random() * 600);
	}

	for (var i = nets.length - 1; i >= 0; i--) {
		nets[i].x = 50 + (Math.random() * (canvas.width - 100));
		nets[i].y = -200 + (Math.random() * 600);
	}
}

// var resetBaoxiangIndex = function(i) {
// 	baoxiangs[i].x = 50 + (Math.random() * (canvas.width - 100));
// 	baoxiangs[i].y = 130 + (Math.random() * (canvas.height - 230));
// }

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
	if (38 in keysDown) { // Player holding up
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
				if (flys[i].y > 470) {
					resetFlyIndex(i);
				}

			/**
		 	TODO:这个地方有个相对运动的问题
		 	*/
			
				flys[i].y += bgp.speed  * modifier;
			}
			
			for (var i = flyss.length - 1; i >= 0; i--) {
				if (flyss[i].y > 470) {
					resetFlyIndex(i);
				}

	
			
				flyss[i].y += bgp.speed  * modifier;
			}


		}


		else{
			if (hero.y>87) {
				hero.y -= hero.speed * modifier;
			}
		}


		
		
		
	}
	if (40 in keysDown) { // Player holding down
		direcion = 1;
		if (hero.y<420)
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		direcion = 2;
		if (hero.x>0)
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		direcion = 3;
		if (hero.x<245)
		hero.x += hero.speed * modifier;
	}

	for (var i = flys.length - 1; i >= 0; i--) {
		if (flys[i].y > 470) {
			resetFlyIndex(i);
		}
		flys[i].y += flys[i].speed * modifier;
	}

	for (var i = flyss.length - 1; i >= 0; i--) {
		if (flyss[i].y > 470) {
			resetFly2Index(i);
		}
		flyss[i].y += flyss[i].speed * modifier;
	}


	// touch the net
	for (var i = nets.length - 1; i >= 0; i--) {
		if (
			((hero.x + 32) >= nets[i].x) && (hero.x <= (nets[i].x + 32))
			&& ((hero.y <= (nets[i].y + 32)) && ((hero.y +32 ) >= nets[i].y))
		) {
			//resetNetIndex(i);
			hero.speed -= 20;
			nets.splice(i,1);
		}
	}

	for (var i = flys.length - 1; i >= 0; i--) {
		if (
			((hero.x + 20) >= flys[i].x) && (hero.x <= (flys[i].x + 20))
			&& ((hero.y <= (flys[i].y + 20)) && ((hero.y +20) >= flys[i].y))
		) {
			//resetNetIndex(i);
			isPlayingNow = false;
			isEndNow = true;;
		}
	}

	for (var i = flyss.length - 1; i >= 0; i--) {
		if (
			((hero.x + 25) >= flyss[i].x) && (hero.x <= (flyss[i].x + 25))
			&& ((hero.y <= (flyss[i].y + 25)) && ((hero.y +25) >= flyss[i].y))
		) {
			//resetNetIndex(i);
			isPlayingNow = false;
			isEndNow = true;;
		}
	}


	// touch the baoxiang
	for (var i = baoxiangs.length - 1; i >= 0; i--) {
		if (
			((hero.x + 32) >= baoxiangs[i].x) && (hero.x <= (baoxiangs[i].x + 32))
			&& ((hero.y <= (baoxiangs[i].y + 32)) && ((hero.y +32 ) >= baoxiangs[i].y))
		) {
			//resetNetIndex(i);
			baoxiangs.splice(i,1);
			bili += 100;
			hero.speed += 10;
			hero.width += 5
			hero.height += 5;
		}
	}

	if (hero.y < 89) {
		isPlayingNow = false;
		isDrawNow = true;
	}

	
};

var updateFlys2 = function(modifier) {
	
}

// Draw everything
var render = function () {
	// if (bgReady) {
	// 	ctx.drawImage(bg2, 0, -349);
	// 	console.log(bg2.y);
	// }

	ctx.drawImage(bg2, bgp.x, bgp.y);

	//if (monsterReady) {
		//ctx.drawImage(monsterImage, monster.x, monster.y);
		for (var i = baoxiangs.length - 1; i >= 0; i--) {
			ctx.drawImage(baoxiangImage, baoxiangs[i].x, baoxiangs[i].y, 60, 63)
		}
		for (var i = nets.length - 1; i >= 0; i--) {
			ctx.drawImage(netImage, nets[i].x, nets[i].y,60 ,64);
		}
		for (var i = flys.length - 1; i >= 0; i--) {
			ctx.drawImage(woodImage, flys[i].x, flys[i].y, 60, 67);
		}
    ctx.drawImage(top3, 0, 0);


    //}

	// ctx.drawImage(monsterImage, fly1.x, fly1.y);

		// ctx.drawImage(heroImage, hero.x, hero.y);

		switch(direcion) {
			case 1:
			ctx.drawImage(hero1Image, hero.x, hero.y, hero.width, hero.height)
			break;
			case 2:
			ctx.drawImage(hero2Image, hero.x, hero.y, hero.width, hero.height)
			break;
			case 3:
			ctx.drawImage(hero1Image, hero.x, hero.y, hero.width, hero.height)
			break;
			default:
			ctx.drawImage(hero1Image, hero.x, hero.y, hero.width, hero.height)

		}

	
		
	




ctx	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("宝藏值: " + bili, 32, 32);
};

var renderflyss = function() {
	for (var i = flyss.length - 1; i >= 0; i--) {
			ctx.drawImage(woodImage, flyss[i].x, flyss[i].y, 60, 67);
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
        $.ajax({
            url:"/awardInfo&type=picture",
            type: "GET",
            success: function (returnValue) {
                console.log(returnValue);
            },
            error: function (returnValue) {
                console.log("error" + returnValue);
            }
        })
        $.ajax({
            url:"/awardInfo&type=text",
            type: "GET",
            success: function (returnValue) {
                console.log(returnValue);
            },
            error: function (returnValue) {
                console.log("error" + returnValue);
            }
        })
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
    for (var i = 0; i < gifts.length; i ++){
        var temp = gifts[i].split("=");
        picture.push(temp[0])
    }
    console.log(picture);

    for (var i = 0; i < picture.length; i++) {
        $.ajax({
            url:"/rewardInfo?type=2&fileName=" + picture[i],
            type: "GET",
            success: function (returnValue) {
            	drawGift(returnValue)
            },
            error: function (returnValue) {
                console.log("error*****" + returnValue);
            }
        })
		console.log("/rewardInfo?type=2&fileName=" + picture[i]);
    }

}

var drawGift = function (returnValue) {
	var a = new Image();
	a.src = returnValue;
	document.getElementById("getsth").appendChild(a)
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






