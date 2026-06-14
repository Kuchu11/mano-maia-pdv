let faturamentoTotal = parseFloat(localStorage.getItem('mano_maia_faturamento')) || 0;
let totalAtendimentos = parseInt(localStorage.getItem('mano_maia_atendimentos')) || 0;
let porcentagemComissao = parseFloat(localStorage.getItem('mano_maia_comissao')) || 0.30;

let caixaEntradas = parseFloat(localStorage.getItem('mano_maia_caixa_entradas')) || 0;
let caixaSaidas = parseFloat(localStorage.getItem('mano_maia_caixa_saidas')) || 0;
let listaFiados = []; 
let listaEstoque = [];
let listaHistorico = [];

function atualizarDataSistema(idElemento, idFrase) {
    const elementoData = document.getElementById(idElemento);
    const elementoFrase = document.getElementById(idFrase);
    
    const dataHoje = new Date();
    
    
    if (elementoData) {
        const opcoesFormato = { weekday: 'long', day: 'numeric', month: 'long' };
        elementoData.textContent = dataHoje.toLocaleDateString('pt-BR', opcoesFormato);
    }

    
    const inspiracoesMensais = {
        1: { texto: '"Entrega o teu caminho ao Senhor; confia nele, e ele o fará."', autor: '— Salmos 37:5' },
        2: { texto: '"O que trabalha com mão enganosa empobrece, mas a mão dos diligentes enriquece."', autor: '— Provérbios 10:4' },
        3: { texto: '"Consagre ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos."', autor: '— Provérbios 16:3' },
        4: { texto: '"Sejam fortes e corajosos. Não tenham medo, pois o Senhor, o seu Deus, vai com vocês."', autor: '— Deuteronômio 31:6' },
        5: { texto: '"O Senhor é a minha força e o meu escudo; nele o meu coração confia."', autor: '— Salmos 28:7' },
        6: { texto: '"Este é o dia que o Senhor fez; regozijemo-nos e alegremo-nos nele."', autor: '— Salmos 118:24' },
        7: { texto: '"O que guarda a sua boca preserva a sua vida, mas o que abre muito os lábios se destrói."', autor: '— Provérbios 13:3' },
        8: { texto: '"O coração alegre afeiçoa o rosto, mas pela dor do coração o espírito se abate."', autor: '— Provérbios 15:13' },
        9: { texto: '"Grandes coisas fez o Senhor por nós, por isso estamos alegres."', autor: '— Salmos 126:3' },
        10: { texto: '"Aquietai-vos e sabei que eu sou Deus; serei exaltado entre as nações."', autor: '— Salmos 46:10' },
        11: { texto: '"O plano bem delineado do diligente redunda em abundância e fartura."', autor: '— Provérbios 21:5' },
        12: { texto: '"Tudo o que fizerem, façam de todo o coração, como para o Senhor."', autor: '— Colossenses 3:23' }, 
        13: { texto: '"Porque para Deus nada é impossível."', autor: '— Lucas 1:37' },
        14: { texto: '"Abençoado é o homem que confia no Senhor, cuja confiança nele está depositada."', autor: '— Jeremias 17:7' },
        15: { texto: '"O Senhor te abençoe e te guarde; o Senhor faça resplandecer o seu rosto sobre ti."', autor: '— Números 6:24-25' },
        16: { texto: '"Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo."', autor: '— Salmos 23:4' },
        17: { texto: '"Provai e vede que o Senhor é bom; bem-aventurado o homem que nele se refugia."', autor: '— Salmos 34:8' },
        18: { texto: '"A paciência vale mais que a força; mais vale controlar o espírito do que conquistar uma cidade."', autor: '— Provérbios 16:32' },
        19: { texto: '"Guarda o teu coração com toda a diligência, porque dele procedem as fontes da vida."', autor: '— Provérbios 4:23' },
        20: { texto: '"O temor do Senhor é o princípio da sabedoria, e o conhecimento do Santo é prudência."', autor: '— Provérbios 9:10' },
        21: { texto: '"Até aqui nos ajudou o Senhor."', autor: '— 1 Samuel 7:12' },
        22: { texto: '"Lâmpada para os meus pés é tua palavra e luz, para o meu caminho."', autor: '— Salmos 119:105' },
        23: { texto: '"O Senhor dará força ao seu povo; o Senhor abençoará o seu povo com paz."', autor: '— Salmos 29:11' },
        24: { texto: '"Os que confiam no Senhor serão como o monte Sião, que não se abala, mas permanece para sempre."', autor: '— Salmos 125:1' },
        25: { texto: '"Deem graças ao Senhor, porque ele é bom; o seu amor dura para sempre."', autor: '— Salmos 107:1' },
        26: { texto: '"Recomendamos que procurem viver em paz, cuidar dos seus próprios assuntos e trabalhar com as próprias mãos."', autor: '— 1 Tessalonicenses 4:11' },
        27: { texto: '"A resposta calma desvia a fúria, mas a palavra ríspida desperta a ira."', autor: '— Provérbios 15:1' },
        28: { texto: '"Os passos de um homem bom são confirmados pelo Senhor, e ele deleita-se no seu caminho."', autor: '— Salmos 37:23' },
        29: { texto: '"Clama a mim, e responder-te-ei, e anunciar-te-ei coisas grandes e firmes que não sabes."', autor: '— Jeremias 33:3' },
        30: { texto: '"O próprio Senhor irá adiante de você e estará com você; ele nunca o deixará, nunca o abandonará."', autor: '— Deuteronômio 31:8' },
        31: { texto: '"Seja forte e corajoso! Não se apavore nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar."', autor: '— Josué 1:9' }
    };

    
    const diaDoMes = dataHoje.getDate();
    const fraseDoDia = inspiracoesMensais[diaDoMes];

    
    if (elementoFrase && fraseDoDia) {
        elementoFrase.innerHTML = `
            ${fraseDoDia.texto}
            <span style="display: block; margin-top: 12px; font-size: 14px; opacity: 0.9; font-weight: 600; font-style: normal; letter-spacing: 0.02em;">
                ${fraseDoDia.autor}
            </span>
        `;
    }
}

