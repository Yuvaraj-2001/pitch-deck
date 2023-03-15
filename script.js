
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

// const tabsBox = document.querySelector(".tabs-box"),
// allTabs = tabsBox.querySelectorAll(".tab"),
// arrowIcons = document.querySelectorAll(".icon i");

// let isDragging = false;

// const handleIcons = (scrollVal) => {
//     let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
//     arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex";
//     arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
// }

// arrowIcons.forEach(icon => {
//     icon.addEventListener("click", () => {
      
//         // if clicked icon is left, reduce 350 from tabsBox scrollLeft else add
//         if(arrowIcons[1].parentElement.style.display === 'none'){
//           clearInterval(interVal);
//           let elements = ''; 
//           allTabs.forEach(function(e){
//             elements += e.outerHTML;
//           });
//           tabsBox.innerHTML = '';
//           tabsBox.innerHTML = elements;
//           tabsBox.scrollLeft = 0;
//           // allTabs[0].style.display = 'block';
//           // allTabs[0].style.display = 'block';
//           // allTabs.forEach(function(e){
//           //   e.style.display = 'block';
//           // });
//           // arrowIcons[1].parentElement.style.display = 'flex';
//           // arrowIcons[0].parentElement.style.display = 'none';
          
//           interValStart();
//           return;
//          }
//         let scrollWidth = tabsBox.scrollLeft += icon.id === "left-arrow" ? -1050 : 1050;
//         handleIcons(scrollWidth);
//     });
// });

// allTabs.forEach(tab => {
//     tab.addEventListener("click", () => {
//         tabsBox.querySelector(".active").classList.remove("active");
//         tab.classList.add("active");
//     });
// });


// document.addEventListener("DOMContentLoaded", () => {
//   interValStart();
// });

// function interValStart(){
//   setTimeout(()=>{
//     tabsBox.scrollLeft = 900;
//     handleIcons(800);
//     interVal = setInterval(function() {
//       document.querySelector("#right-arrow").click();
//     }, 3000);
//   }, 3000);
// }

// const dragging = (e) => {
//     if(!isDragging) return;
//     tabsBox.classList.add("dragging");
//     tabsBox.scrollLeft -= e.movementX;
//     handleIcons(tabsBox.scrollLeft)
// }

// const dragStop = () => {
//     isDragging = false;
//     tabsBox.classList.remove("dragging");
// }

// tabsBox.addEventListener("mousedown", () => isDragging = true);
// tabsBox.addEventListener("mousemove", dragging);
// document.addEventListener("mouseup", dragStop);


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

window.dataLayer = window.dataLayer || [];
function onLoadDataLayer(){
  dataLayer.push({
    'color': 'red',
    'time': +new Date(),
    'conversionValue': 50,
    'event': 'user_load'
  });
}
setTimeout(function(){
  onLoadDataLayer();
  // dataLayer('js', new Date());
  // dataLayer('config', 'G-NQZF99DXD2');
}, 1000)