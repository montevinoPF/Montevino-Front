
interface ProfileInfoProps {
  name: string;
  email: string;
}

export default function ProfileInfo({
  name,
  email,
}: ProfileInfoProps) {
  return (
    <div className="rounded-3xl border border-[#e7d8d1] bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-slate-800">
        Información personal
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm text-slate-500">Nombre</p>
          <p className="font-medium text-slate-800">{name}</p>
        </div>

        <div className="sm:col-span-2">
          <p className="text-sm text-slate-500">Email</p>
          <p className="font-medium text-slate-800">{email}</p>
        </div>
      </div>

      
    </div>
  );
}
 
