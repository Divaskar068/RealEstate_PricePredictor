
let work = document.querySelector('.navbar');




let stars = document.getElementById('stars');
let moon = document.getElementById('moon');
let mountains_behind = document.getElementById('mountains_behind');
let text = document.getElementById('text');
let btn = document.getElementById('btn');
let mountains_front = document.getElementById('mountains_front');
let header = document.querySelector('header');

window.addEventListener('scroll',function(){
    let value = window.scrollY;
    stars.style.left = value * 0.25 + 'px';
    moon.style.top = value * 1.05 + 'px';
    mountains_behind.style.top = value * 0.5 + 'px';
    mountains_front.style.top = value * 0 + 'px';
    text.style.marginRight = value * 4 + 'px';
    text.style.marginTop = value *0.5 + 'px';
    btn.style.marginTop = value * 1.5 + 'px';
    header.style.top = value * 0.5 + 'px';
})


document.addEventListener('DOMContentLoaded', function () {
    // Get the element to scroll to
    const aboutSection = document.getElementById('about-section');

    // Get the link with the ID "scroll-to-about"
    const aboutLink = document.getElementById('scroll-to-about');

    // Add a click event listener to the about link
    aboutLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default behavior of the link

        // Calculate the distance to scroll
        const startY = window.pageYOffset; // current scroll position
        const targetY = aboutSection.getBoundingClientRect().top + window.pageYOffset; // target scroll position
        const distance = targetY - startY;

        // Define variables for smooth scrolling animation
        let start;
        const duration = 2000; // 10 seconds

        // Animation function
        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            window.scrollTo(0, easeInOutQuad(progress, startY, distance, duration));
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }

        // Easing function (quadratic in-out)
        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        // Start the animation
        window.requestAnimationFrame(step);
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const contactSection = document.getElementById('model-section');

    const contactLink = document.getElementById('scroll-to-model');

    // Add a click event listener to the about link
    contactLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default behavior of the link

        // Calculate the distance to scroll
        const startY = window.pageYOffset; // current scroll position
        const targetY = contactSection.getBoundingClientRect().top + window.pageYOffset; // target scroll position
        const distance = targetY - startY;

        // Define variables for smooth scrolling animation
        let start;
        const duration = 3500;

        // Animation function
        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            window.scrollTo(0, easeInOutQuad(progress, startY, distance, duration));
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }

        // Easing function (quadratic in-out)
        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        // Start the animation
        window.requestAnimationFrame(step);
    });
});


document.addEventListener('DOMContentLoaded', function () {
    // Get the link with the ID "scroll-to-end"
    const endsection = document.getElementById('end-section');
    const endtLink = document.getElementById('scroll-to-end');

    endtLink.addEventListener('click', function (event) {
        event.preventDefault(); 
        endsection.scrollIntoView({ behavior: 'smooth' });
    });
});

function shakeImage() {
    const img = document.querySelector('.home-img img');
    img.style.transition = 'transform 0.5s ease-in-out';
    img.style.transform = 'translateX(50px)'; // Move to the right
    setTimeout(() => {
        img.style.transform = 'translateX(-50px)'; // Move to the left
        setTimeout(() => {
            img.style.transform = 'translateX(0)'; // Back to the original position
            setTimeout(shakeImage, 500); // Adjust the duration between shakes (500ms here)
        }, 500);
    }, 500);
}

shakeImage(); // Call the function to start the shaking effect


function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for(var i in uiBathrooms) {
    if(uiBathrooms[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for(var i in uiBHK) {
    if(uiBHK[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

   var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
//  var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards

  $.post(url, {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value
  },function(data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
      console.log(status);
  });
}

function onPageLoad() {
  console.log( "document loaded" );
  var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
  // var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  $.get(url,function(data, status) {
      console.log("got response for get_location_names request");
      if(data) {
          var locations = data.locations;
          var uiLocations = document.getElementById("uiLocations");
          $('#uiLocations').empty();
          for(var i in locations) {
              var opt = new Option(locations[i]);
              $('#uiLocations').append(opt);
          }
      }
  });
}

window.onload = onPageLoad;