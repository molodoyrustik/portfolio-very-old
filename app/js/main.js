if (document.querySelector('.add-project')) {
	document.querySelector('.add-project').addEventListener('click', function (e) {
	  e.preventDefault();
	document.querySelector('.modal-add-project').style.display = 'block';
})
document.querySelector('.modal-add-project__form-close').addEventListener('click', function(e){
	e.preventDefault();
	document.querySelector('.modal-add-project').style.display = 'none';
})
}
