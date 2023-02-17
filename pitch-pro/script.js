var validator = new Dominar(document.querySelector('.dominar-form-contact'), {
    user_name: {
      rules: 'required|min:3',
      triggers: ['focusout', 'change'],
      customMessages: {
        required: 'Please Enter Your Name',
        min: 'Please Enter Minimum of :min characters',
      }
    },
    user_email: {
        rules: 'required|email',
        triggers: ['focusout', 'change'],
        customMessages: {
          required: 'Please Enter Email',
          email: 'Please Enter Valid Email',
        }
    },
    user_state: {
        rules: 'required',
        triggers: ['focusout', 'change'],
        customMessages: {
          required: 'Please Select State from Dropdown',
        }
    },
    user_phone: {
        rules: 'required|digits:10',
        triggers: ['focusout', 'change'],
        customMessages: {
          required: 'Please Enter Your Mobile Number',
          digits: 'Enter Valid Mobile Number'

        }
    },
    user_service: {
        rules: 'required',
        triggers: ['focusout', 'change'],
        customMessages: {
          required: 'Please Select Service from Dropdown'
        }
    },
    user_message: {
      rules: 'required|min:10',
      triggers: ['focusout', 'change'],
      customMessages: {
        required: 'Please Enter Your Message',
        min: 'Please Enter Minimum of :min characters',
      }
    }
});

function validateUSername(){
    console.log(validator);
    // validator.getField(document.querySelector('.dominar-form-username')).validate(()=>{console.log("validated")},()=>{console.log("No Validates")});
    // validator.getField(document.querySelector('.dominar-form-username'));
    validator.validateAll(function(){
        const userForm = {
            username: idval('user_name'),
            email: idval('user_email'),
            state: idval('user_state'),
            phone: idval('user_phone'),
            service: idval('user_service'),
            message: idval('user_message')
        }
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        xmlhttp.open("POST", "https://app-yx1k.onrender.com/pitchpro");
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(userForm));
        xmlhttp.onload = () => {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById('success').value = "Form Submitted";

          } else {
            console.log(`Error: ${xmlhttp.status}`);
          }
        };
        console.log(userForm);
    }, function(){
        console.log("Good bye");
    });
    // console.log(validator.v);
}

function idval(id){
    return document.getElementById(id).value;
}

function dsdasd(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", "https://app-yx1k.onrender.com/pitchpro", true);
  xhttp.send();
}