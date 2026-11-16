// Datos simulados para la versión mockup (sin backend).

export const DEMO_USER = {
    id: 1,
    username: 'demo',
    email: 'demo@unmsm.edu.pe',
};

export const MOCK_DOCUMENTS = [
    { id: 1, title: 'Introducción a la Programación con Python', doc_name: 'intro_python.pdf', pages: 120 },
    { id: 2, title: 'Estructuras de Datos y Algoritmos', doc_name: 'estructuras_datos.pdf', pages: 210 },
    { id: 3, title: 'Programación Orientada a Objetos', doc_name: 'poo.pdf', pages: 98 },
    { id: 4, title: 'Fundamentos de Machine Learning', doc_name: 'fundamentos_ml.pdf', pages: 175 },
    { id: 5, title: 'Bases de Datos Relacionales', doc_name: 'bases_datos.pdf', pages: 140 },
];

const doc = (id) => MOCK_DOCUMENTS.find((d) => d.id === id).title;

// Base de conocimiento simulada: se elige por coincidencia de palabras clave.
export const MOCK_KNOWLEDGE = [
    {
        keywords: ['python', 'variable', 'tipo de dato', 'tipos de datos'],
        answer:
            'En Python las variables se crean al asignarles un valor, sin declarar su tipo de forma explícita. ' +
            'Los tipos básicos son int, float, str y bool, y las colecciones más usadas son list, tuple, dict y set.\n\n' +
            'Un buen punto de partida es practicar con ejercicios cortos de entrada/salida, condicionales y bucles antes de pasar a funciones.',
        sources: [
            { document: doc(1), page: 14, fragment: 'Una variable es un nombre que hace referencia a un valor almacenado en memoria.' },
            { document: doc(1), page: 22, fragment: 'Python es de tipado dinámico: el tipo se determina en tiempo de ejecución.' },
        ],
    },
    {
        keywords: ['recursi', 'recursividad', 'recursión'],
        answer:
            'La recursividad es una técnica en la que una función se llama a sí misma para resolver versiones más pequeñas del mismo problema. ' +
            'Toda función recursiva necesita un caso base que detenga las llamadas y un paso recursivo que se acerque a ese caso.\n\n' +
            'Ejemplo clásico: el factorial, donde n! = n · (n-1)! y el caso base es 0! = 1.',
        sources: [
            { document: doc(2), page: 57, fragment: 'Todo algoritmo recursivo debe definir un caso base y garantizar que cada llamada se acerque a él.' },
        ],
    },
    {
        keywords: ['lista', 'pila', 'cola', 'árbol', 'arbol', 'estructura', 'algoritmo', 'ordenamiento', 'sort'],
        answer:
            'Las estructuras de datos organizan la información para acceder a ella de forma eficiente. ' +
            'Las listas permiten acceso por índice, las pilas siguen el orden LIFO, las colas FIFO y los árboles representan relaciones jerárquicas.\n\n' +
            'Para algoritmos de ordenamiento, conviene comparar su complejidad: burbuja y selección son O(n²), mientras que merge sort y quick sort promedian O(n log n).',
        sources: [
            { document: doc(2), page: 33, fragment: 'Una pila es una colección ordenada en la que las inserciones y eliminaciones ocurren en un único extremo.' },
            { document: doc(2), page: 148, fragment: 'Merge sort divide el arreglo en mitades, las ordena y luego las combina en tiempo O(n log n).' },
        ],
    },
    {
        keywords: ['objeto', 'clase', 'poo', 'herencia', 'polimorfismo', 'encapsulamiento'],
        answer:
            'La programación orientada a objetos modela el software como objetos que combinan datos (atributos) y comportamiento (métodos). ' +
            'Sus pilares son encapsulamiento, herencia, polimorfismo y abstracción.\n\n' +
            'Una clase actúa como plantilla y cada objeto es una instancia de esa clase.',
        sources: [
            { document: doc(3), page: 9, fragment: 'Una clase define la estructura y el comportamiento común de un conjunto de objetos.' },
            { document: doc(3), page: 41, fragment: 'La herencia permite que una clase derive atributos y métodos de otra clase base.' },
        ],
    },
    {
        keywords: ['machine learning', 'aprendizaje', 'modelo', 'entrenamiento', 'recomend', 'ml', 'red neuronal'],
        answer:
            'El aprendizaje automático permite que un sistema mejore a partir de datos sin ser programado de forma explícita. ' +
            'Se distingue entre aprendizaje supervisado, no supervisado y por refuerzo.\n\n' +
            'En un sistema de recomendación de rutas de aprendizaje se suelen combinar filtrado basado en contenido y filtrado colaborativo (enfoque híbrido) para personalizar las sugerencias.',
        sources: [
            { document: doc(4), page: 12, fragment: 'En el aprendizaje supervisado el modelo aprende a partir de ejemplos etiquetados.' },
            { document: doc(4), page: 96, fragment: 'Los sistemas híbridos combinan varias estrategias de recomendación para compensar las debilidades de cada una.' },
        ],
    },
    {
        keywords: ['sql', 'base de datos', 'bases de datos', 'tabla', 'consulta', 'join', 'normalización', 'normalizacion'],
        answer:
            'Una base de datos relacional organiza la información en tablas relacionadas mediante claves primarias y foráneas. ' +
            'SQL permite consultarla con sentencias como SELECT, y combinar tablas con JOIN.\n\n' +
            'La normalización reduce la redundancia dividiendo los datos en tablas más pequeñas (1FN, 2FN, 3FN).',
        sources: [
            { document: doc(5), page: 27, fragment: 'Una clave foránea establece un vínculo entre los registros de dos tablas.' },
            { document: doc(5), page: 63, fragment: 'La tercera forma normal elimina las dependencias transitivas entre atributos.' },
        ],
    },
];

