/**
 * Dopewars
 *
 */
// Global Variables
var GAMEDURATION = 31;

var fDelay = 1;
var fIncre = 4;

var cash = 0;
var bank = 0;
var shark = 0;

var drugPrices = new Array(8);
var drugQtys = new Array(8);

var currentDistrict = "SOMA";
var gun = 0;
var day = 1;
var pockets = 100;

var cops = 3;
var dead = 0;

var bankInterest = 1.1
var sharkInterest = 1.125

var nextFi = "";
var currFi = "";
var maxLoan = 0;
var lentOut = 0;

var events = new Array(17);
var currentEvent = 0;
var eventFrequencyFactor = 1000000;

var strOtherEvent = "";

var fuzzEvent = "";


function jetToDistrict(districtText) {
    if (districtText != currentDistrict) {
        $$("problemText").innerHTML = "";
        currentDistrict = districtText;
        // Start chain of events.
        fuzz();
    } else {
        $$("problemText").innerHTML = "You are already in " + districtText;
    }
}



function fuzz() {
    // Roll the dice 1 n 7 chance
    if (oddsCalculator(7) || fuzzEvent != "") {
        if (cops > 0) {
            fuzzEvent = "";

            // If we ha ha, "get lucky" 
            // Display the fuzz div.
            var msg = "";
            if (cops == 3) msg = "Officer Hardass and two of his deputies are chasing you";
            else if (cops == 2) msg = "Officer Hardass and his deputy are chasing you";
            else if (cops == 1) msg = "Officer Hardass is chasing you";

            $$('fuzzText').innerHTML = msg;

            $$('run').style.display = 'block';
            $$('fight').style.display = 'block';
            $$('fok').style.display = 'none';
            $$('fuzz').style.display = 'block';
        }

    } else {
        // Move on to pockets.
        fpockets();
    }
}

function fuzzFight() {
    // Gotta Gun?
    if (gun == 1) {
        // Ok, your gonna fight
        // Any cops left?
        if (cops > 0) {
            // Yep, there are cops.
            // You have a 1 in 4 shot at hitting them.
            if (oddsCalculator(4)) {
                cops--;

                if (cops < 1) {
                    fuzzEvent = "";
                    var msg = "You shot and killed one of the cops.  Now there are no more cops, deal on."
                } else {
                    fuzzEvent = "wannafight";
                    var msg = "You shot and killed one of the cops."
                }
                $$('fuzzText').innerHTML = msg;
                $$('run').style.display = 'none';
                $$('fight').style.display = 'none';
                $$('fok').style.display = 'block';
            } else {
                fuzzEvent = "keepfight";
                var msg = "You shot at the cops, but missed.";
                $$('fuzzText').innerHTML = msg;
                $$('run').style.display = 'none';
                $$('fight').style.display = 'none';
                $$('fok').style.display = 'block';
            }
        } else {
            var msg = "No more cops, deal on.";
            fuzzEvent = "";
            $$('fuzzText').innerHTML = msg;
            $$('run').style.display = 'none';
            $$('fight').style.display = 'none';
            $$('fok').style.display = 'block';
        }
    } else {
        // No Gun
        fuzzEvent = "wannafight";
        var msg = "You do not have a gun."
        $$('fuzzText').innerHTML = msg;
        $$('run').style.display = 'none';
        $$('fight').style.display = 'none';
        $$('fok').style.display = 'block';
    }
}


