import React from 'react';

export default function ScreenSobre() {
  return (
    <div className="screen active">
      <div className="screen-title">Sobre o Sistema</div>
      <div className="screen-sub">Arquitetura e Especificações</div>

      <div className="section-label" style={{ marginTop: 0 }}>Visão Geral da Arquitetura</div>
      <div className="card">
        <p style={{ fontSize: '.85rem', lineHeight: 1.5, marginBottom: 12 }}>O sistema a ser desenvolvido é um <strong>Progressive Web App (PWA)</strong> voltado para gestão agropecuária e controle financeiro rural. A aplicação deve ser totalmente responsiva, otimizada para uso em smartphones e tablets em campo, permitindo instalação direta na tela inicial dos aparelhos sem dependência de lojas de aplicativos, além de oferecer suporte a recursos nativos como acesso à câmera para leitura de códigos.</p>
        <p style={{ fontSize: '.85rem', lineHeight: 1.5, marginBottom: 12 }}>A infraestrutura de dados e hospedagem utilizará uma <strong>arquitetura híbrida</strong> dividida entre Firebase e Supabase:</p>
        <div style={{ fontSize: '.85rem', lineHeight: 1.5, color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div><strong style={{ color: 'var(--text)' }}>Firebase:</strong> Responsável pela hospedagem estática de alta velocidade da interface (Firebase Hosting), entrega dos arquivos do PWA aos navegadores móveis e armazenamento em nuvem de eventuais mídias e comprovantes (Firebase Storage).</div>
          <div><strong style={{ color: 'var(--text)' }}>Supabase (PostgreSQL):</strong> Atuará como o banco de dados principal e motor relacional do sistema. É responsável por armazenar as tabelas estruturadas, garantir a integridade referencial entre animais, genealogia, movimentações financeiras e estoque, além de executar cálculos agregados de inventário e custos diretamente via queries SQL, garantindo alta performance e conformidade com limites operacionais gratuitos.</div>
        </div>
      </div>

      <div className="section-label">Módulos e Requisitos Funcionais</div>
      
      <div className="card">
        <div className="li-title" style={{ marginBottom: 8, color: 'var(--accent)' }}>1. Módulo de Rebanho (Animais)</div>
        <ul style={{ fontSize: '.85rem', lineHeight: 1.5, paddingLeft: 20, color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <li><strong style={{ color: 'var(--text)' }}>Cadastro individual:</strong> Registro de vacas, novilhas e bezerros contendo identificação (brinco ou nome), raça, data de nascimento, filiação (pai e mãe) e categoria produtiva.</li>
          <li><strong style={{ color: 'var(--text)' }}>Histórico do animal:</strong> Ficha cadastral com linhagem, pesagens periódicas, transferências de lote e histórico reprodutivo.</li>
          <li><strong style={{ color: 'var(--text)' }}>Identificação rápida via câmera:</strong> Acionamento da câmera do smartphone para escanear QR Code ou código de barras nos brincos dos animais, carregando instantaneamente a ficha correspondente.</li>
        </ul>
      </div>

      {/* Os outros módulos seguem o mesmo padrão. Para brevidade, inserimos os principais */}
      <div className="card">
        <div className="li-title" style={{ marginBottom: 8, color: 'var(--accent)' }}>2. Módulo de Reprodução e Inseminação</div>
        <ul style={{ fontSize: '.85rem', lineHeight: 1.5, paddingLeft: 20, color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <li><strong style={{ color: 'var(--text)' }}>Catálogo e estoque de sêmen:</strong> Registro de touros, raças, empresa fornecedora, saldo de doses por botijão/caneca e custo unitário por dose.</li>
          <li><strong style={{ color: 'var(--text)' }}>Verificação e baixa de doses:</strong> Validação de compatibilidade de linhagem e baixa automática no saldo de doses a cada registro de inseminação.</li>
          <li><strong style={{ color: 'var(--text)' }}>Histórico reprodutivo:</strong> Apontamento de datas de cio, inseminações artificiais ou cobrições naturais e identificação do inseminador.</li>
          <li><strong style={{ color: 'var(--text)' }}>Registro de parições:</strong> Registro da data do parto, matriz, sêmen utilizado, tipo de parto (normal ou assistido), quantidade e sexo das crias, peso ao nascer e cadastro automatizado do novo bezerro na base do rebanho.</li>
        </ul>
      </div>

      <div className="card">
        <div className="li-title" style={{ marginBottom: 8, color: 'var(--accent)' }}>3. Módulo de Alertas e Calendário Automatizado</div>
        <ul style={{ fontSize: '.85rem', lineHeight: 1.5, paddingLeft: 20, color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <li><strong style={{ color: 'var(--text)' }}>Previsão de parto:</strong> Projeção automática da data provável de parto com base na data da inseminação confirmada.</li>
          <li><strong style={{ color: 'var(--text)' }}>Alerta de secagem:</strong> Cálculo e notificações programadas para o momento exato de interrupção da ordenha (secagem da matriz) antes do parto previsto.</li>
          <li><strong style={{ color: 'var(--text)' }}>Agenda sanitária e reprodutiva:</strong> Lembretes de diagnóstico de gestação (toque/ultrassom), desmame e cronograma de vacinações.</li>
        </ul>
      </div>

      <div style={{ height: 24 }}></div>
    </div>
  );
}
