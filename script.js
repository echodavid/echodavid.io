// Función principal que inicializa la página
document.addEventListener('DOMContentLoaded', function() {
    renderPersonalInfo();
    renderContactInfo();
    renderExperience();
    renderEducation();
    renderCertificates();
    renderSkills();
    renderLanguages();
    
    // Inicializar iconos de Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Renderizar información personal
function renderPersonalInfo() {
    document.getElementById('name').textContent = personalInfo.name;
    document.getElementById('title').textContent = personalInfo.title;
    document.getElementById('summary').textContent = personalInfo.summary;
}

// Renderizar información de contacto
function renderContactInfo() {
    const container = document.getElementById('contact-items');
    
    contactInfo.forEach(contact => {
        const contactItem = document.createElement('div');
        contactItem.className = 'contact-item';
        
        const icon = document.createElement('i');
        icon.setAttribute('data-lucide', contact.icon);
        
        const textElement = contact.link ? 
            document.createElement('a') : 
            document.createElement('span');
        
        textElement.textContent = contact.text;
        
        if (contact.link) {
            textElement.href = contact.link;
            if (contact.link.startsWith('http')) {
                textElement.target = '_blank';
                textElement.rel = 'noopener noreferrer';
            }
        }
        
        contactItem.appendChild(icon);
        contactItem.appendChild(textElement);
        container.appendChild(contactItem);
    });
}

// Renderizar experiencia laboral
function renderExperience() {
    const container = document.getElementById('experience-items');
    
    experience.forEach(exp => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        const timelineContent = document.createElement('div');
        timelineContent.className = 'timeline-content';
        
        const header = document.createElement('div');
        header.className = 'timeline-header';
        
        const leftSection = document.createElement('div');
        
        const title = document.createElement('div');
        title.className = 'timeline-title';
        title.textContent = exp.title;
        
        const company = document.createElement('div');
        company.className = 'timeline-company';
        company.textContent = exp.company;
        
        leftSection.appendChild(title);
        leftSection.appendChild(company);
        
        const period = document.createElement('div');
        period.className = 'timeline-date';
        period.textContent = exp.period;
        
        header.appendChild(leftSection);
        header.appendChild(period);
        
        const description = document.createElement('div');
        description.className = 'timeline-description';
        description.textContent = exp.description;
        
        timelineContent.appendChild(header);
        timelineContent.appendChild(description);
        timelineItem.appendChild(timelineContent);
        container.appendChild(timelineItem);
    });
}

// Renderizar educación
function renderEducation() {
    const container = document.getElementById('education-items');
    
    education.forEach(edu => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        const timelineContent = document.createElement('div');
        timelineContent.className = 'timeline-content';
        
        const header = document.createElement('div');
        header.className = 'timeline-header';
        
        const leftSection = document.createElement('div');
        
        const title = document.createElement('div');
        title.className = 'timeline-title';
        title.textContent = edu.title;
        
        const institution = document.createElement('div');
        institution.className = 'timeline-company';
        institution.textContent = edu.institution;
        
        leftSection.appendChild(title);
        leftSection.appendChild(institution);
        
        const period = document.createElement('div');
        period.className = 'timeline-date';
        period.textContent = edu.period;
        
        header.appendChild(leftSection);
        header.appendChild(period);
        
        const description = document.createElement('div');
        description.className = 'timeline-description';
        description.textContent = edu.description;
        
        timelineContent.appendChild(header);
        timelineContent.appendChild(description);
        timelineItem.appendChild(timelineContent);
        container.appendChild(timelineItem);
    });
}

// Renderizar certificaciones
function renderCertificates() {
    const container = document.getElementById('certificates-items');
    
    certificates.forEach(cert => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';

        const title = document.createElement('div');
        title.className = 'grid-item-title';
        if (cert.link) {
            const link = document.createElement('a');
            link.href = cert.link;
            link.textContent = cert.title;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            title.appendChild(link);
        } else {
            title.textContent = cert.title;
        }

        const issuer = document.createElement('div');
        issuer.className = 'grid-item-subtitle';
        issuer.textContent = cert.issuer;

        const year = document.createElement('div');
        year.className = 'grid-item-date';
        year.textContent = cert.year;

        if (cert.description) {
            const description = document.createElement('div');
            description.className = 'timeline-description';
            description.style.marginTop = '0.5rem';
            description.style.fontSize = '0.9rem';
            description.textContent = cert.description;

            gridItem.appendChild(title);
            gridItem.appendChild(issuer);
            gridItem.appendChild(year);
            gridItem.appendChild(description);
        } else {
            gridItem.appendChild(title);
            gridItem.appendChild(issuer);
            gridItem.appendChild(year);
        }

        container.appendChild(gridItem);
    });
}

