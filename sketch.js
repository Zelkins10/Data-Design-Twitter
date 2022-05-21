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
  tableYT = loadTable('youtube.csv', 'csv', 'header');
  
//     RobotoMono = loadFont('RobotoMono-VariableFont_wght.ttf');
  
//     RobotoMonoBold = loadFont('RobotoMono-Bold.ttf');
//     VT323 = loadFont('VT323-Regular.ttf');
//     
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
  print(countTwitter);
  //["12", "12", "4", etc.]

  //cycle through the table
  for (let r = 0; r < tableTwitter.getRowCount(); r++){
    for (let c = 0; c < tableTwitter.getColumnCount(); c++){
      print(tableTwitter.getString(r, c));
    }
  }
  
  // Initialisation des fonctions d'aléatoire
  randomSeed(params.random_and_noise_Seed)
  noiseSeed(params.random_and_noise_Seed)
  
}

function map(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

// -------- Drawing -------


function draw(){
  background(0, 0, 0);


  noStroke();
  fill(51, 255, 0, 50);

  // Tracé des carrés correspondant aux mots Twitter
  textFont(Montserrat);
  for (let t = 0; t < countTwitter.length; t++){
    tailleTxt = map(countTwitter[t], 1, 157, 12, width/8) // remplacer 1 et 157 par le min de count et le max de count (trouver les bonnes fonctions)
    textSize(tailleTxt); // count[t] // Math.exp(count[t])
    fill(random(0,100), random(80,220), random(200,255), 255)
    text(wordsTwitter[t], random(0, width - 200), random(60, height - 20));
}
  
  /*
    // Tracé des carrés correspondant aux mots YT
  textFont(Montserrat);
  for (let t = 0; t < countYT.length; t++){
    tailleTxt = map(countYT[t], 1, 157, 12, width/8) // remplacer 1 et 157 par le min de count et le max de count (trouver les bonnes fonctions)
    textSize(tailleTxt); // count[t] // Math.exp(count[t])
    fill(random(0,100), random(80,220), random(200,255), 255)
    text(words[t], random(0, width - 200), random(60, height - 20));
}
  */

  
  // Texte
  //textAlign(CENTER);
  //fill(51, 255, 0);
  
  //textSize(52);
  //textFont(PressStart2P);
  //textStyle(BOLD);
  //text("1073", width/2 - 400, 280);
  
  //textFont(VT323);
  //textStyle(NORMAL);
  //textSize(36);
  //text("emails hackés", width/2 - 400, 320);
  //textSize(20);
  //text("du Climate Research Unit (2009)", width/2 - 400, 350);
  
  //save("mySVG.svg"); // give file name
  //print("saved svg");
  noLoop(); // we just want to export once
}
