function fireflies() {
    var WIDTH;
    var HEIGHT;
    var canvas;
    var con;
    var g;
    var pxs = new Array();
    var rint = 50;

    $(document).ready(function() {
        WIDTH = window.innerWidth;
        HEIGHT = window.innerHeight;
        $('#container').width(WIDTH).height(HEIGHT);
        canvas = document.getElementById('pixie');
        $(canvas).attr('width', WIDTH).attr('height', HEIGHT);
        con = canvas.getContext('2d');
        for (var i = 0; i < 50; i++) {
            pxs[i] = new Circle();
            pxs[i].reset();
        }
        setInterval(draw, rint);
        setInterval(draw, rint);

    });

    function draw() {
        con.clearRect(0, 0, WIDTH, HEIGHT);
        for (var i = 0; i < pxs.length; i++) {
            pxs[i].fade();
            pxs[i].move();
            pxs[i].draw();
        }
    }

    function Circle() {
        this.s = {
            ttl: 5000,
            xmax: 5,
            ymax: 5,
            rmax: 50,
            rt: 1,
            xdef: 960,
            ydef: 540,
            xdrift: 10,
            ydrift: 10,
            random: true,
            blink: true
        };

        this.reset = function() {
            this.x = (this.s.random
                ? WIDTH * Math.random()
                : this.s.xdef);
            this.y = (this.s.random
                ? HEIGHT * Math.random()
                : this.s.ydef);
            this.r = ((this.s.rmax - 1) * Math.random()) + 1;
            this.dx = (Math.random() * this.s.xmax) * (Math.random() < .5
                ? -1
                : 1);
            this.dy = (Math.random() * this.s.ymax) * (Math.random() < .5
                ? -1
                : 1);
            this.hl = (this.s.ttl / rint) * (this.r / this.s.rmax);
            this.rt = Math.random() * this.hl;
            this.s.rt = Math.random() + 1;
            this.stop = Math.random() * .2 + .4;
            this.s.xdrift *= Math.random() * (Math.random() < .5
                ? -1
                : 1);
            this.s.ydrift *= Math.random() * (Math.random() < .5
                ? -1
                : 1);
        }

        this.fade = function() {
            this.rt += this.s.rt;
        }

        this.draw = function() {
            if (this.s.blink && (this.rt <= 0 || this.rt >= this.hl))
                this.s.rt = this.s.rt * -1;
            else if (this.rt >= this.hl)
                this.reset();
            var newo = 1 - (this.rt / this.hl);
            con.beginPath();
            con.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
            con.closePath();
            var cr = this.r * newo;
            g = con.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0
                ? 1
                : cr));
            g.addColorStop(0.0, 'rgba(238,180,28,' + newo + ')');
            g.addColorStop(this.stop, 'rgba(238,180,28,' + (newo * .2) + ')');
            g.addColorStop(1.0, 'rgba(238,180,28,0)');
            con.fillStyle = g;
            con.fill();
        }

        this.move = function() {
            this.x += (this.rt / this.hl) * this.dx;
            this.y += (this.rt / this.hl) * this.dy;
            if (this.x > WIDTH || this.x < 0)
                this.dx *= -1;
            if (this.y > HEIGHT || this.y < 0)
                this.dy *= -1;
            }

        this.getX = function() {
            return this.x;
        }
        this.getY = function() {
            return this.y;
        }
    }

}

function fog() {

console.clear();

canvasWidth = 1600;
canvasHeight = 200;

pCount = 0;


pCollection = new Array();

var puffs = 1;
var particlesPerPuff = 1000;
var img = 'img/smoke.png';

var smokeImage = new Image();
smokeImage.src = img;

for (var i1 = 0 ; i1 < puffs; i1++)
{
  var puffDelay = i1 * 1500; //300 ms between puffs

  for (var i2 = 0 ; i2 < particlesPerPuff; i2++)
  {
    addNewParticle((i2*50) + puffDelay);
  }
}


draw(new Date().getTime(), 3000)



function addNewParticle(delay)
{

  var p = {};
  p.top = canvasHeight;
  p.left = randBetween(-200,800);

  p.start = new Date().getTime() + delay;
  p.life = 8000;
  p.speedUp = 30;


  p.speedRight = randBetween(0,20);

  p.rot = randBetween(-1,1);
  p.red = Math.floor(randBetween(0,255));
  p.blue = Math.floor(randBetween(0,255));
  p.green = Math.floor(randBetween(0,255));


  p.startOpacity = .3
  p.newTop = p.top;
  p.newLeft = p.left;
  p.size = 200;
  p.growth = 10;

  pCollection[pCount] = p;
  pCount++;


}

function draw(startT, totalT)
{
  //Timing
  var timeDelta = new Date().getTime() - startT;
  var stillAlive = false;

  //Grab and clear the canvas
  var c=document.getElementById("fog");
  var ctx=c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  c.width = c.width;

  //Loop through particles
  for (var i= 0; i < pCount; i++)
  {
    //Grab the particle
    var p = pCollection[i];

    //Timing
    var td = new Date().getTime() - p.start;
    var frac = td/p.life

    if (td > 0)
    {
      if (td <= p.life )
      { stillAlive = true; }

      //attributes that change over time
      var newTop = p.top - (p.speedUp * (td/1000));
      var newLeft = p.left + (p.speedRight * (td/1000));
      var newOpacity = Math.max(p.startOpacity * (1-frac),0);

      var newSize = p.size + (p.growth * (td/1000));
      p.newTop = newTop;
      p.newLeft = newLeft;

      //Draw!
      ctx.fillStyle = 'rgba(150,150,150,' + newOpacity + ')';
      ctx.globalAlpha  = newOpacity;
      ctx.drawImage(smokeImage, newLeft, newTop, newSize, newSize);
    }
  }



  //Repeat if there's still a living particle
  if (stillAlive)
  {
    requestAnimationFrame(function(){draw(startT,totalT);});
  }
  else
  {
    clog(timeDelta + ": stopped");
  }
}

function randBetween(n1,n2)
{
  var r = (Math.random() * (n2 - n1)) + n1;
  return r;
}

function randOffset(n, variance)
{
  //e.g. variance could be 0.1 to go between 0.9 and 1.1
  var max = 1 + variance;
  var min = 1 - variance;
  var r = Math.random() * (max - min) + min;
  return n * r;
}

function clog(s)
{
  console.log(s);
}

}

Vue.component('main-component', {
  template: '<h1>{{message}}</h1>',
  data: function() {
    return {
      message: 'All I see is magic.'
    }
  }
});

  var vm = new Vue({
    el: '#app'
  });
//# sourceMappingURL=../maps/js/main-ee6e6ef673.js.map
