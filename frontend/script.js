const { useState, useEffect, useRef } = React;

const C = {
  primary: '#04CC6A', primaryD: '#03A855', tertiary: '#64FFDA',
  bg: '#0A0F1A', bg2: '#0F172A', card: '#131E30', card2: '#1A2640',
  border: '#1E3050', text: '#F8FAFC', muted: '#8899AA',
};

const globalCSS = `
  .btn { display:inline-flex;align-items:center;gap:.5rem;padding:.75rem 1.6rem;border-radius:8px;font-family:var(--font);font-size:.9rem;font-weight:600;cursor:pointer;border:none;transition:all .2s;text-decoration:none; }
  .btn-primary { background:var(--primary);color:#fff; }
  .btn-primary:hover { background:var(--primary-d);transform:translateY(-1px);box-shadow:0 8px 24px rgba(4,204,106,.3); }
  .btn-outline { background:transparent;color:var(--text);border:1.5px solid var(--border); }
  .btn-outline:hover { border-color:var(--primary);color:var(--primary);transform:translateY(-1px); }
  .btn-sm { padding:.55rem 1.1rem;font-size:.82rem; }
  .badge { display:inline-flex;align-items:center;gap:.5rem;font-size:.72rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--primary);background:rgba(4,204,106,.08);border:1px solid rgba(4,204,106,.25);border-radius:99px;padding:5px 14px;margin-bottom:1.4rem; }
  .container { max-width:1140px;margin:0 auto;padding:0 2rem; }
  .section { padding:100px 0; }
  .section-sm { padding:60px 0; }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes fadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  .fade-in { animation:fadeIn .5s ease forwards; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
`;
const styleEl = document.createElement('style');
styleEl.textContent = globalCSS;
document.head.appendChild(styleEl);

function Navbar({ currentPage, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'home',    label: 'Funcionalidades' },
    { id: 'como',    label: 'Como Funciona'   },
    { id: 'sobre',   label: 'Sobre Nós'       },
    { id: 'contato', label: 'Contato'          },
  ];

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    background: 'rgba(10,15,26,.88)', backdropFilter: 'blur(12px)',
    borderBottom: `1px solid ${C.border}`,
    boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,.4)' : 'none',
    padding: '1rem 0', transition: 'box-shadow .3s',
  };

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth:1140, margin:'0 auto', padding:'0 2rem', display:'flex', alignItems:'center', gap:'2rem' }}>
        <div style={{ fontSize:'1.2rem', fontWeight:700, color:C.primary, marginRight:'auto', letterSpacing:'-.01em', cursor:'pointer' }}
             onClick={() => setPage('home')}>
          PRIMUS
        </div>
        <div style={{ display:'flex', gap:0 }}>
          {links.map(l => (
            <div key={l.id}
              onClick={() => { setPage(l.id); setMenuOpen(false); window.scrollTo({top:0,behavior:'smooth'}); }}
              style={{
                padding:'.5rem 1rem', fontSize:'.88rem', fontWeight:500, cursor:'pointer',
                color: currentPage === l.id ? C.primary : C.muted,
                borderBottom: currentPage === l.id ? `2px solid ${C.primary}` : '2px solid transparent',
                transition: 'all .2s',
              }}>
              {l.label}
            </div>
          ))}
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setPage('dashboard')}>
          Abrir App →
        </button>
      </div>
    </nav>
  );
}

function Badge({ children }) {
  return <div className="badge">⬡ {children}</div>;
}

function FeatureCard({ icon, title, desc }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: C.card, border: `1px solid ${hov ? 'rgba(4,204,106,.35)' : C.border}`,
        borderRadius:14, padding:'2rem', transition:'all .3s',
        transform: hov ? 'translateY(-4px)' : 'none',
        position:'relative', overflow:'hidden',
      }}>
      {hov && <div style={{ position:'absolute', bottom:0, left:0, right:0, height:2, background:'linear-gradient(90deg,#04CC6A,#64FFDA)' }}/>}
      <div style={{ width:48, height:48, borderRadius:12, background:'rgba(4,204,106,.12)', border:'1px solid rgba(4,204,106,.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.3rem', marginBottom:'1rem' }}>
        {icon}
      </div>
      <h3 style={{ marginBottom:'.5rem', fontSize:'1.1rem' }}>{title}</h3>
      <p style={{ color:C.muted, fontSize:'.9rem', lineHeight:1.7, marginBottom:'1.2rem' }}>{desc}</p>
      <span style={{ fontSize:'.85rem', fontWeight:600, color:C.primary, cursor:'pointer' }}>Saber Mais →</span>
    </div>
  );
}

