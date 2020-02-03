import React from 'react';

const FilterInput = ({newFilter, handleFilterChange}) => (
    <div>
    Filter shown with: <input 
    value={newFilter}
    onChange={handleFilterChange}
    />
  </div>
  )

export default FilterInput