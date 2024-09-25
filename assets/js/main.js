/*
	Miniport by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

var csrftoken = getCookie('csrftoken');

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	$("#contactForm").validator().on("submit", function (event) {
		console.log("here");
		$("#id_submit_btn").prop("disabled",true);
		$("#msgSubmit").hide();
		if (event.isDefaultPrevented()) {
			// handle the invalid form...
			$("#msgSubmit").text("Did you fill in the form properly?");
			$("#msgSubmit").show();
			$("#id_submit_btn").prop("disabled",false);
		} else {
			// everything looks good!
			$("#msgSubmit").fadeOut();
			event.preventDefault();
			submitForm();
		}
		// $("#id_submit_btn").prop("disabled",false);
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
		headers:{
			"X-CSRFToken": csrftoken,
		},
		data:{
			 name: JSON.stringify($("#id_name").val()),
			 email: JSON.stringify($("#id_email").val()),
			 subject: JSON.stringify($("#id_subject").val()),
			 message: JSON.stringify($("#id_message").val()),
		},
		success : function(text){
			$("#id_contact_spinner").hide();
			if (text['code'] == 200){
				$("#msgSubmit").text(text['message']);
			} else {
				$("#msgSubmit").text(text['message']);
			}
			$("#msgSubmit").show();
		}
	});
}


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}