const express = require('express');
const app = express();
app.use(express.json());
const axios = require("axios");
const clientes = {};
id = 0;

const funcoes = {
    ClienteClassificada: (cliente) => {
            clientes[cliente.id].status = cliente.status;
        axios.post('http://localhost:10000/eventos', {
            tipo: "ClienteCriado",
            dados: {
                id: cliente.id,
                nome: cliente.nome,
                endereco: cliente.endereco,
                idade: cliente.idade,
                status: cliente.status,
                quantIngressos: cliente.quantIngressos
            }
        });
    },
    ClienteComIngressos: (dados) =>{
        clientes[dados.id].quantIngressos = dados.quant;
    }
}
app.post('/eventos', (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    } catch (e) {}
    res.status(200).send({ msg: "ok" });
});

app.get('/clientes', (req, res) => {
    res.send(clientes);
});
app.post('/clientes', async(req, res) => {
    id++;
    const {
        nome,
        endereco,
        idade
    } = req.body;
    clientes[id] = {
        id,
        nome,
        endereco,
        idade,
        status: "aguardando",
        quantIngressos: 0
    };
    await axios.post("http://localhost:10000/eventos", {
        tipo: "ClienteParaClassificar",
        dados: {
            id,
            nome,
            endereco,
            idade,
            status: "aguardando",
            quantIngressos: 0
        }
    });
    res.status(201).send(clientes[id]);
});
app.put('/clientes/:id', (req, res) => {
    const idAlterar = req.params.id;
    const {
        nome,
        endereco,
        idade
    } = req.body;
    cliente = clientes[idAlterar];
    clientes[idAlterar] = {
        id: cliente.id,
        nome: nome!=null?nome : cliente.nome,
        endereco: endereco !=null? endereco: cliente.endereco,
        idade: idade != null? idade: cliente.idade,
        status: "aguardando",
        quantIngressos: cliente.quantIngressos
    }
    cliente2 = clientes[idAlterar];
    axios.post("http://localhost:10000/eventos", {
        tipo: "ClienteParaClassificar",
        dados: {
            id: cliente2.id,
            nome: cliente2.nome,
            endereco: cliente2.endereco,
            idade: cliente2.idade,
            status: "aguardando",
            quantIngressos: cliente2.quantIngressos
        }
    });
    res.status(200).json(clientes);
})
app.delete('/clientes/:id', (req, res) => {
    const idDeletar = req.params.id;
    delete clientes[idDeletar];
    axios.post("http://localhost:10000/eventos", {
        tipo: "ClienteDeletado",
        dados: idDeletar
    });
    res.status(200).json(clientes);
});
app.listen(4000, () => {
    console.log('Clientes. Porta 4000');
});