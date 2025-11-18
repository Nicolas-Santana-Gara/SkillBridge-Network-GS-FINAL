export default function FilterBar({
  searchText, setSearchText,
  area, setArea,
  cidade, setCidade,
  tech, setTech,
  areas, cidades, tecnologias,
  total, filtrados
}) {
  return (
    <div className="card">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-end">
        <div className="flex-1">
          <label className="block text-xs mb-1 text-zinc-500 dark:text-zinc-300">Busca</label>
          <input
            value={searchText}
            onChange={(e)=>setSearchText(e.target.value)}
            placeholder="Nome, cargo..."
            className="w-full rounded-xl border px-3 py-2 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
          <div>
            <label className="block text-xs mb-1 text-zinc-500 dark:text-zinc-300">Área</label>
            <select
              value={area}
              onChange={(e)=>setArea(e.target.value)}
              className="w-full rounded-xl border px-3 py-2 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"
            >
              <option value="">Todas</option>
              {areas.map((a)=>(<option key={a} value={a}>{a}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-xs mb-1 text-zinc-500 dark:text-zinc-300">Cidade</label>
            <select
              value={cidade}
              onChange={(e)=>setCidade(e.target.value)}
              className="w-full rounded-xl border px-3 py-2 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"
            >
              <option value="">Todas</option>
              {cidades.map((c)=>(<option key={c} value={c}>{c}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-xs mb-1 text-zinc-500 dark:text-zinc-300">Tecnologia</label>
            <select
              value={tech}
              onChange={(e)=>setTech(e.target.value)}
              className="w-full rounded-xl border px-3 py-2 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"
            >
              <option value="">Todas</option>
              {tecnologias.map((t)=>(<option key={t} value={t}>{t}</option>))}
            </select>
          </div>
        </div>
      </div>
      <div className="text-xs text-zinc-500 dark:text-zinc-300 mt-3">
        Mostrando <span className="font-semibold">{filtrados}</span> de <span className="font-semibold">{total}</span> profissionais.
      </div>
    </div>
  )
}
