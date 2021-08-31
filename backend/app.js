const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
    res.send("hello");
});

let lastColor = "#282c34";

io.on("connection", (socket) => {
    console.log("bir kullanıcı bağlandı!");

    socket.emit("receive", lastColor);

    /*
    socket.on ile kanal üretiyoruz. kanalın adı newColor. coloru alıp ekrana yazdıracaz. Frontendde newColor
    kanalına bağlanıyorlar.
    */
    socket.on("newColor", (color) => {
        console.log(color);

        lastColor = color;
        //not: aşağısı socket.broadcast.emit olsaydı rengi seçen haricindekilere yeni renk giderdi. anlamı bu.
        io.emit("receive", color);
    });

    socket.on("disconnect", () => {
        console.log("Bir kullanıcı ayrıldı.");
    });
});

http.listen(3001, () => console.log("Server is up 🚀 🚀"));