var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BLnkgazyt5LAUVMdIv89RdRBRHA7RVQ1TSAJqirgFMU6dE78vRndwFoHewpvZUd8hAOBW_Yu1FFemrZ8UFq7NmA",
    "privateKey": "dupD9KXxm6Z-kIi_2rVEHZkaeHgYno7_m95_Dk6folA"
};


webPush.setVapidDetails(
    'mailto:cseptian098@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cndjbsANSuA:APA91bHBuIAkmBDBbwX6qnno2cZvWRNM0yVGBKsSbJ4KkPhEW3kSN2OUcon3WEWq2mqlrNDFZh2OeFQIW-AihUMNPq8kEqTpUSFodoYab_J94DH_mWj2E60Avv9IWDlncxaQRlbrOSdh",
    "keys": {
        "p256dh": "BNfiMc01Zfi1f2oxkJUwnZT9qDnhJ/cQi0qMhx7LyDeFgIwTJZCZ6W01JPtKnVtqgIa8Z9q7CFnv8doizCA1vjA=",
        "auth": "jaJm9vw6akXLIb/Btof2yQ=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '41247971606',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);