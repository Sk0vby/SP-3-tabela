import { useState } from "react";

const DEPARTMENT_ALL = "";

const DEPARTMENT_OPTIONS = [
  { value: DEPARTMENT_ALL, label: "Wszystkie" },
  { value: "IT", label: "IT" },
  { value: "Sprzedaż", label: "Sprzedaż" },
  { value: "Księgowość", label: "Księgowość" },
];

const INITIAL_EMPLOYEES = [
  { id: 1, imie: "Anna", nazwisko: "Kowalska", dzial: "IT", pensja: 7200 },
  { id: 2, imie: "Piotr", nazwisko: "Nowak", dzial: "Sprzedaż", pensja: 5400 },
  { id: 3, imie: "Maria", nazwisko: "Wiśniewska", dzial: "Księgowość", pensja: 6100 },
  { id: 4, imie: "Jan", nazwisko: "Kowalczyk", dzial: "IT", pensja: 8300 },
  { id: 5, imie: "Katarzyna", nazwisko: "Zielińska", dzial: "Sprzedaż", pensja: 5900 },
  { id: 6, imie: "Tomasz", nazwisko: "Szymański", dzial: "IT", pensja: 9100 },
  { id: 7, imie: "Agnieszka", nazwisko: "Woźniak", dzial: "Księgowość", pensja: 6400 },
  { id: 8, imie: "Michał", nazwisko: "Kaczmarek", dzial: "Sprzedaż", pensja: 5200 },
  { id: 9, imie: "Magdalena", nazwisko: "Mazur", dzial: "IT", pensja: 7800 },
  { id: 10, imie: "Paweł", nazwisko: "Krawczyk", dzial: "Księgowość", pensja: 6000 },
  { id: 11, imie: "Joanna", nazwisko: "Piotrowska", dzial: "Sprzedaż", pensja: 5600 },
  { id: 12, imie: "Łukasz", nazwisko: "Grabowski", dzial: "IT", pensja: 8700 },
];

function normalizeSearchText(text) {
  return text.trim().toLowerCase();
}

function filterEmployees(employees, searchText, selectedDepartment) {
  const normalizedSearch = normalizeSearchText(searchText);

  return employees.filter((employee) => {
    const matchesSurname = employee.nazwisko
      .toLowerCase()
      .includes(normalizedSearch);
    const matchesDepartment =
      selectedDepartment === DEPARTMENT_ALL ||
      employee.dzial === selectedDepartment;

    return matchesSurname && matchesDepartment;
  });
}

function App() {
  const [employees] = useState(INITIAL_EMPLOYEES);
  const [searchText, setSearchText] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(DEPARTMENT_ALL);

  const visibleEmployees = filterEmployees(
    employees,
    searchText,
    selectedDepartment
  );

  function handleFilterChange(nextSearchText, nextDepartment) {
    const resultsCount = filterEmployees(
      employees,
      nextSearchText,
      nextDepartment
    ).length;
    console.log(`Wyniki: ${resultsCount}`);
  }

  function handleSearchChange(event) {
    const nextSearchText = event.target.value;
    setSearchText(nextSearchText);
    handleFilterChange(nextSearchText, selectedDepartment);
  }

  function handleDepartmentChange(event) {
    const nextDepartment = event.target.value;
    setSelectedDepartment(nextDepartment);
    handleFilterChange(searchText, nextDepartment);
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Pracownicy</h2>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label htmlFor="searchInput" className="form-label">
            Szukaj:
          </label>
          <input
            id="searchInput"
            type="text"
            className="form-control"
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="departmentSelect" className="form-label">
            Dział:
          </label>
          <select
            id="departmentSelect"
            className="form-select"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
          >
            {DEPARTMENT_OPTIONS.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="fw-semibold">Liczba pracowników: {visibleEmployees.length}</p>

      {visibleEmployees.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          Brak pracowników spełniających kryteria
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">Imię</th>
                <th scope="col">Nazwisko</th>
                <th scope="col">Dział</th>
                <th scope="col">Pensja</th>
              </tr>
            </thead>
            <tbody>
              {visibleEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.imie}</td>
                  <td>{employee.nazwisko}</td>
                  <td>{employee.dzial}</td>
                  <td>{employee.pensja}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
