/*
	Miniport by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {
	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	$("#contactForm").validator().on("submit", function (event) {
		$("#msgSubmit").hide();
		if (event.isDefaultPrevented()) {
			// handle the invalid form...
			$("#msgSubmit").text("Did you fill in the form properly?");
			$("#msgSubmit").show().delay(5000).fadeOut();
		} else {
			// everything looks good!
			$("#msgSubmit").fadeOut();
			event.preventDefault();
			submitForm();
		}
		
	});

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('#nav a, .scrolly').scrolly({
			speed: 1000,
			offset: function() { return $nav.height(); }
		});

})(jQuery);


function submitForm(){
	$("#id_contact_spinner").show();
	$.ajax({
		type: "POST",
		url: "https://webstersolution.com/wrk-contact/",
		async: true,
		data:{
			 name: JSON.stringify($("#name").val()),
			 email: JSON.stringify($("#email").val()),
			 subject: JSON.stringify($("#subject").val()),
			 message: JSON.stringify($("#message").val()),
		},
		success : function(text){
			$("#id_contact_spinner").hide();
			if (text['code'] == 200){
				$("#msgSubmit").text(text['message']);
				$("#contactForm")[0].reset();
			} else {
				$("#msgSubmit").text(text['message']);
			}
			$("#msgSubmit").show().delay(5000).fadeOut();
		},
		error: function(text){
			$("#id_contact_spinner").hide();
		}
	});
	
}
