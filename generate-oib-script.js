var clickedElement = null;

document.addEventListener("contextmenu", event => {
  clickedElement = event.target;
}, true);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (clickedElement) { 
    // Need to manually trugger onchange event or the validations etc. wont trigger.
    clickedElement.focus();
    clickedElement.select();
    document.execCommand('insertText', false, request.oib); // Imitates manual text insert, needed to trigger Angular validations.
    clickedElement.dispatchEvent(new Event('keyup', { bubbles: true }))
    clickedElement.dispatchEvent(new Event("change", { bubbles: true }));
  }

});