

var context = document.getElementById("Snake").getContext("2d");
var canvas = document.getElementById("Snake")
var my_key = "ArrowRight"
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

function collision_conditions(x,y,nums){
  var flag = false
  nums.forEach((e)=>{
    // console.log("Hello",e["x"],e["y"],x,y)
    if(e["x"]===x && e["y"]===y){
      // console.log("eXPOSED!")
      flag = true
    }
  })
  if(flag) return true
  if(x>1000-20 || y>1000-20 || x < 0 || y<0){
    // clearInterval(animate)
      return true
  }

  return false
}
var x = 180
var y = 100
old_key = null
// var my_square = new Square(100,100,20)
shape_arr = [new Square(100,100,20),new Square(120,100,20),new Square(140,100,20),new Square(160,100,20),new Square(180,100,20)]
movement_obj = {"ArrowLeft":[-20,0],"ArrowRight":[20,0],"ArrowUp":[0,-20],"ArrowDown":[0,20]}
var flag = true
function sum_arrays(nums1,nums2){
  return nums1.map((a,i)=>a+nums2[i])
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

var fd_x = getRndInteger(20,980)
var fd_y = getRndInteger(20,980)
var score = 0
// function_border_detect
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

    function checkFood(nums,food_x,food_y){

        nums_len_x = nums[nums.length-1]["x"]
        nums_len_y = nums[nums.length-1]["y"]

        nums_start_x = nums[0]["x"]
        nums_start_y = nums[0]["y"]

        dist_len_one = Math.sqrt((food_x-nums_len_x)*(food_x-nums_len_x)+(food_y-nums_len_y)*(food_y-nums_len_y))
        dist_len_two = Math.sqrt((food_x-nums_start_x)*(food_x-nums_start_x)+(food_y-nums_start_y)*(food_y-nums_start_y))

        // console.log("distances",dist_len_one,dist_len_two)
        if(dist_len_one<=30 || dist_len_two<=30){
          return true
        }
      // console.log(nums)
      //   if(nums[nums.length-1]["x"] === food_x && nums[nums.length-1]["y"] === food_y){
      //     console.log("Here1",food_x,food_y)
      //     return true
      //   }
      //   if(nums[0]["x"] === food_x && nums[nums.length-1][0] === food_y){
      //     console.log("Here1",food_x,food_y)
      //     return true
      //   }
      //   return false
    }
    const animate = setInterval(function () {
      // x++;
      // y++;

          context.clearRect(0,0,canvas.width,canvas.height)
          if (old_key){
            test = sum_arrays(movement_obj[my_key],movement_obj[old_key])
            // console.log("test: ",test)
            cond = test[0]===0 && test[1]===0
          
          }
          context.font = "20px Arial"
          // console.log("x,y: ",x,y,shape_arr)
          // if(x>1000-(shape_arr.length-1)*20 || y>1000-(shape_arr.length-1)*20 || x < 20 || y<20){
          //   // clearInterval(animate)
          //   if(!alert("Game over")) window.location.reload()
          // }
          context.fillText(`Score: ${score}`,900,30)
          if(!old_key){
            my_key = "ArrowRight"
            x += movement_obj[my_key][0]
            y += movement_obj[my_key][1]
            context.fillText("@",fd_x,fd_y);

            // console.log("Here",my_key)
            // if (my_key == "ArrowLeft"){
            //   console.log("Here")
            //   shape_arr.unshift(new Square(x,y,20))
            //   shape_arr.pop()
            //   shape_arr.forEach(element => {
            //     element.draw()
            //   });
            // }else{
              shape_arr.shift()
              shape_arr.push(new Square(x,y,20))
              shape_arr.forEach(element => {
                element.draw()
              });
            // }
          
          }else{
            if(cond){
              my_key = old_key
            }
            
            x += movement_obj[my_key][0]
            y += movement_obj[my_key][1]

    
            if(collision_conditions(x,y,shape_arr)){
              if(!alert("Game over")) window.location.reload()
            }
            if(checkFood(shape_arr,fd_x,fd_y)){
              fd_x = getRndInteger(20,980)
              fd_y = getRndInteger(20,980)
              shape_arr.push(new Square(x,y,20)) 
              score += 20
              console.log("Here")          

            }
            context.fillText("@",fd_x,fd_y);

            shape_arr.shift()
            shape_arr.push(new Square(x,y,20))           
            shape_arr.forEach(element => {
              element.draw()
            });
          }
        
  
      old_key = my_key
      // console.log(shape_arr)
      // if (x > 1000) { x = 1; }
      // if (y > 1000) { y = 1; }
      // moveImage(x, y);
      
    }, 400);  

  };
  
  init();