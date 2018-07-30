"use strict";

(function validForm() {
    var formTag = document.forms.form;

    var developerField = formTag.elements.developer;
    var sitenameField = formTag.elements.sitename;
    var siteurlField = formTag.elements.siteurl;
    var sitestartField = formTag.elements.sitestart;
    var visitorsField = formTag.elements.visitors;
    var emailField = formTag.elements.email;
    var divisionField = formTag.elements.division;
    var descriptionField = formTag.elements.description;
    var votesField = formTag.elements.votes;
    var locationField = formTag.elements.location;
    var radio = document.getElementById("radio");

    developerField.onblur = function () {
        validDeveloper(false)
    };
    sitenameField.onblur = function () {
        validSitename(false)
    };
    siteurlField.onblur = function () {
        validSiteurl(false)
    };
    sitestartField.onblur = function () {
        validSitestart(false)
    };
    visitorsField.onblur = function () {
        validVisitors(false)
    };
    emailField.onblur = function () {
        validEmail(false)
    };
    divisionField.onchange = function () {
        validDivision(false)
    };
    radio.onchange = function () {
        validLocation(false)
    };
    votesField.onchange = function () {
        validCheckbox(false)
    };
    descriptionField .onblur = function () {
        validDescription(false)
    };


    function validDeveloper(toFocus) {
        var ok = true;
        var errorDev = document.getElementById('errDeveloper');
        var developerValue = developerField.value;

        if (developerValue == "") {
            ok = false;
            errorDev.innerHTML = " введите имя разработчика";
            if (toFocus) {
                developerField.focus();
            }
        }else if(developerValue.length > 50){
            ok = false;
            errorDev.innerHTML = " количество символов не должно привышать 50";
            if (toFocus) {
                developerField.focus();
            }
        } else {
            errorDev.innerHTML = " ";
        }
        return ok;
    }

    function validSitename(toFocus) {
        var ok = true;
        var errorSitename = document.getElementById('errSitename');
        var sitenameValue = sitenameField.value;

        if (sitenameValue == "") {
            ok = false;
            errorSitename.innerHTML = " введите название сайта";
            if (toFocus) {
                sitenameField.focus();
            }
        }else if(sitenameValue.length > 50){
            ok = false;
            errorSitename.innerHTML = " количество символов не должно привышать 50";
            if (toFocus) {
                sitenameField.focus();
            }
        }else {
            errorSitename.innerHTML = " ";
        }
        return ok;
    }

    function validSiteurl(toFocus) {
        var ok = true;
        var errSiteurl = document.getElementById('errSiteurl');
        var siteurlValue = siteurlField.value;

        if (siteurlValue == "") {
            ok = false;
            errSiteurl.innerHTML = " введите URL сайта";
            if (toFocus) {
                siteurlField.focus();
            }
        }else if(siteurlValue.length > 50){
            ok = false;
            errSiteurl.innerHTML = " количество символов не должно привышать 50";
            if (toFocus) {
                siteurlField.focus();
            }
        } else {
            errSiteurl.innerHTML = " ";
        }
        return ok;
    }

    function validSitestart(toFocus) {
        var ok = true;
        var errSitestart = document.getElementById('errSitestart');
        var sitestartValue = sitestartField.value;

        if (sitestartValue == "") {
            ok = false;
            errSitestart.innerHTML = " введите дату запуска сайта";
            if (toFocus) {
                sitestartField.focus();
            }
        }else if(sitestartValue.length > 50){
            ok = false;
            errSitestart.innerHTML = " количество символов не должно привышать 50";
            if (toFocus) {
                sitestartField.focus();
            }
        } else {
            errSitestart.innerHTML = " ";
        }
        return ok;
    }

    function validVisitors(toFocus) {
        var ok = true;
        var errVisitors = document.getElementById('errVisitors');
        var visitorsValue = visitorsField.value;

        if (visitorsValue == "") {
            ok = false;
            errVisitors.innerHTML = " введите количество посетителей в сутки";
            if (toFocus) {
                visitorsField.focus();
            }
        }else if(visitorsValue < 0){
            ok = false;
            errVisitors.innerHTML = " посетителей не может быть меньше 0";
            if (toFocus) {
                visitorsField.focus();
            }
        } else {
            errVisitors.innerHTML = " ";
        }
        return ok;
    }

    function validEmail(toFocus) {
        var ok = true;
        var errEmail = document.getElementById('errEmail');
        var emailValue = emailField.value;

        if (emailValue == "") {
            ok = false;
            errEmail.innerHTML = " введите E-mail ";
            if (toFocus) {
                emailField.focus();
            }
        }else if(emailValue.length > 50){
            ok = false;
            errEmail.innerHTML = " количество символов не должно привышать 50";
            if (toFocus) {
                emailField.focus();
            }
        } else {
            errEmail.innerHTML = " ";
        }
        return ok;
    }

    function validDivision(toFocus) {
        var ok = true;
        var errDivision = document.getElementById('errDivision');
        var divisionValue = divisionField.value;

        if (divisionValue == 1) {
            ok = false;
            errDivision.innerHTML = " вы хорошо подумали?";
            if (toFocus) {
                divisionField.focus();
            }
        } else {
            errDivision.innerHTML = " ";
        }
        return ok;
    }

    function validLocation(toFocus) {
        var ok = true;
        var errLocation = document.getElementById('errLocation');
        var locationValue = locationField.value;

        if (locationValue == 3) {
            ok = false;
            errLocation.innerHTML = " временно не доступно";
            if (toFocus) {
                radio.focus();
            }
        }else if(locationValue == ""){
            ok = false;
            errLocation.innerHTML = " выберите размещение";
            if (toFocus) {
                radio.focus();
            }
        } else {
            errLocation.innerHTML = " ";
        }
        return ok;
    }

    function validCheckbox(toFocus) {
        var ok = true;
        var errCheckbox = document.getElementById('errCheckbox');
        var votesValue = votesField.checked;

        if (!votesValue) {
            ok = false;
            errCheckbox.innerHTML = " вы должны разрешить отзывы";
            if (toFocus) {
                votesField.focus();
            }
        } else {
            errCheckbox.innerHTML = " ";
        }
        return ok;
    }

    function validDescription(toFocus) {
        var ok = true;
        var errDescription = document.getElementById('errDescription');
        var descriptionValue = descriptionField.value;

        if (descriptionValue == "") {
            ok = false;
            errDescription.innerHTML = " опишите сайт";
            if (toFocus) {
                descriptionField.focus();
            }
        }else if(descriptionValue.length > 100 ){
            ok = false;
            errDescription.innerHTML = " количество символов не должно привышать 100";
            if (toFocus) {
                descriptionField.focus();
            }
        } else {
            errDescription.innerHTML = " ";
        }
        return ok;
    }

    var button = formTag.elements.button;

    button.onclick = function (EO) {
        var ok = true;
        validDeveloper(ok);
        validSitename(ok);
        validSiteurl(ok);
        validSitestart(ok);
        validVisitors(ok);
        validEmail(ok);
        validDivision(ok);
        validLocation(ok);
        validCheckbox(ok);
        validDescription(ok);

        ok = ok && validDeveloper(ok);
        ok = ok && validSitename(ok);
        ok = ok && validSiteurl(ok);
        ok = ok && validSitestart(ok);
        ok = ok && validVisitors(ok);
        ok = ok && validEmail(ok);
        ok = ok && validDivision(ok);
        ok = ok && validLocation(ok);
        ok = ok && validCheckbox(ok);
        ok = ok && validDescription(ok);

        if (!ok) {
            EO.preventDefault();
        }
    }
})();