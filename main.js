statusn = ""
objects = [] //since answers are going to be more than one so we are using array


function setup() {

    Canvas = createCanvas(580, 450)
    Canvas.position(450, 190)
    video=createCapture(VIDEO)
    video.size(580,450)
    video.hide()
    objectDetector = ml5.objectDetector('cocossd', modelloaded)
    document.getElementById("status").innerHTML = "Model Loaded !!!"

}

    
function modelloaded() {
    console.log("Model Loaded Sucessfully")
    statusn = true
}

function gotResult(error, results) {

    if (error) {

        console.log(error)
    } else {

        console.log(results)
        objects = results
    }
}

function draw() {

    image(video, 0, 0, 580, 450)
    if (statusn != "") {
        objectDetector.detect(video, gotResult)
        for (i = 0; i < objects.length; i++) {

            document.getElementById("status").innerHTML = "status:Object detected"
            obj_name = objects[i].label
            per = objects[i].confidence
            perR = floor(per * 100)
            height = objects[i].height
            width = objects[i].width
            pose_x = objects[i].x
            pose_y = objects[i].y
            
            if(obj_name=="person"){

            document.getElementById("no").innerHTML="BABY FOUND"
            fill("red")
            textSize(20)
            stroke("yellow")
            text(obj_name + " " + perR + "%", pose_x + 20, pose_y + 20)
            strokeWeight(4)
            noFill()
            rect(pose_x, pose_y, width, height)
            }

            else{

            document.getElementById("no").innerHTML="BABY NOT FOUND"

            }
        }

    }
}