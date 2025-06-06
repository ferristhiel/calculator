let inputString = '';

function appendNumber(num) {
  // Keine zwei Punkte hintereinander
  if (num === '.' && (inputString === '' || /[^\d]$/.test(inputString) || inputString.split(/[\+\-\*\/]/).pop().includes('.'))) return;
  // Keine führenden Nullen bei neuer Zahl
  if (num === '0' && (inputString === '' || /[^\d]$/.test(inputString))) return;
  inputString += num;
  updateDisplay();
}

function setOperator(op) {
  // Kein Operator am Anfang oder zwei Operatoren hintereinander
  if (inputString === '' || /[+\-*/.]$/.test(inputString)) return;
  inputString += op;
  updateDisplay();
}

function calculate() {
  if (inputString === '') return;
  // Kein Operator am Ende
  if (/[+\-*/.]$/.test(inputString)) inputString = inputString.slice(0, -1);
  try {
    // Achtung: eval ist nicht sicher, aber für diesen Taschenrechner ausreichend
    let result = eval(inputString);
    inputString = result.toString();
    updateDisplay();
  } catch {
    inputString = '';
    document.getElementById('display').value = 'Fehler';
  }
}

function clearDisplay() {
  inputString = '';
  updateDisplay();
}

function deleteLast() {
  inputString = inputString.slice(0, -1);
  updateDisplay();
}

function updateDisplay() {
  document.getElementById('display').value = inputString;
}
