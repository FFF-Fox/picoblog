const successMsg = '<div id="successMsg" class="alert alert-success" role="alert"> The post was created successfully! </div>';

$(document).ready(function() {
  var submitBtn = $("#submitBtn");

  submitBtn.click(function() {
    var title = $("#postTitle").val();
    var body = $("#postBody").val();

    console.log(title);
    console.log(body);

    $.post("createpost",
    {
        title: title,
        body: body
    },
    function(data, status) {
        alert("Data: " + data + "\nStatus: " + status);

        if (status == "success") {
          if (data == "success") {
            submitBtn.hide();
            submitBtn.after(successMsg);
            setTimeout( () => {
              $("#successMsg").fadeOut(2000, () => {
                $(this).remove();
                submitBtn.show();
              });
            }, 1500);
          } else {
            // If the user session timed out
            window.location.replace("/login");
          }
        }
    });

  });
});
