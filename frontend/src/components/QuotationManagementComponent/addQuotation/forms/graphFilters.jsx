import { useState } from 'react';

export default function CarFilterComponent() {
  const [priceRange, setPriceRange] = useState([20000, 60000]);
  const [mileageRange, setMileageRange] = useState([20000, 80000]);
  const [yearRange, setYearRange] = useState([2019, 2025]);

  const handleReset = (filter) => {
    switch (filter) {
      case 'price':
        setPriceRange([20000, 60000]);
        break;
      case 'mileage':
        setMileageRange([20000, 80000]);
        break;
      case 'year':
        setYearRange([2019, 2025]);
        break;
    }
  };

  // Mock data for histogram charts
  const Filters = (min, max, peak1, peak2) => {
    const data = [];
    for (let i = 0; i < 30; i++) {
      let height = Math.random() * 0.5 + 0.1;
      
      // Create slight peaks at certain positions
      if (i === peak1 || i === peak2) {
        height = 0.9;
      } else if (i === peak1 - 1 || i === peak1 + 1 || i === peak2 - 1 || i === peak2 + 1) {
        height = 0.7;
      } else if (i === peak1 - 2 || i === peak1 + 2 || i === peak2 - 2 || i === peak2 + 2) {
        height = 0.5;
      }
      
      data.push(height);
    }
    return data;
  };

  const priceData = Filters(0, 100000, 5, 25);
  const mileageData = Filters(0, 100000, 8, 22);
  const yearData = Filters(2010, 2025, 10, 27);

  return (
    <div className="flex flex-row justify-between gap-4 w-full max-w-4xl">
      {/* Price Filter */}
      <FilterCard 
        title="Price" 
        data={priceData}
        minValue={priceRange[0]}
        maxValue={priceRange[1]}
        unit="CHF"
        onReset={() => handleReset('price')}
        onMinChange={(val) => setPriceRange([parseInt(val), priceRange[1]])}
        onMaxChange={(val) => setPriceRange([priceRange[0], parseInt(val)])}
      />
      
      {/* Mileage Filter */}
      <FilterCard 
        title="Mileage" 
        data={mileageData}
        minValue={mileageRange[0]}
        maxValue={mileageRange[1]}
        unit="km"
        onReset={() => handleReset('mileage')}
        onMinChange={(val) => setMileageRange([parseInt(val), mileageRange[1]])}
        onMaxChange={(val) => setMileageRange([mileageRange[0], parseInt(val)])}
      />
      
      {/* Year Filter */}
      <FilterCard 
        title="Year" 
        data={yearData}
        minValue={yearRange[0]}
        maxValue={yearRange[1]}
        unit=""
        onReset={() => handleReset('year')}
        onMinChange={(val) => setYearRange([parseInt(val), yearRange[1]])}
        onMaxChange={(val) => setYearRange([yearRange[0], parseInt(val)])}
      />
    </div>
  );
}

function FilterCard({ title, data, minValue, maxValue, unit, onReset, onMinChange, onMaxChange }) {
  // Calculate the percentage position for range thumbs
  const minPosition = 0;
  const maxPosition = 100;
  
  return (
    <div className="flex-1 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <button 
          onClick={onReset}
          className="text-sm text-red-400 hover:text-red-500 font-medium"
        >
          Reset
        </button>
      </div>
      
      {/* Histogram Chart */}
      <div className="relative h-24 mb-6 mt-4">
        <div className="absolute inset-0 flex items-end">
          {data.map((value, index) => (
            <div 
              key={index}
              className="flex-1 mx-px bg-blue-400"
              style={{ 
                height: `${value * 100}%`,
                opacity: index < data.length / 3 ? 0.3 : 
                         (index > (data.length * 2/3) ? 0.3 : 1)
              }}
            />
          ))}
        </div>
        
        {/* Range Slider Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full h-full relative">
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded"></div>
            <div className="absolute bottom-0 left-1 w-6 h-6 -mb-3 -ml-3 rounded-full border-2 border-blue-500 bg-white cursor-pointer flex items-center justify-center shadow-md">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <div className="absolute bottom-0 right-1 w-6 h-6 -mb-3 -mr-3 rounded-full border-2 border-blue-500 bg-white cursor-pointer flex items-center justify-center shadow-md">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Min/Max Labels */}
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>Min</span>
        <span>Max</span>
      </div>
      
      {/* Min/Max Inputs */}
      <div className="flex items-center gap-2">
        <div className="relative flex items-center flex-1">
          <input
            type="text"
            value={minValue}
            onChange={(e) => onMinChange(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 text-sm"
          />
          {unit && (
            <span className="absolute right-2 text-sm text-gray-500">{unit}</span>
          )}
        </div>
        
        <div className="relative flex items-center flex-1">
          <input
            type="text"
            value={maxValue}
            onChange={(e) => onMaxChange(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 text-sm"
          />
          {unit && (
            <span className="absolute right-2 text-sm text-gray-500">{unit}</span>
          )}
        </div>
      </div>
    </div>
  );
}