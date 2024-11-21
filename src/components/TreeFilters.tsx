interface TreeFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  filters: FilterOptions;
}

export interface FilterOptions {
  energySensors: boolean;
  criticalStatus: boolean;
}

export const TreeFilters = ({ onFilterChange, filters }: TreeFiltersProps) => {
  const toggleFilter = (key: keyof FilterOptions) => {
    onFilterChange({
      ...filters,
      [key]: !filters[key],
    });
  };

  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => toggleFilter('energySensors')}
        className={`px-3 py-1 text-sm rounded-lg border ${
          filters.energySensors
            ? 'bg-blue-500 text-white border-blue-500'
            : 'bg-white text-gray-700 border-gray-300'
        }`}
      >
        Sensores de Energia
      </button>
      <button
        onClick={() => toggleFilter('criticalStatus')}
        className={`px-3 py-1 text-sm rounded-lg border ${
          filters.criticalStatus
            ? 'bg-red-500 text-white border-red-500'
            : 'bg-white text-gray-700 border-gray-300'
        }`}
      >
        Status Crítico
      </button>
    </div>
  );
};
