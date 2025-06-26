// Variable para almacenar las traducciones cargadas
let translations = {
    es: {},
    en: {}
};

// Estado actual del idioma
let currentLanguage = localStorage.getItem('language') || 'es';

// Cargar traducciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async function() {
    // Cargar archivos de traducción
    await loadTranslations();
    
    // Inicializar el idioma
    setLanguage(currentLanguage);
    
    // Configurar el botón de cambio de idioma
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
        updateLanguageButton();
    }
    
    // Añadir atributos data-i18n a todos los elementos que necesitan traducción
    setupTranslationAttributes();
});

// Función para cargar archivos de traducción
async function loadTranslations() {
    try {
        // Cargar traducción en español
        const esResponse = await fetch('es.json');
        translations.es = await esResponse.json();
        
        // Cargar traducción en inglés
        const enResponse = await fetch('en.json');
        translations.en = await enResponse.json();
    } catch (error) {
        console.error('Error cargando traducciones:', error);
    }
}

// Función para cambiar entre idiomas
function toggleLanguage() {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
    setLanguage(currentLanguage);
    updateLanguageButton();
    localStorage.setItem('language', currentLanguage);
}

// Función para actualizar el botón de idioma
function updateLanguageButton() {
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        const currentLangSpan = languageToggle.querySelector('.current-lang');
        const altLangSpan = languageToggle.querySelector('.alt-lang');
        
        if (currentLanguage === 'es') {
            currentLangSpan.textContent = 'ES';
            altLangSpan.textContent = 'EN';
        } else {
            currentLangSpan.textContent = 'EN';
            altLangSpan.textContent = 'ES';
        }
    }
}

// Función para aplicar el idioma seleccionado
function setLanguage(lang) {
    // Actualizar título de la página
    document.title = translations[lang].title;
    
    // Actualizar elementos con atributo data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        if (translations[lang][key]) {
            // Manejar elementos especiales como listas ul/ol
            if (element.tagName === 'UL' || element.tagName === 'OL') {
                if (Array.isArray(translations[lang][key])) {
                    element.innerHTML = '';
                    translations[lang][key].forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item;
                        element.appendChild(li);
                    });
                }
            } else {
                // Elementos normales de texto
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Manejar elementos especiales como enlaces que necesitan mantener atributos
    document.querySelectorAll('[data-i18n-href]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const hrefKey = element.getAttribute('data-i18n-href');
        
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
        
        if (hrefKey && translations[lang][hrefKey]) {
            element.setAttribute('href', translations[lang][hrefKey]);
        }
    });
}

// Función para configurar atributos de traducción en el HTML existente
function setupTranslationAttributes() {
    // Header
    document.querySelector('header h1').setAttribute('data-i18n', 'name');
    document.querySelector('header h2').setAttribute('data-i18n', 'profession');
    
    // Enlaces de contacto
    const contactLinks = document.querySelectorAll('.contact-links a');
    if (contactLinks.length >= 6) {
        contactLinks[0].setAttribute('data-i18n', 'email');
        contactLinks[1].setAttribute('data-i18n', 'phone');
        contactLinks[2].setAttribute('data-i18n', 'linkedin');
        contactLinks[3].setAttribute('data-i18n', 'portfolio');
        contactLinks[4].setAttribute('data-i18n', 'github');
        contactLinks[5].setAttribute('data-i18n', 'downloadCV');
    }
    
    // Intro
    const introP = document.querySelector('.intro p');
    if (introP) introP.setAttribute('data-i18n', 'intro');
    
    // Secciones principales
    document.querySelectorAll('.section-title').forEach(title => {
        if (title.textContent.includes('Educación') || title.textContent.includes('Education'))
            title.setAttribute('data-i18n', 'education');
        else if (title.textContent.includes('Experiencia') || title.textContent.includes('Experience'))
            title.setAttribute('data-i18n', 'experience');
        else if (title.textContent.includes('Certificaciones') || title.textContent.includes('Certifications'))
            title.setAttribute('data-i18n', 'certifications');
        else if (title.textContent.includes('Habilidades Técnicas') || title.textContent.includes('Technical Skills'))
            title.setAttribute('data-i18n', 'technicalSkills');
        else if (title.textContent.includes('Habilidades Adicionales') || title.textContent.includes('Additional Skills'))
            title.setAttribute('data-i18n', 'additionalSkills');
    });
    
    // Educación (estos selectores dependen de la estructura exacta de tu HTML)
    setupEducationTranslation();
    
    // Experiencia
    setupExperienceTranslation();
    
    // Certificaciones
    setupCertificationsTranslation();
    
    // Habilidades Técnicas
    setupTechnicalSkillsTranslation();
    
    // Habilidades Adicionales
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        if (index < 8) { // Asumiendo que hay 8 habilidades como en los archivos JSON
            tag.setAttribute('data-i18n', `additionalSkillsList.${index}`);
        }
    });
    
    // Footer
    const footerP = document.querySelector('footer p');
    if (footerP) footerP.setAttribute('data-i18n', 'copyright');
    
    const socialLinks = document.querySelectorAll('.social-links .social-link');
    if (socialLinks.length >= 3) {
        socialLinks[0].setAttribute('data-i18n', 'linkedin');
        socialLinks[1].setAttribute('data-i18n', 'portfolio');
        socialLinks[2].setAttribute('data-i18n', 'email');
    }
}

