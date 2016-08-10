document.querySelector('.add-project').addEventListener('click', function(e){
	e.preventDefault();
	document.querySelector('.modal-add-project').style.display = 'block';
})
document.querySelector('.modal-add-project__form-close').addEventListener('click', function(e){
	e.preventDefault();
	document.querySelector('.modal-add-project').style.display = 'none';
})

$.ajax({
			type: 'POST',
			url: 'ajax.php',
			data: params,
			dataType:"json"
		})
		.done(function(){
			console.log("success");
		})
		.fail(function(){
			console.log("error");
		})
		.always(function(){
			console.log("complete");
		});