song="";
leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;
scoreleftwrist=0;

function preload()
{
song=loadSound("music.mp3");
}
function setup() {
    canvas= createCanvas(600, 500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video, modeloaded);
    posenet.on('pose', gotposes);
}

function draw(){
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("FF0000");
    if(scoreleftwrist>0.2){
    circle(leftWristX, leftwristY, 20);
    numberleftwrist=Number(leftwristY);
    remove_decimals=floor(numberleftwrist);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="volume ="+volume;
    song.setVolume(volume);
}
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modeloaded(){
    console.log("posenet is initialized");
}

function gotposes(results){
    if(results.length>0){
        console.log(results);
        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        rightwristX=results[0].pose.rightwristx;
        rightwristY=results[0].pose.rightwristy;
        console.log("leftwristx= "+ leftwristX+"leftwristy= "+ leftwristY+" rightwristX= "+ rightwristX+" rightwristy= "+ rightwristY);

        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist=" + scoreleftwrist);
    }

}