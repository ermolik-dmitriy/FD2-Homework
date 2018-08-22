"use strict";

function LocStorage(category) {
    var self = this;
    var hash = {};
    if(localStorage.getItem(category)){
        hash = JSON.parse(localStorage.getItem(category));
    }

    self.addValue = function (key, value, category){
        hash[key] = value;
        localStorage.setItem(category, JSON.stringify(hash));
    };

    self.getValue = function (key){
        if(key in hash)
            return hash[key];
        return undefined;
    };

    self.deleteValue = function (key, category){
        if(!(key in hash)){
            return false;
        }
        delete hash[key];
        localStorage.setItem(category, JSON.stringify(hash));
        return true;
    };

    self.getKeys = function(){
        var output = [];
        for (key in hash){
            output.push(key);
        }
        return output
    };
}

var key, value, recipe, alcohol;

var drinkStorage = new LocStorage("drinks");
var eatsStorage = new LocStorage("eats");

function addDrink(){
    key = prompt("Введите название напитка");
    alcohol = prompt("Напиток алкогольный");
    recipe = prompt("Введите рецепт приготовления напитка");
    value = {
        "алкогольный напиток" : alcohol,
        "рецепт приготовления" : recipe
    };
    drinkStorage.addValue(key, value, "drinks");
}

function getDrink(){
    key = prompt("Введите название напитка");
    if (typeof drinkStorage.getValue(key) === "undefined")
        return alert("Такого напитка нет");
    console.log('напиток ' + key);
    console.log(drinkStorage.getValue(key));
}

function deleteDrink(){
    key = prompt("Введите название напитка");
    if (drinkStorage.deleteValue(key, "drinks") === false){
        alert("Такого напитка нет");
    }else{
        drinkStorage.deleteValue(key, "drinks");
        alert("Напиток удалён");
    }
}

function getKeyDrink(){
    alert(drinkStorage.getKeys());
}

function addEat(){
    key = prompt("Введите название блюда");
    alcohol = prompt("Диетическое блюдо?");
    recipe = prompt("Введите рецепт приготовления блюда");
    value = {
        "диетическое блюдо" : alcohol,
        "рецепт приготовления" : recipe
    };
    eatsStorage.addValue(key, value, "eats");
}

function getEat(){
    key = prompt("Введите название блюда");
    if (typeof eatsStorage.getValue(key) === "undefined")
        return alert("Такого блюда нет");
    console.log('блюдо ' + key);
    console.log(eatsStorage.getValue(key));

}

function deleteEat(){
    key = prompt("Введите название блюда");
    if (eatsStorage.deleteValue(key, "eats") === false){
        alert("Такого блюда нет");
    }else{
        eatsStorage.deleteValue(key, "eats");
        alert("Блюдо удалёно");
    }
}

function getKeyEat(){
    alert(eatsStorage.getKeys());
}