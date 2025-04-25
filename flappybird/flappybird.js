

var context = document.getElementById("FlappyBird").getContext("2d");
var canvas = document.getElementById("FlappyBird")
// var my_key = "ArrowRight"
document.onkeydown = (e)=>{
  my_key = e.code
  console.log("my_key",my_key)
}
class Pipes{
  constructor(x,y,length,width){
    this.x = x
    this.y = y
    this.length = length
    this.width = width
    // this.draw()
  }
  
  draw(){
    context.beginPath();
    context.rect(this.x,this.y,this.length,this.width)
    context.rect(this.x,this.y-60,this.length,this.width-240)

    context.stroke()
  }
}

class Bird{

  constructor(x,y,radius){
    this.x = x
    this.y = y
    this.radius = radius
  }
 
  r_draw(){
    context.beginPath()
    context.arc(this.x,this.y,this.radius,0,2*Math.PI)
    context.stroke()
  }
}

var x = 180
var y = 100
old_key = null
// var my_square = new Square(100,100,20)
var pipes = []

var new_x = 250
var new_y = getRndInteger(100,250)
var new_length = 50
var new_width = 300-new_y
// var another_x = 900
// var another_y = getRndInteger(100,250)
// var another_width = 300-another_y
// movement_obj = {"ArrowLeft":[-20,0],"ArrowRight":[20,0],"ArrowUp":[0,-20],"ArrowDown":[0,20]}
var bird = new Bird(50,100,20)
var flag = true
function sum_arrays(nums1,nums2){
  return nums1.map((a,i)=>a+nums2[i])
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function update_pipe_array(pipes){
  for(var i=0;i<pipes.length;i++){
    pipes[i].x -= 1
  }
}
function initialize_pipe_array(x,y,length,width,m,pipes){
  for(var i=0;i<m;i++){
    pipes.push(new Pipes(x,y,length,width))
    x += 200
    y = getRndInteger(100,250)
    width = 300 - y
  }
}

// function collision_detection(x,y,pipes){

// }
(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                 || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function() { callback(currTime + timeToCall); },
            timeToCall);
          lastTime = currTime + timeToCall;
          return id;
      };

  if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
      };
}())


var score = 0
my_key = ""
var counter = 1
// function_border_detect
initialize_pipe_array(new_x,new_y,new_length,new_width,5,pipes)
// var curr = 0

function init() {


    setTimeout(function () {
    context.clearRect(0,0,canvas.width,canvas.height)

    bird.r_draw()
    if (bird.y < 320){
      window.requestAnimationFrame(init)
    } else {
      if(!alert("Game over")) window.location.reload()
      }
    // console.log("pipes[0] x",pipes[0].x,pipes[0].y,bird.y)
    if(pipes[0].x === 50){
      console.log("Bird y",bird.y,pipes[0].y,pipes[0].y-60)
      var upperlimit = pipes[0].y - 20 
      var lowerlimit = pipes[0].y - 40
      if(bird.y < lowerlimit || bird.y > upperlimit){
        if(!alert("Game over")) window.location.reload()
      }
    }
    
    if(my_key === 'Space'){
      bird.y -= 20
      counter = 1
    }else{
      bird.y += counter*2.5
    }
    update_pipe_array(pipes)
    pipes.forEach((element)=>{
      element.draw()
    })
    my_key = ""
    counter += 0.03
    context.font = "20px Arial"
    context.fillText(`Score: ${score}`,20,32)
    if(pipes[0].x === -30){
      new_x = 900
      new_y = getRndInteger(100,250)
      new_width = 300-new_y
      pipes.push(new Pipes(new_x,new_y,new_length,new_width))
    }
    else if(pipes[0].x === -52){
      pipes.shift()
  
    }
    if(pipes[0].x==-20){
      score += 1
      // curr += 1
    }
  
    // // console.log(new_x)
    // new_x -= 1
    // another_x -= 1
    }, 1000/60);  

  };
  
  init();