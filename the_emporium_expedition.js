// 🏴‍☠️ The Emporium Expedition
// Development Build


function randomFrom(array){

    return array[
        Math.floor(Math.random() * array.length)
    ];

}



// =====================
// PIRATE GENERATOR
// =====================

function generatePirate(){


    const firstNames = [

        "Black",
        "Red",
        "Lucky",
        "Mad",
        "Silver",
        "Bloody",
        "Old",
        "Captain",
        "Scar",
        "One Eye"

    ];


    const lastNames = [

        "Tide",
        "Bones",
        "Storm",
        "Kraken",
        "Raven",
        "Wave",
        "Anchor",
        "Skull",
        "Reef",
        "Blade"

    ];



    return {


        name:

        randomFrom(firstNames)

        + " "

        + randomFrom(lastNames),



        combat:

        Math.floor(Math.random()*10)+1,



        luck:

        Math.floor(Math.random()*10)+1,



        navigation:

        Math.floor(Math.random()*10)+1,



        morale:100


    };


}



function generateCrew(amount){


    let crew = [];


    for(let i = 0; i < amount; i++){


        crew.push(

            generatePirate()

        );


    }


    return crew;


}





// =====================
// LOAD GAME
// =====================

let game = JSON.parse(

localStorage.getItem("emporiumExpedition")

)

|| {


gold:500,


ship:{

    name:"Rusty Sloop",

    level:1,

    bonus:1

},



crew:generateCrew(3),



inventory:{

    rum:0,

    coconuts:0,

    rubies:0,

    treasureMaps:0,

    shipParts:0,

    parrots:0

}



expedition:null,


loot:[]


};





// =====================
// SAVE
// =====================

function saveGame(){


localStorage.setItem(

"emporiumExpedition",

JSON.stringify(game)

);


}





// =====================
// CREW MOOD
// =====================

function getMood(morale){


if(morale >= 75){

    return "😊 Happy";

}


if(morale >= 40){

    return "😐 Tired";

}


if(morale >= 15){

    return "😡 Angry";

}


return "☠️ Furious";


}






// =====================
// DISPLAY
// =====================

function updateGame(){



document.getElementById("stats").innerHTML = `

💰 Gold: ${game.gold}

`;





document.getElementById("ship").innerHTML = `


🚢 ${game.ship.name}

<br>

⭐ Level: ${game.ship.level}

<br>

⚓ Loot Bonus: x${game.ship.bonus}


`;







document.getElementById("crew").innerHTML =


game.crew.map(pirate => `


<div class="crewMember">


<h3>🏴‍☠️ ${pirate.name}</h3>


⚔️ Combat: ${pirate.combat}

<br>

🍀 Luck: ${pirate.luck}

<br>

🧭 Navigation: ${pirate.navigation}

<br><br>


${getMood(pirate.morale)}

<br>

❤️ Morale: ${pirate.morale}/100


</div>



`).join("");







document.getElementById("inventory").innerHTML = `


📦 Supplies: ${game.inventory.supplies}

<br>

🧭 Compasses: ${game.inventory.compass}

<br>

👑 Crowns: ${game.inventory.crowns}


`;







if(game.expedition){


let time = Math.floor(

(game.expedition.end - Date.now()) / 1000

);



if(time <= 0){


completeExpedition();


}

else{


document.getElementById("mission").innerHTML = `


🗺️ ${game.expedition.name}

<br>

⏳ Returning in ${time}s


`;


}



}

else{


document.getElementById("mission").innerHTML =

"No expedition active";


}







document.getElementById("loot").innerHTML =


game.loot.length

?

game.loot.join("<br>")

:

"No treasure yet";



}








// =====================
// START EXPEDITION
// =====================

document.getElementById("sendCrew").onclick = ()=>{



if(game.expedition){


alert("Crew is already away!");

return;


}





game.crew.forEach(pirate=>{


pirate.morale -= 10;



if(pirate.morale < 0){

pirate.morale = 0;

}


});





let missions=[


"Explore Lost Island",

"Raid Merchant Ship",

"Search Ancient Ruins",

"Find Buried Treasure",

"Scout Unknown Waters"


];





game.expedition={


name:randomFrom(missions),


end:Date.now()+30000


};




saveGame();

updateGame();



};








// =====================
// FINISH EXPEDITION
// =====================

function completeExpedition(){



let averageMorale = 0;



game.crew.forEach(pirate=>{


averageMorale += pirate.morale;


});



averageMorale /= game.crew.length;





let gold =

Math.floor(Math.random()*400)+100;





if(averageMorale < 40){


gold *= .5;


game.loot.unshift(

"😡 Crew was unhappy and worked slower"

);


}





gold *= game.ship.bonus;



game.gold += Math.floor(gold);





game.loot.unshift(

`💰 Found ${Math.floor(gold)} gold`

);







let roll = Math.random();





if(roll < .05){


game.inventory.crowns++;


game.loot.unshift(

"👑 Legendary Crown Found!"

);


}


else if(roll < .25){


game.inventory.compass++;


game.loot.unshift(

"🧭 Rare Compass Found!"

);


}


else{


game.inventory.supplies++;


game.loot.unshift(

"📦 Supplies Found"

);


}







game.expedition=null;



saveGame();

updateGame();


}









// =====================
// REST AT ISLAND
// =====================

let islandButton = document.getElementById("mainIsland");


if(islandButton){



islandButton.onclick=()=>{


game.crew.forEach(pirate=>{


pirate.morale += 25;



if(pirate.morale > 100){

pirate.morale = 100;

}


});



game.loot.unshift(

"🏝️ Crew rested at Main Island"

);



saveGame();

updateGame();



alert(

"Your crew feels refreshed!"

);



};


}








// =====================
// RENAME SHIP
// =====================

let renameButton = document.getElementById("renameShip");


if(renameButton){


renameButton.onclick=()=>{


let name = prompt(

"Enter ship name:"

);



if(name){


game.ship.name=name;


saveGame();

updateGame();


}



};



}







// =====================
// UPGRADE SHIP
// =====================

let upgradeButton = document.getElementById("upgradeShip");



if(upgradeButton){


upgradeButton.onclick=()=>{


let cost = game.ship.level * 500;



if(game.gold < cost){


alert("Not enough gold!");

return;


}



game.gold -= cost;



game.ship.level++;


game.ship.bonus += .5;



saveGame();

updateGame();



};



}







setInterval(updateGame,1000);


updateGame();