function fuzzFightBack() {

    fuzzEvent = "";

    $$('fuzz').style.display = 'block';

    // Now the cops get to shoot at you.
    // Serves you right!  You should not be 
    // dealing drugs or fighting cops.
    // 1 in 5 chance of getting hit.
    if (oddsCalculator(5)) {
        // 1 in 5 chance of dying
        if (oddsCalculator(5)) {
            fuzzEvent = "gameover";
            dead = 1;
            var msg = "The cops shot you.  You died."
            $$('fuzzText').innerHTML = msg;
            $$('run').style.display = 'none'
            $$('fight').style.display = 'none';
            $$('fok').style.display = 'block';
            // GAME OVER
        } else {
            fuzzEvent = "wannafight";
            var msg = "The cops shot you, and you are wounded."
            $$('fuzzText').innerHTML = msg;
            $$('run').style.display = 'none'
            $$('fight').style.display = 'none';
            $$('fok').style.display = 'block';
        }
    } else {
        fuzzEvent = "wannafight";
        var msg = "The cops shot at you, but missed."
        $$('fuzzText').innerHTML = msg;
        $$('run').style.display = 'none'
        $$('fight').style.display = 'none';
        $$('fok').style.display = 'block';
    }

}

//The cops shot you, and you are wounded.
//The cops shot you, and you are wounded.
//The cops seized all your dope and half your cash.
//The cops shot at you, but missed.
//Officer Hardass ^1^2still chasing you!  What do you do?^3
//The cops shot you.  You died.
//You shot at the cops, but missed.
//You lost them in the alleys.


/*

When you run into the cops, 
STRING kidCopHelp "When you run into the cops, you have two options: Run or Fight.\n\n" \
 "You can only fight if you have a gun.  During the game, you may have the " \
"opportunity to buy a gun.\n\n" \
"If you run, it is unlikely that the cops will catch you; but if they do, " \
 "they will seize all your drugs and half of your cash.\n\n" \
 "If you fight, you have the chance of killing off the cops, and not be " \
"bothered for the rest of the game.  However, if you fight the cops, it is " \
"fairly likely that you will be wounded and caught, and you might even be " \
"killed.  It's the risk you have to take if you decide to protect your " \
"livelihood.\n\n" \
"The cops will not chase you if your coat is empty."

*/