// Funciones auxiliares para configurar traducciones en secciones específicas
function setupEducationTranslation() {
    // Estas funciones tendrían selectores específicos según la estructura de tu HTML
    const educationItems = document.querySelectorAll('#education-carousel .carousel-item');
    
    if (educationItems.length >= 4) {
        // Primera educación (Ingeniería)
        const eng = educationItems[0].querySelector('.item-title');
        if (eng) eng.setAttribute('data-i18n', 'systemsEngineering');
        
        const engDate = educationItems[0].querySelector('.item-date');
        if (engDate) engDate.setAttribute('data-i18n', 'oct2024');
        
        const engSubtitle = educationItems[0].querySelector('.item-subtitle');
        if (engSubtitle) engSubtitle.setAttribute('data-i18n', 'universityPamplona');
        
        const engDesc = educationItems[0].querySelectorAll('.item-description p');
        if (engDesc.length >= 2) {
            engDesc[0].setAttribute('data-i18n', 'engineeringDescription');
            engDesc[1].setAttribute('data-i18n', 'thesis');
        }
        
        // Y así sucesivamente para los demás elementos...
        // Segundo elemento - Diplomado en Minería de Datos
        const dataMining = educationItems[1].querySelector('.item-title');
        if (dataMining) dataMining.setAttribute('data-i18n', 'dataMiningDiploma');
        
        const dataMiningDate = educationItems[1].querySelector('.item-date');
        if (dataMiningDate) dataMiningDate.setAttribute('data-i18n', 'oct2024');
        
        const dataMiningSubtitle = educationItems[1].querySelector('.item-subtitle');
        if (dataMiningSubtitle) dataMiningSubtitle.setAttribute('data-i18n', 'universityPamplona');
        
        const dataMiningDesc = educationItems[1].querySelectorAll('.item-description p');
        if (dataMiningDesc.length >= 2) {
            dataMiningDesc[0].setAttribute('data-i18n', 'dataMiningDescription1');
            dataMiningDesc[1].setAttribute('data-i18n', 'dataMiningDescription2');
        }
        
        // Tercer elemento - Diplomado en Protección de Datos
        const dataProtection = educationItems[2].querySelector('.item-title');
        if (dataProtection) dataProtection.setAttribute('data-i18n', 'dataProtectionDiploma');
        
        const dataProtectionDate = educationItems[2].querySelector('.item-date');
        if (dataProtectionDate) dataProtectionDate.setAttribute('data-i18n', 'july2025');
        
        const dataProtectionSubtitle = educationItems[2].querySelector('.item-subtitle');
        if (dataProtectionSubtitle) dataProtectionSubtitle.setAttribute('data-i18n', 'universityJaveriana');
        
        const dataProtectionDesc = educationItems[2].querySelector('.item-description p');
        if (dataProtectionDesc) dataProtectionDesc.setAttribute('data-i18n', 'dataProtectionDescription');
        
        // Cuarto elemento - Bachillerato
        const highSchool = educationItems[3].querySelector('.item-title');
        if (highSchool) highSchool.setAttribute('data-i18n', 'highSchoolTitle');
        
        const highSchoolDate = educationItems[3].querySelector('.item-date');
        if (highSchoolDate) highSchoolDate.setAttribute('data-i18n', 'nov2016');
        
        const highSchoolSubtitle = educationItems[3].querySelector('.item-subtitle');
        if (highSchoolSubtitle) highSchoolSubtitle.setAttribute('data-i18n', 'highSchoolName');
        
        const highSchoolDesc = educationItems[3].querySelectorAll('p');
        if (highSchoolDesc.length >= 2) {
            highSchoolDesc[0].setAttribute('data-i18n', 'highSchoolDescription1');
            highSchoolDesc[1].setAttribute('data-i18n', 'highSchoolDescription2');
        }
    }
}

