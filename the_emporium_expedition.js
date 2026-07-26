// 🏴‍☠️ The Emporium Expedition
// Development Build


function randomFrom(array){

    return array[
        Math.floor(Math.random() * array.length)
    ];

}

// =====================
// ITEM DATABASE
// =====================

const items = {


    // COMMON CARGO

    rum:{

        name:"🍺 Rum",

        rarity:"Common",

        price:20

    },


    coconuts:{

        name:"🥥 Coconuts",

        rarity:"Common",

        price:5

    },


    driedFish:{

        name:"🐟 Dried Fish",

        rarity:"Common",

        price:10

    },


    bananas:{

        name:"🍌 Bananas",

        rarity:"Common",

        price:8

    },


    wood:{

        name:"🪵 Wood Planks",

        rarity:"Common",

        price:15

    },


    rope:{

        name:"🧵 Rope",

        rarity:"Common",

        price:12

    },



    // UNCOMMON


    shipParts:{

        name:"⚓ Ship Parts",

        rarity:"Uncommon",

        price:150

    },


    oldCompass:{

        name:"🧭 Old Compass",

        rarity:"Uncommon",

        price:200

    },


    silverRing:{

        name:"💍 Silver Ring",

        rarity:"Uncommon",

        price:100

    },


    exoticHoney:{

        name:"🍯 Island Honey",

        rarity:"Uncommon",

        price:75

    },



    // RARE


    rubies:{

        name:"💎 Ruby",

        rarity:"Rare",

        price:500

    },


    sapphire:{

        name:"💎 Sapphire",

        rarity:"Rare",

        price:700

    },


    pearl:{

        name:"🦪 Pearl",

        rarity:"Rare",

        price:600

    },


    treasureMaps:{

        name:"📜 Treasure Map",

        rarity:"Rare",

        price:1000

    },


    ancientArtifact:{

        name:"🏺 Ancient Artifact",

        rarity:"Rare",

        price:1500

    },



    // LEGENDARY


    goldenIdol:{

        name:"👑 Golden Idol",

        rarity:"Legendary",

        price:3000

    },


    krakenPearl:{

        name:"🐙 Kraken Pearl",

        rarity:"Legendary",

        price:5000

    },


    

  


    ghostBlade:{

        name:"⚔️ Ghost Captain's Blade",

        rarity:"Legendary",

        price:7500

    }


};



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

    driedFish:0,

    bananas:0,

    wood:0,

    rope:0,


    shipParts:0,

    

    silverRing:0,

    exoticHoney:0,


    rubies:0,

    sapphire:0,

    pearl:0,

    treasureMaps:0,

    ancientArtifact:0,


    goldenIdol:0,

    krakenPearl:0,

   

    ghostBlade:0

},


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

🎒 Cargo Hold

<br><br>

🍺 Rum: ${game.inventory.rum}

<br>

🥥 Coconuts: ${game.inventory.coconuts}

<br>

🐟 Dried Fish: ${game.inventory.driedFish}

<br>

🍌 Bananas: ${game.inventory.bananas}

<br>

🪵 Wood: ${game.inventory.wood}

<br>

🧵 Rope: ${game.inventory.rope}

<br>

⚓ Ship Parts: ${game.inventory.shipParts}

<br>



<br>

💍 Silver Ring: ${game.inventory.silverRing}

<br>

🍯 Island Honey: ${game.inventory.exoticHoney}

<br>

💎 Rubies: ${game.inventory.rubies}

<br>

💎 Sapphire: ${game.inventory.sapphire}

<br>

🦪 Pearls: ${game.inventory.pearl}

<br>

📜 Treasure Maps: ${game.inventory.treasureMaps}

<br>

🏺 Ancient Artifacts: ${game.inventory.ancientArtifact}

<br>

👑 Golden Idols: ${game.inventory.goldenIdol}

<br>

🐙 Kraken Pearls: ${game.inventory.krakenPearl}

<br>



<br>

⚔️ Ghost Blades: ${game.inventory.ghostBlade}

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

    game.inventory.goldenIdol++;

    game.loot.unshift(
        "👑 Golden Idol Found!"
    );

}


else if(roll < .25){

    game.inventory.treasureMaps++;

    game.loot.unshift(
        "📜 Treasure Map Found!"
    );

}


else{

    game.inventory.rum++;

    game.loot.unshift(
        "🍺 Rum Barrel Found!"
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
