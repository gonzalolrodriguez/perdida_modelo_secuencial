
// Variables globales
let modelo;
let lossChart;
let historialPerdidas = [];
let epocas = [];

// Función para entrenar el modelo
async function entrenarModelo() {
    const btn = document.getElementById('btnEntrenar');
    const status = document.getElementById('statusEntrenamiento');

    btn.disabled = true;
    status.innerHTML = '<div class="status">⏳ Entrenando modelo...</div>';

    // Reiniciar historial
    historialPerdidas = [];
    epocas = [];

    // 1. Crear el modelo
    modelo = tf.sequential();
    modelo.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    // 2. Compilar el modelo
    modelo.compile({
        loss: 'meanSquaredError',
        optimizer: 'sgd'
    });

    // 3. Datos de entrenamiento (y = 2x - 5)
    const xs = tf.tensor2d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [10, 1]);
    const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7, 9, 11, 13, 15], [10, 1]);

    // 4. Entrenar el modelo con callback
    const perdidaInicial = await modelo.evaluate(xs, ys).dataSync()[0];

    await modelo.fit(xs, ys, {
        epochs: 100,
        callbacks: {
            onEpochEnd: (epoch, logs) => {
                // Guardar valores para la gráfica
                epocas.push(epoch);
                historialPerdidas.push(logs.loss);

                // Actualizar gráfica cada 5 épocas
                if (epoch % 5 === 0 || epoch === 99) {
                    actualizarGrafica();
                }
            }
        }
    });

    const perdidaFinal = await modelo.evaluate(xs, ys).dataSync()[0];
    const reduccion = ((1 - perdidaFinal / perdidaInicial) * 100).toFixed(2);

    status.innerHTML = `
                <div class="status success">
                    ✅ Modelo entrenado correctamente<br>
                    <div style="margin-top: 10px;">
                        <span class="info-badge">Pérdida inicial: ${perdidaInicial.toFixed(4)}</span>
                        <span class="info-badge">Pérdida final: ${perdidaFinal.toFixed(4)}</span>
                        <span class="info-badge">Reducción: ${reduccion}%</span>
                    </div>
                </div>
            `;

    btn.disabled = false;
}

// Función para actualizar la gráfica
function actualizarGrafica() {
    const ctx = document.getElementById('lossChart').getContext('2d');

    if (lossChart) {
        lossChart.destroy();
    }

    lossChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: epocas,
            datasets: [{
                label: 'Pérdida (Loss)',
                data: historialPerdidas,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#667eea',
                pointHoverBorderColor: 'white',
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        color: '#333'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: { size: 14 },
                    bodyFont: { size: 13 }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Época',
                        font: { size: 14, weight: 'bold' },
                        color: '#555'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Valor de Pérdida',
                        font: { size: 14, weight: 'bold' },
                        color: '#555'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    beginAtZero: true
                }
            },
            animation: {
                duration: 750
            }
        }
    });
}

// Función para hacer predicciones
function predecir() {
    if (!modelo) {
        document.getElementById('statusPrediccion').innerHTML =
            '<div class="status"> Primero debes entrenar el modelo</div>';
        return;
    }

    const input = document.getElementById('inputValores').value;
    const valores = input.split(',').map(v => parseFloat(v.trim()));

    if (valores.some(isNaN)) {
        document.getElementById('statusPrediccion').innerHTML =
            '<div class="status"> Por favor ingresa valores numéricos válidos</div>';
        return;
    }

    document.getElementById('statusPrediccion').innerHTML =
        '<div class="status success"> Estado: Modelo entrenado correctamente</div>';

    const resultadosHTML = valores.map(x => {
        const prediccion = modelo.predict(tf.tensor2d([x], [1, 1]));
        const y = prediccion.dataSync()[0];
        return `<li>Para <strong>x = ${x}</strong>, y = <strong>${y.toFixed(2)}</strong></li>`;
    }).join('');

    document.getElementById('resultados').innerHTML = `
                <div class="card-title" style="font-size: 1.1rem; margin-bottom: 15px;">Resultados:</div>
                <ul>${resultadosHTML}</ul>
            `;
}

// Inicializar gráfica vacía al cargar
window.onload = () => {
    const ctx = document.getElementById('lossChart').getContext('2d');
    lossChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Pérdida (Loss)',
                data: [],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true }
            },
            scales: {
                x: { title: { display: true, text: 'Época' } },
                y: { title: { display: true, text: 'Valor de Pérdida' }, beginAtZero: true }
            }
        }
    });
};