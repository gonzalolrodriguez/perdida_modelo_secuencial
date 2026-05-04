# Predicción con TensorFlow.js

Este proyecto es una aplicación web interactiva que permite entrenar y probar un modelo de regresión lineal simple utilizando TensorFlow.js directamente en el navegador. Está orientado a la enseñanza y experimentación con machine learning de manera visual y sencilla, sin necesidad de instalar software adicional ni usar backend.

## Características principales

- Entrenamiento de un modelo de regresión lineal (y = 2x - 5) usando TensorFlow.js.
- Visualización en tiempo real de la pérdida (loss) durante el entrenamiento con Chart.js.
- Interfaz intuitiva para ingresar valores y obtener predicciones del modelo entrenado.
- Todo el proceso ocurre en el navegador, sin requerir backend ni instalación de dependencias.

## Estructura del proyecto

```
├── index.html      # Página principal de la aplicación
├── script.js       # Lógica de entrenamiento, predicción y visualización
└── style.css       # Estilos visuales de la aplicación
```

## ¿Cómo funciona?

1. **Entrenamiento del modelo**
   - Al hacer clic en "Entrenar Modelo", se crea y entrena un modelo de regresión lineal simple usando TensorFlow.js.
   - El modelo aprende la relación y = 2x - 5 a partir de datos de ejemplo.
   - Durante el entrenamiento, se muestra una gráfica de la pérdida para visualizar el aprendizaje.

2. **Predicción**
   - El usuario puede ingresar valores separados por coma (por ejemplo: 10, 20, 25) y hacer clic en "Predecir".
   - El modelo entrenado calcula y para cada x ingresado y muestra los resultados en pantalla.

3. **Visualización**
   - Se utiliza Chart.js para mostrar la evolución de la pérdida durante el entrenamiento, permitiendo ver cómo el modelo mejora.

## Requisitos

- Navegador web moderno (Chrome, Firefox, Edge, etc.)
- No se requiere instalación de dependencias ni backend

## Instrucciones para correr el proyecto

1. **Descargá o cloná este repositorio en tu computadora.**

2. **Abre el archivo `index.html` en tu navegador web.**
   - Podes hacer doble clic sobre el archivo o abrirlo desde tu navegador preferido.

3. **¡Listo!**
   - Verás la interfaz de la aplicación.
   - Haz clic en "Entrenar Modelo" para entrenar el modelo.
   - Ingresá valores en el campo correspondiente y haz clic en "Predecir" para ver los resultados.

## Archivos principales

- **index.html**: Estructura de la página y enlaces a los scripts y estilos.
- **script.js**: Lógica de entrenamiento, predicción y actualización de la gráfica.
- **style.css**: Estilos visuales para una mejor experiencia de usuario.

## Tecnologías utilizadas

- [TensorFlow.js](https://www.tensorflow.org/js): Para crear y entrenar el modelo de machine learning en el navegador.
- [Chart.js](https://www.chartjs.org/): Para graficar la evolución de la pérdida durante el entrenamiento.
- HTML5, CSS3 y JavaScript.
