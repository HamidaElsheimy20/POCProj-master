       // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
/*firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.requestPermission()
    .then(function () {

        console.log('Have permission.');
        return messaging.getToken();
    })
    .then(function (token) {
        console.log(token);
    })
    .catch(function (err) {
        console.log('Error ocurred.');
    });
messaging.onMessage(function (payload) {
    console.log('onMessage: ', payload);
});*/
navigator.serviceWorker
    .register("/firebase-messaging-sw.js ")

    .then((registration) => {
        firebase.initializeApp(firebaseConfig);
        const messaging = firebase.messaging();
        messaging.useServiceWorker(registration);

        try {
            messaging
                .requestPermission()
                .then(() => {
                    return messaging.getToken();
                })
                .then((token) => {
                   // let topic = `${userInfo.is_host ? "host" : "guest"}`;
                    if (token) {
                        //this.subscribeToTopic(topic, token);
                        this.sendTokenToServer({
                            os: "web",
                            push_token: token,
                        });
                    } else {
                        messaging.onTokenRefresh(() => {
                            messaging
                                .getToken()
                                .then((refreshedToken) => {
                                    //this.subscribeToTopic(topic, token);
                                    this.sendTokenToServer({
                                        os: "web",
                                        push_token: refreshedToken,
                                    });
                                })
                                .catch((err) => {
                                    console.log("Unable to retrieve refreshed token ", err);
                                });
                        });
                    }
                });
        } catch (error) {
            if (error.code === "messaging/permission-blocked") {
                console.log("Please Unblock Notification Request Manually");
            } else {
                console.log("Error Occurred", error);
            }
        }
        messaging.onMessage((payload) => {
            console.log("Notification Received", payload);
            alert(payload.notification.body);
        });
    });
function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer()) {
        console.log('Sending token to server...');
        // TODO(developer): Send the current token to your server.
        console.log(currentToken);
        setTokenSentToServer(true);
    } else {
        console.log('Token already sent to server so won\'t send it again ' +
            'unless it changes');
    }

}
function isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') === '1';
}

function setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? '1' : '0');
}

  //};
//}

 

      