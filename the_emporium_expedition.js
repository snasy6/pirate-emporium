// 🏴‍☠️ The Emporium Expedition
// Development Build

alert("js");
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


loot:[],
market:{
    rum:1,
    coconuts:1,
    driedFish:1,
    bananas:1,
    wood:1,
    rope:1,
    shipParts:1,
    silverRing:1,
    exoticHoney:1,
    rubies:1,
    sapphire:1,
    pearl:1,
    treasureMaps:1,
    ancientArtifact:1,
    goldenIdol:1,
    krakenPearl:1,
    ghostBlade:1
}

};



if(!game.market){

    game.market = {
        rum:1,
        coconuts:1,
        driedFish:1,
        bananas:1,
        wood:1,
        rope:1,
        shipParts:1,
        silverRing:1,
        exoticHoney:1,
        rubies:1,
        sapphire:1,
        pearl:1,
        treasureMaps:1,
        ancientArtifact:1,
        goldenIdol:1,
        krakenPearl:1,
        ghostBlade:1
    };

}


// =====================
// SAVE
// =====================

function saveGame(){


localStorage.setItem(

"emporiumExpedition",

JSON.stringify(game)

);


}
function updateMarket(){

    for(let item in game.market){

        let change = (Math.random() * 0.4) - 0.2;

        game.market[item] += change;


        if(game.market[item] < 0.5){
            game.market[item] = 0.5;
        }


        if(game.market[item] > 2){
            game.market[item] = 2;
        }

    }

}
// =====================
// SELL ITEM
// =====================

function sellItem(item){

    if(game.inventory[item] <= 0){

        alert("You don't have any!");
        return;

    }


    let price =
    items[item].price * game.market[item];

    game.inventory[item]--;

    game.gold += Math.floor(price);


    game.loot.unshift(
        `💰 Sold ${items[item].name} for ${Math.floor(price)} gold`
    );


    saveGame();
    updateGame();

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


${getMood(pirate.morale ?? 100)}

<br>

❤️ Morale: ${pirate.morale ?? 100}/100


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

document.getElementById("market").innerHTML = `

🏝️ Island Market

<br><br>

${Object.keys(items).map(item => `

${items[item].name}

<br>

🏷️ Price: ${Math.floor(items[item].price * game.market[item])} gold

<br>

<button onclick="sellItem('${item}')">
Sell
</button>

<br><br>

`).join("")}

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
 if(pirate.morale == null){

        pirate.morale = 100;

    }


pirate.morale -= 2;



if(pirate.morale < 0){

pirate.morale = 0;

}


});





let missions=[

{
    name:"🏝️ Explore Lost Island",
    type:"island"
},

{
    name:"🚢 Raid Merchant Ship",
    type:"merchant"
},

{
    name:"🏚️ Search Ancient Ruins",
    type:"ruins"
},

{
    name:"⛏️ Find Buried Treasure",
    type:"treasure"
},

{
    name:"🌊 Scout Unknown Waters",
    type:"ocean"
}

];




let mission = randomFrom(missions);


game.expedition={

name:mission.name,

type:mission.type,

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


// LEGENDARY LOOT

if(roll < 0.01){

    game.inventory.ghostBlade++;

    game.loot.unshift(
        "⚔️ Ghost Captain's Blade Found!"
    );

}


else if(roll < 0.03){

    game.inventory.krakenPearl++;

    game.loot.unshift(
        "🐙 Kraken Pearl Found!"
    );

}


else if(roll < 0.08){

    game.inventory.goldenIdol++;

    game.loot.unshift(
        "👑 Golden Idol Found!"
    );

}


// RARE LOOT

else if(roll < 0.25){

    game.inventory.treasureMaps++;

    game.loot.unshift(
        "📜 Treasure Map Found!"
    );

}


else if(roll < 0.35){

    game.inventory.rubies++;

    game.loot.unshift(
        "💎 Ruby Found!"
    );

}


else if(roll < 0.45){

    game.inventory.pearl++;

    game.loot.unshift(
        "🦪 Pearl Found!"
    );

}


// COMMON LOOT

else if(roll < 0.65){

    game.inventory.shipParts++;

    game.loot.unshift(
        "⚓ Ship Parts Found!"
    );

}


else if(roll < 0.80){

    game.inventory.coconuts++;

    game.loot.unshift(
        "🥥 Coconuts Found!"
    );

}


else{

    game.inventory.rum++;

    game.loot.unshift(
        "🍺 Rum Barrel Found!"
    );

}
updateMarket();
game.expedition = null;

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
