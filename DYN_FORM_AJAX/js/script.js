"use strict";

var urlScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
var stringName = 'ERMOLIK_DYN_FORM_AJAX';

(function readServer() {
    $.ajax( {
            url : urlScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'READ', n : stringName}, success : readReady
        }
    );
})();

function readReady(callresult) {
    var hashArray =  JSON.parse(callresult.result);

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
        elem.innerHTML += newStr;
    }

    dunForm(hashArray[1]);
    dunForm(hashArray[2]);
}