function StatItem({ val, label, last }) {
  return (
    <div style={{ textAlign:'center', padding:'0 2rem', borderRight: last ? 'none' : `1px solid ${C.border}` }}>
      <div style={{ fontSize:'2.2rem', fontWeight:700, color:C.primary, marginBottom:'.25rem' }}>{val}</div>
      <div style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:C.muted }}>{label}</div>
    </div>
  );
}

/* ── CTA BLOCK ── */
function CtaBlock({ title, sub, btnLabel, onBtn }) {
  return (
    <div style={{
      background:'linear-gradient(135deg,#002A52,#001830)',
      border:'1px solid rgba(4,204,106,.2)', borderRadius:20,
      padding:'5rem 4rem', textAlign:'center', position:'relative', overflow:'hidden',
    }}>
      <div style={{ position:'absolute', top:-100, right:-100, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(4,204,106,.1),transparent 70%)' }}/>
      <h2 style={{ fontSize:'clamp(1.8rem,3vw,2.6rem)', marginBottom:'1rem' }} dangerouslySetInnerHTML={{ __html: title }}/>
      <p style={{ color:C.muted, marginBottom:'2rem', maxWidth:480, margin:'0 auto 2rem' }}>{sub}</p>
      <button className="btn btn-primary" onClick={onBtn}>{btnLabel}</button>
    </div>
  );
}

function HomePage({ setPage }) {
  return (
    <div className="fade-in">
      {/* HERO */}
      <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', paddingTop:80,
        background:'radial-gradient(ellipse 70% 60% at 60% 40%,rgba(0,42,82,.55),transparent 70%),radial-gradient(ellipse 40% 40% at 90% 10%,rgba(4,204,106,.08),transparent 60%),#0A0F1A' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem', alignItems:'center' }}>
            <div>
              <Badge>Hiper-Inteligência Acadêmica</Badge>
              <h1 style={{ fontSize:'clamp(2.2rem,5vw,3.8rem)', fontWeight:700, lineHeight:1.1, marginBottom:'1.2rem' }}>
                Equilibre <em style={{ color:C.primary, fontStyle:'italic' }}>Trabalho</em><br/>e Estudos com IA
              </h1>
              <p style={{ color:C.muted, fontSize:'1.05rem', marginBottom:'2rem', maxWidth:460, lineHeight:1.75 }}>
                O assistente de estudos que cria e ajusta sua rotina automaticamente, para que você possa focar no que realmente importa: aprender.
              </p>
              <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginBottom:'2.5rem' }}>
                <button className="btn btn-primary" onClick={() => setPage('dashboard')}>Criar Meu Cronograma Inteligente</button>
                <button className="btn btn-outline" onClick={() => setPage('como')}>Ver Demonstração →</button>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'.75rem' }}>
                <div style={{ display:'flex' }}>
                  {['GJ','EH','RC','CL'].map((i,idx) => (
                    <div key={i} style={{ width:32, height:32, borderRadius:'50%', border:`2px solid ${C.bg}`, background:C.card2, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.62rem', fontWeight:700, marginLeft: idx===0?0:-8 }}>{i}</div>
                  ))}
                </div>
                <p style={{ fontSize:'.82rem', color:C.muted, margin:0 }}>Junto a <strong style={{ color:C.primary }}>+2.500 estudantes</strong></p>
              </div>
            </div>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:'1.5rem', position:'relative', overflow:'hidden', animation:'float 4s ease-in-out infinite' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:'linear-gradient(90deg,#04CC6A,#64FFDA)' }}/>
              <div style={{ fontSize:'.7rem', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:C.muted, marginBottom:'1rem' }}>A Organização que se Adapta a Você</div>
              {[
                { icon:'📅', title:'Cronograma Inteligente', sub:'Ajustado em tempo real à sua rotina', badge:'IA' },
                { icon:'🎯', title:'Foco Adaptativo', sub:'Bloqueio de distrações contextual', badge:'Ativo' },
                { icon:'📊', title:'Progresso em Tempo Real', sub:'Métricas detalhadas por disciplina', badge:'+18%' },
                { icon:'🔔', title:'Lembretes Inteligentes', sub:'No momento certo, sem interrupções', badge:'Smart' },
              ].map(r => (
                <div key={r.title} style={{ display:'flex', alignItems:'center', gap:'.75rem', padding:'.75rem', background:C.card2, borderRadius:8, marginBottom:'.6rem', border:`1px solid ${C.border}` }}>
                  <div style={{ width:36, height:36, borderRadius:8, background:'rgba(4,204,106,.12)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', flexShrink:0 }}>{r.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:'.88rem', fontWeight:600, marginBottom:1 }}>{r.title}</div>
                    <div style={{ fontSize:'.75rem', color:C.muted }}>{r.sub}</div>
                  </div>
                  <div style={{ fontSize:'.65rem', fontWeight:700, padding:'2px 8px', borderRadius:99, background:'rgba(4,204,106,.15)', color:C.primary }}>{r.badge}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ background:C.card, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, padding:'3rem 0' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)' }}>
            <StatItem val="+2.5k" label="Estudantes Ativos"/>
            <StatItem val="10k+" label="Tarefas Concluídas"/>
            <StatItem val="4.9/5" label="Avaliação Média"/>
            <StatItem val="98%" label="Taxa de Foco" last/>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign:'center', maxWidth:560, margin:'0 auto 4rem' }}>
            <h2 style={{ fontSize:'clamp(1.8rem,3vw,2.6rem)', marginBottom:'.75rem' }}>Funcionalidades do <em style={{ color:C.primary }}>Primus</em></h2>
            <p style={{ color:C.muted }}>A infraestrutura neural para o seu aprendizado, projetada para converter caos em clareza acadêmica.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem' }}>
            <FeatureCard icon="🤖" title="Gerido por IA" desc="Nossos algoritmos analisam sua carga horária e sugerem os melhores momentos para estudar cada matéria, eliminando seu ciclo cansativo."/>
            <FeatureCard icon="🔄" title="Se Adapta à sua Rotina" desc="Aconteceu um imprevisto? O Primus recalcula tudo e te atualiza em segundos, sem gerar frustração ou perda de progresso."/>
            <FeatureCard icon="🎯" title="Foco Total no Aprendizado" desc="Interface minimalista projetada para eliminar distrações com ferramentas integradas de Pomodoro e bloqueio de notificações."/>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm">
        <div className="container">
          <CtaBlock title="Pronto para dominar<br/>sua jornada acadêmica?" sub="Experimente a ferramenta que está mudando a forma como estudantes de alto desempenho organizam suas vidas." btnLabel="Começar Agora Gratuitamente" onBtn={() => setPage('dashboard')}/>
        </div>
      </section>

      <Footer setPage={setPage}/>
    </div>
  );
}

