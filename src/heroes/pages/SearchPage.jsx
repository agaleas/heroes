import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../components";
import queryString from 'query-string';
import { getHeroesByName } from "../helpers";

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);
  const heroes = getHeroesByName(q);

  const showSearch = (q.length === 0);
  const showError = (q.length > 0 && heroes.length === 0);

  const { searchText, onInputChange, } = useForm({
    searchText: q
  });

  const onSearchSubmit = (event) => {
    event.preventDefault();
    // if (searchText.trim() <= 1) return;

    navigate(`?q=${searchText}`);
  }

  return (
    <>
      <h1>Search</h1>
      <div className="row">
        <div className="col-4">
          <h4>Buscando</h4>
          <hr />
          <form onSubmit={onSearchSubmit} >
            <input type="text"
              placeholder="Busca un heroe"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
            <button
              className="btn btn-outline-primary mt-1">
              Buscar
            </button>
          </form>
        </div>
        <div className="col-8">
          <h4>Resultados</h4>
          <hr />
          {/* {
            (q === '')
              ? <div className="alert alert-primary">Buscar un heroe</div>
              : (heroes.length === 0)
              && <div className="alert alert-danger">No hay hero con <b>{q}</b></div>
          } */}

          <div
            className="alert alert-primary animate__animated animate__fadeInRight"
            style={{ display: showSearch ? '' : 'none' }}>
            Buscar un heroe
          </div>
          <div
            className="alert alert-danger animate__animated animate__fadeInLeft"
            style={{ display: showError ? '' : 'none' }}>
            No hay hero con <b>{q}</b>
          </div>


          {
            heroes.map(hero => (
              <HeroCard key={hero.id} {...hero} />
            ))
          }

          {/* <HeroCard /> */}
        </div>

      </div>

    </>
  )
}
