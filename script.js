// this refereces all the things that have the class eye
let eyes = document.querySelectorAll(".eye");
//gets snapshot of the eye position
let eyeRect = eyes[0].getBoundingClientRect();
let container = document.querySelector(".eyesContainer");
let containerRect = container.getBoundingClientRect();
//calls the eyesFollow function after the mouse has moved if
//set to true then it does the opposite
document.body.addEventListener("mousemove", eyesFollow, false);
//the e in the parameter is an event for the event listener
function eyesFollow(e) {
  //this basically is optional but it "optimizes performance"
  //by according to chatgpt: 
  // it is used to tell the browser that you want to perform 
  // an animation and requests that the browser schedules a 
  // repaint of the window for the next animation frame. 
  // This method takes a callback function as an argument, 
  // which is executed before the repaint.
  requestAnimationFrame(() => {
    let xPos = e.pageX;
    let yPos = e.pageY;
    // finding the difference between the center of the
    // eye and the coords of the mouse
    // reason we do center of eye and not pupil is because
    // we want pupil on hypotnuse if it at the very end
    // the pupil will not move
    // eyeRect.x/y is the starting point of the container which
    // starts at the top left of the container we add half width
    // to x and half height to y so now we are in the center of
    // our eye when we combine the x and y coordinates.
    let xDiff = (eyeRect.x + eyeRect.width / 2) - xPos;
    let yDiff = (eyeRect.y + eyeRect.height / 2) - yPos;
    //gives the angle based on where our mouse is
    let angle = Math.atan2(yDiff, xDiff) * 180 / Math.PI;
    console.log(angle);
    //this sets a custom property because of the --, usually we
    //add an set property like backgroud-color or something like
    //that angle.toFixed is just having the angle var fixed to to
    //decimals. The reason we append deg to the angle is because
    //rotate() needs a deg number ex: 5deg or 30deg
    container.style.setProperty("--eyeAngle", angle.toFixed(2) + "deg");
    // Tilting the face relative to mouse cursor
    let mouseXRelativetoContainer = xPos - containerRect.x - containerRect.width / 2;
    let mouseYRelativetoContainer = yPos - containerRect.y - containerRect.height / 2;

    let containerXAngle = 60 * (mouseXRelativetoContainer / window.innerWidth);
    let containerYAngle = -1 * 60 * (mouseYRelativetoContainer / window.innerHeight);

    container.style.setProperty("--xAngle", containerXAngle.toFixed(2) + "deg");
    container.style.setProperty("--yAngle", containerYAngle.toFixed(2) + "deg");




  });
}