/* ── COMO FUNCIONA ── */
function ComoPage({ setPage }) {
  const steps = [
    { n:'01', icon:'📥', title:'Captura de Dados', desc:'Envie seus materiais: PDFs, livros, anotações ou vídeos. Nossa IA absorve e categoriza em instantes.' },
    { n:'02', icon:'🧬', title:'Destilação por IA', desc:'O sistema identifica conceitos-chave e cria um cronograma personalizado baseado na ciência da aprendizagem.' },
    { n:'03', icon:'⚡', title:'Prática Ativa', desc:'Estude com flashcards, recursos dinâmicos e testes gerados especificamente para suas dificuldades.' },
    { n:'04', icon:'📊', title:'Maestria & Insights', desc:'Acompanhe seus direitos sobre cada tópico e receba sugestões para revisões mais eficazes.' },
  ];
  return (
    <div className="fade-in">
      <section style={{ paddingTop:140, paddingBottom:60 }}>
        <div className="container" style={{ textAlign:'center', maxWidth:680, margin:'0 auto' }}>
          <Badge>Fluxo Inteligente</Badge>
          <h1 style={{ fontSize:'clamp(2.2rem,5vw,3.6rem)', lineHeight:1.1, marginBottom:'1.2rem' }}>A Evolução do seu<br/><em style={{ color:C.primary }}>Fluxo de Aprendizado</em></h1>
          <p style={{ color:C.muted, fontSize:'1.05rem', marginBottom:'2rem' }}>Nossa arquitetura de aprendizado mapeia sua cognição para criar o caminho mais eficiente entre a curiosidade inicial e o domínio total.</p>
          <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
            <button className="btn btn-primary" onClick={() => setPage('dashboard')}>Começar Agora →</button>
            <button className="btn btn-outline">Ver Demonstração</button>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <h2 style={{ fontSize:'clamp(1.6rem,3vw,2.4rem)' }}>Como a Primus <em style={{ color:C.primary }}>Transforma</em> seu Estudo</h2>
            <p style={{ color:C.muted, marginTop:'.5rem' }}>Quatro passos simples para a maestria intelectual.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1.2rem' }}>
            {steps.map(s => (
              <div key={s.n} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:'1.8rem 1.4rem' }}>
                <div style={{ fontSize:'.7rem', fontWeight:700, letterSpacing:'.15em', textTransform:'uppercase', color:C.primary, marginBottom:'.75rem' }}>{s.n} — Passo</div>
                <div style={{ width:52, height:52, borderRadius:12, background:C.card2, border:`1px solid ${C.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', marginBottom:'1rem' }}>{s.icon}</div>
                <h3 style={{ fontSize:'1rem', marginBottom:'.5rem' }}>{s.title}</h3>
                <p style={{ color:C.muted, fontSize:'.85rem', lineHeight:1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem', alignItems:'center' }}>
            <div>
              <Badge>Ciência Aplicada</Badge>
              <h2 style={{ fontSize:'clamp(1.6rem,3vw,2.2rem)', marginBottom:'2rem' }}>A Ciência por trás da<br/><em style={{ color:C.primary }}>Primus Inteligente</em></h2>
              {[
                { icon:'🧠', title:'Neuroplasticidade Otimizada', desc:'Utilizamos algoritmos de Repetição Espaçada que se adaptam à sua curva de esquecimento individual.' },
                { icon:'🕸️', title:'Rede de Conhecimento Semântico', desc:'Nossa IA cria mapas mentais automáticos, conectando novos conceitos ao que você já domina.' },
              ].map(s => (
                <div key={s.title} style={{ display:'flex', gap:'1rem', alignItems:'flex-start', background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:'1.4rem', marginBottom:'1rem' }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:'rgba(4,204,106,.12)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', flexShrink:0 }}>{s.icon}</div>
                  <div>
                    <h4 style={{ fontSize:'.95rem', marginBottom:'.3rem' }}>{s.title}</h4>
                    <p style={{ color:C.muted, fontSize:'.85rem' }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, aspectRatio:'16/9', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'1rem' }}>
              <div style={{ width:64, height:64, borderRadius:'50%', background:'rgba(4,204,106,.15)', border:`2px solid ${C.primary}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem', cursor:'pointer' }}>▶</div>
              <p style={{ fontSize:'.85rem', color:C.muted }}>Vídeo Demonstrativo</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm"><div className="container"><CtaBlock title="Pronto para transformar<br/>sua maneira de aprender?" sub="Experimente a Primus hoje e sinta a diferença em sua produtividade acadêmica." btnLabel="Começar Grátis Agora" onBtn={() => setPage('dashboard')}/></div></section>
      <Footer setPage={setPage}/>
    </div>
  );
}

/* ── SOBRE NÓS ── */
function SobrePage({ setPage }) {
  const team = [
    { name:'Luiz Eduardo S. Corrêa',        role:'FullStack Arch'       },
    { name:'Rafael Cescate do Carmo',      role:'Cloud Engineer'       },
    { name:'Guilherme F. M. Martinelli',   role:'Algorithm Specialist' },
    { name:'Eduardo H. de Souza da Silva', role:'Interface Designer'   },
    { name:'Cauê Licce',                   role:'Systems Analyst'      },
  ];
  return (
    <div className="fade-in">
      <section style={{ paddingTop:140, paddingBottom:60 }}>
        <div className="container" style={{ textAlign:'center', maxWidth:680, margin:'0 auto' }}>
          <Badge>Inteligência Primum</Badge>
          <h1 style={{ fontSize:'clamp(2rem,5vw,3.4rem)', lineHeight:1.1, marginBottom:'1rem' }}>Nossa Identidade e <em style={{ color:C.primary }}>Compromisso</em></h1>
          <p style={{ color:C.muted }}>Inspirados pela precisão tecnológica e a busca incessante pelo conhecimento, criamos ferramentas para elevar a capacidade cognitiva humana ao próximo patamar.</p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.4rem' }}>
            {[
              { icon:'🎯', title:'Missão', text:'Facilitar o percurso acadêmico de estudantes, oferecendo gerenciamento de tempo e foco através de metodologias de sincronização cognitiva.' },
              { icon:'🌐', title:'Visão',  text:'Ser o ecossistema líder em organização cotidiana, estabelecendo o padrão global para produtividade e hiper-inteligência aplicada ao aprendizado.' },
              { icon:'⚖️', title:'Valores', text:'Comprometimento com a evolução intelectual, integrando ética, precisão técnica e eficiência para transformar a rotina de estudos em excelência.' },
            ].map(c => (
              <div key={c.title} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:'2rem' }}>
                <div style={{ width:44, height:44, borderRadius:10, background:'rgba(4,204,106,.1)', border:'1px solid rgba(4,204,106,.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', marginBottom:'1rem' }}>{c.icon}</div>
                <h3 style={{ color:C.primary, marginBottom:'.6rem' }}>{c.title}</h3>
                <p style={{ color:C.muted, fontSize:'.9rem', lineHeight:1.7 }}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:20, padding:'3rem' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'2rem', flexWrap:'wrap', gap:'1rem' }}>
              <div>
                <h2 style={{ fontSize:'clamp(1.6rem,3vw,2.2rem)', marginBottom:'.5rem' }}>Arquitetos da <em style={{ color:C.primary }}>Inovação</em></h2>
                <p style={{ color:C.muted, fontSize:'.9rem' }}>Nossa equipe é composta por mentes dedicadas à construção de um ecossistema de aprendizado impactante.</p>
              </div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', fontSize:'.72rem', fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase', color:C.tertiary, background:'rgba(100,255,218,.06)', border:'1px solid rgba(100,255,218,.2)', borderRadius:6, padding:'6px 14px' }}>
                ⚙ UniCesumar — Engenharia de Software
              </div>
            </div>
            {team.map(m => (
              <div key={m.name} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'.9rem 1.2rem', background:C.card2, borderRadius:10, border:`1px solid ${C.border}`, marginBottom:'.75rem' }}>
                <div style={{ fontWeight:600, fontSize:'.92rem' }}>{m.name}</div>
                <div style={{ fontSize:'.78rem', fontWeight:600, color:C.primary }}>{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer setPage={setPage}/>
    </div>
  );
}

/* ── CONTATO ── */
function ContatoPage({ setPage }) {
  const [form, setForm] = useState({ nome:'', email:'', assunto:'Suporte Técnico', msg:'' });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.nome || !form.email || !form.msg) { alert('Preencha todos os campos.'); return; }
    setSent(true);
  };

  return (
    <div className="fade-in">
      <section style={{ paddingTop:140, paddingBottom:80 }}>
        <div className="container">
          <div style={{ maxWidth:580, marginBottom:'3rem' }}>
            <Badge>Central de Comunicação</Badge>
            <h1 style={{ fontSize:'clamp(2rem,5vw,3.2rem)', lineHeight:1.1, marginBottom:'1rem' }}>Fale com a nossa<br/><em style={{ color:C.primary }}>Equipe Especialista</em></h1>
            <p style={{ color:C.muted }}>Estamos aqui para ajudar você a escalar seus processos.</p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr .85fr', gap:'3rem', alignItems:'start' }}>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:'2.5rem' }}>
              {sent ? (
                <div style={{ textAlign:'center', padding:'3rem 0' }}>
                  <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>✅</div>
                  <h3 style={{ color:C.primary, marginBottom:'.5rem' }}>Mensagem Enviada!</h3>
                  <p style={{ color:C.muted }}>Nossa equipe entrará em contato em breve.</p>
                  <button className="btn btn-outline btn-sm" style={{ marginTop:'1.5rem' }} onClick={() => setSent(false)}>Enviar outra</button>
                </div>
              ) : (
                <>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1rem' }}>
                    {[['Nome Completo','text','Eric Mario Silva','nome'],['Email','email','seu@email.com','email']].map(([lbl,type,ph,key]) => (
                      <div key={key}>
                        <label style={{ display:'block', fontSize:'.72rem', fontWeight:600, letterSpacing:'.05em', textTransform:'uppercase', color:C.muted, marginBottom:'.4rem' }}>{lbl}</label>
                        <input type={type} placeholder={ph} value={form[key]} onChange={e => setForm({...form,[key]:e.target.value})}
                          style={{ width:'100%', background:C.bg2, border:`1px solid ${C.border}`, borderRadius:8, color:C.text, padding:'.75rem 1rem', fontFamily:'var(--font)', fontSize:'.9rem', outline:'none' }}/>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginBottom:'1rem' }}>
                    <label style={{ display:'block', fontSize:'.72rem', fontWeight:600, letterSpacing:'.05em', textTransform:'uppercase', color:C.muted, marginBottom:'.4rem' }}>Assunto</label>
                    <select value={form.assunto} onChange={e => setForm({...form,assunto:e.target.value})}
                      style={{ width:'100%', background:C.bg2, border:`1px solid ${C.border}`, borderRadius:8, color:C.text, padding:'.75rem 1rem', fontFamily:'var(--font)', fontSize:'.9rem', outline:'none' }}>
                      <option>Suporte Técnico</option><option>Parceria Comercial</option><option>Dúvida sobre o Produto</option><option>Outro</option>
                    </select>
                  </div>
                  <div style={{ marginBottom:'1rem' }}>
                    <label style={{ display:'block', fontSize:'.72rem', fontWeight:600, letterSpacing:'.05em', textTransform:'uppercase', color:C.muted, marginBottom:'.4rem' }}>Mensagem</label>
                    <textarea placeholder="Como podemos ajudar no seu projeto?" value={form.msg} onChange={e => setForm({...form,msg:e.target.value})} rows={5}
                      style={{ width:'100%', background:C.bg2, border:`1px solid ${C.border}`, borderRadius:8, color:C.text, padding:'.75rem 1rem', fontFamily:'var(--font)', fontSize:'.9rem', outline:'none', resize:'vertical' }}/>
                  </div>
                  <button className="btn btn-primary" style={{ width:'100%' }} onClick={handleSubmit}>Enviar Mensagem</button>
                </>
              )}
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:'1.2rem' }}>
              <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:'1.6rem' }}>
                <h3 style={{ fontSize:'1rem', marginBottom:'1rem' }}>🔗 Canais Diretos</h3>
                {[['📧','Email Corporativo','atendimento@primus.com.br'],['📞','Telefone','(800) 525 4887'],['📱','Redes Sociais','LinkedIn · Instagram · YouTube']].map(([ic,t,s]) => (
                  <div key={t} style={{ display:'flex', alignItems:'center', gap:'.75rem', marginBottom:'.9rem' }}>
                    <div style={{ width:36, height:36, borderRadius:8, background:'rgba(4,204,106,.1)', border:'1px solid rgba(4,204,106,.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{ic}</div>
                    <div>
                      <div style={{ fontSize:'.82rem', fontWeight:600, marginBottom:1 }}>{t}</div>
                      <div style={{ fontSize:'.78rem', color:C.muted }}>{s}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:'1.6rem' }}>
                <h3 style={{ fontSize:'1rem', marginBottom:'1rem' }}>❓ Dúvidas Frequentes</h3>
                <div style={{ padding:'.9rem 1.1rem', background:C.card2, borderRadius:8, fontSize:'.88rem', fontWeight:500, border:`1px solid ${C.border}`, cursor:'pointer' }}>
                  Consulte nossa central de ajuda →
                </div>
                <div style={{ marginTop:'.75rem', fontSize:'.72rem', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:C.primary, display:'flex', alignItems:'center', gap:'.4rem' }}>
                  <span style={{ animation:'pulse 2s infinite' }}>●</span> SEDE: SÃO PAULO, BR
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer setPage={setPage}/>
    </div>
  );
}

/* ── DASHBOARD MOCKUP ── */
function DashboardPage({ setPage }) {
  const [activeTab, setActiveTab] = useState('cronograma');
  const [timer, setTimer] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => setTimer(t => t > 0 ? t - 1 : 0), 1000);
    } else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [timerRunning]);

  const fmt = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  const tasks = [
    { subject:'Cálculo II', topic:'Derivadas Parciais', due:'Hoje', progress:65, color:'#04CC6A' },
    { subject:'Física III', topic:'Campo Elétrico',     due:'Amanhã', progress:30, color:'#64FFDA' },
    { subject:'POO', topic:'Herança e Polimorfismo',   due:'Qui',    progress:85, color:'#7C3AED' },
    { subject:'EDs', topic:'Árvores Binárias',         due:'Sex',    progress:10, color:'#F59E0B' },
  ];

  const schedule = [
    { time:'08:00', subject:'Cálculo II', duration:'1h 30min', color:'#04CC6A' },
    { time:'10:00', subject:'Revisão Física', duration:'45min', color:'#64FFDA' },
    { time:'14:00', subject:'POO — Projeto', duration:'2h', color:'#7C3AED' },
    { time:'17:00', subject:'EDs — Lista', duration:'1h', color:'#F59E0B' },
    { time:'20:00', subject:'Flashcards Gerais', duration:'30min', color:'#EC4899' },
  ];

  const sidebarItems = [
    { icon:'📊', label:'Dashboard',   id:'cronograma' },
    { icon:'📅', label:'Cronograma',  id:'cronograma' },
    { icon:'✅', label:'Tarefas',     id:'tarefas'    },
    { icon:'⏱',  label:'Foco',       id:'foco'       },
    { icon:'📈', label:'Progresso',   id:'progresso'  },
  ];

  return (
    <div style={{ minHeight:'100vh', paddingTop:72, background:C.bg, display:'flex' }}>
      {/* SIDEBAR */}
      <div style={{ width:220, background:C.bg2, borderRight:`1px solid ${C.border}`, padding:'1.5rem 0', position:'fixed', top:72, bottom:0, left:0, overflowY:'auto', zIndex:50 }}>
        <div style={{ padding:'0 1rem', marginBottom:'1.5rem' }}>
          <div style={{ fontSize:'.65rem', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', color:C.muted, marginBottom:'.75rem' }}>Menu Principal</div>
          {sidebarItems.map(s => (
            <div key={s.label} onClick={() => setActiveTab(s.id)}
              style={{ display:'flex', alignItems:'center', gap:'.75rem', padding:'.7rem .9rem', borderRadius:8, marginBottom:'.25rem', cursor:'pointer', background: activeTab === s.id ? 'rgba(4,204,106,.1)' : 'transparent', color: activeTab === s.id ? C.primary : C.muted, fontWeight: activeTab === s.id ? 600 : 400, fontSize:'.88rem', transition:'all .2s', border: activeTab===s.id ? `1px solid rgba(4,204,106,.2)` : '1px solid transparent' }}>
              <span>{s.icon}</span>{s.label}
            </div>
          ))}
        </div>
        <div style={{ padding:'0 1rem', borderTop:`1px solid ${C.border}`, paddingTop:'1rem', marginTop:'.5rem' }}>
          <div style={{ fontSize:'.65rem', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', color:C.muted, marginBottom:'.75rem' }}>Configurações</div>
          {['⚙️ Preferências','🔔 Notificações','🚪 Sair do App'].map(i => (
            <div key={i} style={{ padding:'.65rem .9rem', borderRadius:8, fontSize:'.85rem', color:C.muted, cursor:'pointer', marginBottom:'.2rem' }}
              onClick={() => i.includes('Sair') && setPage('home')}>{i}</div>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div style={{ marginLeft:220, flex:1, padding:'2rem', minHeight:'calc(100vh - 72px)' }}>
        {/* TOP BAR */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem' }}>
          <div>
            <h2 style={{ fontSize:'1.5rem', fontWeight:700 }}>Bom dia, Guilherme! 👋</h2>
            <p style={{ color:C.muted, fontSize:'.85rem', margin:0 }}>Você tem 4 matérias para revisar hoje.</p>
          </div>
          <div style={{ display:'flex', gap:'.75rem', alignItems:'center' }}>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:8, padding:'.5rem 1rem', fontSize:'.82rem', color:C.muted }}>
              📅 Seg, 16 Jun 2026
            </div>
            <div style={{ width:36, height:36, borderRadius:'50%', background:'rgba(4,204,106,.15)', border:`2px solid ${C.primary}`, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'.85rem', color:C.primary }}>G</div>
          </div>
        </div>

        {/* QUICK STATS */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', marginBottom:'2rem' }}>
          {[
            { icon:'🔥', val:'7 dias', label:'Sequência Atual', color:'#F59E0B' },
            { icon:'✅', val:'3/5', label:'Tarefas Hoje', color:C.primary },
            { icon:'⏱', val:'3h 20min', label:'Tempo de Foco', color:C.tertiary },
            { icon:'📈', val:'+12%', label:'vs. Semana Passada', color:'#7C3AED' },
          ].map(s => (
            <div key={s.label} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:'1.2rem', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:s.color }}/>
              <div style={{ fontSize:'1.4rem', marginBottom:'.4rem' }}>{s.icon}</div>
              <div style={{ fontSize:'1.4rem', fontWeight:700, color:s.color, marginBottom:'.2rem' }}>{s.val}</div>
              <div style={{ fontSize:'.72rem', color:C.muted, fontWeight:600, letterSpacing:'.05em', textTransform:'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:'1.5rem' }}>

          {/* CRONOGRAMA */}
          <div>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:'1.5rem', marginBottom:'1.5rem' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.2rem' }}>
                <h3 style={{ fontSize:'.95rem' }}>📅 Cronograma de Hoje</h3>
                <span style={{ fontSize:'.72rem', color:C.primary, fontWeight:600, cursor:'pointer' }}>Ver tudo →</span>
              </div>
              {schedule.map(s => (
                <div key={s.time} style={{ display:'flex', alignItems:'center', gap:'.75rem', padding:'.7rem', borderRadius:8, marginBottom:'.5rem', background:C.card2, border:`1px solid ${C.border}` }}>
                  <div style={{ fontSize:'.7rem', fontFamily:'monospace', color:C.muted, width:40, flexShrink:0 }}>{s.time}</div>
                  <div style={{ width:3, height:36, borderRadius:2, background:s.color, flexShrink:0 }}/>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:'.88rem', fontWeight:600, marginBottom:1 }}>{s.subject}</div>
                    <div style={{ fontSize:'.72rem', color:C.muted }}>{s.duration}</div>
                  </div>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:s.color }}/>
                </div>
              ))}
            </div>

            {/* TASKS */}
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:'1.5rem' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.2rem' }}>
                <h3 style={{ fontSize:'.95rem' }}>✅ Matérias para Estudar</h3>
                <button className="btn btn-primary btn-sm">+ Adicionar</button>
              </div>
              {tasks.map(t => (
                <div key={t.subject} style={{ background:C.card2, border:`1px solid ${C.border}`, borderRadius:10, padding:'1rem', marginBottom:'.7rem' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'.6rem' }}>
                    <div>
                      <div style={{ fontSize:'.9rem', fontWeight:600, marginBottom:2 }}>{t.subject}</div>
                      <div style={{ fontSize:'.75rem', color:C.muted }}>{t.topic}</div>
                    </div>
                    <div style={{ fontSize:'.7rem', fontWeight:600, padding:'3px 8px', borderRadius:99, background:'rgba(4,204,106,.1)', color:C.primary }}>{t.due}</div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'.75rem' }}>
                    <div style={{ flex:1, height:5, background:'rgba(255,255,255,.08)', borderRadius:99, overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${t.progress}%`, background:t.color, borderRadius:99, transition:'width .5s' }}/>
                    </div>
                    <span style={{ fontSize:'.72rem', color:C.muted, width:32, textAlign:'right' }}>{t.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TIMER + IA */}
          <div>
            {/* POMODORO */}
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:'1.5rem', marginBottom:'1.5rem', textAlign:'center' }}>
              <h3 style={{ fontSize:'.95rem', marginBottom:'1.5rem' }}>⏱ Timer de Foco</h3>
              <div style={{ position:'relative', width:140, height:140, margin:'0 auto 1.5rem' }}>
                <svg width="140" height="140" style={{ transform:'rotate(-90deg)' }}>
                  <circle cx="70" cy="70" r="60" fill="none" stroke={C.border} strokeWidth="6"/>
                  <circle cx="70" cy="70" r="60" fill="none" stroke={C.primary} strokeWidth="6"
                    strokeDasharray={`${2*Math.PI*60}`}
                    strokeDashoffset={`${2*Math.PI*60*(1 - timer/(25*60))}`}
                    strokeLinecap="round" style={{ transition:'stroke-dashoffset .5s' }}/>
                </svg>
                <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontFamily:'monospace', fontSize:'1.8rem', fontWeight:700, color:C.text }}>{fmt(timer)}</div>
              </div>
              <div style={{ fontSize:'.8rem', color:C.muted, marginBottom:'1.2rem' }}>Sessão de Pomodoro — 25 min</div>
              <div style={{ display:'flex', gap:'.75rem', justifyContent:'center' }}>
                <button className="btn btn-primary btn-sm" onClick={() => setTimerRunning(r => !r)}>{timerRunning ? '⏸ Pausar' : '▶ Iniciar'}</button>
                <button className="btn btn-outline btn-sm" onClick={() => { setTimer(25*60); setTimerRunning(false); }}>↺ Reset</button>
              </div>
            </div>

            {/* IA SUGGESTIONS */}
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:'1.5rem' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'.5rem', marginBottom:'1.2rem' }}>
                <div style={{ width:28, height:28, borderRadius:8, background:'rgba(4,204,106,.12)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.85rem' }}>🤖</div>
                <h3 style={{ fontSize:'.95rem' }}>Sugestões da IA</h3>
              </div>
              {[
                { text:'Você está indo bem em POO! Tente avançar para Interfaces hoje.', type:'success' },
                { text:'Física III precisa de atenção — recomendo +30 min amanhã.', type:'warn' },
                { text:'Ótimo momento para revisar Cálculo: seu pico de foco é às 14h.', type:'info' },
              ].map((s,i) => (
                <div key={i} style={{ background:C.card2, borderRadius:8, padding:'.85rem', marginBottom:'.6rem', borderLeft:`3px solid ${s.type==='success'?C.primary:s.type==='warn'?'#F59E0B':C.tertiary}` }}>
                  <p style={{ fontSize:'.82rem', color:C.muted, margin:0, lineHeight:1.6 }}>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── FOOTER ── */
function Footer({ setPage }) {
  return (
    <footer style={{ background:C.bg2, borderTop:`1px solid ${C.border}`, padding:'3rem 0 1.5rem' }}>
      <div className="container">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'.75rem', paddingTop:'1rem', fontSize:'.78rem', color:C.muted }}>
          <div style={{ fontSize:'1.1rem', fontWeight:700, color:C.primary }}>PRIMUS</div>
          <span>© 2024 Primus Hyper-Intelligence. Todos os direitos reservados.</span>
          <div style={{ display:'flex', gap:'1.5rem' }}>
            {['Privacidade','Termos','Ajuda'].map(l => <span key={l} style={{ cursor:'pointer', transition:'color .2s' }}>{l}</span>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ══ APP ROOT ══ */
function App() {
  const [page, setPage] = useState('home');

  const changePage = (id) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar currentPage={page} setPage={changePage}/>
      {page === 'home'      && <HomePage    setPage={changePage}/>}
      {page === 'como'      && <ComoPage    setPage={changePage}/>}
      {page === 'sobre'     && <SobrePage   setPage={changePage}/>}
      {page === 'contato'   && <ContatoPage setPage={changePage}/>}
      {page === 'dashboard' && <DashboardPage setPage={changePage}/>}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
