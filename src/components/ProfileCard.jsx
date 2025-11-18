export default function ProfileCard({ profile, onOpen }) {
  return (
    <button onClick={()=>onOpen(profile)}
      className="card text-left w-full">
      <div className="flex items-center gap-4">
        <img src={profile.foto} alt={profile.nome} className="h-16 w-16 rounded-xl object-cover bg-zinc-200 dark:bg-zinc-700" />
        <div className="flex-1">
          <div className="font-semibold text-zinc-900 dark:text-zinc-100">{profile.nome}</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-300">{profile.cargo}</div>
          <div className="flex flex-wrap gap-2 mt-2">
            {profile.habilidadesTecnicas.slice(0,3).map((s)=>(
              <span key={s} className="badge">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </button>
  )
}
