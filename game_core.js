var myGamePiece,ground,ball,tank,score,score_text,range,range_display
tank=[]
score=[0,0]
score_text=[]
range=[]
range_display=[]
range[0]=document.getElementById("tank1_power")
range[1]=document.getElementById("tank1_angle")
range[2]=document.getElementById("tank2_power")
range[3]=document.getElementById("tank2_angle")
range_display[0]=document.getElementById("range_1_1")
range_display[1]=document.getElementById("range_1_2")
range_display[2]=document.getElementById("range_2_1")
range_display[3]=document.getElementById("range_2_2")
for(i=0;i<4;i++){
    range_display[i].innerHTML=range[i].value
    //alert(range[i].value)
}
range[0].oninput=function(){
    range_display[0].innerHTML=range[0].value
}
range[1].oninput=function(){
    range_display[1].innerHTML=range[1].value
}
range[2].oninput=function(){
    range_display[2].innerHTML=range[2].value
}
range[3].oninput=function(){
    range_display[3].innerHTML=range[3].value
}

function startGame() {
    ground = new component(1000,30,"green",0,370," ")
    tank[0] = new component(70,35,"images/tank_green.svg",10,335,"image") 
    tank[1] = new component(70,35,"images/tank_blue.svg",920,335,"image")
    score_text[0] = new component("25px", "Consolas", "black", 30, 20, "text",0)
    score_text[1] = new component("25px", "Consolas", "black", 830, 20, "text",1)
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        div = document.getElementById("canvas-wrapper")
        this.canvas.width = 1000;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        div.appendChild(this.canvas)
        //this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type,optional) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;  
    this.x = x;
    this.y = y;
    this.shiftX=0
    this.shiftY=0
    this.time=0    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        }
        else if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            this.text="Player "+(optional+1)+": "+score[optional]
            ctx.fillText(this.text, this.x, this.y);
          }
        else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.shiftX;
        this.y += this.shiftY;        
    }
}


function fire(tank_no){
    document.getElementById("button"+(tank_no+1)).setAttribute("onclick"," ")
    document.getElementById("button"+((!tank_no)+1)).setAttribute("onclick"," ")
    ball = new component(20,20,"images/ball.svg",tank[tank_no].x+(!tank_no*20),310,"image")    
    var x_enemy= tank[(!tank_no + 0)].x
    var y_enemy= tank[(!tank_no + 0)].y
    var x_own= tank[(tank_no + 0)].x
    var y_own= tank[(tank_no + 0)].y
    var speed=document.getElementById("tank"+(tank_no+1)+"_power").value*0.5
    var angle=document.getElementById("tank"+(tank_no+1)+"_angle").value
    var speed_x=speed*Math.cos(3.14/180.0*angle)
    var speed_y=speed*Math.sin(3.14/180.0*angle)
    var proj=setInterval(project,20)
    function project(){
        ball.time+=0.5
        ball.x=ball.time*speed_x*Math.pow(-1,tank_no)+(tank[tank_no].x+(!tank_no*20))
        ball.y=310-ball.time*speed_y+0.5*(ball.time*ball.time)
        if(ball.x >= (x_enemy-5*tank_no) && ball.x<=(x_enemy+60+2*(!tank_no)) && ball.y >= y_enemy && ball.y<=(y_enemy+55)){
            clearInterval(proj)
            tankHit(!tank_no+0)
            ball.image.src=" "
            document.getElementById("button"+(tank_no+1)).setAttribute("onclick","fire("+(tank_no)+")")
            document.getElementById("button"+((!tank_no)+1)).setAttribute("onclick","fire("+((!tank_no)+0)+")")
            score[tank_no]+=50
            //alert(x_enemy+" "+ball.x+" hit")
        }
        else if(ball.x >= (x_own-10) && ball.x<=(x_own+62) && ball.y >= y_own && ball.y<=(y_own+55)){
            clearInterval(proj)
            tankHit(tank_no+0)
            ball.image.src=" "
            document.getElementById("button"+(tank_no+1)).setAttribute("onclick","fire("+(tank_no)+")")
            document.getElementById("button"+((!tank_no)+1)).setAttribute("onclick","fire("+((!tank_no)+0)+")")
            score[(!tank_no)+0]+=50
            //alert(x_own+" "+ball.x+" hit")
        }
        else if(ball.x>=1000 || ball.y>360){
            clearInterval(proj)
            ball.image.src=" "
            document.getElementById("button"+(tank_no+1)).setAttribute("onclick","fire("+(tank_no)+")")
            document.getElementById("button"+((!tank_no)+1)).setAttribute("onclick","fire("+((!tank_no)+0)+")")
            //alert(x_own+" "+ball.x)
        }
    }
}

function tankHit(tank_no){
    var hit_no = 0
    var img_src=tank[tank_no].image.src
    var hit = setInterval(hit_effect,50)
    function hit_effect(){
        if(hit_no>6){
            clearInterval(hit)
        }
        hit_no++
        if(tank[tank_no].image.src==img_src){
            tank[tank_no].image.src=""
        }
        else{
            tank[tank_no].image.src=img_src
        }
    }
}

function updateGameArea() {
    myGameArea.clear()
    tank[0].update()
    tank[1].update()
    ground.update()
    score_text[0].update()
    score_text[1].update()
    if(ball){
        ball.update()
        ball.newPos()
    }
  }