function atualizarInterfaceDashboard(idFaturamento, idLucro, idContador) {
    const exibicaoFaturamento = document.getElementById(idFaturamento);
    const elementoLucro = document.getElementById(idLucro);
    const exibicaoContador = document.getElementById(idContador);
    const lucroCalculado = faturamentoTotal * porcentagemComissao;

    if (exibicaoFaturamento) exibicaoFaturamento.textContent = `R$ ${faturamentoTotal.toFixed(2).replace('.', ',')}`;
    if (elementoLucro) elementoLucro.textContent = `R$ ${lucroCalculado.toFixed(2).replace('.', ',')}`;
    if (exibicaoContador) exibicaoContador.textContent = totalAtendimentos;
}

function configurarFormularioAtendimento(idBtn, idInput, idFaturamento, idLucro, idContador) {
    const btnRegistrar = document.getElementById(idBtn);
    const inputValor = document.getElementById(idInput);

    if (btnRegistrar && inputValor) {
        const executarRegistro = () => {
            const valorVenda = parseFloat(inputValor.value);
            if (isNaN(valorVenda) || valorVenda <= 0) {
                alert('Por favor, insira um valor válido para o atendimento!');
                return;
            }

            faturamentoTotal += valorVenda;
            totalAtendimentos += 1;

            localStorage.setItem('mano_maia_faturamento', faturamentoTotal);
            localStorage.setItem('mano_maia_atendimentos', totalAtendimentos);

            atualizarInterfaceDashboard(idFaturamento, idLucro, idContador);
            inputValor.value = '';
        };

        btnRegistrar.addEventListener('click', executarRegistro);

        inputValor.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                executarRegistro();
            }
        });
    }
}

function configurarLembretesRapidos(idTextarea, chaveStorage) {
    const textarea = document.getElementById(idTextarea);
    if (textarea) {
        const lembreteSalvo = localStorage.getItem(chaveStorage);
        if (lembreteSalvo) textarea.value = lembreteSalvo;

        const salvarLembrete = () => { localStorage.setItem(chaveStorage, textarea.value); };
        textarea.addEventListener('input', salvarLembrete);
        textarea.addEventListener('keydown', (e) => { if (e.key === 'Enter') salvarLembrete(); });
        textarea.addEventListener('blur', salvarLembrete);
    }
}

function configurarNavegacaoAbas(seletorLinks, seletorConteudos) {
    const links = document.querySelectorAll(seletorLinks);
    const conteudos = document.querySelectorAll(seletorConteudos);

    links.forEach(link => {
        link.addEventListener('click', (evento) => {
            const idAlvo = link.getAttribute('href');
            if (!idAlvo || !idAlvo.startsWith('#') || idAlvo === '#') return;
            evento.preventDefault();

            links.forEach(l => l.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');

            conteudos.forEach(secao => secao.classList.remove('active'));
            const secaoAlvo = document.querySelector(idAlvo);
            if (secaoAlvo) secaoAlvo.classList.add('active');
        });
    });
}

function atualizarInterfaceCaixa(idEntradas, idSaidas, idSaldo) {
    const elementoEntradas = document.getElementById(idEntradas);
    const elementoSaidas = document.getElementById(idSaidas);
    const elementoSaldo = document.getElementById(idSaldo);
    const saldoCalculado = caixaEntradas - caixaSaidas;

    if (elementoEntradas) elementoEntradas.textContent = `R$ ${caixaEntradas.toFixed(2).replace('.', ',')}`;
    if (elementoSaidas) elementoSaidas.textContent = `R$ ${caixaSaidas.toFixed(2).replace('.', ',')}`;
    if (elementoSaldo) elementoSaldo.textContent = `R$ ${saldoCalculado.toFixed(2).replace('.', ',')}`;
}

function configurarFormularioCaixa(idBtn, idTipo, idMetodo, idDesc, idValor, idEntradas, idSaidas, idSaldo) {
    const btnLancar = document.getElementById(idBtn);
    const selectTipo = document.getElementById(idTipo);
    const selectMetodo = document.getElementById(idMetodo);
    const inputDesc = document.getElementById(idDesc);
    const inputValor = document.getElementById(idValor);

    if (btnLancar && inputValor) {
        const executarLancamento = () => {
            const tipo = selectTipo.value;
            const metodo = selectMetodo ? selectMetodo.value : 'dinheiro';
            const descricaoOriginal = inputDesc.value.trim();
            const valor = parseFloat(inputValor.value);

            if (!descricaoOriginal) {
                alert('Por favor, insira uma descrição para a movimentação!');
                return;
            }
            if (isNaN(valor) || valor <= 0) {
                alert('Por favor, insira um valor válido!');
                return;
            }

            const metodosFormatados = { dinheiro: 'Dinheiro', pix: 'PIX', debito: 'Débito', credito: 'Crédito' };
            const tagMetodo = metodosFormatados[metodo] || 'Dinheiro';
            const descricaoComMetodo = `[${tagMetodo}] ${descricaoOriginal}`;

            if (tipo === 'entrada') {
                caixaEntradas += valor;
                localStorage.setItem('mano_maia_caixa_entradas', caixaEntradas);
            } else if (tipo === 'saida') {
                caixaSaidas += valor;
                localStorage.setItem('mano_maia_caixa_saidas', caixaSaidas);
            }

            atualizarInterfaceCaixa(idEntradas, idSaidas, idSaldo);
            inputDesc.value = '';
            inputValor.value = '';
        };

        btnLancar.addEventListener('click', executarLancamento);

        inputValor.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                executarLancamento();
            }
        });
    }
}

