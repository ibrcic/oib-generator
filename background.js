function onGenerateOibClick(info, tab) {

  // When 'Generate OIB' is clicked in context menu, generate the oib and send it
  // to content script which will in turn set it as a value to the last clicked input field.
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { oib: generateOib() });
  });

}

// Create a parent item and two children.
chrome.contextMenus.create({
  id: "generate-oib-menu-item",
  title: "Generate OIB",
  onclick: onGenerateOibClick,
  contexts: ["editable"]
});

function generateOib() {

  // First get 10 random digits.
  const oibFirstTenDigits = Array.from({ length: 10 }, () => getRandomInt());

  // Calculate control digit (last OIB digit) following ISO7064, MOD 11,10 rules.
  let carryOver = oibFirstTenDigits.reduce((acc, curr) => {
    curr += acc;
    curr = curr % 10 || 10;
    curr *= 2;
    return curr % 11;
  }, 10);

  const controlDigit = (11 - carryOver) % 10;
  return oibFirstTenDigits.join('').concat(controlDigit.toString());
}

/**
 * Gets random int from 0 ... 9
 */
function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(10));
}
