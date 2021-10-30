$(document).ready(function(){
	$('#contact-form').jqTransform();

	$("button").click(function(){

		$(".formError").hide();

	});

	var use_ajax=true;
	$.validationEngine.settings={};

	$("#contact-form").validationEngine({
		inlineValidation: false,
		promptPosition: "centerRight",
		success :  function(){use_ajax=true},
		failure : function(){use_ajax=false;}
	 })

	$("#contact-form").submit(function(e){

			if(!$('#subject').val().length)
			{
				$.validationEngine.buildPrompt(".jqTransformSelectWrapper","* Это поле обязательное","error")
				return false;
			}
			
			if(use_ajax)
			{
				$('#loading').css('visibility','visible');
				$.post('submit.php',$(this).serialize()+'&ajax=1',
				
					function(data){
						if(parseInt(data)==-1)
							$.validationEngine.buildPrompt("#captcha","* Неправильное значение!","error");
							
						else
						{
							$("#contact-form").hide('slow').after('<h1>Спасибо!</h1>');
						}
						
						$('#loading').css('visibility','hidden');
					}
				
				);
			}
			e.preventDefault();
	})

});