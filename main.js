const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

let mainWindow;
let db;


function iniciarBancoDados(nomeBanco) {
    const dbPath = path.join(__dirname, 'database', nomeBanco);
    db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Erro ao conectar ao SQLite:', err.message);
        } else {
            console.log(`Conectado ao banco de dados [${nomeBanco}] com sucesso.`);
            
            
            const sqlFiados = `CREATE TABLE IF NOT EXISTS fiados (
                id INTEGER PRIMARY KEY,
                cliente TEXT NOT NULL,
                descricao TEXT NOT NULL,
                valor REAL NOT NULL,
                data TEXT NOT NULL
            )`;
            criarTabelas(sqlFiados);

            
            const sqlEstoque = `CREATE TABLE IF NOT EXISTS estoque (
                id INTEGER PRIMARY KEY,
                nome TEXT NOT NULL,
                quantidade INTEGER NOT NULL,
                minimo INTEGER NOT NULL
            )`;
            criarTabelas(sqlEstoque);

            
            const sqlCaixa = `CREATE TABLE IF NOT EXISTS caixa (
                id INTEGER PRIMARY KEY,
                tipo TEXT NOT NULL,          -- 'entrada' ou 'saida'
                metodo TEXT NOT NULL,        -- 'Dinheiro', 'Pix', 'Cartão'
                descricao TEXT NOT NULL,
                valor REAL NOT NULL,
                data TEXT NOT NULL
            )`;
            criarTabelas(sqlCaixa);
        }
    });
}


function criarTabelas(comandoSQL) {
    db.serialize(() => {
        db.run(comandoSQL, (err) => {
            if (err) console.error('Erro ao criar tabela:', err.message);
        });
    });
}


function criarJanela(caminhoVisao, caminhoPreload) {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 1024,
        minHeight: 768,
        webPreferences: {
            preload: path.resolve(__dirname, caminhoPreload), 
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    mainWindow.loadFile(path.join(__dirname, caminhoVisao));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}



ipcMain.handle('buscar-fiados', async () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM fiados ORDER BY id DESC', [], (err, rows) => {
            if (err) reject(err);
            resolve(rows); 
        });
    });
});

ipcMain.handle('salvar-fiado', async (event, novoFiado) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO fiados (id, cliente, descricao, valor, data) VALUES (?, ?, ?, ?, ?)`;
        db.run(query, [novoFiado.id, novoFiado.cliente, novoFiado.descricao, novoFiado.valor, novoFiado.data], (err) => {
            if (err) reject(err);
            resolve({ deitado: true });
        });
    });
});

ipcMain.handle('deletar-fiado', async (event, id) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM fiados WHERE id = ?', [id], (err) => {
            if (err) reject(err);
            resolve({ deletado: true });
        });
    });
});



ipcMain.handle('buscar-estoque', async () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM estoque ORDER BY nome ASC', [], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
});

ipcMain.handle('salvar-estoque', async (event, itemEstoque) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT OR REPLACE INTO estoque (id, nome, quantidade, minimo) VALUES (?, ?, ?, ?)`, 
        [itemEstoque.id, itemEstoque.nome, itemEstoque.quantidade, itemEstoque.minimo], (err) => {
            if (err) reject(err);
            resolve({ modificado: true });
        });
    });
});



ipcMain.handle('buscar-caixa', async () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM caixa ORDER BY id DESC', [], (err, rows) => {
            if (err) reject(err);
            resolve(rows); 
        });
    });
});

