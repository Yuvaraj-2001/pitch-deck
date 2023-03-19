
userResume = '';
async function toBase64 (file){
    return await new Promise((resolve, reject) => {
      //  resolve(btoa(file));
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
}

Dominar.Validator.register('resume', async function (value) {
    const val = await   toBase64(document.querySelector('#user_resume').files[0]).then((result)=>{
     userResume = result;
     validator.validate(document.querySelector('#user_resume'));
     return true
    }).catch((error)=>{
        userResume = '';
        validator.validate(document.querySelector('#user_resume'));
        return false
    });
    return val;
});

var validator = new Dominar(document.querySelector('.dominar-form-carrer'), {
    email_id: {
      rules: 'required|email',
      triggers: ['focusout', 'change', 'keyup'],
      customMessages: {
        required: 'Please Enter Your Email',
        email: 'Please Enter Valid email',
      }
    },
    mobile_no: {
        rules: 'required|digits:10',
        triggers: ['focusout', 'change', 'keyup'],
        customMessages: {
          required: 'Please Enter Your Mobile Number',
          digits: 'Enter Valid Mobile Number'
        }
    },
    user_location: {
        rules: 'required|min:3',
        triggers: ['focusout', 'change', 'keyup'],
        customMessages: {
          required: 'Please ENter Your Location',
          min: 'Please enter minimum of 3 characters'
        }
    },
    user_job: {
        rules: 'required|min:3',
        triggers: ['focusout', 'change', 'keyup'],
        customMessages: {
          required: 'Please Enter Your Job Desired',
          min: 'Please enter minimum of 3 characters'
        }
    },
    user_resume: {
      rules: 'required|resume',
      triggers: ['focusout', 'change', 'keyup'],
      customMessages: {
        required: 'Please Upload your Resume',
        resume: 'Your resume is uploading, Please wait',
      }
    }
});

function validateResume(){
    validator.validateAll(()=>{
        const payload = {
            email_id: document.getElementById('email_id').value,
            mobile_no: document.getElementById('mobile_no').vaue,
            user_location: document.getElementById('user_location').value,
            user_job: document.getElementById('user_job').value,
            user_resume: userResume
        }
        console.log(payload);
        document.getElementById('email_id').value = '';
        document.getElementById('mobile_no').value = '';
        document.getElementById('user_location').value = '';
        document.getElementById('user_job').value = '';
    })
}

function baseDecode(){
  var link = document.createElement('a');
  link.innerHTML = 'Download PDF file';
  link.href = userResume;
  link.download = 'someName'
  link.target = '_blank';
  document.querySelector('#dedede').appendChild(link);
}