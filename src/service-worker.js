console.log('Service Worker Loaded1')

self.addEventListener('push',e=>{
    const data=e.data.json();
    console.log("Push Received");
    self.registration.showNotification(data.title,{
        body: 'Notified by Web-Push',
        icon: 'https://github.com/webpack/media/blob/master/logo/logo-on-white-bg.png'
    });
});

self.addEventListener('fetch',() => console.log("fetch"));