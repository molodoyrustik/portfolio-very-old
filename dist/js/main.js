document.querySelector(".add-project")&&(document.querySelector(".add-project").addEventListener("click",function(t){t.preventDefault(),document.querySelector(".modal-add-project").style.display="block"}),document.querySelector(".modal-add-project__form-close").addEventListener("click",function(t){t.preventDefault(),document.querySelector(".modal-add-project").style.display="none"})),function(){var t={initialize:function(){this.modules(),this.setUpListeners()},modules:function(){},setUpListeners:function(){$(".contact-form").on("submit",t.submitForm),$(".contact-form").on("keydown","input, textarea",t.removeError)},submitForm:function(e){e.preventDefault();var o=$(this),r=o.find(".contact-form__btn-submit");if(t.validateForm(o)===!1)return!1;var n=o.serialize();r.attr({disabled:"disabled"}),$.ajax({type:"POST",url:"contact_form/contact_process.php",data:n}).done(function(t){"OK"==t?(result='<div class="bg-success">Спасибо за ваш заказ! Мы свяжемся с вами в течение 15 минут.</div>',o.html(result)):o.html(t)}).always(function(){r.removeAttr("disabled")})},validateForm:function(t){var e=t.find("input, textarea"),o=!0;return $.each(e,function(t,e){var r=$(e),e=r.val(),n=r.parents(".contact-from__wrapper-for-text-input"),a=n.find("label").text().toLowerCase(),i="Введите "+a,c=r.attr("data-tooltip-pos");"left"==c?0===e.length&&(r.css("border","1px solid #f97e76"),r.css("background-color","#fad6d4"),r.tooltipster({animation:"fade",delay:200,trigger:"manual",content:i,position:"left"}).tooltipster("open"),o=!1):0===e.length&&(r.css("border","1px solid #f97e76"),r.css("background-color","#fad6d4"),r.tooltipster({animation:"fade",delay:200,trigger:"manual",content:i,position:"right"}).tooltipster("open"),o=!1)}),o},removeError:function(t){$(t.target).css("border","1px solid #48cbe8").css("background-color","#fbfcfd").tooltipster("close")}};t.initialize()}();