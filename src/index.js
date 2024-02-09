import '../assets/index.css'
import './validation.js'
import Inputmask from 'inputmask';


Inputmask({ mask: '+375 (99) 999-99-99' }).mask('#phone');

const openModalButton = document.getElementById('btnModal');
const closeModalButton = document.getElementById('closeModalButton');
const modalWrapper = document.querySelector('.modal_wrapper');
const modal = document.querySelector('.modal');

openModalButton.addEventListener('click', function() {
    modalWrapper.classList.add('active');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeModalButton.addEventListener('click', function() {
    exitModal();
});
modalWrapper.addEventListener('click', function(event) {
    if (event.target === modalWrapper) {
        exitModal();
    }
});

function exitModal() {
    modalWrapper.classList.remove('active');
    modal.classList.remove('active');
    document.body.style.overflow = ''; 
}