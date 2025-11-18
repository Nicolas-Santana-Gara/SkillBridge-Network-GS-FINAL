import { useEffect, useState } from 'react'

export default function ProfileModal({ profile, onClose, onRecommend }) {
  const [msgOpen, setMsgOpen] = useState(false)
  const [form, setForm] = useState({ nome:'', email:'', mensagem:'' })

  useEffect(()=>{
    function onEsc(e){ if(e.key==='Escape') onClose() }
    document.addEventListener('keydown', onEsc)
    return ()=>document.removeEventListener('keydown', onEsc)
  }, [onClose])

  if(!profile) return null

  function saveMessage(e){
    e.preventDefault()
    const payload = { ...form, profileId: profile.id, data: new Date().toISOString() }
    const key = 'fwk-mensagens'
    const arr = JSON.parse(localStorage.getItem(key) || '[]')
    arr.push(payload)
    localStorage.setItem(key, JSON.stringify(arr))
    setMsgOpen(false)
    setForm({nome:'', email:'', mensagem:''})
    alert('Mensagem enviada! ✅')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 max-h-[90vh] overflow-y-auto w-full max-w-3xl card">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{profile.nome}</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{profile.cargo} · {profile.localizacao}</p>
          </div>
          <button onClick={onClose} className="text-2xl leading-none px-2">×</button>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-[160px,1fr] gap-4">
          <img src={profile.foto} alt={profile.nome} className="w-full h-40 object-cover rounded-xl bg-zinc-200 dark:bg-zinc-700" />

          <div className="space-y-4">
            <section>
              <h3 className="font-medium mb-1">Resumo</h3>
              <p className="text-sm text-zinc-700 dark:text-zinc-200">{profile.resumo}</p>
            </section>

            <section className="grid sm:grid-cols-2 gap-3">
              <div>
                <h4 className="font-medium">Habilidades técnicas</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.habilidadesTecnicas.map(s=>(<span key={s} className="badge">{s}</span>))}
                </div>
              </div>
              <div>
                <h4 className="font-medium">Soft skills & hobbies</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.softSkills.map(s=>(<span key={s} className="badge">{s}</span>))}
                  {profile.hobbies?.map(h=>(<span key={h} className="badge">{h}</span>))}
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <section className="card">
            <h4 className="font-medium mb-2">Experiências</h4>
            <ul className="space-y-2 text-sm">
              {profile.experiencias.map((exp, idx)=>(
                <li key={idx} className="rounded-lg bg-zinc-50 dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-700">
                  <div className="font-medium">{exp.empresa} — {exp.cargo}</div>
                  <div className="text-xs text-zinc-500">{exp.inicio} • {exp.fim || 'Atual'}</div>
                  <p className="mt-1">{exp.descricao}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="card">
            <h4 className="font-medium mb-2">Formação</h4>
            <ul className="space-y-2 text-sm">
              {profile.formacao.map((f, idx)=>(
                <li key={idx} className="rounded-lg bg-zinc-50 dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-700">
                  <div className="font-medium">{f.curso}</div>
                  <div className="text-xs text-zinc-500">{f.instituicao} — {f.ano}</div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <section className="card">
            <h4 className="font-medium mb-2">Projetos</h4>
            <ul className="space-y-2 text-sm">
              {profile.projetos.map((p, idx)=>(
                <li key={idx} className="rounded-lg bg-zinc-50 dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-700">
                  <div className="font-medium">{p.titulo}</div>
                  <a className="text-xs text-blue-600 underline break-all" href={p.link} target="_blank" rel="noreferrer">{p.link}</a>
                  <p className="mt-1">{p.descricao}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="card">
            <h4 className="font-medium mb-2">Idiomas & Certificações</h4>
            <div className="flex flex-wrap gap-2 mb-2">
              {profile.certificacoes.map((c)=>(<span key={c} className="badge">{c}</span>))}
            </div>
            <ul className="space-y-2 text-sm">
              {profile.idiomas.map((i, idx)=>(
                <li key={idx} className="rounded-lg bg-zinc-50 dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-700">
                  <div className="font-medium">{i.idioma}</div>
                  <div className="text-xs text-zinc-500">Nível: {i.nivel}</div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={()=>onRecommend(profile.id)}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">
            ⭐ Recomendar profissional
          </button>
          <button onClick={()=>setMsgOpen(v=>!v)}
            className="rounded-xl border px-4 py-2 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700">
            ✉️ Enviar mensagem
          </button>
        </div>

        {msgOpen && (
          <form onSubmit={saveMessage} className="mt-4 grid gap-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <input required value={form.nome} onChange={(e)=>setForm({...form, nome:e.target.value})}
                placeholder="Seu nome"
                className="rounded-xl border px-3 py-2 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700" />
              <input required type="email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})}
                placeholder="Seu e-mail"
                className="rounded-xl border px-3 py-2 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700" />
            </div>
            <textarea required value={form.mensagem} onChange={(e)=>setForm({...form, mensagem:e.target.value})}
              placeholder="Escreva sua mensagem..."
              className="rounded-xl border px-3 py-2 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 min-h-[100px]" />
            <div className="flex gap-2">
              <button type="submit" className="rounded-xl bg-green-600 hover:bg-green-700 text-white px-4 py-2">Enviar</button>
              <button type="button" onClick={()=>setMsgOpen(false)} className="rounded-xl border px-4 py-2">Cancelar</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
