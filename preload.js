const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    buscarFiados: () => ipcRenderer.invoke('buscar-fiados'),
    salvarFiado: (novoFiado) => ipcRenderer.invoke('salvar-fiado', novoFiado),
    deletarFiado: (id) => ipcRenderer.invoke('deletar-fiado', id),

    buscarEstoque: () => ipcRenderer.invoke('buscar-estoque'),
    salvarEstoque: (itemEstoque) => ipcRenderer.invoke('salvar-estoque', itemEstoque),

    buscarCaixa: () => ipcRenderer.invoke('buscar-caixa'),
    salvarMovimentacao: (novaMovimentacao) => ipcRenderer.invoke('salvar-movimentacao', novaMovimentacao),

    buscarFaturamentoGeral: () => ipcRenderer.invoke('buscar-faturamento-geral'),
    buscarTotalAtendimentos: () => ipcRenderer.invoke('buscar-total-atendimentos'),

    mostrarConfirmacaoFechamento: (dados) => ipcRenderer.invoke('mostrar-confirmacao-fechamento', dados),
    mostrarConfirmacaoReset: () => ipcRenderer.invoke('mostrar-confirmacao-reset'),
    pedirSenhaAdmin: () => ipcRenderer.invoke('pedir-senha-admin'),
    limparBancoDados: (senha) => ipcRenderer.invoke('limpar-banco-dados', senha)
});