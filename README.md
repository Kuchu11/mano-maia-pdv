# 🏪 Mano Maia PDV — Sistema Comercial de Ponto de Venda

<div align="center">
  <!-- Botão Direto para os Prints no LinkedIn -->
  <a href="https://www.linkedin.com/in/wesley-campelo-640441385/details/projects/" target="_blank">
    <img src="https://img.shields.io/badge/Acesse_as_Telas_do_Sistema-Clique_Aqui-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="Ver Telas no LinkedIn" />
  </a>
</div>

<br>

<div align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=electron&logoColor=white" alt="Electron" />
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
</div>

<br>

O **Mano Maia PDV** é uma aplicação desktop full-stack desenvolvida sob medida para automação comercial e gerenciamento de vendas locais. O sistema foi projetado focado em alta performance offline, interface intuitiva e persistência estável de dados, resolvendo problemas reais de controle de caixa, estoque e histórico de faturamento para comércios.

---

## 🛠️ Tecnologias e Arquitetura do Ecossistema

O software foi construído utilizando o ecossistema moderno do JavaScript para aplicações desktop, garantindo portabilidade, eficiência e isolamento de ambiente:

| Componente | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Ambiente de Execução** | **Node.js** | Motor principal que gerencia o backend da aplicação, scripts de compilação e comunicação interna. |
| **Estrutura Desktop** | **Electron & Electron Forge** | Framework utilizado para empacotar a aplicação web em um software desktop nativo, integrando o Chromium e o Node.js. |
| **Banco de Dados** | **SQLite** | Banco de dados relacional embutido e local. Dispensa servidores externos, garantindo que o software funcione 100% offline. |
| **Empacotamento** | **Squirrel.Windows** | Distribuidor integrado ao Electron Forge responsável por gerar o instalador autônomo nativo (`.exe`). |

---

## 🎨 Design e UI/UX: Domínio com Stitch

A interface visual do **Mano Maia PDV** foi projetada para oferecer uma experiência fluida, moderna e focada em usabilidade operacional (caixa rápido). 

> 💡 **Destaque de Engenharia Visual:** 
> Todo o design e a criação das telas foram concebidos com domínio técnico no **Stitch**, permitindo uma arquitetura de componentes visuais consistente, paleta de cores harmoniosa (com foco na identidade visual roxa da marca) e total responsividade para o operador do sistema.

---

## ⚙️ Engenharia de Distribuição (Deploy Autônomo)

Um dos grandes diferenciais técnicos deste projeto está na sua engenharia de implantação. O software foi configurado e compilado em um ambiente de produção isolado para gerar um **instalador Standalone (`.exe`)**.

* **Zero Dependências Externas:** O instalador final empacota o motor do Node.js, as dependências do SQLite e os binários do Electron.
* **Instalação Silenciosa:** Ao executar o arquivo de setup em qualquer máquina com Windows 64-bits, o sistema cria automaticamente a estrutura de diretórios e carimba o atalho na Área de Trabalho do usuário sem exigir configurações técnicas adicionais do cliente.

---

<p align="center">Desenvolvido por <strong>Wesley</strong> 🚀</p>
