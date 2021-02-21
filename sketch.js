let distances = [];
let stepX;
let stepY;
let currentY;
let maxSteps;
let prevPos;
let index;

let exceededHeight = false;

let backgroundColourPicker;

let sliderR;
let sliderG;
let sliderB;
let sliderA;

let sliderRText;
let sliderGText;
let sliderBText;
let sliderAText;

let pauseButton;
let userPaused;

let resetButton;


let colourChanged;
let canSetBackground;

//timer   
let ra=0, rb=0, startT, deltaT = 1000, doit = false;


function setup() 
{

  //----------------------------------------------------------------------------------------VARIABKLE INITIALISE 

  createCanvas(windowWidth, windowHeight);
  stepX = 4;  
  stepY = 20;
  currentY = 0;
  frameRate(0); 
  canSetBackground = true;

  sliderR = createSlider(0, 255, 0, 1);  
  sliderG = createSlider(0, 255, 0, 1);
  sliderB = createSlider(0, 255, 0, 1);
  sliderA = createSlider(0, 255, 128, 1);

  sliderR.position(10, 10);
  sliderG.position(10, 50);
  sliderB.position(10, 90);
  sliderA.position(10, 130);
  
  sliderR.style('width', '200px');
  sliderG.style('width', '200px'); 
  sliderB.style('width', '200px');
  sliderA.style('width', '200px');

  sliderRText = text("Red Value", sliderR.x, sliderR.y + 32);
  sliderGText = text("Green Value", sliderG.x, sliderG.y + 32);
  sliderBText = text("Blue Value", sliderB.x, sliderB.y + 32);
  sliderAText = text("Alpha Value", sliderA.x, sliderA.y + 32);

  backgroundColourPicker = createColorPicker('#FFFFFF');
  backgroundColourPicker.position(sliderA.x, sliderA.y + 60);
  backgroundColourPicker.style('width', '200px');

  
  pauseButton = createButton("Toggle Pause");
  pauseButton.mousePressed(pauseSquares);
  pauseButton.position(backgroundColourPicker.x, backgroundColourPicker.y + 50);
  pauseButton.style('width', '200px');
  userPaused = true;

  resetButton = createButton("Reset Canvas");
  resetButton.mousePressed(resetCanvas);  
  resetButton.position(pauseButton.x, pauseButton.y + 30);
  resetButton.style('width', '200px');



  prevPos = 0-stepX;
  maxSteps = 10000;

  index = 0;
  background(255, 255, 255);
  
 
  
  //----------------------------------------------------------------------------------------POINTS PLOTTING 

  while(!exceededHeight)
  {    
   if(prevPos + 4 < windowWidth)
   {
     
    distances[index] = createVector(prevPos + stepX, currentY + random(-20, 20));
    prevPos+=stepX;
    index++;

   }

   else
   {
    distances[index] = createVector(0, 0);
    prevPos = 0-stepX;
    currentY += random(20, 50);

   }

   if(currentY > windowHeight)
   {
     exceededHeight = true;
   }


  }


   //----------------------------------------------------------------------------------------GUI 
   //------------------------------------------------------------------------------Colour Change

   
  //----------------------------------------------------------------------------------------TIMER 
  startT=millis();

  
  //----------------------------------------------------------------------------------------RESET INDEX COUNTER
  index = 0;




}

function draw() 
{
    //----------------------------------------------------------------------------------------DRAW GUI 
    // let colourValY = map(distances[index].y, 0, windowHeight, 0.3, 0.8);
    // let colourValX = map(distances[index].x, 0, windowHeight, 0.01, 0.8);

    // let colourValXY = map(colourValX + colourValY, 0, 2, 0.5, 1);
    // console.log(colourValXY);

    if(canSetBackground)
    {
      background(backgroundColourPicker.color());
      canSetBackground = false;
    }

    let r = sliderR.value();
    let g = sliderG.value();
    let b = sliderB.value();
    let a = sliderA.value();    

    stroke(0, 0, 0, 255);
    square(sliderR.x + 220, (sliderR.y + sliderA.y) / 2, 40);
    stroke(0, 0, 0, 0);

      
    fill(r, g, b, a);

  //----------------------------------------------------------------------------------------DRAW SQUARES

  square(distances[index].x, distances[index].y, random(10, 100));
  index++;


 
  
      
    

  

}


function pauseSquares()
{
 switch(userPaused)
 {
   case true: userPaused = false;
   frameRate(60);
   
   break;
   case false: userPaused = true;
   frameRate(0);
   break;
   default: userPaused = true;
   break;
 }
}

function resetCanvas()
{
  index = 0;
  background(255, 255, 255);
  userPaused = true;
  canSetBackground = true;
  frameRate(0);
}