function fuzzRun() {
    // This is your first chance to get away.
    if (oddsCalculator(3)) {
        // 2nd chance (and its better)
        if (oddsCalculator(5)) {

            // Caught
            // Lose All your Dope
            // And 1/2 your cash.
            var msg = "You ran into a dead end, and the cops found you.";
            msg += "The cops seized all your dope and half your cash.";
            $$('fuzzText').innerHTML = msg;

            cash = cash / 2;
            cash = Math.round(cash);

            for (var i = 0; i < 8; i++) {
                drugQtys[i] = 0;
            }

            $$('run').style.display = 'none';
            $$('fight').style.display = 'none';
            $$('fok').style.display = 'block';



        } else {
            // Your away
            fuzzAway();
        }
    } else {
        // Your away
        fuzzAway();
    }
}
function fuzzAway() {
    // Turn on OK.
    $$('run').style.display = 'none';
    $$('fight').style.display = 'none';
    $$('fok').style.display = 'block';

    var msg = "You lost them in the alleys.";
    $$('fuzzText').innerHTML = msg;

}
function fuzzResponse(yesno) {

    $$('fuzz').style.display = 'none';
    if (fuzzEvent == "gameover") {
        // END GAME?
        displayGameOver();
    } else if (fuzzEvent == "wannafight") {
        // Back to the fight.
        fuzz();
    } else if (fuzzEvent == "keepfight") {
        fuzzFightBack();
    } else {
        fpockets();
    }
}
function fpockets() {
    // Roll the dice 1 n 7 chance
    if (oddsCalculator(7) && cash > 200) {
        // If we ha ha, "get lucky" 
        // Display the pockets div.
        $$('pockets').style.display = 'block';
    } else {
        // Move on to gun.
        fgun();

    }
}
function pocketsResponse(yesno) {
    $$('pockets').style.display = 'none';
    if (yesno) {
        pockets += 40;
        cash -= 200;
        fgun();
    } else {
        fgun();
    }

}
function fgun() {
    // Roll the dice 1 n 7 chance
    // and make sure we don't have one already.

    if (oddsCalculator(7) && gun == 0 && cash > 400) {
        // If we ha ha, "get lucky" 
        // Display the pockets div.
        $$('gun').style.display = 'block';
    } else {
        // Move on to messages.
        currentEvent = 0;
        messageEvents(currentDistrict);
    }
}
function gunResponse(yesno) {
    $$('gun').style.display = 'none';
    if (yesno) {
        gun += 1;
        cash -= 400;
        // Move on to messages.
        currentEvent = 0;
        messageEvents(currentDistrict);
    } else {
        // Move on to messages.
        currentEvent = 0;
        messageEvents(currentDistrict);
    }
}
function oddsCalculator(odds) {
    // Pick a random number 0 .. 1,000,000 ?
    var iRandom = Math.floor(Math.random() * eventFrequencyFactor);
    var iResult = iRandom % odds;
    if (iResult == 0) return true;
    else return false;
}
function messageEvents(districtText) {
    if (currentEvent < events.length) {
        // Pick a random number 0 .. 1,000,000 ?
        var iRandom = Math.floor(Math.random() * eventFrequencyFactor);

        // Each event has a odds factor.  [0]  
        // Mod the random number by the odds.
        // If the result is 0 then do the event.
        var iResult = iRandom % events[currentEvent][0];

        if (iResult == 0) {
            // Display Message 
            $$('messageText').innerHTML = events[currentEvent][1];
            // Multiply Price
            if (events[currentEvent][3] > 0) {
                drugPrices[events[currentEvent][2]] = drugPrices[events[currentEvent][2]] * events[currentEvent][3];
            }
            // Divideiply Price
            if (events[currentEvent][4] > 0) {
                drugPrices[events[currentEvent][2]] = drugPrices[events[currentEvent][2]] / events[currentEvent][4];
            }
            // Add Drugs
            if (events[currentEvent][5] > 0) {
                var foundDrugs = Math.floor(Math.random() * events[currentEvent][5]);
                // You got say 100 pockets - 99 qty = 1... You get 1 drug.
                var drugRoom = pockets - countQty();

                if (drugRoom == 0) {
                    // Nothing happens.
                } else if (foundDrugs < drugRoom) {
                    // Room for all the found drugs.
                    drugQtys[events[currentEvent][2]] += foundDrugs;
                } else {
                    // Apparantly you have room or 0 .. ? drugs
                    drugQtys[events[currentEvent][2]] += drugRoom;
                }


                // Don't this anymore.
                // It might give you more drugs than room.
                //drugQtys[ events[currentEvent][2] ] += 
                //Math.floor(Math.random()*events[currentEvent][5])
            }

            currentEvent++;
            displayMessageDiv();

        } else {
            currentEvent++;
            messageEvents(districtText)
        }
    } else {

        roundPrices();

        // If Bronx then ask to visit the shark & bank
        if ((currentDistrict == "Financial District") || (currentDistrict == "Bronx")) {
            nextFi = "shark";
            //setTimeout("askJetToFi(false)",100);
            askJetToFi(false);
        } else {
            processJetToDistrict();
        }
    }
}
function askJetToFi(yesno) {
    if ((nextFi == "shark") && (shark > 0)) {

        nextFi = "sharkR";
        $$("askMessageText").innerHTML = "Would you like to visit the LOAN SHARK?";
        $$("financialInstitution").style.display = 'none';
        $$('message').style.display = 'none';
        $$('face').style.display = 'none';
        $$('ask').style.display = 'block';
    } else if (nextFi == "sharkR") {
        nextFi = "bank";
        currFi = "shark";
        if (yesno) {
            updateFiAmounts();
            maxLoan = cash * 30;
            lentOut = 0;
            $$("financialInstitutionImg").src = "img/shark.png";
            $$("fiName").innerHTML = "Loan Shark";
            $$('ask').style.display = 'none';
            $$("financialInstitution").style.display = 'block';
        } else {
            askJetToFi(false);
        }
    } else if (nextFi == "bank") {
        nextFi = "bankR";
        $$("askMessageText").innerHTML = "Would you like to visit the BANK?";
        $$("financialInstitution").style.display = 'none';
        $$('ask').style.display = 'block';
    } else if (nextFi == "bankR") {
        nextFi = "done";
        currFi = "bank";
        if (yesno) {
            updateFiAmounts();
            $$("financialInstitutionImg").src = "img/bank.png";
            $$("fiName").innerHTML = "Bank";
            $$('ask').style.display = 'none';
            $$("financialInstitution").style.display = 'block';
        } else {
            askJetToFi(false);
        }
    } else if (nextFi == "done") {
        $$('ask').style.display = 'none';
        $$("financialInstitution").style.display = 'none';
        processJetToDistrict(currentDistrict);
    }
}
function updateFiAmounts() {
    if (currFi == "shark") {
        $$("fiBalanceInd").innerHTML = "You Owe";
        $$("fiBalance").innerHTML = CurrencyFormatted(shark);
        $$("fiCash").innerHTML = CurrencyFormatted(cash);
    } else if (currFi == "bank") {
        $$("fiBalanceInd").innerHTML = "Your Balance";
        $$("fiBalance").innerHTML = CurrencyFormatted(bank);
        $$("fiCash").innerHTML = CurrencyFormatted(cash);
    }

}


