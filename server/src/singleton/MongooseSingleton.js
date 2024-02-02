// MongooseSingleton.js
const mongoose = require('mongoose');

class MongooseSingleton {
    constructor() {
        this.isConnected = false;
    }

    async connect(url, options) {
        if (!this.isConnected) {
            try {
                await mongoose.connect(url, options);
                this.isConnected = true;
                console.log('Conexão com o MongoDB estabelecida.');
            } catch (error) {
                console.error('Erro ao conectar com o MongoDB:', error);
                throw error;
            }
        } else {
            console.log('Conexão já estabelecida.');
        }

        return mongoose.connection;
    }

    static getInstance() {
        if (!MongooseSingleton.instance) {
            MongooseSingleton.instance = new MongooseSingleton();
        }
        return MongooseSingleton.instance;
    }
}

module.exports = MongooseSingleton;
