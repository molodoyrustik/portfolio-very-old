(function() {
  
	var app = {
		
		initialize : function () {			
			this.modules();
			this.setUpListeners();
		},
 
		modules: function () {
 
		},
 
		setUpListeners: function () {
			$('.contact-form').on('submit', app.submitForm);
			$('.contact-form').on('keydown', 'input, textarea', app.removeError);
		},
 
		submitForm: function (e) {
			e.preventDefault();
			

			var form = $(this);
			var submitBtn = form.find('.contact-form__btn-submit'); 

			if(app.validateForm(form) === false) return false;

			
			var str = form.serialize();   

			// против повторного нажатия
	        submitBtn.attr({disabled: 'disabled'});

            $.ajax({
                type: "POST",
                url: "contact_form/contact_process.php",
                data: str                
            }).done(function(msg) {
                if(msg == 'OK') {
                    result = '<div class="bg-success">Спасибо за ваш заказ! Мы свяжемся с вами в течение 15 минут.</div>';
                    form.html(result);
                } else {
                    form.html(msg);
                }		
            }).always(function(){
            	submitBtn.removeAttr("disabled");
            })
		},

		validateForm: function (form) {
			var inputs = form.find('input, textarea');
			var valid = true;

			
			$.each(inputs, function(index, val) {
				var input = $(val);
				var val = input.val();
				var formGroup = input.parents('.contact-from__wrapper-for-text-input');
				var label = formGroup.find('label').text().toLowerCase();
				var textError = 'Введите ' + label;
				var dataPos = input.attr('data-tooltip-pos');

				if( dataPos == 'left'){

					if(val.length === 0){
						input.css('border', '1px solid #f97e76');
						input.css('background-color', '#fad6d4');
						input.tooltipster({   
								animation: 'fade',
							   	delay: 200,
							   	trigger: 'manual',
								content: textError,
								position: 'left'
						}).tooltipster('open');
						valid = false;
					} else {
						
					}

				} else {

					if(val.length === 0){
						input.css('border', '1px solid #f97e76');
						input.css('background-color', '#fad6d4');
						input.tooltipster({   
								animation: 'fade',
							   	delay: 200,
							   	trigger: 'manual',
								content: textError,
								position: 'right'
						}).tooltipster('open');
						valid = false;
					} else {
						
					}

				}


				
			})
			return valid;
		}, 
		removeError: function(e) {
			$(e.target).css('border', '1px solid #48cbe8').css('background-color', '#fbfcfd').tooltipster('close');
		}
	}
 
	app.initialize();
 
}());