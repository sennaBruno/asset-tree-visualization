interface TreeFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  filters: FilterOptions;
}

export interface FilterOptions {
  energySensors: boolean;
  criticalStatus: boolean;
}

export const TreeFilters = ({ onFilterChange, filters }: TreeFiltersProps) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onFilterChange({ ...filters, energySensors: !filters.energySensors })}
        className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
          ${
            filters.energySensors
              ? 'bg-blue-50 text-blue-700 border border-blue-200'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
      >
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Sensor de Energia
      </button>
      <button
        onClick={() => onFilterChange({ ...filters, criticalStatus: !filters.criticalStatus })}
        className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
          ${
            filters.criticalStatus
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
      >
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        Crítico
      </button>
    </div>
  );
};
