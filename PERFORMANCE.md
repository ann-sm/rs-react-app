# Performance Optimization Report

## Baseline Measurements

### Interaction A: Sort countries

- **Commit duration**: n/a
- **Render duration**: 283 ms
- **Screenshot**: ![screenshot](/screenshots/baseline/sort-countries.png)

### Interaction B: Search countries

- **Commit duration**: n/a
- **Render duration**: 127.6 ms
- **Screenshot**: ![screenshot](/screenshots/baseline/search-countries.png)

### Interaction C: Change year

- **Commit duration**: n/a
- **Render duration**: 273.1 ms
- **Screenshot**: ![screenshot](/screenshots/baseline/change-year.png)

### Interaction D: Toggle column

- **Commit duration**: n/a
- **Render duration**: 252.4 ms
- **Screenshot**: ![screenshot](/screenshots/baseline/toggle-column.png)

## Optimized Measurements

### Interaction A: Sort countries

- **Commit duration**: n/a
- **Render duration**: 25.4 ms
- **Screenshot**: ![screenshot](/screenshots/optimized/sort-countries.png)

### Interaction B: Search countries

- **Commit duration**: n/a
- **Render duration**: 25.6 ms
- **Screenshot**: ![screenshot](/screenshots/optimized/search-countries.png)

### Interaction C: Change year

- **Commit duration**: n/a
- **Render duration**: 49.3 ms
- **Screenshot**: ![screenshot](/screenshots/optimized/change-year.png)

### Interaction D: Toggle column

- **Commit duration**: n/a
- **Render duration**: 12.6 ms
- **Screenshot**: ![screenshot](/screenshots/optimized/toggle-column.png)

## Summary of Improvement

| Interaction      | Baseline (ms) | Optimized (ms) | Improvement |
|------------------|---------------|----------------|-------------|
| Sort countries   | 283.0         | 25.4           | 91.0%       |
| Search countries | 127.6         | 25.6           | 79.9%       |
| Change year      | 273.1         | 49.3           | 81.9%       |
| Toggle column    | 252.4         | 12.6           | 95.0%       |
| **Average**      | **234.0**     | **28.2**       | **87.0%**   |