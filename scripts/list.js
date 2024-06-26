
//It deletes the item from the list when the user presses the button
let del = document.querySelectorAll('#delete');
del.forEach((element) => {
    element.addEventListener('click', function () {
        element.parentElement.parentElement.remove();
    })
});

//When the user press the button, the icon changes
//for the user to see if the item has been hidden or not
let b = document.querySelector('#hide');
b.addEventListener('click', function () {
    b.classList.toggle('hidden');
    let use = b.querySelector('use');
    if (document.querySelector('.hidden')) {
        use.setAttribute('xlink:href', 'img/sprite-icons.svg#show')
    } else {
        use.setAttribute('xlink:href', 'img/sprite-icons.svg#hide')
    }
})