export const MOCK_FALLBACK = {
    answer:
        'Esta es una respuesta simulada del asistente académico. En la versión conectada, aquí aparecería la respuesta generada a partir de los documentos de la biblioteca.\n\n' +
        'Prueba preguntando por: Python, recursividad, estructuras de datos, programación orientada a objetos, machine learning o bases de datos.',
    sources: [
        { document: doc(1), page: 5, fragment: 'Fragmento de ejemplo recuperado de la biblioteca de documentos.' },
    ],
};

export const SEED_SESSIONS = [
    {
        id: 1,
        chat_name: 'Introducción a Python',
        created_at: '2026-11-10T15:20:00.000Z',
        messages: [
            {
                id: 'seed-1-1',
                question: '¿Cómo funcionan las variables en Python?',
                answer: MOCK_KNOWLEDGE[0].answer,
                sources: MOCK_KNOWLEDGE[0].sources,
                created_at: '2026-11-10T15:20:00.000Z',
            },
        ],
    },
    {
        id: 2,
        chat_name: 'Recursividad y algoritmos',
        created_at: '2026-11-12T09:05:00.000Z',
        messages: [
            {
                id: 'seed-2-1',
                question: 'Explícame la recursividad con un ejemplo',
                answer: MOCK_KNOWLEDGE[1].answer,
                sources: MOCK_KNOWLEDGE[1].sources,
                created_at: '2026-11-12T09:05:00.000Z',
            },
        ],
    },
    {
        id: 3,
        chat_name: 'Sistemas de recomendación',
        created_at: '2026-11-14T18:40:00.000Z',
        messages: [
            {
                id: 'seed-3-1',
                question: '¿Qué es un sistema de recomendación híbrido?',
                answer: MOCK_KNOWLEDGE[4].answer,
                sources: MOCK_KNOWLEDGE[4].sources,
                created_at: '2026-11-14T18:40:00.000Z',
            },
        ],
    },
];
