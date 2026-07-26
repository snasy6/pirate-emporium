// 🏴‍☠️ The Emporium Expedition
// Development Build


let game = JSON.parse(
    localStorage.getItem("emporiumExpedition")
) || {

    gold: 500,

    crew: 5,

    ship: {
        name: "Rusty Sloop",
        level: 1,
        bonus: 1
    },

    expedition: null,

    loot: []

};


// SAVE

function saveGame(){

    localStorage.setItem(
        "emporiumExpedition",
        JSON.stringify(game)
    );

}



// UPDATE DISPLAY

function updateGame(){


    document.getElementById("stats").innerHTML = `

    💰 Gold: ${game.gold}

    <br>

    👥 Crew: ${game.crew}

    `;



    if(game.expedition){


        let timeLeft = Math.floor(

            (game.expedition.end - Date.now()) / 1000

        );


        if(timeLeft <= 0){

            completeExpedition();

        }

        else{

            document.getElementById("mission").innerHTML = `

            🚢 ${game.expedition.name}

            <br>

            ⏳ Returning in ${timeLeft}s

            `;

        }


    }

    else{


        document.getElementById("mission").innerHTML =

        "No expedition active";


    }



    if(game.loot.length > 0){

        document.getElementById("loot").innerHTML =

        game.loot.join("<br>");

    }

    else{

        document.getElementById("loot").innerHTML =

        "No treasure found yet.";

    }


}





// SEND CREW

document.getElementById("sendCrew").onclick = function(){


    if(game.expedition){

        alert("Your crew is already away!");

        return;

    }



    let missions = [

        "Explore Lost Island",

        "Raid Merchant Ship",

        "Search Ancient Ruins",

        "Find Buried Treasure",

        "Scout Unknown Waters"

    ];



    let mission = missions[

        Math.floor(Math.random() * missions.length)

    ];



    game.expedition = {

        name: mission,

        end: Date.now() + 30000

    };



    saveGame();

    updateGame();


};





// COMPLETE EXPEDITION

function completeExpedition(){


    let gold =

    Math.floor(Math.random() * 400) + 100;



    game.gold += gold;



    game.loot.unshift(

        "💰 Found " + gold + " gold"

    );



    let roll = Math.random();



    if(roll < 0.05){


        game.loot.unshift(

        "🌟 LEGENDARY LOOT: Kraken Crown"

        );


    }

    else if(roll < 0.25){


        game.loot.unshift(

        "✨ Rare Loot: Ancient Compass"

        );


    }

    else{


        game.loot.unshift(

        "📦 Common Loot: Supplies"

        );


    }



    game.expedition = null;



    saveGame();

    updateGame();


}





// CHECK EVERY SECOND

setInterval(updateGame,1000);



updateGame();
