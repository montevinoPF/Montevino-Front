

export default function Features() {
    return (
        <div className="flex justify-center items-center w-full py-10">
            <div>
                <div className="flex justify-center items-center w-full py-10">
                    <div className="flex items-center space-x-6 px-16 py-4 bg-gradient-to-b from-white/40 to-amber-100/20 backdrop-blur-md border border-white/60 rounded-2xl shadow-sm">

                        <a href="#" className="flex items-center text-stone-800 hover:text-stone-600 transition-colors">
                            <span className="mr-2 text-sm italic">🌿</span>
                            <span className="text-sm font-medium">Reservas</span>
                        </a>

                        <span className="text-stone-400">•</span>

                        <a href="#" className="text-sm font-medium text-stone-800 hover:text-stone-600 transition-colors">
                            Menú con fotos
                        </a>

                        <span className="text-stone-400">•</span>

                        <a href="#" className="text-sm font-medium text-stone-800 hover:text-stone-600 transition-colors">
                            Seña online
                        </a>

                    </div>
                </div>
            </div>
        </div>
    )
}