function setupExperienceTranslation() {
    const experienceItems = document.querySelectorAll('.experience-item');
    
    if (experienceItems.length >= 3) {
        // Primer trabajo (Analista de Datos)
        const dataTitle = experienceItems[0].querySelector('.item-title');
        if (dataTitle) dataTitle.setAttribute('data-i18n', 'dataAnalyst');
        
        const dataDate = experienceItems[0].querySelector('.item-date');
        if (dataDate) dataDate.setAttribute('data-i18n', 'jan2024Feb2025');
        
        const dataSubtitle = experienceItems[0].querySelector('.item-subtitle');
        if (dataSubtitle) dataSubtitle.setAttribute('data-i18n', 'foundationPro');
        
        const dataList = experienceItems[0].querySelectorAll('ul li');
        if (dataList.length > 0) {
            for (let i = 0; i < dataList.length; i++) {
                dataList[i].setAttribute('data-i18n', `dataAnalystDuty${i+1}`);
            }
        }
        
        // Y así para las demás experiencias...
        // Segundo trabajo (Asistente de Soporte TI)
        const supportTitle = experienceItems[1].querySelector('.item-title');
        if (supportTitle) supportTitle.setAttribute('data-i18n', 'itSupportAssistant');
        
        const supportDate = experienceItems[1].querySelector('.item-date');
        if (supportDate) supportDate.setAttribute('data-i18n', 'apr2022May2023');
        
        const supportSubtitle = experienceItems[1].querySelector('.item-subtitle');
        if (supportSubtitle) supportSubtitle.setAttribute('data-i18n', 'ambientalLogistica');
        
        const supportList = experienceItems[1].querySelectorAll('ul li');
        if (supportList.length > 0) {
            for (let i = 0; i < supportList.length; i++) {
                supportList[i].setAttribute('data-i18n', `itSupportDuty${i+1}`);
            }
        }
        
        // Tercer trabajo (Auxiliar de Soporte TI)
        const auxTitle = experienceItems[2].querySelector('.item-title');
        if (auxTitle) auxTitle.setAttribute('data-i18n', 'itSupportAuxiliary');
        
        const auxDate = experienceItems[2].querySelector('.item-date');
        if (auxDate) auxDate.setAttribute('data-i18n', 'feb2021Aug2021');
        
        const auxSubtitle = experienceItems[2].querySelector('.item-subtitle');
        if (auxSubtitle) auxSubtitle.setAttribute('data-i18n', 'fundacionCangagua');
        
        const auxList = experienceItems[2].querySelectorAll('ul li');
        if (auxList.length > 0) {
            for (let i = 0; i < auxList.length; i++) {
                auxList[i].setAttribute('data-i18n', `itAuxiliaryDuty${i+1}`);
            }
        }
    }
}

function setupCertificationsTranslation() {
    const certifications = document.querySelectorAll('.certification');
    
    if (certifications.length >= 3) {
        // Google IT Support
        const cert1Title = certifications[0].querySelector('h3');
        if (cert1Title) cert1Title.setAttribute('data-i18n', 'googleITSupport');
        
        const cert1Date = certifications[0].querySelector('p');
        if (cert1Date) cert1Date.setAttribute('data-i18n', 'oct2024');
        
        const cert1Link = certifications[0].querySelector('a');
        if (cert1Link) cert1Link.setAttribute('data-i18n', 'viewCertificate');
        
        // Y así para las demás certificaciones...
        // Google Data Analytics
        const cert2Title = certifications[1].querySelector('h3');
        if (cert2Title) cert2Title.setAttribute('data-i18n', 'googleDataAnalytics');
        
        const cert2Date = certifications[1].querySelector('p');
        if (cert2Date) cert2Date.setAttribute('data-i18n', 'dec2024');
        
        const cert2Link = certifications[1].querySelector('a');
        if (cert2Link) cert2Link.setAttribute('data-i18n', 'viewCertificate');
        
        // Google AI Essentials
        const cert3Title = certifications[2].querySelector('h3');
        if (cert3Title) cert3Title.setAttribute('data-i18n', 'googleAIEssentials');
        
        const cert3Date = certifications[2].querySelector('p');
        if (cert3Date) cert3Date.setAttribute('data-i18n', 'oct2024');
        
        const cert3Link = certifications[2].querySelector('a');
        if (cert3Link) cert3Link.setAttribute('data-i18n', 'viewCertificate');
    }
}

