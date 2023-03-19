
let touchstartX = 0
let touchendX = 0
    
function checkDirection() {
  if (touchendX < touchstartX){
    document.querySelector('#nav-check-box').checked = false;
  }
}

document.querySelector('.navigation-panel').addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX
})

document.querySelector('.navigation-panel').addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX
  checkDirection()
})


var validator = new Dominar(document.querySelector('.dominar-form-contact'), {
    user_name: {
      rules: 'required|min:3',
      triggers: ['focusout', 'change', 'keyup'],
      customMessages: {
        required: 'Please Enter Your Name',
        min: 'Please Enter Minimum of :min characters',
      }
    },
    user_email: {
        rules: 'required|email',
        triggers: ['focusout', 'change', 'keyup'],
        customMessages: {
          required: 'Please Enter Email',
          email: 'Please Enter Valid Email',
        }
    },
    user_state: {
        rules: 'required',
        triggers: ['focusout', 'change', 'keyup'],
        customMessages: {
          required: 'Please Select State from Dropdown',
        }
    },
    user_phone: {
        rules: 'required|digits:10',
        triggers: ['focusout', 'change', 'keyup'],
        customMessages: {
          required: 'Please Enter Your Mobile Number',
          digits: 'Enter Valid Mobile Number'

        }
    },
    user_service: {
        rules: 'required',
        triggers: ['focusout', 'change', 'keyup'],
        customMessages: {
          required: 'Please Select Service from Dropdown'
        }
    },
    user_message: {
      rules: 'required|min:10',
      triggers: ['focusout', 'change', 'keyup'],
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
      document.getElementById('spin-off').style.display = 'none';
      document.getElementById('spin-on').style.display = 'inline-block';
        const userForm = {
            username: idval('user_name').value,
            email: idval('user_email').value,
            state: idval('user_state').value,
            phone: idval('user_phone').value,
            service: idval('user_service').value,
            message: idval('user_message').value
        }
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        xmlhttp.open("POST", "https://app-yx1k.onrender.com/pitchpro");
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(userForm));
        xmlhttp.onload = () => {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById('spin-off').style.display = 'block';
            document.getElementById('spin-on').style.display = 'none';
            idval('user_name').value = '';
            idval('user_email').value = '';
            idval('user_state').value = '';
            idval('user_phone').value = '';
            idval('user_service').value = '';
            idval('user_message').value = '';
            validator.destroy();
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
    return document.getElementById(id);
}

function dsdasd(){
  document.getElementById("respone").innerHTML = "<div class='text-center' style='margin: 100px'><h1 class='spinner-border text-primary' ></h1></div>"
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      const outPut = JSON.parse(this.responseText);
      let text = '';
      outPut.forEach(e => {
        text +=
        `<div class="container result-admin">
        <h4>Name: ${e.username}</h4>
        <p>Email: ${e.email}, Phone: ${e.phone}</p>
        <strong>Message: ${e.message}</strong>
        <p>Service: ${e.service}, State: ${e.state}</p>
        </div>`
      })
      document.getElementById("respone").innerHTML = text;
    }
  };
  xhttp.open("GET", "https://app-yx1k.onrender.com/pitchpro");
  // xhttp.open("GET", "//localhost:8000/pitchpro", true);
  xhttp.send();
}

// Slider Part
var slider = document.getElementById('slider'),
    sliderItems = document.getElementById('slides'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next');

function slide(wrapper, items, prev, next) {
  debugger
  var posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal,
      threshold = 100,
      slides = items.getElementsByClassName('slide'),
      slidesLength = slides.length,
      slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
      firstSlide = slides[0],
      lastSlide = slides[slidesLength - 1],
      cloneFirst = firstSlide.cloneNode(true),
      cloneLast = lastSlide.cloneNode(true),
      index = 0,
      allowShift = true;
  
  // Clone first and last slide
  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);
  wrapper.classList.add('loaded');
  
  // Mouse events
  items.onmousedown = dragStart;
  
  // Touch events
  items.addEventListener('touchstart', dragStart);
  items.addEventListener('touchend', dragEnd);
  items.addEventListener('touchmove', dragAction);
  
  // Click events
  prev.addEventListener('click', function () { shiftSlide(-1) });
  next.addEventListener('click', function () { shiftSlide(1) });
  
  // Transition events
  items.addEventListener('transitionend', checkIndex);
  
  function dragStart (e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;
    
    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction (e) {
    e = e || window.event;
    
    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = (items.offsetLeft - posX2) + "px";
  }
  
  function dragEnd (e) {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, 'drag');
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, 'drag');
    } else {
      items.style.left = (posInitial) + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }
  
  function shiftSlide(dir, action) {
    items.classList.add('shifting');
    if (allowShift) {
      if (!action) { posInitial = items.offsetLeft; }

      if (dir == 1) {
        items.style.left = (posInitial - slideSize) + "px";
        index++;      
      } else if (dir == -1) {
        items.style.left = (posInitial + slideSize) + "px";
        index--;      
      }
    };
    
    allowShift = false;
  }
    
  function checkIndex (){
    items.classList.remove('shifting');

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      index = 0;
    }
    
    allowShift = true;
  }
}

slide(slider, sliderItems, prev, next);


window.dataLayer = window.dataLayer || [];
function onLoadDataLayer(){
  dataLayer.push({
    'color': 'red',
    'time': +new Date(),
    'conversionValue': 50,
    'event': 'user_load'
  });
};
setTimeout(function(){
  onLoadDataLayer();
  // dataLayer('js', new Date());
  // dataLayer('config', 'G-NQZF99DXD2');
}, 1000)