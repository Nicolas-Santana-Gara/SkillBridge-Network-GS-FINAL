import { useEffect, useMemo, useState } from 'react'
import themetoggle from './components/ThemeToggle.jsx'
import filterbar from './components/FilterBar.jsx'
import profilecard from './components/ProfileCard.jsx'
import profilemodal from './components/ProfileModal.jsx'

export default function App() {
  const [all, setAll] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [area, setArea] = useState('')
  const [cidade, setCidade] = useState('')
  const [tech, setTech] = useState('')
  const [toast, setToast] = useState('')

  const [recs, setRecs] = useState(()=>{
    const key = 'fwk-recs'
    return JSON.parse(localStorage.getItem(key) || '{}')
  })
  useEffect(()=>{
    localStorage.setItem('fwk-recs', JSON.stringify(recs))
  }, [recs])

  useEffect(()=>{
    async function load(){
      try{
        setLoading(true)
        const res = await fetch('/data/profissionais.json', { cache: 'no-store' })
        if(!res.ok) throw new Error('Falha ao carregar dados')
        const data = await res.json()
        setAll(data)
      }catch(e){
        setError(e.message)
      }finally{
        setLoading(false)
      }
    }
    load()
  }, [])

  const areas = useMemo(()=>Array.from(new Set(all.map(p=>p.area))).sort(), [all])
  const cidades = useMemo(()=>Array.from(new Set(all.map(p=>p.localizacao))).sort(), [all])
  const tecnologias = useMemo(()=>Array.from(new Set(all.flatMap(p=>p.habilidadesTecnicas))).sort(), [all])

  const filtered = useMemo(()=>{
    return all.filter(p=>{
      const s = searchText.trim().toLowerCase()
      const matchesText = !s || [p.nome, p.cargo, p.resumo].some(v=>v.toLowerCase().includes(s))
      const matchesArea = !area || p.area === area
      const matchesCidade = !cidade || p.localizacao === cidade
      const matchesTech = !tech || p.habilidadesTecnicas.includes(tech)
      return matchesText && matchesArea && matchesCidade && matchesTech
    })
  }, [all, searchText, area, cidade, tech])

  function recommend(id){
    setRecs(prev=>{
      const next = { ...prev, [id]: (prev[id]||0) + 1 }
      setToast('Recomendação registrada! ⭐')
      setTimeout(()=>setToast(''), 1800)
      return next
    })
  }

  return (
    <div className="min-h-screen text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="container-max py-4 flex items-center justify-between gap-3">
          <h1 className="text-xl font-semibold">SkillBridge Network</h1>
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container-max py-6 space-y-4">
        <FilterBar
          searchText={searchText} setSearchText={setSearchText}
          area={area} setArea={setArea}
          cidade={cidade} setCidade={setCidade}
          tech={tech} setTech={setTech}
          areas={areas} cidades={cidades} tecnologias={tecnologias}
          total={all.length} filtrados={filtered.length}
        />

        {loading && <div className="card">Carregando perfis...</div>}
        {error && <div className="card text-red-600">Erro: {error}</div>}

        <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(p=>(
            <div key={p.id} className="relative">
              <ProfileCard profile={p} onOpen={setSelected} />
              <div className="absolute top-2 right-2 text-xs badge">⭐ {recs[p.id]||0}</div>
            </div>
          ))}
        </section>
      </main>

      {selected && (
        <ProfileModal
          profile={selected}
          onClose={()=>setSelected(null)}
          onRecommend={recommend}
        />
      )}

      {!!toast && <div className="toast">{toast}</div>}
    </div>
  )
}
