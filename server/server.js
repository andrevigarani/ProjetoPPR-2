// app.js
const express = require('express');
const MongooseSingleton = require('./singleton/MongooseSingleton');
const routes = require('./routes');
const cors = require('cors');

const app = express(); 
app.use(cors());
app.use(express.json());

const MONGO_DB_URL = "mongodb+srv://MBarros02:Ma91810815!@cluster0.lbeeypd.mongodb.net/?retryWrites=true&w=majority";

(async () => {
    try {
        const mongooseInstance = MongooseSingleton.getInstance(); // Obter instância única

        // Conectar ao MongoDB usando a instância única
        await mongooseInstance.connect(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conectado ao MongoDB');

        // Rotas
        app.use('/api', routes);

        const PORT = process.env.PORT || 3333;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });

    } catch (error) {
        console.error('Erro ao iniciar o aplicativo:', error);
    }
})();
