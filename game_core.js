var myGamePiece,ground,ball,tank,score,score_text,range,range_display,wind_vel,wind_dir
var player_name,tank_color,weapon_player,fire_player,player1_weapon,player2_weapon,weapon_count,player1_weapon_count,player2_weapon_count,weapon_hit
player_name=["Player 1","Player 2"]
tank_color=[]
tank=[]
score=[0,0]
score_text=[]
range=[]
range_display=[]
weapon_player=0
fire_player=0
weapon_count=0
player1_weapon=[]
player2_weapon=[]
player1_weapon_count=0
player2_weapon_count=0
wind_dir=Math.floor(Math.random()*2)
wind_vel=Math.floor(Math.random()*21)
weapon_hit={"weapon 1":25,"weapon 2":30,"weapon 3":35,"weapon 4":40,"weapon 5":50,"weapon 6":70}
var name1 = document.getElementById("player_name_1")
name1.onchange=function(){
    document.getElementById("name_head_1").innerHTML=name1.value
    player_name[0]=name1.value
}
var name2 = document.getElementById("player_name_2")
name2.onchange=function(){
    document.getElementById("name_head_2").innerHTML=name2.value
    player_name[1]=name2.value
}
function displayGame(){
    if(weapon_count==6){
        document.getElementById("weapon_select").style.display="none"
        document.getElementById("game-starter").style.display="none"
        document.getElementById("fill_player_details").style.display="none"
        for(i=0;i<3;i++){
            document.getElementById("player1_options").innerHTML+="<option id ='player1_options_weapon"+i+"'>"+player1_weapon[i]+"</option>"
        }
        for(i=0;i<3;i++){
            document.getElementById("player2_options").innerHTML+="<option id ='player2_options_weapon"+i+"'>"+player2_weapon[i]+"</option>"
        }
        startGame()
        document.getElementById("game-wrapper").style.display="grid"
    }
    else{
        alert("Please select all weapons")
    }
}
function fill_player_details(){
    document.getElementById("game-starter").style.display="none"
    document.getElementById("weapon_select").style.display="none"
    document.getElementById("fill_player_details").style.display="grid"
}
function displayStart(){
    document.getElementById("game-starter").style.display="grid"
    document.getElementById("game-wrapper").style.display="none"
    document.getElementById("fill_player_details").style.display="none"
    document.getElementById("weapon_select").style.display="none"
    resetGame()
}
function display_weapon(){
    document.getElementById("fill_player_details").style.display="none"
    document.getElementById("weapon_select").style.display="grid"
    document.getElementById("weapon_player1_name").innerHTML=player_name[0]
    document.getElementById("weapon_player2_name").innerHTML=player_name[1]
    let radio_1=document.getElementsByName("radio1")
    let radio_2=document.getElementsByName("radio2")
    for(x=0;x<radio_1.length;x++){
        if(radio_1[x].checked){
            tank_color[0]=radio_1[x].value
            break
        }
    }
    for(x=0;x<radio_2.length;x++){
        if(radio_2[x].checked){
            tank_color[1]=radio_2[x].value
            break
        }
    }
}
function allot_weapon(obj){
    obj.style.display="none"
    document.getElementById("weapon_name_"+(weapon_player+1)).innerHTML+="<div>"+obj.value+"</div>"
    if(weapon_player==0){
        player1_weapon[player1_weapon_count]=obj.value
        player1_weapon_count++
    }
    else if(weapon_player==1){
        player2_weapon[player2_weapon_count]=obj.value
        player2_weapon_count++
    }
    weapon_player=!weapon_player+0
    weapon_count++
}

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
    tank[0] = new component(70,35,"images/tank_"+tank_color[0]+"_1.svg",10,335,"image") 
    tank[1] = new component(70,35,"images/tank_"+tank_color[1]+"_2.svg",920,335,"image")
    score_text[0] = new component("25px", "Consolas", "black", 30, 20, "text",0)
    score_text[1] = new component("25px", "Consolas", "black", 830, 20, "text",1)
    wind = new component("15px", "Consolas", "black", 830, 100, "text","wind")
    crash_sound=new sound("sound/blast.mp3")
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
            if(optional==0 || optional==1){
                ctx.font = this.width + " " + this.height;
                ctx.fillStyle = color;
                this.text=player_name[optional]+": "+score[optional]
                ctx.fillText(this.text, this.x, this.y);
            }
            else if(optional=="wind"){
                let dir
                if(wind_dir==0)
                    dir="right"
                else if(wind_dir==1){
                    dir="left"
                }
                this.text="wind : "+wind_vel+" "+dir
                ctx.fillText(this.text, this.x, this.y);
            }
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
    let elem=document.getElementById("player"+(tank_no+1)+"_options")
    let hit_weapon=document.getElementById("player"+(tank_no+1)+"_options").value
    elem.remove(elem.selectedIndex)
    weapon_count--
    ball = new component(20,20,"images/ball.svg",tank[tank_no].x+(!tank_no*20),310,"image")    
    var x_enemy= tank[(!tank_no + 0)].x
    var y_enemy= tank[(!tank_no + 0)].y
    var x_own= tank[(tank_no + 0)].x
    var y_own= tank[(tank_no + 0)].y
    var speed=document.getElementById("tank"+(tank_no+1)+"_power").value*0.5
    var angle=document.getElementById("tank"+(tank_no+1)+"_angle").value
    var speed_x=speed*Math.cos(3.14/180.0*angle)+Math.pow(-1,wind_dir)*wind_vel*0.5*Math.pow(-1,tank_no)
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
            //document.getElementById("button"+(tank_no+1)).setAttribute("onclick","fire("+(tank_no)+")")
            document.getElementById("button"+((!tank_no)+1)).setAttribute("onclick","fire("+((!tank_no)+0)+")")
            crash_sound.play()
            score[tank_no]+=weapon_hit[hit_weapon]
            checkwin()
            wind_dir=Math.floor(Math.random()*2)
            wind_vel=Math.floor(Math.random()*21)
            //alert(x_enemy+" "+ball.x+" hit")
        }
        else if(ball.x >= (x_own-10) && ball.x<=(x_own+62) && ball.y >= y_own && ball.y<=(y_own+55)){
            clearInterval(proj)
            tankHit(tank_no+0)
            ball.image.src=" "
            //document.getElementById("button"+(tank_no+1)).setAttribute("onclick","fire("+(tank_no)+")")
            document.getElementById("button"+((!tank_no)+1)).setAttribute("onclick","fire("+((!tank_no)+0)+")")
            crash_sound.play()
            score[(!tank_no)+0]+=weapon_hit[hit_weapon]
            checkwin()
            wind_dir=Math.floor(Math.random()*2)
            wind_vel=Math.floor(Math.random()*21)
            //alert(x_own+" "+ball.x+" hit")
        }
        else if(ball.x>=1000 || ball.y>360){
            clearInterval(proj)
            ball.image.src=" "
            //document.getElementById("button"+(tank_no+1)).setAttribute("onclick","fire("+(tank_no)+")")
            document.getElementById("button"+((!tank_no)+1)).setAttribute("onclick","fire("+((!tank_no)+0)+")")
            checkwin()
            wind_dir=Math.floor(Math.random()*2)
            wind_vel=Math.floor(Math.random()*21)
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
    wind.update()
    if(ball){
        ball.update()
        ball.newPos()
    }
  }

  function checkwin(){
      if(weapon_count==0){
          if(score[0]>score[1]){
              alert(player_name[0]+" wins")
          }
          else if(score[0]<score[1]){
              alert(player_name[1]+" wins")
          }
          else{
              alert("Game is tied")
          }
          resetGame()
          displayStart()
      }
  }

  function resetGame(){
    player_name=["Player 1","Player 2"]
    tank=[]
    score=[0,0]
    score_text=[]
    weapon_player=0
    fire_player=0
    weapon_count=0
    player1_weapon=[]
    player2_weapon=[]
    player1_weapon_count=0
    player2_weapon_count=0
    document.getElementById("weapon_name_1").innerHTML=""
    document.getElementById("weapon_name_2").innerHTML=""
    for(i=0;i<6;i++){
        document.getElementById("weapon_selector_"+(i+1)).style.display="block"
    }
    range[0].value=50
    range[1].value=45
    range[2].value=50
    range[3].value=45
    range_display[0].innerHTML=range[0].value
    range_display[1].innerHTML=range[1].value
    range_display[2].innerHTML=range[2].value
    range_display[3].innerHTML=range[3].value
    name1.value="Player 1"
    name2.value="Player 2"
    document.getElementById("name_head_1").innerHTML=name1.value
    document.getElementById("name_head_2").innerHTML=name2.value
  }

  function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}