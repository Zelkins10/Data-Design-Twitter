// Objectif

// Given the following CSV file called "numbers.csv"
// located in the project's root folder:
//
// words,count
//example:
//algorithm,12

let tableTwitter;
let tableYT;

//var RobotoMono;

const params = {

    random_and_noise_Seed: 1,

}


function preload(){
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  tableTwitter = loadTable('twitter.csv', 'csv', 'header');
  tableFacebook = loadTable('facebook.csv', 'csv', 'header');
  tableYT = loadTable('youtube.csv', 'csv', 'header');
  
  Montserrat = loadFont('Montserrat-Bold.ttf');

}


function setup(){
  createCanvas(960, 640); // Create SVG Canvas // , SVG
  
  //count the columns
  print(tableTwitter.getRowCount() + ' total rows in table');
  print(tableTwitter.getColumnCount() + ' total columns in table');

  wordsTwitter = tableTwitter.getColumn('words')
  countTwitter = tableTwitter.getColumn('count')
  
  wordsYT = tableYT.getColumn('words')
  countYT = tableYT.getColumn('count')

  wordsFacebook = tableFacebook.getColumn('words')
  countFacebook = tableFacebook.getColumn('count')




  print("tyoe of tableTwitter is ")
  //console.log(typeof tableTwitter);
  print(typeof tableTwitter);

  //print(countTwitter);
  //print(countFacebook);


  //["12", "12", "4", etc.]


  
  // Initialisation des fonctions d'aléatoire
  randomSeed(params.random_and_noise_Seed)
  noiseSeed(params.random_and_noise_Seed)

}

function map(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

// Get max count from each social media:
function getMaxOccurrencesFromTableCount(countRS){
    let maxCount = 0;
    for(let i=0; i<countRS.length; i++){
        if(countRS[i] > maxCount){
            maxCount = countRS[i];
        }
    }
    return maxCount
}

function getMaxOccurrencesFromTableCount_v2(countRS){
    return countRS[0]
}

// Get min count from each social media:
function getMinOccurrencesFromTableCount(countRS){
    let minCount = 1; // Attention bricolage par ici (le 1 est arbirtraire)
    for(let i=0; i<countRS.length; i++){
        if(countRS[i] < minCount){
            minCount = countRS[i];
        }
    }
    return minCount
}

function getMinOccurrencesFromTableCount_v2(countRS){
    return countRS[countRS.length - 1]
}

  // Création d'une table des mots communs aux RS
  
  
  function createCommonTable(table1, table2){

    wordsTable1 = table1.getColumn('words')
    countTable1 = table1.getColumn('count')

    wordsTable2 = table2.getColumn('words')
    countTable2 = table2.getColumn('count')

    var table3 = {
        words: [],
        count: []
      };

    for(let t1=0; t1<countTable1.length; t1++){
        for(let t2=0; t2<countTable2.length; t2++){
            if(wordsTable1[t1] == wordsTable2[t2]){
                table3.words[t1] = wordsTable1[t1];
                table3.count[t1] = (countTable1[t1] + countTable2[t2])/2;
            }
        }
    }

    return table3;
}


// -------- Drawing -------


function draw(){
  background(0, 0, 0);


  noStroke();
  fill(51, 255, 0, 50);

  let colorShift = 20;

    // Tracé du nuage correspondant aux mots Twitter
    textFont(Montserrat);
    for (let t = 0; t < countTwitter.length; t++){
        tailleTxt = map(countTwitter[t], getMinOccurrencesFromTableCount_v2(countTwitter), getMaxOccurrencesFromTableCount_v2(countTwitter), 8, width/8)
        textSize(tailleTxt); // count[t] // Math.exp(count[t])
        fill(random(56 - colorShift, 56 + colorShift), random(161 - colorShift, 161 + colorShift), random(243 - colorShift, 243 + colorShift), map(tailleTxt, 12, width/8, 255, 50))

        text(wordsTwitter[t], random(0, width - 650), random(60, height/2));
    } 
  
  
    // Tracé du nuage correspondant aux mots FB
    textFont(Montserrat);
    for (let t = 0; t < countFacebook.length; t++){
        tailleTxt = map(countFacebook[t], getMinOccurrencesFromTableCount_v2(countFacebook), getMaxOccurrencesFromTableCount_v2(countFacebook), 8, width/8)
        textSize(tailleTxt); // count[t] // Math.exp(count[t])
        fill(random(46,86), random(83,123), random(178,198), map(tailleTxt, 12, width/8, 255, 50))

        text(wordsFacebook[t], random(width/2, width), random(60, height/2));
    } 
  
    // Tracé du nuage correspondant aux mots table commune

    tableCommune = createCommonTable(tableTwitter, tableFacebook);
    wordsCommune = tableCommune.words;
    countCommune = tableCommune.count;

    print("test table commune : ");
    print(tableCommune);

    //print("test 1er mot de table commune : ");
    //print(wordsCommune.words[0]);

    //cycle through the table to print the table DEBUG
    for (let r = 0; r < countCommune.length; r++){
        for (let c = 0; c < 2; c++){ // 2 colonnes dans la table
        print(tableCommune.words[r]);
        print(tableCommune.count[r]);
        }
    }

    let tailleTexteFixe = 14;

    textFont(Montserrat);
    for (let t = 0; t < tableCommune.count.length; t++){
        tailleTxt = tailleTexteFixe
        textSize(tailleTxt); // count[t] // Math.exp(count[t])
        fill(random(189 - colorShift, 189 + colorShift), random(55 - colorShift, 55 + colorShift), random(55 - colorShift, 55 + colorShift), map(tailleTxt, 12, width/8, 255, 50))
        text(wordsCommune[t], random(width/8, 7*width/8), random(height/2 + 60, height - 46));
    } 
  
  //save("mySVG.svg"); // give file name
  //print("saved svg");
  noLoop(); // we just want to export once
}
