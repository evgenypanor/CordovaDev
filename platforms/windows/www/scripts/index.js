// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        //winjs initialization

        WinJS.Namespace.define("Sample", {
            mode: {
                small: {
                    name: 'small',
                    shownDisplayMode: WinJS.UI.SplitView.ShownDisplayMode.overlay,
                    hiddenDisplayMode: WinJS.UI.SplitView.HiddenDisplayMode.none,
                },
                medium: {
                    name: 'medium',
                    shownDisplayMode: WinJS.UI.SplitView.ShownDisplayMode.overlay,
                    hiddenDisplayMode: WinJS.UI.SplitView.HiddenDisplayMode.inline,
                },
                large: {
                    name: 'large',
                    shownDisplayMode: WinJS.UI.SplitView.ShownDisplayMode.inline,
                    hiddenDisplayMode: WinJS.UI.SplitView.HiddenDisplayMode.inline,
                }
            },
            splitView: null,
            togglePane: WinJS.UI.eventHandler(function (ev) {
                if (Sample.splitView) {
                    Sample.splitView.paneHidden = !Sample.splitView.paneHidden;
                }
            }),
            radioChanged: WinJS.UI.eventHandler(function (ev) {
                var mode = event.target.value;
                Sample.updateSplitView(mode);
            }),
            updateSplitView: function (size) {
                // Remove all the size classes
                Object.keys(Sample.mode).forEach(function (key) {
                    WinJS.Utilities.removeClass(Sample.host, Sample.mode[key].name);
                });

                // Update the SplitView based on the size
                Sample.splitView.shownDisplayMode = Sample.mode[size].shownDisplayMode;
                Sample.splitView.hiddenDisplayMode = Sample.mode[size].hiddenDisplayMode;

                // Add the size class
                WinJS.Utilities.addClass(Sample.host, size);
            }

        });

        WinJS.Binding.processAll(null, Sample).then(function () {
            WinJS.UI.processAll().done(function () {
                Sample.splitView = document.querySelector(".splitView").winControl;
                Sample.host = document.querySelector("#app");

                // Temporary workaround: Draw keyboard focus visuals on NavBarCommands and the SplitView buttons
                new WinJS.UI._WinKeyboard(Sample.splitView.paneElement);
                [].forEach.call(document.querySelectorAll(".win-splitview-button"), function (splitViewButton) {
                    new WinJS.UI._WinKeyboard(splitViewButton);
                });
            });
        });


    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    LoadAjaxData();

    //function loadMapScript() {
    //    var script = document.createElement("script");
    //    script.type = "text/javascript";
    //    script.id = "googleMaps";
    //    //script.src = "https://maps.googleapis.com/maps/api/js?sensor=false&callback=initializeMap&key=AIzaSyCwtk1tBc0vLvpujH7tw9lgEDPPjV2PedM";
    //    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCwtk1tBc0vLvpujH7tw9lgEDPPjV2PedM";
    //    document.body.appendChild(script);
    //};

})();

var viewModel = {};

function LoadAjaxData() {

    $.getJSON("http://tlv-spinfra.cloudapp.net/MobileFacade/AnonimousServices.svc/startscreen", { })
      .done(function (data) {
          viewModel = data.StartScreenContentResult;
              WinJS.Namespace.define("WinJSCordova.ListView", {
                  data: new WinJS.Binding.List(viewModel)
              });
              WinJS.UI.processAll();
      })
      .fail(function (jqxhr, textStatus, error) {
          var err = textStatus + ", " + error;
          console.log("Request Failed: " + err);
      });
}


function initializeMap(latitude, longitude) {
    var mapOptions = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        animation: google.maps.Animation.DROP,
    };
    var mapVar = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: mapVar,
        title: "I'm here!",
        animation: google.maps.Animation.DROP
    });
}

function Locate() {

    navigator.geolocation.getCurrentPosition(function (position) {

        initializeMap(position.coords.latitude, position.coords.longitude);

    }, function (error) {
        alert("Unable to get location: " + error.message);
    }, {
        maximumAge: 3000, timeout: 10000, enableHighAccuracy: true
    });
}
















