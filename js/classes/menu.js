// menu.js
// Version: 0.0.1
// Class: Menu
// Description: The menu class
// Tags: menu, class
// Subcategory: UI

export class Menu {
    constructor(menuId) {
        this.menu = document.getElementById(menuId);
        this.initEventListeners()
    }

    show() {
        this.menu.style.display = 'flex';
        for (let i = 0; i < document.getElementsByClassName('menu').length; i++) {
            if (document.getElementsByClassName('menu')[i].id !== this.menu.id) {
                document.getElementsByClassName('menu')[i].style.display = 'none';
            }
        }
    }

    hide() {
        this.menu.style.display = 'none';
    }

    initEventListeners() {
        
    }
}