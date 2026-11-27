# M10.2. JSX con React — Evolución de la aplicación

**Alumno:** Lucas López Aja · **Módulo:** M10.2 JSX con React (DAM2)

**Aplicación desplegada:** https://TU-PROYECTO.vercel.app *(sustituir por la URL real de Vercel)*

## Mejoras implementadas (10 tickets)

1. **Tema claro/oscuro y footer:** botón en el header que cambia la clase CSS del contenedor principal y pie de página con mi nombre, el módulo y el año dinámico.
2. **Validación reactiva:** input controlado con `useState`, error con `role="alert"` si hay menos de 3 caracteres y saludo en tiempo real.
3. **Calculadora fiscal:** selector de IVA (21%, 10%, 4%), descuento de 0 a 50 % y desglose con 2 decimales; el total sale en verde si hay descuento.
4. **Trampa del 0:** corregido `notificaciones && ...`, botón "Marcar todas como leídas" y mensaje de estado vacío.
5. **Listas:** control de duplicados sin distinguir mayúsculas, buscador por nombre o código y contador "Mostrando X de Y módulos".
6. **Eventos y XSS:** historial de los últimos 5 eventos con `.map()` y `key`, botón "Limpiar historial" y 3 payloads XSS de prueba.
7. **Panel de expedientes:** buscador por nombre, ordenación (nota y nombre) y estado vacío.
8. **Alta de expedientes:** `EXPEDIENTES` pasa a ser un estado y se añaden alumnos con un formulario controlado.
9. **Componente `ResumenKPIs`:** total de alumnos, nota media y porcentaje de aprobados, calculados sobre la lista actual.
10. **Persistencia:** los expedientes se guardan en `localStorage`, con botón "Restablecer datos iniciales"; `npm run build` sin errores.

## Puesta en marcha

```bash
npm install
npm run dev      # desarrollo
npm run build    # build de producción (carpeta dist)
```

---

## Proyecto base

Proyecto educativo en React 18 + Vite para explicar JSX. Guion original:

Cada pestaña de la aplicación corresponde a un archivo numerado dentro de `src/components/`, con comentarios guiados (`[CLAVE EXPOSICIÓN]`):

1. `01_SintaxisYFragmentos.jsx` — Nodo raíz único, Fragmentos (`<>...</>`), cierre obligatorio, `className`, `htmlFor` y componentes en Mayúscula.
2. `02_ExpresionesYEstilos.jsx` — Llaves `{ }` (expresiones vs. sentencias), estilos en línea `style={{ }}` en `camelCase` y valores ignorados por React.
3. `03_RenderizadoCondicional.jsx` — *Early return*, operador ternario (`? :`), operador `&&` y demostración en vivo de la **trampa del `0`**.
4. `04_ListasYKeys.jsx` — Transformación de arrays con `.map()` y la importancia real de la prop `key` en el algoritmo de reconciliación.
5. `05_EventosYSeguridadXSS.jsx` — Eventos `onClick={fn}` vs. `onClick={() => fn(arg)}` y demostración práctica de protección automática contra **XSS**.
6. `06_DemoIntegradora.jsx` — Ejemplo completo integrando todas las reglas de JSX en un mini-panel de módulos.