function take(amount) {
    /*
var cash=2000;
var bank=0;
var shark=-5500;
*/

    if (currFi == "shark") {
        if (lentOut + parseInt(amount) <= maxLoan) {
            shark += parseInt(amount);
            cash += parseInt(amount);
            lentOut += parseInt(amount);
        }

    } else if (currFi == "bank") {
        if (bank >= parseInt(amount)) {
            bank -= parseInt(amount);
            cash += parseInt(amount);
        }
    }

    updateFiAmounts();

}

function give(amount) {
    if (currFi == "shark") {
        // If you have more cash than the shark
        if (cash >= parseInt(amount) && shark >= parseInt(amount)) {
            cash -= parseInt(amount);
            shark -= parseInt(amount);
            lentOut -= parseInt(amount);
        }
    } else if (currFi == "bank") {
        if (cash >= parseInt(amount)) {
            cash -= parseInt(amount);
            bank += parseInt(amount);
        }
    }

    updateFiAmounts();
}

function giveAll() {
    if (currFi == "shark") {
        if (cash > shark) {
            lentOut -= shark;
            cash -= shark;
            shark -= shark;
        } else // You owe more than you have.
        {
            shark -= cash;
            lentOut -= cash;
            cash -= cash;
        }
    } else if (currFi == "bank") {
        if (cash > 0) {
            bank += cash;
            cash -= cash;
        }
    }

    updateFiAmounts();
}

function takeAll() {
    if (currFi == "shark") {
        var iCalc = maxLoan - lentOut;
        shark += iCalc;
        cash += iCalc;
        lentOut += iCalc;
    } else if (currFi == "bank") {
        if (bank > 0) {
            cash += bank;
            bank -= bank;
        }
    }

    updateFiAmounts();
}




function processJetToDistrict(districtText) {
    var jet = $$("face");
    var message = $$("message");
    var district = $$("district");

    var gunText = "";
    if (gun == 0) {
        gunText = "No Gun"
    } else {
        gunText = "Gun"
    }
    $$('havegun').innerHTML = gunText;

    var dayText = "Day ";
    dayText += day;
    $$('day').innerHTML = dayText;

    displayMoney();
    displayQtys();
    displayPrices();
    displayPockets();

    $$('districtName').innerHTML = convertDistrict();

    if (day > GAMEDURATION) {
        displayGameOver();
    } else {
        displayDistrictDiv();
    }


}




/******************************************************
 *******************************************************/

function initQtys() {
    for (var i = 0; i < 8; i++) {
        drugQtys[i] = 0;
    }
}

function initPrices() {
    for (var i = 0; i < 8; i++) {
        drugPrices[i] = 0;
    }
}

