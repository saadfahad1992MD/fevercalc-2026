export function SyringeVisual({ volume, maxVolume = 10 }) {
  // Calculate percentage for visual representation
  const percentage = Math.min((volume / maxVolume) * 100, 100)
  
  return (
    <div className="flex items-center justify-center gap-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
      {/* Syringe Visual */}
      <div className="relative">
        {/* Syringe body */}
        <div className="relative w-32 h-64 bg-white border-4 border-gray-700 rounded-lg overflow-hidden shadow-lg">
          {/* Measurement marks */}
          <div className="absolute inset-0 flex flex-col justify-between p-2">
            {[10, 8, 6, 4, 2, 0].map((mark) => (
              <div key={mark} className="flex items-center justify-between text-xs font-bold text-gray-600">
                <span className="w-2 h-0.5 bg-gray-400"></span>
                <span>{mark}ml</span>
                <span className="w-2 h-0.5 bg-gray-400"></span>
              </div>
            ))}
          </div>
          
          {/* Liquid fill */}
          <div 
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-400 to-blue-300 transition-all duration-500 ease-out"
            style={{ height: `${percentage}%` }}
          >
            {/* Animated bubbles */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute w-2 h-2 bg-white rounded-full opacity-40 animate-pulse" style={{ left: '20%', bottom: '30%' }}></div>
              <div className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-30 animate-pulse" style={{ left: '60%', bottom: '50%', animationDelay: '0.3s' }}></div>
              <div className="absolute w-1 h-1 bg-white rounded-full opacity-50 animate-pulse" style={{ left: '40%', bottom: '70%', animationDelay: '0.6s' }}></div>
            </div>
          </div>
        </div>
        
        {/* Plunger */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-16 h-4 bg-gray-600 rounded-b-lg transition-all duration-500"
          style={{ top: `${100 - percentage}%` }}
        >
          <div className="w-full h-2 bg-gray-700 rounded-t"></div>
        </div>
        
        {/* Needle tip */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-1 h-8 bg-gray-400"></div>
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-gray-400"></div>
      </div>
      
      {/* Dose indicator */}
      <div className="flex flex-col items-center">
        <div className="text-sm font-semibold text-gray-600 mb-2">💊 DOSE</div>
        <div className="text-5xl font-bold text-blue-600 animate-pulse">
          {volume}
        </div>
        <div className="text-2xl font-bold text-blue-500">ml</div>
      </div>
    </div>
  )
}

