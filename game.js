var name1 = document.getElementById("player_name_1")
name1.onchange=function(){
    document.getElementById("name_head_1").innerHTML=name1.value
}
var name2 = document.getElementById("player_name_2")
name2.onchange=function(){
    document.getElementById("name_head_2").innerHTML=name2.value
}
function displayGame(){
    document.getElementById("weapon_select").style.display="none"
    document.getElementById("game-starter").style.display="none"
    document.getElementById("fill_player_details").style.display="none"
    startGame()
    document.getElementById("game-wrapper").style.display="grid"
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
}
function display_weapon(){
    document.getElementById("fill_player_details").style.display="none"
    document.getElementById("weapon_select").style.display="grid"
}