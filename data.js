// Datos personales principales
const personalInfo = {
    name: "David Eduardo Espinosa Rojas",
    title: "Software Engineering Student - Fullstack Developer",
    summary: "Fullstack Developer y estudiante de Ingeniería en Software con experiencia práctica en la construcción de aplicaciones full-stack escalables. Competente en desarrollo frontend, aplicaciones móviles con Kotlin, y arquitectura backend con diseño basado en componentes. Experto en desarrollo de APIs con NestJS y prácticas DevOps incluyendo CI/CD y Docker."
};

// Información de contacto
const contactInfo = [
    {
        icon: "phone",
        text: "+52 271 165 9841",
        link: "tel:+522711659841"
    },
    {
        icon: "mail",
        text: "davideer0205@gmail.com",
        link: "mailto:davideer0205@gmail.com"
    },
    {
        icon: "map-pin",
        text: "Orizaba, Ver, México",
        link: null
    },
    {
        icon: "linkedin",
        text: "LinkedIn",
        link: "https://www.linkedin.com/in/deespinosa/"
    }
];

// Experiencia laboral
const experience = [
    {
        title: "FullStack Developer",
        company: "RoandAi",
        period: "04/2025 - Actualidad",
        description: "Ajustes de modelos de lenguaje grandes (LLMs) con ajustes paramétricos para resolver problemas específicos del dominio financiero. Despliegue y gestión de LLMs contenerizados usando Docker para inferencia escalable."
    },
    {
        title: "Cloud Migration Engineer Intern",
        company: "Durazno Technologies",
        period: "07/2025",
        description: "Contribuí a la migración de servicios AWS Lambda de Node.js a Go, mejorando el rendimiento y reduciendo la latencia a través de refactorización de código y optimización del despliegue."
    },
    {
        title: "Tech Lead & Fullstack Developer",
        company: "IDEASYSTEMS",
        period: "01/2025 - 03/2025",
        description: "Liderazgo técnico de proyectos de desarrollo web full-stack. Configuración y administración de servidores web. Gestión de proyectos y coordinación de equipos de desarrollo. Implementación y configuración de pipelines CI/CD usando Bitbucket y GitHub Actions. Desarrollo de APIs RESTful con NestJS. Desarrollo de aplicaciones web usando PHP. Gestión de bases de datos MySQL. Despliegue de aplicaciones web en entornos de producción."
    }
];

// Educación
const education = [
    {
        title: "Licenciatura en Ingeniería de Software",
        institution: "Universidad Veracruzana",
        period: "2023 - 2027",
        description: "Estudiante de Ingeniería de Software enfocado en desarrollo full-stack y arquitecturas escalables."
    },
    {
        title: "Técnico Superior en Informática",
        institution: "Colegio Nacional de Educación Profesional Técnica",
        period: "2020 - 2023",
        description: "Carrera técnica profesional con título de bachillerato en ciencias de la computación."
    }
];

// Certificaciones
const certificates = [
    {
        title: "Angular: De cero a Experto",
        issuer: "Udemy x DevTalles",
        year: "2025",
        description: "Certificación completa en desarrollo con Angular"
    },
    {
        title: "Nest: Desarrollo backend escalable con Node",
        issuer: "Udemy x DevTalles",
        year: "2025",
        description: "Desarrollo de APIs escalables con NestJS"
    },
    {
        title: "NestJS + Testing: Pruebas unitarias y end to end (e2e)",
        issuer: "Udemy x DevTalles",
        year: "2025",
        description: "Testing avanzado en aplicaciones NestJS"
    },
    {
        title: "Linux Operations and Programming",
        issuer: "Interskill IBM",
        year: "2024",
        description: "Operaciones y programación en sistemas Linux"
    }
];

// Competencias técnicas organizadas por categorías
const skills = [
    {
        category: "Frontend",
        icon: "monitor",
        description: "Desarrollo de interfaces de usuario interactivas con HTML, CSS y JavaScript. Frameworks y librerías: Angular +19, PrimeNG Freya, React, React Native, Expo"
    },
    {
        category: "Backend",
        icon: "server",
        description: "Desarrollo de APIs RESTful eficientes con NestJS, implementando autenticación con JWT. Express.js, middlewares. APIs RESTful con Java y Spring Boot."
    },
    {
        category: "Base de Datos",
        icon: "database",
        description: "Gestión de datos relacionales con MySQL, PostgreSQL, SQL Server, MariaDB. Bases de datos NoSQL: MongoDB con Mongoose, Firestore. Integración ORM con TypeORM."
    },
    {
        category: "Autenticación y Almacenamiento",
        icon: "shield",
        description: "Autenticación y almacenamiento usando Firebase Auth y Firebase Storage. Implementación de JWT y sistemas de autorización."
    },
    {
        category: "Control de Versiones",
        icon: "git-branch",
        description: "Control de versiones con Git y GitHub, GitLab, Bitbucket. Implementación de flujos de trabajo colaborativos."
    },
    {
        category: "Otras Tecnologías",
        icon: "code",
        description: "Comunicación en tiempo real con WebSockets. Desarrollo backend y SSR con PHP. Implementación de LLMs usando Ollama. Conocimientos básicos de React y desarrollo móvil con Kotlin."
    },
    {
        category: "DevOps",
        icon: "settings",
        description: "Implementación y configuración de pipelines CI/CD usando Bitbucket y GitHub Actions. Gestión de contenedores con Docker. Despliegue en entornos de producción."
    }
];

// Idiomas
const languages = [
    {
        name: "Español",
        level: "Nativo"
    },
    {
        name: "Inglés",
        level: "Intermedio Avanzado | B2 TOEFL"
    }
];

// Función para exportar todos los datos (útil para debugging)
const getAllData = () => {
    return {
        personalInfo,
        contactInfo,
        experience,
        education,
        certificates,
        skills,
        languages
    };
};

// Para agregar nuevas entradas fácilmente, puedes usar estas funciones:
const addExperience = (newExperience) => {
    experience.unshift(newExperience); // Agrega al inicio (más reciente)
};

const addCertificate = (newCertificate) => {
    certificates.unshift(newCertificate); // Agrega al inicio (más reciente)
};

const addSkill = (newSkill) => {
    skills.push(newSkill); // Agrega al final
};

// Ejemplos de cómo agregar nuevas entradas:
/*
addExperience({
    title: "Nuevo Puesto",
    company: "Nueva Empresa",
    period: "01/2026 - Actualidad",
    description: "Descripción de las responsabilidades y logros."
});

addCertificate({
    title: "Nueva Certificación",
    issuer: "Proveedor",
    year: "2026",
    description: "Descripción de la certificación"
});

addSkill({
    category: "Nueva Tecnología",
    icon: "code",
    description: "Descripción de las competencias en esta área"
});
*/