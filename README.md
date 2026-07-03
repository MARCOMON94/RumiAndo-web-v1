# RumiAndo web landing

Landing comercial de RumiAndo, una aplicación web de gestión ganadera para explotaciones ovinas y caprinas.

Esta web sustituye el antiguo enfoque académico por una presentación comercial de la app real de RumiAndo, usando únicamente funcionalidades que existen actualmente en `Rumiando v2`.

## Enfoque

- Presentar RumiAndo como herramienta de trabajo para campo.
- Mostrar módulos reales: censo, ficha animal, lector silencioso, operaciones por lector, partos, bajas, avisos, corrales, automatizaciones, estadísticas, Excel, leche, cría y asistente IA.
- Mantener una estética moderna, limpia y coherente con la app oficial.
- Usar `rumiando.app@gmail.com` como contacto temporal.

## Estructura pública

- `/`: landing comercial.
- `/contacto`: formulario que prepara un correo `mailto:` para `rumiando.app@gmail.com`.

Las rutas antiguas de muestra, como `/censo` y `/animal/:id`, ya no forman parte de la navegación comercial.

## Imágenes sustituibles

Los placeholders están en:

```txt
rumiando-web-v1/public/images/landing/
```

Puedes sustituirlos manteniendo el mismo nombre de archivo:

- `landing-hero.png`: imagen principal de portada.
- `landing-app-home.png`: captura del inicio de trabajo.
- `landing-reader-flow.png`: captura de una operación con lector.
- `landing-analytics.png`: captura de estadísticas, Excel o leche.
- `landing-mobile.png`: captura móvil de RumiAndo.

El icono oficial de la oveja con el ordenador está en:

```txt
rumiando-web-v1/public/images/brand/rumiando-sheep-tech-app-colors.png
```

## Desarrollo

```bash
cd rumiando-web-v1
npm install
npm run dev
```

## Validación

```bash
npm run lint
npm run test:run
npm run build
```

En Windows PowerShell, si aparece un problema con wrappers `.ps1`, usa:

```bash
npm.cmd run lint
npm.cmd run test:run
npm.cmd run build
```