function configurarFechamentoCaixa(idBtn, idFaturamento, idLucro, idContador, idEntradas, idSaidas, idSaldo, idFaturamentoMes, idMediaAtendimentos, idTotalSangrias) {
    const btnFechar = document.getElementById(idBtn);

    if (btnFechar) {
        btnFechar.addEventListener('click', async () => {
            const saldoCalculado = caixaEntradas - caixaSaidas;
            
            const dadosResumo = {
                faturamento: faturamentoTotal.toFixed(2),
                saldo: saldoCalculado.toFixed(2)
            };

            const confirmacao = await window.api.mostrarConfirmacaoFechamento(dadosResumo);
            if (!confirmacao) return;

            salvarDiaNoHistorico();

            faturamentoTotal = 0;
            totalAtendimentos = 0;
            caixaEntradas = 0;
            caixaSaidas = 0;

            localStorage.setItem('mano_maia_faturamento', faturamentoTotal);
            localStorage.setItem('mano_maia_atendimentos', totalAtendimentos);
            localStorage.setItem('mano_maia_caixa_entradas', caixaEntradas);
            localStorage.setItem('mano_maia_caixa_saidas', caixaSaidas);

            atualizarInterfaceDashboard(idFaturamento, idLucro, idContador);
            atualizarInterfaceCaixa(idEntradas, idSaidas, idSaldo);
            atualizarInterfaceRelatorios(idFaturamentoMes, idMediaAtendimentos, idTotalSangrias);
            renderizarListaHistorico('container-lista-historico');

            alert('Caixa fechado com sucesso!');
        });
    }
}

