"use strict";

var formDef1 =
    [
        {label : "Название сайта: ", kind : "longtext", name : "sitename"},
        {label : "URL сайта: ", kind : "longtext", name : "siteurl"},
        {label : "Посетителей в сутки: ", kind : "number", name : "visitors"},
        {label : "E-mail для связи: ", kind : "shorttext", name : "email"},
        {label : "Рубрика каталог: ", kind : "combo", name : "division",
            variants : [{text : "здоровье", value : 1},{text : "домашний уют", value : 2}, {text : "бытовая техника", value : 3}]},
        {label : "Размещение: ", kind : "radio", name : "payment",
            variants : [{text : "бесплатное", value : 1},{text : "платное", value : 2},{text : "VIP", value : 3}]},
        {label : "Разрешить отзывы: ", kind : "check", name : "votes"},
        {label : "Описание сайта: ", kind : "memo", name : "description"},
        {label : "Опубликовать: ", kind : "submit"}
    ];

var formDef2 =
    [
        {label : "Фамилия: ", kind : "longtext", name : "lastname"},
        {label : "Имя: ", kind : "longtext", name : "firstname"},
        {label : "Отчество: ", kind : "longtext", name : "secondname"},
        {label : "Возраст: ", kind : "number", name : "age"},
        {label : "Зарегистрироваться: ", kind : "submit"}
    ];

function dunForm(formDef){
    var newStr = "";

    for (var i = 0; i < formDef.length; i++){
        if(formDef[i].kind == "longtext" || formDef[i].kind == "shorttext" || formDef[i].kind == "memo"){
            newStr += formDef[i].label + "<input type='text' name='" + formDef[i].name + "'>" + "<br/>";
        }
        if(formDef[i].kind == "number"){
            newStr += formDef[i].label + "<input type='number' name='" + formDef[i].name + "'>" + "<br/>";
        }
        if(formDef[i].kind == "submit"){
            newStr += "<input type='submit' " + "value='" + formDef[i].label + "'>" + "<br/>";
        }
        if(formDef[i].kind == "check"){
            newStr += formDef[i].label + "<input type='checkbox' name='" + formDef[i].name + "'>" + "<br/>";
        }
        if(formDef[i].kind == "combo"){
            var strCombo = "";
            for (var j = 0; j < formDef[i].variants.length; j++){
                strCombo += "<option value = '" + formDef[i].variants[j].value + "'>" + formDef[i].variants[j].text + "</option>" + "<br/>";
            }
            newStr += formDef[i].label + "<select name='" + formDef[i].name + "'>" + strCombo + "</select><br/>";
        }
        if(formDef[i].kind == "radio"){
            var strRadio= "";
            for (var k = 0; k < formDef[i].variants.length; k++){
                strRadio += "<input type = 'radio' value='" + formDef[i].variants[k].value + "'>" + formDef[i].variants[k].text;
            }
            newStr += formDef[i].label + strRadio + "<br/>";
        }
    }

    newStr = "<form name='form' action='http://fe.it-academy.by/TestForm.php' novalidate>" + newStr + "</form>";

    var elem = document.getElementById("main");
    elem.innerHTML = newStr;
}


