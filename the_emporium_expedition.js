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
        Math.floor(Math.random()*10)+1

    };


}



function generateCrew(amount){

    let crew = [];


    for(let i = 0; i < amount; i++){

        crew.push(generatePirate());

    }


    return crew;

}



// =====================
// LOAD GAME
// =====================

let game = JSON.parse(

    localStorage.getItem("emporiumExpedition")

) || {


    gold: 500,


    ship: {

        name: "Rusty Sloop",

        level: 1,

        bonus: 1

    },


    crew: generateCrew(3),


    expedition: null,


    loot: []


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
// UPDATE DISPLAY
// =====================

function updateGame(){



document.getElementById("stats").innerHTML = `

💰 Gold: ${game.gold}

`;



document.getElementById("ship").innerHTML = `

🚢 Ship: ${game.ship.name}

<br>

⭐ Level: ${game.ship.level}

<br>

⚓ Loot Bonus: x${game.ship.bonus}

`;




document.getElementById("crew").innerHTML =

game.crew.map(pirate => `


<div class="crewMember">


🏴‍☠️ ${pirate.name}

<br>

⚔️ Combat: ${pirate.combat}

<br>

🍀 Luck: ${pirate.luck}

<br>

🧭 Navigation: ${pirate.navigation}


</div>


`).join("");





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
// SEND CREW
// =====================

document.getElementById("sendCrew").onclick = ()=>{


if(game.expedition){

alert("Crew is already away!");

return;

}



let missions = [

"Explore Lost Island",

"Raid Merchant Ship",

"Search Ancient Ruins",

"Find Buried Treasure",

"Scout Unknown Waters"

];



game.expedition = {

name: randomFrom(missions),

end: Date.now()+30000

};



saveGame();

updateGame();


};




// =====================
// FINISH MISSION
// =====================

function completeExpedition(){


let gold =

Math.floor(Math.random()*400)+100;



gold *= game.ship.bonus;



game.gold += Math.floor(gold);



game.loot.unshift(

`💰 Found ${Math.floor(gold)} gold`

);




let luck = 0;


game.crew.forEach(pirate=>{

luck += pirate.luck;

});



let roll = Math.random();



if(roll < (0.05 + luck/500)){


game.loot.unshift(

"🌟 LEGENDARY: Kraken Crown"

);


}

else if(roll < (0.25 + luck/300)){


game.loot.unshift(

"✨ Rare: Golden Compass"

);


}

else{


game.loot.unshift(

"📦 Common Supplies"

);


}




game.expedition = null;


saveGame();

updateGame();


}




// =====================
// CUSTOM SHIP NAME
// =====================

let shipButton = document.getElementById("renameShip");


if(shipButton){


shipButton.onclick = ()=>{


let name = prompt(

"Enter your ship name:"

);



if(name && name.trim() !== ""){


game.ship.name = name.trim();


saveGame();

updateGame();


}


};


}




// =====================
// SHIP UPGRADE
// =====================

let upgradeButton = document.getElementById("upgradeShip");


if(upgradeButton){


upgradeButton.onclick = ()=>{


let cost = game.ship.level * 500;



if(game.gold < cost){

alert("Not enough gold!");

return;

}



game.gold -= cost;


game.ship.level++;


game.ship.bonus += 0.5;



saveGame();

updateGame();


};


}




setInterval(updateGame,1000);


updateGame();