function changePrices() {
    drugPrices[0] = 1000 + Math.floor(Math.random() * 3500);
    drugPrices[1] = 15000 + Math.floor(Math.random() * 15000);
    drugPrices[2] = 10 + Math.floor(Math.random() * 50);
    drugPrices[3] = 1000 + Math.floor(Math.random() * 2500);
    drugPrices[4] = 5000 + Math.floor(Math.random() * 9000);
    drugPrices[5] = 300 + Math.floor(Math.random() * 600);
    drugPrices[6] = 600 + Math.floor(Math.random() * 750);
    drugPrices[7] = 70 + Math.floor(Math.random() * 180);

    // Each drug has a 1 in 8 chance of not being available.
    for (var i = 0; i < 8; i++) {
        if (oddsCalculator(8)) {
            drugPrices[i] = 0;
        }
    }

}


function initEvents() {
    // Frequency, Message, Drug Index, Event Multiplier (e.g. Event multiplies weed price * 4), Event divider (e.g. Weed price / 4), Extra drugs

    events = [
        [13, "The cops just did a big Weed bust!  Prices are sky-high!", 5, 4, 0, 0],
        [20, "The cops just did a big PCP bust!  Prices are sky-high!", 3, 4, 0, 0],
        [25, "The cops just did a big Heroin bust!  Prices are sky-high!", 4, 4, 0, 0],
        [13, "The cops busted a local rave. Ecstacy prices are through the roof!", 2, 4, 0, 0],
        [35, "The cops just did a big Cocaine bust!  Prices are sky-high!", 1, 4, 0, 0],
        [15, "The Feds raided a major Meth lab. Speed prices are sky-high!", 7, 4, 0, 0],
        [25, "Addicts are buying Heroin at outrageous prices!", 4, 8, 0, 0],
        [20, "Tweekers are buying Speed at outrageous prices!", 7, 8, 0, 0],
        [20, "Trippers are buying PCP at outrageous prices!", 3, 8, 0, 0],
        [17, "Hippies are buying Shrooms at outrageous prices!", 6, 8, 0, 0],
        [35, "Coke-heads are buying Cocaine at outrageous prices!", 1, 8, 0, 0],
        [17, "The market has been flooded with cheap home-made Acid!", 0, 0, 8, 0],
        [10, "A Columbian freighter got past the Coast Guard!  Weed prices have bottomed out!", 5, 0, 4, 0],
        [11, "A gang raided a local pharmacy and are selling cheap Ecstacy!", 2, 0, 8, 0],
        [55, "You found some Cocaine in a dive bar bathroom!", 1, 0, 0, 3],
        [45, "You found some Acid on a dead dude in Golden Gate Park!", 0, 0, 0, 6],
        [35, "You found some PCP on a dead dude on BART!", 3, 0, 0, 4]
    ];



}


function roundPrices() {
    for (var i = 0; i < 8; i++) {
        drugPrices[i] = Math.round(drugPrices[i]);
    }
}


function displayGameOver() {
    var msg = "";
    var fc = "";

    if (dead == 0) {
        // liquidate your assess. sniker .. I said asses.
        for (var i = 0; i < 8; i++) {
            cash += drugPrices[i] * drugQtys[i];
        }

        // Make a withdrawl.
        cash += bank;
        //alert("withdraw bank " + cash);

        // Pay off the shark
        if (cash > shark) {
            cash -= shark;
            shark = 0;
        } else {
            shark -= cash;
            cash = 0;
        }
        //alert("pay off shark " + cash );

        // Do you owe the shark?
        if (shark > 0) {
            msg = "The Loan Shark's thugs broke your legs";
            fc = "You Still Owed: ";
            fc += CurrencyFormatted(shark);
        } else {
            if (cash <= 2000) {
                msg = "You didn't make any money!";
            }
            if (cash > 2000 && cash < 1000000) {
                msg = "You didn't do half bad.";
            }
            if (cash >= 1000000) {
                msg = "You retired a millionaire in the Carribbean.";
            }

            fc = "final cash: ";
            fc += CurrencyFormatted(cash);

        }
    } else {
        fc = "";
        msg = "Your dead...  <br>You got nothing."
    }



    $$('goFinalCash').innerHTML = fc;
    $$('goRank').innerHTML = msg;
    $$('face').style.display = 'none';
    $$('ask').style.display = 'none';
    $$('fuzz').style.display = 'none';
    $$('pockets').style.display = 'none';
    $$('gun').style.display = 'none';
    $$('district').style.display = 'none';
    $$('message').style.display = 'none';
    $$('gameover').style.display = 'block';
}