function setupTechnicalSkillsTranslation() {
    const skillItems = document.querySelectorAll('#skills-carousel .carousel-item');
    
    if (skillItems.length >= 7) {
        // Lenguajes de Programación
        const skill1Title = skillItems[0].querySelector('h3');
        if (skill1Title) {
            const span = skill1Title.querySelector('span');
            const text = skill1Title.childNodes[1];
            if (span && text) {
                // Preservar el emoji y traducir solo el texto
                const originalHTML = skill1Title.innerHTML;
                skill1Title.innerHTML = originalHTML.replace(/>[^<]+<\/h3>/, '><span data-i18n="programmingLanguages"></span></h3>');
            }
        }
        
        // Y así para las demás habilidades...
        // Desarrollo Web
        const skill2Title = skillItems[1].querySelector('h3');
        if (skill2Title) {
            const span = skill2Title.querySelector('span');
            if (span) {
                const originalHTML = skill2Title.innerHTML;
                skill2Title.innerHTML = originalHTML.replace(/>[^<]+<\/h3>/, '><span data-i18n="webDevelopment"></span></h3>');
            }
        }
        
        // Bases de Datos
        const skill3Title = skillItems[2].querySelector('h3');
        if (skill3Title) {
            const span = skill3Title.querySelector('span');
            if (span) {
                const originalHTML = skill3Title.innerHTML;
                skill3Title.innerHTML = originalHTML.replace(/>[^<]+<\/h3>/, '><span data-i18n="databases"></span></h3>');
            }
        }
        
        // Soporte TI
        const skill4Title = skillItems[3].querySelector('h3');
        if (skill4Title) {
            const span = skill4Title.querySelector('span');
            if (span) {
                const originalHTML = skill4Title.innerHTML;
                skill4Title.innerHTML = originalHTML.replace(/>[^<]+<\/h3>/, '><span data-i18n="itSupport"></span></h3>');
            }
        }
        
        // Herramientas y Tecnologías
        const skill5Title = skillItems[4].querySelector('h3');
        if (skill5Title) {
            const span = skill5Title.querySelector('span');
            if (span) {
                const originalHTML = skill5Title.innerHTML;
                skill5Title.innerHTML = originalHTML.replace(/>[^<]+<\/h3>/, '><span data-i18n="toolsAndTechnologies"></span></h3>');
            }
        }
        
        // Análisis de Datos
        const skill6Title = skillItems[5].querySelector('h3');
        if (skill6Title) {
            const span = skill6Title.querySelector('span');
            if (span) {
                const originalHTML = skill6Title.innerHTML;
                skill6Title.innerHTML = originalHTML.replace(/>[^<]+<\/h3>/, '><span data-i18n="dataAnalysis"></span></h3>');
            }
        }
        
        // Ciberseguridad y Protección de Datos
        const skill7Title = skillItems[6].querySelector('h3');
        if (skill7Title) {
            const span = skill7Title.querySelector('span');
            if (span) {
                const originalHTML = skill7Title.innerHTML;
                skill7Title.innerHTML = originalHTML.replace(/>[^<]+<\/h3>/, '><span data-i18n="cybersecurityAndDataProtection"></span></h3>');
            }
        }
        
        // También configurar las listas de habilidades en cada tarjeta
        for (let i = 0; i < skillItems.length; i++) {
            const skillList = skillItems[i].querySelectorAll('.skill-list li');
            if (skillList.length > 0) {
                for (let j = 0; j < skillList.length; j++) {
                    // Asignar un identificador único para cada elemento de la lista
                    let categoryKey = '';
                    switch(i) {
                        case 0: categoryKey = 'programming'; break;
                        case 1: categoryKey = 'webDev'; break;
                        case 2: categoryKey = 'db'; break;
                        case 3: categoryKey = 'support'; break;
                        case 4: categoryKey = 'tools'; break;
                        case 5: categoryKey = 'dataAnalysis'; break;
                        case 6: categoryKey = 'security'; break;
                    }
                    skillList[j].setAttribute('data-i18n', `${categoryKey}Skill${j+1}`);
                }
            }
        }
    }
}