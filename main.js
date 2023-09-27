const game_input = document.getElementById(`game_input`);
const game_field_els = document.querySelectorAll(`.game_field_el`);

function valid_num(num) {
  let digits = num.toString().split('');
  let uniqueDigits = new Set(digits);
  
  return digits.length === uniqueDigits.size;
}

function generateUniqueNumber() {
    let number = "";
    let digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      const digit = digits[randomIndex];
      number += digit;
      digits.splice(randomIndex, 1);
    }
    
    return number;
  }

  const ans = generateUniqueNumber();

  function check_guess(guess) {
    let bulls = 0, cows = 0;
    for(let i = 0; i < guess.length; i++) {
        if (guess[i] == ans[i]) {
            bulls += 1;
        } else if (ans.indexOf(guess[i]) !== -1) {
            cows += 1;
        }
    }
    return [bulls, cows];
}

game_input.addEventListener(`input`, () => {
    const game_num = game_input.value;
    // game_num = game_num.trim();
    if (game_num < 10000 && game_num > 1000 && valid_num(+game_num)) {
        let cont = check_guess(game_num);
        game_field_els.forEach((el, index) => {
            if (index < cont[0]) {
                el.innerHTML = '🐂';
            } else if (index < cont[0] + cont[1]) {
                el.innerHTML = '🐄';
            } else {
                el.innerHTML = '';
            }
        });
        if (cont[0] === 4) { // Если угадали все цифры, генерируем новое секретное число
            ans = generateUniqueNumber();
        }
    }
});

console.log(ans);