function displayMessageDiv() {
    $$('face').style.display = 'none';
    $$('ask').style.display = 'none';
    $$('fuzz').style.display = 'none';
    $$('pockets').style.display = 'none';
    $$('gun').style.display = 'none';
    $$('district').style.display = 'none';
    //$$('messageImg').style.opacity=.8;
    $$('message').style.display = 'block';
}


function displayFinancialInstitutionDiv() {
    $$('face').style.display = 'none';
    $$('message').style.display = 'none';
    $$('ask').style.display = 'none';
    $$('districtBackDrop').style.opacity = .75;
    $$('district').style.display = 'none';
    $$('financialInstitution').style.display = 'block';

}

function displayFaceDiv() {
    $$('ask').style.display = 'none';
    $$('fuzz').style.display = 'none';
    $$('pockets').style.display = 'none';
    $$('gun').style.display = 'none';
    $$('district').style.display = 'none';
    $$('message').style.display = 'none';
    $$('gameover').style.display = 'none';
    $$('face').style.display = 'block';
}


function displayDistrictDiv() {
    $$('face').style.display = 'none';
    $$('message').style.display = 'none';
    $$('ask').style.display = 'none';
    $$('districtBackDrop').style.opacity = .95;
    $$('district').style.display = 'block';
    turnOnFlip();
}

function CurrencyFormatted(amount) {
    // amount is an integer so 
    // turn it into a string.
    var s = "" + amount;

    // return string
    var ts = "";

    // Get ready to insert commas
    var c = 0;

    // Gotta do a backwords loop.
    for (var i = s.length; i >= 0; i--) {
        ts = s.substring(i - 1, i) + ts;
        c++;
        if (c == 3 && s.substring(i - 1, i) != "" && i > 1) {
            ts = "," + ts;
            c = 0;
        }
    }
    ts = "$" + ts;
    return ts;


    /*
        var i = parseInt(amount);
        if(isNaN(i)) { i = 0.00; }
        var minus = '';
        if(i < 0) { minus = '-'; }
        i = Math.abs(i);
        i = parseInt((i + .005) * 100);
        i = i / 100;
        s = new String(i);
        if(s.indexOf('.') < 0) { s += '.00'; }
        if(s.indexOf('.') == (s.length - 2)) { s += '0'; }
        s = minus + s;
        return s;
*/
}


function displayMoney() {
    $$('cash').innerHTML = CurrencyFormatted(cash);
    $$('bank').innerHTML = CurrencyFormatted(bank);
    $$('shark').innerHTML = CurrencyFormatted(shark);
}

function displayPockets() {
    var totalQty = countQty();
    var pocketText = "";
    pocketText += totalQty;
    pocketText += " / ";
    pocketText += pockets;
    $$('havepockets').innerHTML = pocketText;

}


function displayQtys() {
    for (var i = 1; i <= 8; i++) {
        $$("drug" + i + "Qty").innerHTML = drugQtys[i - 1];
    }
}


function displayPrices() {
    // Drug Prices
    for (var i = 1; i <= 8; i++) {
        if (drugPrices[i - 1] != 0) {
            $$("drug" + i + "Price").innerHTML = CurrencyFormatted(drugPrices[i - 1]);
        } else {
            $$("drug" + i + "Price").innerHTML = " ----";
        }
    }
}

function convertDistrict() {
    if (currentDistrict == "NewJersey") {
        return "New Jersey";
    } else if (currentDistrict == "StatenIsland") {
        return "Staten Island";
    } else {
        return currentDistrict;
    }
}

