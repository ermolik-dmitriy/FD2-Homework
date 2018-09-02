"use strict";

function LocStorage() {
    var self = this;

    var urlScript="https://fe.it-academy.by/AjaxStringStorage2.php";
    var updatePassword;
    var stringName='ERMOLIK_DRINKS_HASH';
    var hash = {};

    $.ajax(
        {
            url : urlScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'READ', n : stringName },
            success : readReady
        }
    );
    function readReady(callresult) {
        hash =  JSON.parse(callresult.result);
    }

    self.addValue = function (key, value){
        hash[key] = value;

        updatePassword = Math.random();
        $.ajax( {
                url : urlScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'LOCKGET', n : stringName, p : updatePassword },
                success : lockGetReady
            }
        );

        function lockGetReady(callresult) {
                $.ajax( {
                        url : urlScript, type : 'POST', cache : false, dataType:'json',
                        data : { f : 'UPDATE', n : stringName, v : JSON.stringify(hash), p : updatePassword }
                    }
                );
        }

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

        updatePassword = Math.random();
        $.ajax( {
                url : urlScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'LOCKGET', n : stringName, p : updatePassword },
                success : lockGetReady
            }
        );

        function lockGetReady(callresult) {
            $.ajax( {
                    url : urlScript, type : 'POST', cache : false, dataType:'json',
                    data : { f : 'UPDATE', n : stringName, v : JSON.stringify(hash), p : updatePassword }
                }
            );
        }

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

var drinkStorage = new LocStorage();

function addDrink(){
    key = prompt("Введите название напитка");
    alcohol = prompt("Напиток алкогольный");
    recipe = prompt("Введите рецепт приготовления напитка");
    value = {
        "алкогольный напиток" : alcohol,
        "рецепт приготовления" : recipe
    };
    drinkStorage.addValue(key, value);
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
        drinkStorage.deleteValue(key);
        alert("Напиток удалён");
    }
}

function getKeyDrink(){
    alert(drinkStorage.getKeys());
}