function renderizarListaFiados(idContainer, idTotalDevido, idQtdDevedores) {
    const container = document.getElementById(idContainer);
    if (!container) return;

    if (listaFiados.length === 0) {
        container.innerHTML = `<p style="color: var(--on-surface-variant); font-size: 14px;">Nenhuma pendência pendente no momento.</p>`;
        return;
    }

    let html = '<div style="display: flex; flex-direction: column; gap: 12px; max-height: 320px; overflow-y: auto; padding-right: 4px;">';
    
    listaFiados.forEach(item => {
        html += `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: var(--background); border: 1px solid var(--outline-variant); border-radius: 0.5rem;">
                <div>
                    <strong style="display: block; color: var(--on-surface); font-size: 14px;">${item.cliente}</strong>
                    <span style="color: var(--on-surface-variant); font-size: 12px;">${item.descricao} — ${item.data}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <strong style="color: var(--error); font-size: 15px;">R$ ${item.valor.toFixed(2).replace('.', ',')}</strong>
                    <button onclick="removerFiado(${item.id}, '${idContainer}', '${idTotalDevido}', '${idQtdDevedores}')" style="background: none; border: none; color: var(--on-surface-variant); cursor: pointer; display: flex; align-items: center;"><i data-lucide="check-circle" style="width: 18px; height: 18px; color: var(--success-bg);"></i></button>
                </div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

async function removerFiado(id, idContainer, idTotalDevido, idQtdDevedores) {
    try {
        
        await window.api.deletarFiado(id);
        
        
        listaFiados = listaFiados.filter(item => item.id !== id);
        
        atualizarInterfaceFiados(idTotalDevido, idQtdDevedores);
        renderizarListaFiados(idContainer, idTotalDevido, idQtdDevedores);
    } catch (erro) {
        alert('Erro ao dar baixa no fiado: ' + erro.message);
    }
}

function atualizarInterfaceFiados(idTotalDevido, idQtdDevedores) {
    const elementoTotal = document.getElementById(idTotalDevido);
    const elementoQtd = document.getElementById(idQtdDevedores);

    const totalDevidoCalculado = listaFiados.reduce((soma, item) => soma + item.valor, 0);
    const devedoresUnicos = new Set(listaFiados.map(item => item.cliente.toLowerCase())).size;

    if (elementoTotal) elementoTotal.textContent = `R$ ${totalDevidoCalculado.toFixed(2).replace('.', ',')}`;
    if (elementoQtd) elementoQtd.textContent = devedoresUnicos;
}

function configurFormularioFiados(idBtn, idNome, idDesc, idValor, idContainer, idTotalDevido, idQtdDevedores) {
    const btnRegistrar = document.getElementById(idBtn);
    const inputNome = document.getElementById(idNome);
    const inputDesc = document.getElementById(idDesc);
    const inputValor = document.getElementById(idValor);

    if (btnRegistrar && inputValor) {
        const executarFiado = async () => {
            const nome = inputNome.value.trim();
            const descricao = inputDesc.value.trim();
            const valor = parseFloat(inputValor.value);

            if (!nome || !descricao) {
                alert('Por favor, preencha o nome do cliente e a descrição do débito!');
                return;
            }
            if (isNaN(valor) || valor <= 0) {
                alert('Por favor, insira um valor válido para o fiado!');
                return;
            }

            const novoFiado = {
                id: Date.now(),
                cliente: nome,
                descricao: descricao,
                valor: valor,
                data: new Date().toLocaleDateString('pt-BR')
            };

            try {
                
                await window.api.salvarFiado(novoFiado);
                
                listaFiados.push(novoFiado);

                atualizarInterfaceFiados(idTotalDevido, idQtdDevedores);
                renderizarListaFiados(idContainer, idTotalDevido, idQtdDevedores);
                
                inputNome.value = '';
                inputDesc.value = '';
                inputValor.value = '';
            } catch (erro) {
                alert('Erro ao salvar no banco SQLite: ' + erro.message);
            }
        };

        btnRegistrar.addEventListener('click', executarFiado);

        inputValor.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                executarFiado();
            }
        });
    }
}

function renderizarListaEstoque(idContainer, idTotalItens, idQtdBaixo, idStatusGeral) {
    const container = document.getElementById(idContainer);
    if (!container) return;

    if (listaEstoque.length === 0) {
        container.innerHTML = `<p style="color: var(--on-surface-variant); font-size: 14px;">Nenhum item cadastrado no estoque.</p>`;
        return;
    }

    let html = '<div style="display: flex; flex-direction: column; gap: 12px; max-height: 320px; overflow-y: auto; padding-right: 4px;">';
    
    listaEstoque.forEach(item => {
        const estaBaixo = item.quantidade <= item.minimo;
        const corQuantidade = estaBaixo ? 'var(--error)' : 'var(--on-surface)';
        const badgeAlerta = estaBaixo ? `<span style="background: #ffdad6; color: var(--error); font-size: 11px; padding: 2px 6px; border-radius: 4px; font-weight: 600; margin-left: 8px;">Baixo</span>` : '';

        html += `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: var(--background); border: 1px solid var(--outline-variant); border-radius: 0.5rem;">
                <div>
                    <strong style="color: var(--on-surface); font-size: 14px;">${item.nome}</strong> ${badgeAlerta}
                    <span style="display: block; color: var(--on-surface-variant); font-size: 12px;">Estoque Mínimo configurado: ${item.minimo} unidades</span>
                </div>
                <div style="display: flex; align-items: center; gap: 16px;">
                    <strong style="color: ${corQuantidade}; font-size: 16px;">${item.quantidade} un</strong>
                    <button onclick="removerItemEstoque(${item.id}, '${idContainer}', '${idTotalItens}', '${idQtdBaixo}', '${idStatusGeral}')" style="background: none; border: none; color: var(--error); cursor: pointer; display: flex; align-items: center;"><i data-lucide="trash-2" style="width: 16px; height: 16px;"></i></button>
                </div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function removerItemEstoque(id, idContainer, idTotalItens, idQtdBaixo, idStatusGeral) {
    listaEstoque = listaEstoque.filter(item => item.id !== id);
    localStorage.setItem('mano_maia_estoque', JSON.stringify(listaEstoque));
    atualizarInterfaceEstoque(idTotalItens, idQtdBaixo, idStatusGeral);
    renderizarListaEstoque(idContainer, idTotalItens, idQtdBaixo, idStatusGeral);
}

function atualizarInterfaceEstoque(idTotalItens, idQtdBaixo, idStatusGeral) {
    const elementoTotal = document.getElementById(idTotalItens);
    const elementoBaixo = document.getElementById(idQtdBaixo);
    const elementoStatus = document.getElementById(idStatusGeral);

    const totalItens = listaEstoque.length;
    const itensBaixos = listaEstoque.filter(item => item.quantidade <= item.minimo).length;

    if (elementoTotal) elementoTotal.textContent = totalItens;
    if (elementoBaixo) elementoBaixo.textContent = itensBaixos;
    
    if (elementoStatus) {
        if (itensBaixos > 0) {
            elementoStatus.textContent = 'Atenção';
            elementoStatus.parentElement.parentElement.style.borderLeft = '4px solid var(--error)';
        } else {
            elementoStatus.textContent = 'Regular';
            elementoStatus.parentElement.parentElement.style.borderLeft = 'none';
        }
    }
}


function configuringFormularioEstoque(idBtn, idNome, idQtd, idMinimo, idContainer, idTotalItens, idQtdBaixo, idStatusGeral) {
    const btnSalvar = document.getElementById(idBtn);
    const inputNome = document.getElementById(idNome);
    const inputQtd = document.getElementById(idQtd);
    const inputMinimo = document.getElementById(idMinimo);

    if (btnSalvar && inputQtd) {
        
        const ejecutarEstoque = async () => {
            const nome = inputNome.value.trim();
            const quantidade = parseInt(inputQtd.value);
            const minimo = parseInt(inputMinimo.value);

            if (!nome) {
                alert('Por favor, insira o nome do produto ou insumo!');
                return;
            }
            if (isNaN(quantidade) || quantidade < 0 || isNaN(minimo) || minimo < 0) {
                alert('Por favor, insira valores válidos e maiores ou iguais a zero!');
                return;
            }

            const indiceExistente = listaEstoque.findIndex(item => item.nome.toLowerCase() === nome.toLowerCase());
            
            
            let itemParaSalvar = {
                id: indiceExistente !== -1 ? listaEstoque[indiceExistente].id : Date.now(),
                nome: nome,
                quantidade: quantidade,
                minimo: minimo
            };

            try {
                
                await window.api.salvarEstoque(itemParaSalvar);

                
                if (indiceExistente !== -1) {
                    listaEstoque[indiceExistente].quantidade = quantidade;
                    listaEstoque[indiceExistente].minimo = minimo;
                } else {
                    listaEstoque.push(itemParaSalvar);
                }

                
                atualizarInterfaceEstoque(idTotalItens, idQtdBaixo, idStatusGeral);
                renderizarListaEstoque(idContainer, idTotalItens, idQtdBaixo, idStatusGeral);

                inputNome.value = '';
                inputQtd.value = '';
                inputMinimo.value = '';

            } catch (erro) {
                
                alert('Erro ao salvar no banco SQLite: ' + erro.message);
            }
        };

        btnSalvar.addEventListener('click', ejecutarEstoque);

        inputQtd.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                ejecutarEstoque();
            }
        });
    }
}

