// Servidor

const express = require('express');
const server = express();
const nunjucks = require('nunjucks');
const port = 5500;

const { pageLanding, pageStudy, pageGiveClasses, saveClasses } = require('./pages');

// Configurando nunjucks (template engine)
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
});

server
// Receber os dados do req.body
.use(express.urlencoded({ extended: true }))
// Configurando arquivos estáticos (css, scripts, imagens)
.use(express.static("public"))
// Rotas da aplicação
.get('/', pageLanding)
.get('/study', pageStudy)
.get('/give-classes', pageGiveClasses)
.post('/save-classes', saveClasses)
.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));