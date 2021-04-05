//Create variables here
var dogimg,happyDogimg;
var database;
var FoodStock;
var foods;
var dog;

function preload()
{
	//load images here
  dogimg = loadImage("images/dogImg.png")
  happyDogimg = loadImage("images/happydog.png")
  
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(200,200);
  database=firebase.database();
  dog.addImage(dogimg);
  dog.scale=0.1
  FoodStock = database.ref("f00d")
  FoodStock.on("value",readStock);
  
}


function draw() {  
  background(46, 139, 87)
  
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(happyDogimg);
  }

  //add styles here
fill(255)
  text("food remaining : "+foods,300,300)
  drawSprites();
}
function readStock(data){
  foods = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1
  }
  database.ref('/').update({
    f00d:x
  })
}