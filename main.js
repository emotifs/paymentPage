const cleaveCC = new Cleave("#cardNumber", {
  creditCard: true,
  delimiter: "-",
  onCreditCardTypeChanged: function (type) {
    const cardBrand = document.getElementById("cardBrand"),
      visa = "fab fa-cc-visa",
      mastercard = "fab fa-cc-mastercard",
      amex = "fab fa-cc-amex",
      diners = "fab fa-cc-diners-club",
      jcb = "fab fa-cc-jcb",
      discover = "fab fa-cc-discover";

    switch (type) {
      case "visa":
        cardBrand.setAttribute("class", visa);
        break;
      case "mastercard":
        cardBrand.setAttribute("class", mastercard);
        break;
      case "amex":
        cardBrand.setAttribute("class", amex);
        break;
      case "diners":
        cardBrand.setAttribute("class", diners);
        break;
      case "jcb":
        cardBrand.setAttribute("class", jcb);
        break;
      case "discover":
        cardBrand.setAttribute("class", discover);
        break;
      default:
        cardBrand.setAttribute("class", "");
        break;
    }
  },
});

const cleaveDate = new Cleave("#cardExpiry", {
  date: true,
  datePattern: ["m", "y"],
});

const cleaveCCV = new Cleave("#cardCcv", {
  blocks: [3],
});

function luhnAlgorithm(digits) {
  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    let cardNum = parseInt(digits[i]);

    if ( i % 2 === 0) {
      cardNum = cardNum * 2;

      if (cardNum > 9) {
        cardNum = cardNum - 9;
      }
    }

    sum += cardNum;
  }

  return sum % 10 === 0;
}

const form = document.getElementById('form');
const cardNumberInput = document.getElementById('cardNumber');
let error = document.querySelector('.error');

form.addEventListener('submit', (event) => {
    const cardNumber = cardNumberInput.value;
    const isCardNumberValid = luhnAlgorithm(cardNumber);
    if (!isCardNumberValid) {
      event.preventDefault();
      error.style.display = 'block';
    }
    
})