function turnOnFlip() {
    $$('flip').style.display = 'block';
    $$('fliprollie').style.display = 'block';
}


function jetTo() {
    var jet = $$("face");
    var message = $$("message");
    var district = $$("district");

    // Where is we?
    $$("problemText").innerHTML = "You are now leaving " + convertDistrict();

    // First increment the day
    day++;

    // Loan Shark Interest
    shark = Math.floor(shark * sharkInterest);

    // Bank Interest
    bank = Math.floor(bank * bankInterest);

    // Change Prices for Next District
    changePrices();

    fadeOut = 1;
    fadeObjectOut("district");

    setTimeout("displayJetDiv()", 100 * fDelay);
    fadeIn = .2
    setTimeout("fadeObjectIn('face')", 101 * fDelay);


}

function displayJetDiv() {
    $$('face').style.display = 'block';
    $$('message').style.display = 'none';
    $$('district').style.display = 'none';
}




var fadeIn = .2

    function fadeObjectIn(oid) {
        /*
   if ( fadeIn < 1 )
   {
      fadeIn+=.05;
      $$(oid).style.opacity=fadeIn;
      setTimeout("fadeObjectOut("+oid+")", 100);
   }
*/


        /*
   for ( var i = minOpacity ; i < maxOpacity ; i+=fIncre )
   {
      setTimeout("$$('"+oid+"').style.opacity="+(i/100), i*fDelay);   
   }
   //setTimeout("$$('"+oid+"').style.opacity="+maxOpacity/100, i*fDelay);   
*/
    }


var fadeOut = 0;

function fadeObjectOut(oid) {
    /*
   if ( fadeOut > .2 )
   {
      fadeOut-=.05;
      $$(oid).style.opacity=fadeOut;
      setTimeout("fadeObjectOut("+oid+")", 100);
   }
*/
    /*
   for ( var i = 1 ; i < 90 ; i+=fIncre )
   {
setTimeout("$$('"+oid+"').style.opacity="+((100-i)/100), i*fDelay);   
   }
*/
}



function countQty() {
    var totalQty = 0;
    for (var i = 0; i < 8; i++) {
        totalQty += drugQtys[i];
    }
    return totalQty;
}

function buyOneDrug(drug) {
    if (cash > drugPrices[drug - 1] && countQty() < pockets && drugPrices[drug - 1] > 0) {
        cash -= drugPrices[drug - 1];
        drugQtys[drug - 1]++;
        displayQtys();
        displayMoney();
        displayPockets();
    }
}

function buyMaxDrug(drug) {
    if (drugPrices[drug - 1] > 0) {
        var max = Math.floor(cash / drugPrices[drug - 1]);

        if (max > (pockets - countQty())) {
            max = (pockets - countQty());
        }

        if (max > 0) {
            cash -= drugPrices[drug - 1] * max;
            drugQtys[drug - 1] += max;
            displayQtys();
            displayMoney();
            displayPockets();
        }
    }
}


function sellOneDrug(drug) {
    if (drugQtys[drug - 1] > 0 && drugPrices[drug - 1] > 0) {
        drugQtys[drug - 1]--;
        cash += drugPrices[drug - 1];
        displayQtys();
        displayMoney();
        displayPockets();
    }
}


function sellMaxDrug(drug) {
    if (drugQtys[drug - 1] > 0 && drugPrices[drug - 1] > 0) {
        var profit = drugQtys[drug - 1] * drugPrices[drug - 1];
        cash += profit;
        drugQtys[drug - 1] = 0;
        displayQtys();
        displayMoney();
        displayPockets();
    }
}


function initWidget() {
    initPrices();
    initQtys();
    changePrices();
    initEvents();

    // reset vars
    cash = 2000;
    bank = 0;
    shark = 5500;
    currentDistrict = "NewJersey";
    gun = 0;
    dead = 0;
    day = 1;
    cops = 3;
    pockets = 100;
    nextFi = "";
    currFi = "";
    currentEvent = 0;
    displayFaceDiv();
}

function $$(str) { return document.getElementById(str); }
