//variables
//let exist
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE= 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;


const enteredValue= prompt ('Maximun life for you and the monster.','100');

let chosenMaxLife = parseInt(enteredValue);
if (isNaN(chosenMaxLife) ||chosenMaxLife <=0 ){         //NaN koitaw an einai ari8mos i oxi
chosenMaxLife = 100;
}                   


let currentMosterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars (chosenMaxLife);

function reset () {
  currentMosterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame (chosenMaxLife);
}

function endRound () {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamge =  dealPlayerDamage ( MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamge;
  
  if (currentPlayerHealth <=0 && hasBonusLife){
    hasBonusLife = false;
    removeBonusLife ();
    setPlayerHealth (initialPlayerHealth);
    alert ('You got in bonus life be carefull');
  } 

  if (currentMosterHealth <= 0 && currentPlayerHealth > 0){
    alert ('You Won!');
  } else if (currentPlayerHealth <=0 && monsterHealthBar > 0) {
    alert('You Lost!');
  } else if (currentPlayerHealth <=0 && currentMosterHealth <= 0) {
    alert ('You Have a Draw');
  }
  if (currentMosterHealth <= 0 || currentPlayerHealth <=0) {
    reset();
  }

}

function attackMonster (mode) {
  let maxDamage;
  if (mode === 'ATTACK'){
    maxDamage = ATTACK_VALUE;
  } else if (mode === 'STRONG_ATTACK') {
    maxDamage = STRONG_ATTACK_VALUE;
  }

  const damage = dealMonsterDamage (maxDamage);
  currentMosterHealth -= damage;
  endRound();
}


function attackHandler () {
  attackMonster('ATTACK');
}

function strongAttackHandler ()  {
  attackMonster ('STRONG_ATTACK');
}

function healPlayerHander (){
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert ("You can't heal more max than initial health");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else { 
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += healValue;
  endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler );
healBtn.addEventListener('click',healPlayerHander);


