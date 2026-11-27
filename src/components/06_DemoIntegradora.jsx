import { useState } from 'react';
import ResumenKPIs from './ResumenKPIs.jsx';

// ============================================================================
// [CLAVE EXPOSICIÓN 6] DEMO INTEGRADORA DE TODAS LAS CARACTERÍSTICAS DE JSX
// ----------------------------------------------------------------------------
// Este componente reúne en un caso real de aula:
// - Fragmentos (<>...</>) y atributos camelCase (className, onClick, onChange)
// - Expresiones JS { } y estilos en línea dinámicos style={{ }}
// - Renderizado condicional (ternario + && booleano seguro)
// - Listas con .map() y key única estable
// - Comunicación mediante props y composición de componentes
// ============================================================================

const CLAVE_STORAGE = 'expedientes-dam2';

const EXPEDIENTES_INICIALES = [
  { id: 101, nombre: 'Lucía Serrano', nota: 8.7, modulos: ['DI', 'PSP', 'AD'] },
  { id: 102, nombre: 'Marcos Vega', nota: 4.3, modulos: ['DI', 'SGE'] },
  { id: 103, nombre: 'Sofía Navarro', nota: 9.5, modulos: ['DI', 'PSP', 'AD', 'PMDM'] }
];

// carga desde localStorage (con tolerancia a datos corruptos)
function cargarExpedientes() {
  try {
    const guardado = localStorage.getItem(CLAVE_STORAGE);
    if (guardado) {
      const datos = JSON.parse(guardado);
      if (Array.isArray(datos)) return datos;
    }
  } catch {
    // Si el JSON está corrupto o localStorage no está disponible, usamos los datos iniciales
  }
  return EXPEDIENTES_INICIALES;
}

function guardarExpedientes(lista) {
  try {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(lista));
  } catch {
    // Ignoramos errores de cuota o modo privado
  }
}

