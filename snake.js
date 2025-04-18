

var context = document.getElementById("Vehicle").getContext("2d");
var canvas = document.getElementById("Vehicle")
var my_key = null
document.onkeydown = (e)=>{
  my_key = e.code

}
class Square{
  constructor(x,y,side){
    this.x = x
    this.y = y
    this.side = side
    this.draw()
  }
  
  draw(){
    context.beginPath();
    context.rect(this.x,this.y,this.side,this.side)
    context.stroke()
  }
}
var x = 140
var y = 100
old_key = null
// var my_square = new Square(100,100,20)
shape_arr = [new Square(100,100,20),new Square(120,100,20),new Square(140,100,20)]
movement_obj = {"ArrowLeft":[-20,0],"ArrowRight":[20,0],"ArrowUp":[0,-20],"ArrowDown":[0,20]}
var flag = true
function sum_arrays(nums1,nums2){
  return nums1.map((a,i)=>a+nums2[i])
}

function init() {
    // var img = new Image();
    // img.onload = function () { context.drawImage(img, x, y, 100, 60); }
    // img.src = "https://www.svgrepo.com/show/25407/car.svg";
  
    // //move
    // function moveImage(imgX, imgY) { 
  
        
    // var context = document.getElementById("Vehicle").getContext("2d");
    // var img = new Image();
    // img.onload = function () { context.drawImage(img, imgX, imgY, 100, 60); }
    // img.src = "snake-remove.png";
        
    // }
  
    // var FPS = 60;
    // var timer = (1000/FPS);
  
    setInterval(function () {
      // x++;
      // y++;
        if(my_key){
          context.clearRect(0,0,canvas.width,canvas.height)
          if (old_key){
            test = sum_arrays(movement_obj[my_key],movement_obj[old_key])
            // console.log("test: ",test)
            cond = test[0]===0 && test[1]===0
          
          }
       
          if(!old_key){
            x += movement_obj[my_key][0]
            y += movement_obj[my_key][1]
            if (movement_obj[my_key][0]===20 || movement_obj[my_key][1]===20){
              shape_arr.shift()
              shape_arr.push(new Square(x,y,20))
              shape_arr.forEach(element => {
                element.draw()
              });
            }else{
              shape_arr.shift()
              shape_arr.push(new Square(x,y,20))
              shape_arr.forEach(element => {
                element.draw()
              });
            }
          
          }else{
            if(cond){
              my_key = old_key
            }
            x += movement_obj[my_key][0]
            y += movement_obj[my_key][1]
            shape_arr.shift()
            shape_arr.push(new Square(x,y,20))           
            shape_arr.forEach(element => {
              element.draw()
            });
          }
        
        }
  
      old_key = my_key
      // console.log(shape_arr)
      // if (x > 1000) { x = 1; }
      // if (y > 1000) { y = 1; }
      // moveImage(x, y);
      
    }, 600);  

  };
  
  init();