// Renderizar competencias técnicas
function renderSkills() {
    const container = document.getElementById('skills-items');
    
    skills.forEach(skill => {
        const skillCategory = document.createElement('div');
        skillCategory.className = 'skill-category';
        
        const title = document.createElement('div');
        title.className = 'skill-category-title';
        
        const icon = document.createElement('i');
        icon.setAttribute('data-lucide', skill.icon);
        
        const titleText = document.createElement('span');
        titleText.textContent = skill.category;
        
        title.appendChild(icon);
        title.appendChild(titleText);
        
        const description = document.createElement('div');
        description.className = 'skill-category-description';
        description.textContent = skill.description;
        
        skillCategory.appendChild(title);
        skillCategory.appendChild(description);
        container.appendChild(skillCategory);
    });
}

// Renderizar idiomas
function renderLanguages() {
    const container = document.getElementById('languages-items');
    
    languages.forEach(lang => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item language-item';
        
        const name = document.createElement('div');
        name.className = 'language-name';
        name.textContent = lang.name;
        
        const level = document.createElement('div');
        level.className = 'language-level';
        level.textContent = lang.level;
        
        gridItem.appendChild(name);
        gridItem.appendChild(level);
        container.appendChild(gridItem);
    });
}

// Funciones de utilidad para actualizar datos dinámicamente
function updatePersonalInfo(newInfo) {
    Object.assign(personalInfo, newInfo);
    renderPersonalInfo();
}

function addNewExperience(newExp) {
    experience.unshift(newExp);
    document.getElementById('experience-items').innerHTML = '';
    renderExperience();
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function addNewCertificate(newCert) {
    certificates.unshift(newCert);
    document.getElementById('certificates-items').innerHTML = '';
    renderCertificates();
}

function addNewSkill(newSkill) {
    skills.push(newSkill);
    document.getElementById('skills-items').innerHTML = '';
    renderSkills();
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function addNewLanguage(newLang) {
    languages.push(newLang);
    document.getElementById('languages-items').innerHTML = '';
    renderLanguages();
}

// Función para exportar CV como texto (útil para copiar y pegar)
function exportAsText() {
    let text = `${personalInfo.name}\n`;
    text += `${personalInfo.title}\n\n`;
    text += `${personalInfo.summary}\n\n`;
    
    text += "CONTACTO:\n";
    contactInfo.forEach(contact => {
        text += `${contact.text}\n`;
    });
    
    text += "\nEXPERIENCIA:\n";
    experience.forEach(exp => {
        text += `${exp.title} | ${exp.company} | ${exp.period}\n`;
        text += `${exp.description}\n\n`;
    });
    
    text += "EDUCACIÓN:\n";
    education.forEach(edu => {
        text += `${edu.title} | ${edu.institution} | ${edu.period}\n`;
        text += `${edu.description}\n\n`;
    });
    
    text += "CERTIFICACIONES:\n";
    certificates.forEach(cert => {
        text += `${cert.title} | ${cert.issuer} | ${cert.year}\n`;
    });
    
    text += "\nCOMPETENCIAS TÉCNICAS:\n";
    skills.forEach(skill => {
        text += `${skill.category}: ${skill.description}\n`;
    });
    
    text += "\nIDIOMAS:\n";
    languages.forEach(lang => {
        text += `${lang.name}: ${lang.level}\n`;
    });
    
    return text;
}

// Función para imprimir CV
function printCV() {
    window.print();
}

// Event listeners para funciones adicionales si se necesitan
document.addEventListener('keydown', function(e) {
    // Ctrl + P para imprimir
    if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        printCV();
    }
});

// Funciones globales para uso en consola (debugging)
window.CVFunctions = {
    getAllData,
    updatePersonalInfo,
    addNewExperience,
    addNewCertificate, 
    addNewSkill,
    addNewLanguage,
    exportAsText,
    printCV
};