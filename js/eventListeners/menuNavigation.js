// menuNavigation.js
// Version: 0.0.1
// Event: Any Event
// Description: Menu navigation event listeners
// Tags: menu, navigation, event listeners
// Subcategory: Event Listeners


export function setupMenuNavigation() {

    document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('restart-button').addEventListener('click', startGame);
    document.getElementById('nav-to-options').addEventListener('click', () => showMenu(menuOptions));
    document.getElementById('nav-to-credits').addEventListener('click', () => showMenu(menuCredits));
    document.getElementById('nav-to-level-select').addEventListener('click', () => showMenu(menuLevelSelect));
    document.getElementById('nav-to-instructions').addEventListener('click', () => showMenu(menuInstructions));
    document.getElementById('nav-to-technical-info').addEventListener('click', () => showMenu(menuTechnicalInfo));

};
