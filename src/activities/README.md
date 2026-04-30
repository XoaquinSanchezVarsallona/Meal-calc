# Módulo de Activities

Este módulo centraliza la gestión de actividades físicas del usuario y su integración con plataformas externas como **Strava** y **Garmin Connect**.

## Objetivo

El objetivo del módulo es registrar, interpretar y aprovechar la información de actividad física para generar valor dentro de la aplicación. En particular, busca:

- Integrarse con Strava y/o Garmin Connect para recibir actividad física del usuario.
- Detectar eventos o esfuerzos especiales realizados durante el día.
- Notificar información útil y contextualizada en función de la actividad realizada.
- Permitir el alta manual de actividades personalizadas.

## Integración con Strava / Garmin Connect

El módulo contempla una integración con **Strava** como punto de conexión principal para recibir la información de actividad del usuario.

En este flujo, los datos que provienen de **Garmin Connect** se sincronizan primero con Strava y luego la aplicación los consume desde ahí. De esta manera, Strava actúa como puente para centralizar la información sin duplicar integraciones innecesarias.

La idea es poder consumir información como:

- Tipo de actividad.
- Duración.
- Distancia.
- Calorías estimadas.
- Ritmo o intensidad.
- Fecha y hora de la actividad.

Con esta información, la aplicación podrá identificar si el usuario realizó algo especial durante el día y, en base a eso, disparar notificaciones o sugerencias útiles.

### Flujo esperado

1. El usuario registra actividades en Garmin Connect.
2. Garmin sincroniza esos datos con Strava.
3. La aplicación consulta Strava para obtener las actividades recientes.
4. El módulo procesa la información y la usa para mostrar alertas, resúmenes o sugerencias.

### Casos de uso esperados

- El usuario completa una actividad intensa y la aplicación notifica un resumen del impacto del día.
- El usuario registra una actividad larga o fuera de lo habitual y se resaltan datos valiosos.
- La aplicación usa la actividad detectada para contextualizar información nutricional o de calorías.

## Registro manual de actividades

Además de la integración con plataformas externas, el módulo permitirá cargar actividades manualmente.

### Datos que se podrán guardar

- Nombre de la actividad.
- Calorías propuestas o estimadas.
- Duración.
- Descripción opcional.
- Tipo de actividad.
- Fecha de realización.

### Ejemplos de actividades manuales

- Caminata.
- Entrenamiento de fuerza.
- Ciclismo.
- Running.
- Yoga.
- Actividad personalizada creada por el usuario.

## Comportamiento esperado

Cuando una actividad sea agregada, el sistema podrá:

- Guardar la actividad en el historial del usuario.
- Asociar la actividad a una fuente externa o manual.
- Calcular calorías estimadas o propuestas.
- Usar esa información para mostrar mensajes, alertas o sugerencias relevantes.

## Alcance del módulo

Este módulo se enfoca en la gestión de actividades y en su valor funcional dentro de la aplicación. No solo almacena datos, sino que también habilita futuras reglas de negocio para:

- Recompensar logros o esfuerzos especiales.
- Ajustar recomendaciones del día.
- Mejorar la experiencia del usuario con información contextual.

## Nota de implementación

La integración con Strava se considera la base técnica del módulo para traer información originada en Garmin Connect. La estructura actual del servicio y el controlador está preparada para extenderse con esa lógica en etapas posteriores.
