importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyBt5l9b7P8dRoqEFyUB1dj8pXoYRZdkoRQ",
    authDomain: "pushnotificationlistener.firebaseapp.com",
    databaseURL: "https://pushnotificationlistener.firebaseio.com",
    projectId: "pushnotificationlistener",
    storageBucket: "pushnotificationlistener.appspot.com",
    messagingSenderId: "498396682325",
    appId: "1:498396682325:web:bd96d71eed3ce277409cdc",
    measurementId: "G-RJ84F043TV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {

    const title = 'Hello World';
    const options = {

        body:payload.data.status
    };
    return self.registration.showNotification(title, options);
});