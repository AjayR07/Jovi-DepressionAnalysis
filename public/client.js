const publicVapidKey='BCDsTdRO2D_tjjuiVdAu6x5D544mfkiKr0ZAvx-VEPSoxBWxiQyVptgYj0UfZAP1SznJNIVS6wYfyUL7W4osVEI';

// Check for Service Worker
if('serviceWorker' in navigator){
    send().catch(err=>console.log(err));
}

// Register the service worker, Register Push, Send push
async function send(){
    console.log('Registering Service Worker...');
    const register=await navigator.serviceWorker.register('service-worker.js',{
        scope: '.'
    });
    console.log('Service Worker Registered');

    console.log('Registering Push....');
    const subscription= await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log("Push Registered....");

    console.log('Sending Push Notification...');
    await fetch('https://node.teama3.tech/subscribe',{
        method: 'POST',
        body: JSON.stringify(subscription),
        headers:{
            'content-type':'application/json'
        }
    });
    console.log('Push Sent');
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}