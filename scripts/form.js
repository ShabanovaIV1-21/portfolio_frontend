//It makes black the select field when a user presses on the field
let select = document.querySelectorAll(".form__item-select");
select.forEach((element) => {element.addEventListener('click', function () {
        element.style.cssText = 'color: black; font-weight: 400'
    })
});

//It makes pattern for the phone number field
document.addEventListener("DOMContentLoaded", function () {
    let eventCalllback = function (e) {
        let el = e.target,
            clearVal = el.dataset.phoneClear,
            pattern = el.dataset.phonePattern,
            matrix_def = "+7(___) ___-__-__",
            matrix = pattern ? pattern : matrix_def,
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = e.target.value.replace(/\D/g, "");
        
        if (def.length >= val.length) val = def;
        e.target.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });
    }
    
    let phone_inputs = document.querySelectorAll('[data-phone-pattern]');
    for (let elem of phone_inputs) {
        for (let ev of ['input', 'blur']) {
            elem.addEventListener(ev, eventCalllback);
        }
    }
});

//It makes pattern for the time period field
document.addEventListener("DOMContentLoaded", function () {
    let eventCalllback1 = function (e) {
        let el = e.target,
            clearVal = el.dataset.dateClear,
            pattern = el.dataset.datePattern,
            matrix_def = "__.__.____ - __.__.____",
            matrix = pattern ? pattern : matrix_def,
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = e.target.value.replace(/\D/g, "");
        if (def.length >= val.length) val = def;
        e.target.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });
    }
    
    let date_inputs = document.querySelectorAll('[data-date-pattern]');
    for (let elem of date_inputs) {
        for (let ev of ['input', 'blur']) {
            elem.addEventListener(ev, eventCalllback1);
        }
    }
});

//When user presses the button, it deletes the form of the additional section
function deleteForm() {
    let delу = document.querySelectorAll('.form__button-delete');
    delу.forEach((element) => {
        element.addEventListener('click', function () {
            element.parentElement.remove();
        })
    });
}

//It creates search function in the select field  
function datalist (element) {
    let input = element.parentElement.querySelector('.form__item-input ');
    input.value = element.value;
}

//Patterns for form fields
let patterRus = /[^\s\u0401\u0410-\u042f][^\s\u0451\u0430-\u044f]+$/;
let patternSpec = /[!@#$%^&*()+=\\/|?\[\]{}|<>\?]/g;
let patternSpecRus = /[A-Za-z!@#$%^&*()+\"\"\',.:;=\\/|?\[\]{}|<>\?]/g;
let patternSpecQu = /[!@#$%^&*()+\"\"\',.:;=\\/|?\[\]{}|<>\?]/g;
let patternQu = /[\'\"\"]/g;

//It makes the form field validation using the template
function checkQu (element) {
    str = element.value;
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) == 34 || str.charCodeAt(i) == 39 || str.charCodeAt(i) == 130 || str.charCodeAt(i) == 132 || str.charCodeAt(i) == 145 || str.charCodeAt(i) == 146 || str.charCodeAt(i) == 147 || str.charCodeAt(i) == 148) {
            replace = str.substr(i, 1);
            if (str.substr(i - 1, 1) == ' ') {
                str = str.replace(replace, '«');
            } else {
                str = str.replace(replace, '»');
            }
        }
    }
    element.value = str;
}

//It makes the form field validation using the template
function patternSpecCheckQu (element) {
    checkQu(element);
    if (patternSpec.test(element.value)) {
        createVal(element, 'Поле не должно содержать специальные символы');
    } else {
        deleteVal(element);
    }
}

//It makes the form field validation using the template
function patternCheck (element, pattern, text) {
    if (element.value) {
        if (pattern.test(element.value)) {
            createVal(element, text);
        } else {
            deleteVal(element)
        }
    } else {
        deleteVal(element)
    }
}

//It makes the form field validation using the template
function checkPass (old_pass, new_pass) {
    if (new_pass.value) {
        if (patternQu.test(new_pass.value)) {
            createVal(new_pass, 'Поле не должно содержать кавычки');
        } else {
            deleteVal(new_pass)
        }
    
        if (new_pass.value !== old_pass.value) {
            createVal(new_pass, 'Подтверждение пароля неправильно введено');
        } else {
            deleteVal(new_pass)
        }
    }
   
}

//It adds a validation message
function createVal (element, text) {
    if (!element.parentElement.querySelector('.form__item-validation')) {
        let val = document.createElement('div');
        val.classList.add('form__item-validation');
        element.parentElement.appendChild(val);
        val.textContent = text;
    }
    
}

//It deletes a validation message
function deleteVal (element) {
    let val = element.parentElement.querySelector('.form__item-validation');
    if (val) {
        val.remove();
    }
    
}


let form = document.querySelector('form');
//It prevent form submit if its fields don't meet the validation rules
form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!document.querySelector('.form__item-validation')) {
        form.submit();
    }
    
});

//It makes file's preview 
function fileLoad(element) {
    let file = element.closest('.file-block');
    if (file.querySelector('.file__preview')) {
        file.querySelector('.file__preview').remove();
    }
    let name = file.querySelector('.input__file-name');
    name.textContent = element.files[0].name;
    if (element.files[0].type.includes('image')) {
        let filePrewiev = document.createElement("div");
        filePrewiev.classList.add('file__preview');
        file.appendChild(filePrewiev);

        let previewImage = document.createElement("img");
        previewImage.classList.add('preview__image');
        filePrewiev.appendChild(previewImage);
        const photo = event.target.files[0];
            
        const reader = new FileReader();
            reader.onload = () => {
            previewImage.src = reader.result;
        };
            
        if (photo) {
            reader.readAsDataURL(photo);
        } else {
            previewImage.src = "";
        }
    };
};

