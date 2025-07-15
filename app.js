let currentInput = '';
let operator = null;
let previousInput = '';

function appendNumber(num) {
  if (num === '.' && currentInput.includes('.')) return;
  if (num === '0' && currentInput === '0') return;
  if (num !== '.' && currentInput === '0') {
    currentInput = num;
  } else {
    currentInput += num;
  }
  updateDisplay();
}

function setOperator(op) {
  if (currentInput === '' && previousInput === '') return;
  if (currentInput !== '') {
    if (previousInput !== '') {
      calculate();
    } else {
      previousInput = currentInput;
      currentInput = '';
    }
  }
  operator = op;
  updateDisplay();
}

function calculate() {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case '+': result = prev + current; break;
    case '-': result = prev - current; break;
    case '*': result = prev * current; break;
    case '/': result = current === 0 ? 'Fehler' : prev / current; break;
    default: return;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = '';
  updateDisplay();
}

function clearDisplay() {
  currentInput = '';
  previousInput = '';
  operator = null;
  updateDisplay();
}

function deleteLast() {
  if (currentInput.length > 0) {
    currentInput = currentInput.slice(0, -1);
  } else if (operator !== null) {
    operator = null;
    if (previousInput !== '') {
      currentInput = previousInput;
      previousInput = '';
    }
  } else if (previousInput.length > 0) {
    previousInput = previousInput.slice(0, -1);
  }
  updateDisplay();
}

function updateDisplay() {
  let displayValue = '';
  if (previousInput !== '' || operator !== null) {
    displayValue = previousInput;
    if (operator !== null) {
      displayValue += ' ' + operator;
    }
    if (currentInput !== '') {
      displayValue += ' ' + currentInput;
    }
  } else {
    displayValue = currentInput;
  }
  document.getElementById('display').value = displayValue.trim();
}
const modeToggle = document.getElementById('modeToggle');

modeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  if (document.body.classList.contains('light-mode')) {
    modeToggle.textContent = '☀️'; // Sonne für Light Mode
  } else {
    modeToggle.textContent = '🌙'; // Mond für Dark Mode
  }
});
