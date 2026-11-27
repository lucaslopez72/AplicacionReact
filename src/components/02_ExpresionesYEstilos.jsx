import { useState } from 'react';

// ============================================================================
// [CLAVE EXPOSICIÓN 2] EXPRESIONES JAVASCRIPT { } Y ESTILOS EN LÍNEA
// ----------------------------------------------------------------------------
// 1. Dentro de { } solo caben EXPRESIONES (algo que produce un valor):
//    variables, cálculos, llamadas a funciones, template literals, ternarios.
// 2. NO caben SENTENCIAS (if, for, while, switch). Esas se resuelven fuera
//    del `return` o con expresiones equivalentes.
// 3. `style={{ ... }}` lleva DOBLE LLAVE:
//    - Llave exterior: abre expresión JSX.
//    - Llave interior: define un objeto literal de JavaScript.
//    - Propiedades CSS en camelCase: `backgroundColor`, `fontSize`, `borderRadius`.
// 4. React IGNORA en pantalla: true, false, null y undefined.
// ============================================================================

const formatearEuros = (cantidad) => `${cantidad.toFixed(2)} €`;

const TIPOS_IVA = [
  { id: 'general', etiqueta: 'General (21%)', valor: 0.21 },
  { id: 'reducido', etiqueta: 'Reducido (10%)', valor: 0.1 },
  { id: 'superreducido', etiqueta: 'Superreducido (4%)', valor: 0.04 }
];

export default function ExpresionesYEstilos() {
  const [precioBase, setPrecioBase] = useState(100);
  const [colorDestacado, setColorDestacado] = useState('#38bdf8');
  const [tipoIva, setTipoIva] = useState('general');
  const [descuento, setDescuento] = useState(0);

  // Ticket 03: cálculo del desglose fiscal
  const IVA = TIPOS_IVA.find((t) => t.id === tipoIva).valor;
  const importeDescontado = precioBase * (descuento / 100);
  const baseImponible = precioBase - importeDescontado;
  const cuotaIva = baseImponible * IVA;
  const totalFinal = baseImponible + cuotaIva;

  // Objeto de estilos dinámico en JavaScript
  const estiloTarjetaDinamica = {
    backgroundColor: 'var(--surface-alt)',
    border: `2px solid ${colorDestacado}`,
    borderRadius: '10px',
    padding: '1rem',
    transition: 'border-color 0.2s ease'
  };

  return (
    <section className="card">
      <h2>2. Expresiones JavaScript &#123; &#125; y Estilos en Línea</h2>
      <p className="subtitle">
        Las llaves son una ventana directa a JavaScript dentro del marcado JSX.
      </p>

      <div className="grid-2">
        <div className="box">
          <h3>Expresiones evaluadas en tiempo real</h3>
          <label htmlFor="precio-input">Precio base (€):</label>
          <input
            id="precio-input"
            type="number"
            className="input"
            value={precioBase}
            onChange={(e) => setPrecioBase(Number(e.target.value) || 0)}
          />

          <label htmlFor="iva-select" style={{ display: 'block', marginTop: '0.6rem' }}>Tipo de IVA:</label>
          <select
            id="iva-select"
            className="select"
            value={tipoIva}
            onChange={(e) => setTipoIva(e.target.value)}
          >
            {TIPOS_IVA.map((t) => (
              <option key={t.id} value={t.id}>{t.etiqueta}</option>
            ))}
          </select>

          <label htmlFor="descuento-input" style={{ display: 'block', marginTop: '0.6rem' }}>Descuento (%) entre 0 y 50:</label>
          <input
            id="descuento-input"
            type="number"
            min="0"
            max="50"
            className="input"
            value={descuento}
            onChange={(e) => setDescuento(Math.min(50, Math.max(0, Number(e.target.value) || 0)))}
          />

          <table className="desglose">
            <tbody>
              <tr><td>Precio Base</td><td>{formatearEuros(precioBase)}</td></tr>
              <tr><td>Importe Descontado</td><td>{formatearEuros(importeDescontado)}</td></tr>
              <tr><td>Base Imponible</td><td>{formatearEuros(baseImponible)}</td></tr>
              <tr><td>Cuota de IVA ({Math.round(IVA * 100)}%)</td><td>{formatearEuros(cuotaIva)}</td></tr>
              <tr>
                <td>Total Final</td>
                <td style={descuento > 0 ? { color: '#10b981', fontSize: '1.1rem' } : undefined}>
                  {formatearEuros(totalFinal)}
                </td>
              </tr>
            </tbody>
          </table>

          <ul className="list">
            <li className="list-item">
              <span>Operación matemática directa:</span>
              <strong>{formatearEuros(precioBase * IVA)} (IVA {Math.round(IVA * 100)}%)</strong>
            </li>
            <li className="list-item">
              <span>Llamada a función:</span>
              <strong>{formatearEuros(precioBase * (1 + IVA))}</strong>
            </li>
            <li className="list-item">
              <span>Valores ignorados (true/false/null):</span>
              <strong>[{true}{false}{null}{undefined}] (vacío)</strong>
            </li>
          </ul>
        </div>

        <div style={estiloTarjetaDinamica}>
          <h3 style={{ color: colorDestacado, marginTop: 0 }}>
            Estilos en línea con style=&#123;&#123; camelCase &#125;&#125;
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-soft)' }}>
            El borde y el título de este recuadro se calculan dinámicamente desde un objeto
            JavaScript usando <code className="code-inline">border</code> y <code className="code-inline">color</code>.
          </p>

          <div className="btn-row">
            <button type="button" className="btn" onClick={() => setColorDestacado('#38bdf8')}>
              Azul Cyan
            </button>
            <button type="button" className="btn" style={{ backgroundColor: '#059669' }} onClick={() => setColorDestacado('#10b981')}>
              Verde Esmeralda
            </button>
            <button type="button" className="btn" style={{ backgroundColor: '#d97706' }} onClick={() => setColorDestacado('#f59e0b')}>
              Ámbar
            </button>
          </div>
        </div>
      </div>

      <p className="file-hint">
        Archivo para mostrar en VS Code: <code className="code-inline">src/components/02_ExpresionesYEstilos.jsx</code>
      </p>
    </section>
  );
}
