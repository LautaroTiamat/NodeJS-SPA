const { createServer } = require('http');
const express = require('express');
const helmet = require('helmet');
const path = require('path');

const startServer = () => {
    const app = express();
    const httpServer = createServer(app);
    const PORT = process.env.PORT || 5000;
    
    app.use(helmet());
    
    app.use("/static", express.static(path.resolve(__dirname, 'src', 'static')));
    
    app.get("/*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'src', 'index.html'));
    });

    httpServer.listen(PORT, () => {
        console.log(`🚀 Servidor iniciado en el puerto ${PORT}`)
    });
};

startServer();