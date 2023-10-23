var leftWristX = 0
var leftWristY = 0
var rightWristX = 0
var rightWristY = 0

var leftWristScore = 0
var rightWristScore = 0

var song1 = ""
var song2 = ""

function preload(){
    song1 = loadSound("./music/music.mp3")
    song2 = loadSound("./music/music2.mp3")
}

function setup(){
    canvas = createCanvas(350,350)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPose)
}

function modelLoaded(){
    console.log("Model Loaded!")
}

function gotPose(results){
    if(results.length > 0){
        console.log(results)
        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y

        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y

        leftWristScore = results[0].pose.keypoints[9].score 
        rightWristScore = results[0].pose.keypoints[10].score
        console.log(leftWristScore)
    }
}

function draw(){
    background("lightpink")
    image(video,0,0,350,350)
    fill("red")

    if(leftWristScore > 0.2){
        circle(leftWristX, leftWristY, 20)
        song2.stop()
        if(song1.isPlaying() == false){
            console.log("Song is playing")
            song1.play()
            document.getElementById("songName").innerHTML = "Hedwigs Theme"
        }
    }

    if(rightWristScore > 0.2){
        circle(rightWristX, rightWristY, 20)
        song1.stop()
        if(song2.isPlaying() == false){
            song2.play()
            document.getElementById("songName").innerHTML = "Peter Pan Theme"
        }
    }
}