function atualizarInterfaceRelatorios(idFaturamentoMes, idMediaAtendimentos, idTotalSangrias) {
    const elementoFaturamento = document.getElementById(idFaturamentoMes);
    const elementoMedia = document.getElementById(idMediaAtendimentos);
    const elementoSangrias = document.getElementById(idTotalSangrias);

    const faturamentoMes = listaHistorico.reduce((soma, dia) => soma + dia.faturamento, 0);
    const totalSangrias = listaHistorico.reduce((soma, dia) => soma + dia.saidas, 0);

    const totalDias = listaHistorico.length;
    const totalAtendimentosHistorico = listaHistorico.reduce((soma, dia) => soma + dia.atendimentos, 0);
    const mediaAtendimentos = totalDias > 0 ? Math.round(totalAtendimentosHistorico / totalDias) : 0;

    if (elementoFaturamento) elementoFaturamento.textContent = `R$ ${faturamentoMes.toFixed(2).replace('.', ',')}`;
    if (elementoSangrias) elementoSangrias.textContent = `R$ ${totalSangrias.toFixed(2).replace('.', ',')}`;
    if (elementoMedia) elementoMedia.textContent = `${mediaAtendimentos} / dia`;
}

function salvarDiaNoHistorico() {
    const novoFechamento = {
        id: Date.now(),
        data: new Date().toLocaleDateString('pt-BR'),
        faturamento: faturamentoTotal,
        atendimentos: totalAtendimentos,
        entradas: caixaEntradas,
        saidas: caixaSaidas
    };

    listaHistorico.push(novoFechamento);
    localStorage.setItem('mano_maia_historico', JSON.stringify(listaHistorico));
}

