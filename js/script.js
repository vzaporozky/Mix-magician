"use strict";

let get = (id) => document.querySelector(id);
let werewolfMixin = {
    howl() {
        console.log('ARH-WOOOOOOOOOOOOOOOOOOOO');
    },
};

const magician = {
    _hat: "./assets/images/hat.png",
    _getPortrait() {
        if (this._portrait) return this._portrait;
        else return "./assets/images/magician.png";
    },
    "do magic"() {
        console.log(`ABRACADABRA The prototype of ${this.name} is `);
        console.log(Object.getPrototypeOf(this));
    },
};

class Creature {
    constructor(options) {
        this.name = options.name;
        this.age = options.age;
        this.species = options.species;
        this._portrait = options.portrait;
    }

    sayHello() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

class Human extends Creature {
    constructor(options) {
        super(options);
        this.job = options.job;
    }
}

class Dog extends Creature {
    constructor(options) {
        super(options);
        this.color = options.color;
    }
}

class Vampire extends Human {
    constructor(options) {
        super(options);
        this.title = options.title;
    }
}

class Werewolf extends Human {
    constructor(options) {
        super(options);
    }

    transform() {
        let head = get("#head");

        this._portrait =
            this._portrait === `./assets/images/human.png` ? `./assets/images/werewolf.png`  : `./assets/images/human.png`;
            
        head.setAttribute(`src`, `${this._portrait}`);
        if (!document.querySelector('.howl')) {
          let howlBtn = document.createElement("button");
          howlBtn.textContent = "HOWL";
          howlBtn.className = "howl";
          howlBtn.onclick = function () {werewolf.howl();};
          document.querySelector('.property').parentNode.insertBefore(howlBtn, document.querySelector('.property'));
        } else {
          document.querySelector('.howl').remove();
        }
    }
}

let human = new Human({
    name: "Linda",
    age: 22,
    species: "human",
    portrait: "./assets/images/human.png",
    job: "doctor",
});
let vampire = new Vampire({
    name: "Vlad III",
    age: 915,
    species: "vampire",
    portrait: "./assets/images/vampire.png",
    job: "unemployment",
    title: "count",
});
let dog = new Dog({
    name: "Fluffy",
    age: 3,
    species: "dog",
    portrait: "./assets/images/dog.png",
    color: "brown",
});
let werewolf = new Werewolf({
    name: "Rachel",
    age: 18,
    species: "werewolf",
    portrait: "./assets/images/human.png",
    job: "teacher",
});

Object.assign(Werewolf.prototype, werewolfMixin);

let applyProperties = (object, button) => {
    let properties = get("#properties");
    let head;

    Object.setPrototypeOf(magician, object);
    if (button) {
        get(".active").classList.remove("active");
        button.classList.add("active");
    }
    head = get("#head").setAttribute("src", `${magician._getPortrait()}`);
    properties.innerHTML =
        `<button id="do-magic" onclick="magician` +
        `['do magic']()">DO MAGIC</button>`;
    if (button && button.innerHTML != "no prototype") {
        properties.innerHTML += `<button id="say-hello"onclick="magician.sayHello()
        ">SAY HELLO</button>`;
        if (button.innerHTML === "werewolf prototype") {
            properties.innerHTML += `<button id="transform" onclick="werewolf.
            transform()">transform</button>`;
        }
    }
    for (const [key, value] of Object.entries(object)) {
        if (key.charAt(0) !== "_") {
            properties.innerHTML +=
                `<p class="property">${key}:` +
                `<span class="propValue"> ${value}</span></p>`;
        }
    }
};

let changeStatus = (button) => {
    if (button) {
        if (button.innerHTML.charAt(0) == "h") {
            applyProperties(human, button);
        } else if (button.innerHTML.charAt(0) == "v") {
            applyProperties(vampire, button);
        } else if (button.innerHTML.charAt(0) == "d") {
            applyProperties(dog, button);
        } else if (button.innerHTML.charAt(0) == "n") {
            applyProperties(Object.prototype, button);
        } else if (button.innerHTML.charAt(0) == "w") {
            applyProperties(werewolf, button);
        }
    } else {
        applyProperties(Object.prototype, button);
    }
};

changeStatus();

console.log('0xAS2f\0sfqw/')
