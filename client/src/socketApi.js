import io from 'socket.io-client';

let socket;

// bağlantı kurmak istediğimiz componentte init fonk kullanacağız.
export const init = () => {
    console.log("Sunucuya bağlanılıyor...");
    socket = io('http://localhost:3001', {
        transports: ["websocket"],
    })

    //connect olduğunda 
    socket.on("connect", () =>
        console.log("Sunucuya bağlantı başarıyla gerçekleşti.")
    );
};

//backennde karşılığı olan, buradaki componentlerin ulaşacağı send fonksiyonunu yaptık.
export const send = (color) => {
    //socket.emit => backenddeysek client'a, client'taysak backend'e veri iletilmesini sağlar.
    //socket.emit 2 parametre alır. p1 => hangi kanala? p2 => neyi göndereceksin?
    // newColor kanalı backendde .on('newColor', ..) olarak girili halde.
    socket.emit('newColor', color);
}

//backendde karşılığı olan, buradaki componentlerin ulaşacağı subscribe fonksiyonunu yaptık.
/*
    cb ne ? callbackFn kendisi. Callback Function.
    App.js ' de subscribeyi kullanırken didMount anında subscribe kullandım ve içine parametre olarak
    bir fonksiyon geçtim. (activeColor'u gelen color yapması için. tam olarak mantığını kavrayamadım henüz.)
*/
export const subscribe = (cb) => {
    socket.on('receive', (color) => {
        console.log(color);
        cb(color);
    });
};