// ============================================================================
// Ticket 09: componente reutilizable de cuadro de mando (KPIs).
// Recibe la lista de alumnos por props y calcula 3 indicadores dinámicos.
// ============================================================================
function TarjetaKPI({ etiqueta, valor }) {
  return (
    <div className="kpi">
      <span className="kpi-valor">{valor}</span>
      <span className="kpi-etiqueta">{etiqueta}</span>
    </div>
  );
}

export default function ResumenKPIs({ alumnos }) {
  const total = alumnos.length;
  const notaMedia = total > 0 ? alumnos.reduce((suma, a) => suma + a.nota, 0) / total : 0;
  const porcentajeAprobados = total > 0 ? (alumnos.filter((a) => a.nota >= 5).length / total) * 100 : 0;

  return (
    <div className="kpi-grid">
      <TarjetaKPI etiqueta="Total de alumnos" valor={total} />
      <TarjetaKPI etiqueta="Nota media del grupo" valor={notaMedia.toFixed(2)} />
      <TarjetaKPI etiqueta="Porcentaje de aprobados" valor={`${porcentajeAprobados.toFixed(2)} %`} />
    </div>
  );
}