function TarjetaExpediente({ alumno, seleccionado, onSeleccionar }) {
  const aprobado = alumno.nota >= 5;

  return (
    <article
      className="box"
      style={{
        borderColor: seleccionado ? '#38bdf8' : 'var(--border)',
        borderWidth: seleccionado ? '2px' : '1px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>{alumno.nombre}</h3>
        <span className={`badge ${aprobado ? 'badge-ok' : 'badge-fail'}`}>
          {aprobado ? `Aprobado (${alumno.nota})` : `Pendiente (${alumno.nota})`}
        </span>
      </div>

      {alumno.modulos.length > 0 && (
        <div className="btn-row" style={{ marginTop: '0.6rem' }}>
          {alumno.modulos.map((mod) => (
            <span key={`${alumno.id}-${mod}`} className="code-inline">
              {mod}
            </span>
          ))}
        </div>
      )}

      <div className="btn-row">
        <button type="button" className="btn" onClick={() => onSeleccionar(alumno)}>
          {seleccionado ? 'Expediente seleccionado' : 'Seleccionar expediente'}
        </button>
      </div>
    </article>
  );
}

export default function DemoIntegradora() {
  // la lista es un estado, inicializado desde localStorage
  const [expedientes, setExpedientes] = useState(cargarExpedientes);
  const [soloAprobados, setSoloAprobados] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);

  // búsqueda y ordenación
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('nota-desc');

  // formulario controlado de alta
  const [nombreNuevo, setNombreNuevo] = useState('');
  const [notaNueva, setNotaNueva] = useState('');
  const [modulosNuevo, setModulosNuevo] = useState('');
  const [errorForm, setErrorForm] = useState('');

  const termino = busqueda.trim().toLowerCase();
  const listaFiltrada = expedientes
    .filter((a) => !soloAprobados || a.nota >= 5)
    .filter((a) => a.nombre.toLowerCase().includes(termino))
    .sort((a, b) => {
      if (orden === 'nota-asc') return a.nota - b.nota;
      if (orden === 'nombre-asc') return a.nombre.localeCompare(b.nombre, 'es');
      return b.nota - a.nota;
    });

  // Actualiza el estado y lo persiste en localStorage
  const actualizarExpedientes = (nuevaLista) => {
    setExpedientes(nuevaLista);
    guardarExpedientes(nuevaLista);
  };

  const darDeAlta = (e) => {
    e.preventDefault();
    const nombre = nombreNuevo.trim();
    const nota = Number(notaNueva);

    if (!nombre) {
      setErrorForm('El nombre completo es obligatorio.');
      return;
    }
    if (notaNueva === '' || Number.isNaN(nota) || nota < 0 || nota > 10) {
      setErrorForm('La nota debe ser un número entre 0 y 10.');
      return;
    }

    const modulos = [
      ...new Set(
        modulosNuevo
          .split(',')
          .map((m) => m.trim().toUpperCase())
          .filter(Boolean)
      )
    ];
    // id único: siguiente al mayor existente
    const id = expedientes.reduce((max, a) => Math.max(max, a.id), 0) + 1;

    actualizarExpedientes([...expedientes, { id, nombre, nota, modulos }]);
    setNombreNuevo('');
    setNotaNueva('');
    setModulosNuevo('');
    setErrorForm('');
  };

  // borrar la clave de localStorage y recuperar los 3 expedientes originales
  const restablecer = () => {
    try {
      localStorage.removeItem(CLAVE_STORAGE);
    } catch {
      // sin acceso a localStorage: solo restablecemos el estado
    }
    setExpedientes(EXPEDIENTES_INICIALES);
    setSeleccionado(null);
  };

  return (
    <>
      <section className="card">
        <h2>6. Ejemplo Integrador: Panel de Expedientes DAM2</h2>
        <p className="subtitle">
          Composición de componentes reutilizables aplicando todas las reglas de JSX.
        </p>

        {/* los KPIs se calculan sobre la lista actual (con filtros) */}
        <ResumenKPIs alumnos={listaFiltrada} />

        <div className="form-grid" style={{ marginBottom: '1rem' }}>
          <div>
            <label htmlFor="buscador-alumnos">Buscar alumno por nombre:</label>
            <input
              id="buscador-alumnos"
              type="search"
              className="input"
              placeholder="Ej.: Lucía"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="orden-alumnos">Ordenar por:</label>
            <select
              id="orden-alumnos"
              className="select"
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
            >
              <option value="nota-desc">Nota (mayor a menor)</option>
              <option value="nota-asc">Nota (menor a mayor)</option>
              <option value="nombre-asc">Nombre (A–Z)</option>
            </select>
          </div>
        </div>

        <div className="btn-row" style={{ marginBottom: '1rem', alignItems: 'center' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setSoloAprobados((prev) => !prev)}
          >
            {soloAprobados ? 'Mostrar todos los alumnos' : 'Filtrar solo aprobados (>= 5)'}
          </button>

          <button type="button" className="btn btn-danger" onClick={restablecer}>
            Restablecer datos iniciales
          </button>

          {seleccionado && (
            <span className="pill">
              Seleccionado: {seleccionado.nombre} (ID #{seleccionado.id})
            </span>
          )}
        </div>

        {listaFiltrada.length === 0 ? (
          <p className="empty-state">No se encontraron expedientes con esos criterios</p>
        ) : (
          <div className="grid-2">
            {listaFiltrada.map((alumno) => (
              <TarjetaExpediente
                key={alumno.id}
                alumno={alumno}
                seleccionado={seleccionado?.id === alumno.id}
                onSeleccionar={setSeleccionado}
              />
            ))}
          </div>
        )}
      </section>

      <section className="card">
        <h2>Alta de nuevo expediente</h2>
        <form onSubmit={darDeAlta}>
          <div className="form-grid">
            <div>
              <label htmlFor="alta-nombre">Nombre completo (obligatorio):</label>
              <input
                id="alta-nombre"
                type="text"
                className="input"
                value={nombreNuevo}
                onChange={(e) => setNombreNuevo(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="alta-nota">Nota (0 a 10):</label>
              <input
                id="alta-nota"
                type="number"
                min="0"
                max="10"
                step="0.1"
                className="input"
                value={notaNueva}
                onChange={(e) => setNotaNueva(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="alta-modulos">Módulos (separados por comas):</label>
              <input
                id="alta-modulos"
                type="text"
                className="input"
                placeholder="DI, PSP, AD"
                value={modulosNuevo}
                onChange={(e) => setModulosNuevo(e.target.value)}
              />
            </div>
          </div>
          {errorForm && (
            <p role="alert" className="error-msg">{errorForm}</p>
          )}
          <div className="btn-row">
            <button type="submit" className="btn">Dar de alta</button>
          </div>
        </form>

        <p className="file-hint">
          Archivo para mostrar en VS Code: <code className="code-inline">src/components/06_DemoIntegradora.jsx</code>
        </p>
      </section>
    </>
  );
}