function renderizarListaHistorico(idContainer) {
    const container = document.getElementById(idContainer);
    if (!container) return;

    if (listaHistorico.length === 0) {
        container.innerHTML = `<p style="color: var(--on-surface-variant); font-size: 14px;">Nenhum fechamento registrado até o momento.</p>`;
        return;
    }

    let html = '<div style="display: flex; flex-direction: column; gap: 12px; max-height: 320px; overflow-y: auto; padding-right: 4px;">';
    
    [...listaHistorico].reverse().forEach(dia => {
        html += `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: var(--background); border: 1px solid var(--outline-variant); border-radius: 0.5rem;">
                <div>
                    <strong style="color: var(--primary); font-size: 14px;">Fechamento de ${dia.data}</strong>
                    <span style="display: block; color: var(--on-surface-variant); font-size: 12px;">Atendimentos: ${dia.atendimentos} | Reforços: R$ ${dia.entradas.toFixed(2)} | Total Retirado(mês): R$ ${dia.saidas.toFixed(2)}</span>
                </div>
                <strong style="color: var(--tertiary); font-size: 15px;">+ R$ ${dia.faturamento.toFixed(2).replace('.', ',')}</strong>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

function configuringFormularioParametros(idInput, idBtn, idFaturamento, idLucro, idContador) {
    const inputComissao = document.getElementById(idInput);
    const btnSalvar = document.getElementById(idBtn);

    if (inputComissao) {
        inputComissao.value = Math.round(porcentagemComissao * 100);
    }

    if (btnSalvar && inputComissao) {
        btnSalvar.addEventListener('click', () => {
            const valorDigitado = parseFloat(inputComissao.value);

            if (isNaN(valorDigitado) || valorDigitado < 0 || valorDigitado > 100) {
                alert('Por favor, insira uma comissão válida entre 0% e 100%!');
                return;
            }

            porcentagemComissao = valorDigitado / 100;
            localStorage.setItem('mano_maia_comissao', porcentagemComissao);

            atualizarInterfaceDashboard(idFaturamento, idLucro, idContador);
            alert(`Parâmetros atualizados! Nova comissão definida para ${valorDigitado}%.`);
        });
    }
}

function configurarResetSistema(idBtn) {
    const btnLimpar = document.getElementById(idBtn);

    if (btnLimpar) {
        btnLimpar.addEventListener('click', async () => {
            const confirmouGeral = await window.api.mostrarConfirmacaoReset();
            if (!confirmouGeral) return;

            const senhaAdmin = await window.api.pedirSenhaAdmin();
            if (!senhaAdmin) return;

            try {
                if (window.api && typeof window.api.limparBancoDados === 'function') {
                    const resultado = await window.api.limparBancoDados(senhaAdmin);
                    
                    if (resultado.limpou) {
                        localStorage.clear();
                        alert('Todo o sistema e o banco de dados SQLite foram redefinidos com sucesso!');
                        window.location.reload();
                    }
                }
            } catch (erro) {
                alert('Erro ao limpar o banco de dados: ' + erro.message);
            }
        });
    }
}

function configurarMenuMobile(idBtnMenu, seletorSidebar, seletorLinks) {
    const btnMenu = document.getElementById(idBtnMenu);
    const sidebar = document.querySelector(seletorSidebar);
    const links = document.querySelectorAll(seletorLinks);

    if (btnMenu && sidebar) {
        btnMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && e.target !== btnMenu) {
                sidebar.classList.remove('active');
            }
        });
    }
}

function configurarExportacaoCSV(idBtn) {
    const btnExportar = document.getElementById(idBtn);

    if (btnExportar) {
        btnExportar.addEventListener('click', () => {
            if (listaHistorico.length === 0 && listaFiados.length === 0 && listaEstoque.length === 0) {
                alert('Não há dados cadastrados no sistema para gerar o relatório!');
                return;
            }

            const dataHoje = new Date().toLocaleDateString('pt-BR');
            const horaHoje = new Date().toLocaleTimeString('pt-BR');
            const faturamentoMes = listaHistorico.reduce((soma, dia) => soma + dia.faturamento, 0);
            const totalSangrias = listaHistorico.reduce((soma, dia) => soma + dia.saidas, 0);
            const totalDias = listaHistorico.length;

            let linhasHistorico = "";
            if (listaHistorico.length === 0) {
                linhasHistorico = `<tr><td colspan="5" style="text-align:center; color: #718096; padding: 16px;">Nenhum fechamento registrado</td></tr>`;
            } else {
                [...listaHistorico].reverse().forEach(dia => {
                    linhasHistorico += `
                        <tr>
                            <td style="font-weight: 600;">${dia.data}</td>
                            <td>${dia.atendimentos}</td>
                            <td>R$ ${dia.entradas.toFixed(2).replace('.', ',')}</td>
                            <td>R$ ${dia.saidas.toFixed(2).replace('.', ',')}</td>
                            <td style="font-weight: 700; color: #532aa8; text-align: right;">R$ ${dia.faturamento.toFixed(2).replace('.', ',')}</td>
                        </tr>`;
                });
            }

            let linhasFiados = "";
            if (listaFiados.length === 0) {
                linhasFiados = `<tr><td colspan="4" style="text-align:center; color: #718096; padding: 16px;">Nenhuma pendência activa</td></tr>`;
            } else {
                listaFiados.forEach(fiado => {
                    linhasFiados += `
                        <tr>
                            <td style="font-weight: 700; color: #1a202c;">${fiado.cliente.toUpperCase()}</td>
                            <td>${fiado.descricao.toUpperCase()}</td>
                            <td>${fiado.data}</td>
                            <td style="font-weight: 700; color: #ba1a1a; text-align: right;">R$ ${fiado.valor.toFixed(2).replace('.', ',')}</td>
                        </tr>`;
                });
            }

            let linhasEstoque = "";
            if (listaEstoque.length === 0) {
                linhasEstoque = `<tr><td colspan="4" style="text-align:center; color: #718096; padding: 16px;">Nenhum item cadastrado</td></tr>`;
            } else {
                listaEstoque.forEach(item => {
                    const estaBaixo = item.quantidade <= item.minimo;
                    const statusBadge = estaBaixo 
                        ? '<span style="background: #ffdad6; color: #93000a; padding: 4px 8px; border-radius: 0.25rem; font-size: 11px; font-weight: 700; letter-spacing: 0.05em;">ESTOQUE BAIXO</span>' 
                        : '<span style="background: #e6f6ec; color: #38a169; padding: 4px 8px; border-radius: 0.25rem; font-size: 11px; font-weight: 700; letter-spacing: 0.05em;">REGULAR</span>';
                    linhasEstoque += `
                        <tr>
                            <td style="font-weight: 700; color: #1a202c;">${item.nome.toUpperCase()}</td>
                            <td>${item.quantidade} un</td>
                            <td>${item.minimo} un</td>
                            <td style="text-align: right;">${statusBadge}</td>
                        </tr>`;
                });
            }

            const janelaImpressao = window.open('', '_blank', 'width=950,height=850');
            
            
            janelaImpressao.document.write(`
                <!DOCTYPE html>
                <html lang="pt-BR">
                <head>
                    <meta charset="UTF-8">
                    <title>Visualização de Relatório - Mano Maia</title>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap');
                        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif; }
                        body { background: #ebeef0; padding: 40px; color: #181c1e; }
                        .report-container { max-width: 1140px; margin: 0 auto; background: #ffffff; padding: 40px; border-radius: 0.5rem; border: 1px solid #e2e8f0; }
                        .no-print-zone { max-width: 1140px; margin: 0 auto 20px auto; display: flex; justify-content: flex-end; gap: 12px; }
                        .action-btn { background: #532aa8; color: #ffffff; border: none; padding: 12px 24px; border-radius: 0.25rem; font-size: 13px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; text-transform: uppercase; letter-spacing: 0.02em; }
                        .action-btn.secondary { background: #ffffff; color: #532aa8; border: 1px solid #532aa8; }
                        .report-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #532aa8; padding-bottom: 24px; margin-bottom: 32px; }
                        .title-area h1 { color: #532aa8; font-size: 24px; font-weight: 700; line-height: 32px; letter-spacing: -0.02em; }
                        .title-area p { color: #718096; font-size: 14px; margin-top: 4px; }
                        .date-area { text-align: right; color: #718096; font-size: 14px; line-height: 20px; }
                        .date-area strong { color: #181c1e; font-size: 14px; display: block; margin-top: 2px; }
                        .section-title { font-size: 18px; font-weight: 600; color: #532aa8; letter-spacing: -0.01em; margin-bottom: 16px; margin-top: 32px; display: flex; align-items: center; gap: 8px; text-transform: uppercase; }
                        .metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
                        .card { background: #ffffff; border: 1px solid #e2e8f0; padding: 20px; border-radius: 0.5rem; }
                        .card span { font-size: 12px; font-weight: 600; color: #718096; text-transform: uppercase; letter-spacing: 0.05em; display: block; }
                        .card strong { font-size: 28px; font-weight: 700; color: #181c1e; display: block; margin-top: 6px; line-height: 32px; }
                        .card small { font-size: 11px; color: #38a169; font-weight: 600; display: block; margin-top: 6px; letter-spacing: 0.02em; }
                        table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
                        th { background: #f1f4f6; color: #494453; font-size: 12px; font-weight: 700; padding: 12px 16px; text-align: left; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid #e2e8f0; }
                        th:last-child { text-align: right; }
                        td { padding: 14px 16px; border-bottom: 1px solid #e2e8f0; color: #1a202c; font-size: 13px; line-height: 18px; }
                        td:last-child { text-align: right; }
                        tr:nth-child(even) { background: #f7fafc; }
                        .report-footer { margin-top: 64px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 12px; color: #718096; border-top: 1px solid #e2e8f0; padding-top: 24px; }
                        .signature-area { text-align: center; width: 280px; }
                        .signature-line { border-top: 1px solid #181c1e; margin-bottom: 8px; }
                        .signature-area span { font-weight: 700; color: #181c1e; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; }
                        @media print {
                            body { background: #ffffff; padding: 0; }
                            .report-container { border: none; padding: 0; max-width: 100%; }
                            .no-print-zone { display: none; }
                            th { background: #f1f4f6 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                        }
                    </style>
                </head>
                <body>
                    <div class="no-print-zone">
                        <button class="action-btn secondary" onclick="window.close()">Voltar ao Sistema</button>
                        <button class="action-btn" onclick="window.print()">🖨️ Imprimir Relatório (PDF)</button>
                    </div>
                    <div class="report-container">
                        <div class="report-header">
                            <div class="title-area">
                                <h1>MANO MAIA PD</h1>
                                <p>Relatório Gerencial Interno</p>
                            </div>
                            <div class="date-area">Data do Relatório<strong>${dataHoje} às ${horaHoje}</strong></div>
                        </div>
                        <div class="section-title">📊 Resumo do Mês</div>
                        <div class="metrics-grid">
                            <div class="card">
                                <span>Faturamento Mensal</span>
                                <strong>R$ ${faturamentoMes.toFixed(2).replace('.', ',')}</strong>
                                <small>📈 ESTÁVEL</small>
                            </div>
                            <div class="card">
                                <span>Total De Retiradas</span>
                                <strong>R$ ${totalSangrias.toFixed(2).replace('.', ',')}</strong>
                                <small style="color: #718096;">${totalSangrias > 0 ? 'Movimentações em caixa' : 'Nenhuma movimentação'}</small>
                            </div>
                            <div class="card">
                                <span>Dias Encerrados</span>
                                <strong>${totalDias}</strong>
                                <small style="color: #718096;">Período Corrente</small>
                            </div>
                        </div>
                        <div class="section-title">📅 Histórico de Fechamentos Diários</div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Data de Referência</th>
                                    <th>Atendimentos</th>
                                    <th>Reforços (Troco)</th>
                                    <th>Sangrias (Saídas)</th>
                                    <th style="text-align: right;">Faturamento Líquido</th>
                                </tr>
                            </thead>
                            <tbody>${linhasHistorico}</tbody>
                        </table>
                        <div class="section-title">📋 Relatório de Fiados Pendentes</div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Cliente</th>
                                    <th>Descrição do Débito</th>
                                    <th>Data Registro</th>
                                    <th style="text-align: right;">Valor Pendente</th>
                                </tr>
                            </thead>
                            <tbody>${linhasFiados}</tbody>
                        </table>
                        <div class="section-title">📦 Níveis de Estoque</div>
                        <table>
                            <thead>
                                <tr>
                                    <th> Produto</th>
                                    <th>Quantidade Atual</th>
                                    <th>Estoque Mínimo</th>
                                    <th style="text-align: right;">Status de Suprimento</th>
                                </tr>
                            </thead>
                            <tbody>${linhasEstoque}</tbody>
                        </table>
                        <div class="report-footer">
                            <div>Documento gerado eletronicamente pelo sistema Mano Maia PD.<br>Uso exclusivo para fins de controle gerencial e auditoria de caixa.</div>
                            <div class="signature-area"><div class="signature-line"></div><span>Responsável pela Unidade</span></div>
                        </div>
                    </div>
                </body>
                </html>
            `);
            janelaImpressao.document.close();
        });
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        if (window.api && typeof window.api.buscarFiados === 'function') {
            listaFiados = await window.api.buscarFiados();
        }
        if (window.api && typeof window.api.buscarEstoque === 'function') {
            listaEstoque = await window.api.buscarEstoque();
        }
        if (window.api && typeof window.api.buscarCaixa === 'function') {
            listaHistorico = await window.api.buscarCaixa();
        }
        if (window.api && typeof window.api.buscarFaturamentoGeral === 'function') {
            faturamentoTotal = await window.api.buscarFaturamentoGeral();
        }
        if (window.api && typeof window.api.buscarTotalAtendimentos === 'function') {
            totalAtendimentos = await window.api.buscarTotalAtendimentos();
        }
    } catch (erro) {
        console.error("Erro ao carregar dados iniciais do SQLite:", erro);
    }

    atualizarDataSistema('data-atual', 'frase-painel');
    
    configurarFormularioAtendimento(
        'btn-registrar-venda', 'atendimento-valor', 
        'faturamento-total-exibicao', 'lucro-calculado', 'total-atendimentos-contador'
    );
    
    configurarLembretesRapidos('lembretes-textarea', 'mano_maia_lembretes');
    configurarNavegacaoAbas('.sidebar nav ul li a', '.tab-content');
    
    configurarFormularioCaixa(
        'btn-registrar-movimentacao', 'caixa-tipo-movimentacao', 'caixa-metodo-pagamento',
        'caixa-descricao', 'caixa-valor', 
        'caixa-entradas', 'caixa-saidas', 'caixa-saldo-atual'
    );

    configurarFechamentoCaixa(
        'btn-fechar-caixa', 
        'faturamento-total-exibicao', 'lucro-calculado', 'total-atendimentos-contador',
        'caixa-entradas', 'caixa-saidas', 'caixa-saldo-atual',
        'relatorio-faturamento-mes', 'relatorio-media-atendimentos', 'relatorio-total-sangrias'
    );

    configurFormularioFiados(
        'btn-registrar-fiado', 'fiado-nome-cliente', 
        'fiado-descricao-servico', 'fiado-valor-debito', 
        'container-lista-fiados', 'fiado-total-devedor', 'fiado-qtd-devedores'
    );

    configuringFormularioEstoque(
        'btn-salvar-estoque', 'estoque-nome', 
        'estoque-qtd', 'estoque-minimo', 
        'container-lista-estoque', 'estoque-total-itens', 'estoque-qtd-baixo', 'estoque-status-geral'
    );

    configuringFormularioParametros(
        'config-comissao', 'btn-salvar-config',
        'faturamento-total-exibicao', 'lucro-calculado', 'total-atendimentos-contador'
    );
    
    configurarResetSistema('btn-limpar-banco');
    configurarMenuMobile('btn-menu-mobile', '.sidebar', '.sidebar nav ul li a');
    configurarExportacaoCSV('btn-exportar-relatorio');

    atualizarInterfaceDashboard('faturamento-total-exibicao', 'lucro-calculado', 'total-atendimentos-contador');
    atualizarInterfaceCaixa('caixa-entradas', 'caixa-saidas', 'caixa-saldo-atual');
    atualizarInterfaceFiados('fiado-total-devedor', 'fiado-qtd-devedores');
    atualizarInterfaceEstoque('estoque-total-itens', 'estoque-qtd-baixo', 'estoque-status-geral');
    atualizarInterfaceRelatorios('relatorio-faturamento-mes', 'relatorio-media-atendimentos', 'relatorio-total-sangrias');
    
    renderizarListaFiados('container-lista-fiados', 'fiado-total-devedor', 'fiado-qtd-devedores');
    renderizarListaEstoque('container-lista-estoque', 'estoque-total-itens', 'estoque-qtd-baixo', 'estoque-status-geral');
    renderizarListaHistorico('container-lista-historico');

    if (typeof lucide !== 'undefined') lucide.createIcons();
});