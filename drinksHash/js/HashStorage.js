"use strict";

function HashStorage(key, value) {
    var self = this;
    var hash = {};

    self.key = key;
    self.value = value;

    self.addValue = function (key, value){
        hash[key] = value;
    };

    self.getValue = function (key){
        if(key in hash)
            return hash[key];
        return undefined;
    };

    self.deleteValue = function (key){
        if(!(key in hash)){
            return false;
        }
        delete hash[key];
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

var drinkStorage = new HashStorage(key, value);

function addVal(){
    key = prompt("Введите название напитка");
    alcohol = prompt("Напиток алкогольный");
    recipe = prompt("Введите рецепт приготовления напитка");
    value = {
        "алкогольный напиток" : alcohol,
        "рецепт приготовления" : recipe
    };
    drinkStorage.addValue(key, value);
}

function getVal(){
    key = prompt("Введите название напитка");
    if (typeof drinkStorage.getValue(key) === "undefined")
        return alert("Такого напитка нет");
    console.log('напиток ' + key);
    console.log(drinkStorage.getValue(key));

}

function deleteVal(){
    key = prompt("Введите название напитка");
    if (drinkStorage.deleteValue(key) === false){
        alert("Такого напитка нет");
    }else{
        drinkStorage.deleteValue(key);
        alert("Напиток удалён");
    }
}

function getKey(){
    alert(drinkStorage.getKeys());
}