ipcMain.handle('salvar-movimentacao', async (event, novaMovimentacao) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO caixa (id, tipo, metodo, descricao, valor, data) VALUES (?, ?, ?, ?, ?, ?)`;
        db.run(query, [
            novaMovimentacao.id, 
            novaMovimentacao.tipo, 
            novaMovimentacao.metodo, 
            novaMovimentacao.descricao, 
            novaMovimentacao.valor, 
            novaMovimentacao.data
        ], (err) => {
            if (err) reject(err);
            resolve({ deitado: true });
        });
    });
});



app.whenReady().then(() => {
    iniciarBancoDados('manomaia.db');
    criarJanela('src/views/index.html', 'preload.js');

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            criarJanela('src/views/index.html', 'preload.js');
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        if (db) db.close();
        app.quit();
    }
});

ipcMain.handle('buscar-faturamento-geral', async () => {
    return new Promise((resolve, reject) => {
        db.get('SELECT TOTAL(valor) as total FROM caixa WHERE tipo = "entrada"', [], (err, row) => {
            if (err) reject(err);
            resolve(row ? row.total : 0);
        });
    });
});

ipcMain.handle('buscar-total-atendimentos', async () => {
    return new Promise((resolve, reject) => {
        db.get('SELECT COUNT(*) as total FROM caixa WHERE descricao LIKE "%[Atendimento]%"', [], (err, row) => {
            if (err) reject(err);
            resolve(row ? row.total : 0);
        });
    });
});
ipcMain.handle('mostrar-confirmacao-fechamento', async (event, dados) => {
    const resultado = await dialog.showMessageBox(mainWindow, {
        type: 'question',
        buttons: ['OK', 'Cancelar'],
        defaultId: 0,
        title: 'Mano Maia PD',
        message: 'Deseja encerrar o expediente?',
        detail: `Resumo do Fechamento:\n- Faturamento: R$ ${dados.faturamento}\n- Saldo Final em Caixa: R$ ${dados.saldo}`
    });
    return resultado.response === 0;
});

ipcMain.handle('mostrar-confirmacao-reset', async () => {
    const resultado = await dialog.showMessageBox(mainWindow, {
        type: 'warning',
        buttons: ['Sim, apagar tudo', 'Cancelar'],
        defaultId: 1,
        title: 'Mano Maia PD - Segurança',
        message: 'ATENÇÃO: Você tem certeza de que deseja apagar todos os dados do sistema?',
        detail: 'Esta ação limpará de forma definitiva o histórico, fiados, estoque e caixas gravados.'
    });
    return resultado.response === 0;
});

ipcMain.handle('pedir-senha-admin', async () => {
    const promptJanela = new BrowserWindow({
        width: 400,
        height: 200,
        parent: mainWindow,
        modal: true,
        title: 'Autenticação',
        autoHideMenuBar: true,
        webPreferences: { nodeIntegration: true, contextIsolation: false }
    });

    const htmlPrompt = `
        <body style="font-family:sans-serif; padding:20px; background:#ebeef0; color:#181c1e;">
            <label style="font-weight:600; display:block; margin-bottom:8px;">Insira a senha de Administrador:</label>
            <input type="password" id="senha" style="width:100%; padding:8px; margin-bottom:12px; border:1px solid #ccc; border-radius:4px;" autofocus />
            <button id="btn" style="background:#532aa8; color:#fff; border:none; padding:8px 16px; border-radius:4px; cursor:pointer; font-weight:600;">Confirmar</button>
            <script>
                const { ipcRenderer } = require('electron');
                const enviar = () => { ipcRenderer.send('resposta-senha', document.getElementById('senha').value); window.close(); };
                document.getElementById('btn').onclick = enviar;
                document.getElementById('senha').onkeydown = (e) => { if(e.key === 'Enter') enviar(); };
            </script>
        </body>
    `;

    promptJanela.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(htmlPrompt)}`);

    return new Promise((resolve) => {
        ipcMain.once('resposta-senha', (event, senha) => {
            resolve(senha);
        });
    });
});

ipcMain.handle('limpar-banco-dados', async (event, senhaDigitada) => {
    if (senhaDigitada !== 'admin123') {
        await dialog.showMessageBox(mainWindow, {
            type: 'error',
            title: 'Mano Maia PD - Erro',
            message: 'Senha incorreta! Operação cancelada.',
            detail: 'Os dados do sistema continuam protegidos.'
        });
        return { limpou: false };
    }

    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('DELETE FROM fiados');
            db.run('DELETE FROM estoque');
            db.run('DELETE FROM caixa', [], (err) => {
                if (err) reject(err);
                resolve({ limpou: true });
            });
        });
    });
});