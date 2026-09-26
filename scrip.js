
document.addEventListener('DOMContentLoaded', () => {
    
    // Inicialización de Iconos Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Mostrar Año Actual en Footer
    const yearElem = document.getElementById('current-year');
    if (yearElem) yearElem.textContent = new Date().getFullYear();

    
    // 1. MANIPULACIÓN DE FOTO DE PERFIL 
    const profileInput = document.getElementById('profile-img-input');
    const profilePreview = document.getElementById('profile-img-preview');

    profileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                // Modificación directa de atributo DOM
                profilePreview.setAttribute('src', event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // 2. ALTERNAR FORMULARIOS (Toggle de clases en el DOM)
    const btnToggleEdu = document.getElementById('btn-toggle-edu-form');
    const formEdu = document.getElementById('form-edu');
    const btnCancelEdu = document.getElementById('btn-cancel-edu');

    btnToggleEdu.addEventListener('click', () => formEdu.classList.toggle('hidden'));
    btnCancelEdu.addEventListener('click', () => formEdu.classList.add('hidden'));

    const btnToggleWork = document.getElementById('btn-toggle-work-form');
    const formWork = document.getElementById('form-work');
    const btnCancelWork = document.getElementById('btn-cancel-work');

    btnToggleWork.addEventListener('click', () => formWork.classList.toggle('hidden'));
    btnCancelWork.addEventListener('click', () => formWork.classList.add('hidden'));

    // 3. AGREGAR EDUCACIÓN AL DOM (document.createElement)
    const eduContainer = document.getElementById('education-list');

    formEdu.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('edu-title').value.trim();
        const institution = document.getElementById('edu-institution').value.trim();
        const year = document.getElementById('edu-year').value.trim();
        const desc = document.getElementById('edu-desc').value.trim();

        if (!title || !institution || !year) return;

        // Crear elemento en el DOM
        const newEdu = document.createElement('div');
        newEdu.className = 'edu-item bg-slate-50 border border-slate-200 rounded-xl p-4 flex justify-between items-center dom-enter-animation';
        newEdu.innerHTML = `
            <div>
                <h4 class="text-sm font-bold text-slate-900">${escapeHTML(title)}</h4>
                <p class="text-xs font-medium text-brand-600">${escapeHTML(institution)}</p>
                ${desc ? `<p class="text-xs text-slate-500 mt-0.5">${escapeHTML(desc)}</p>` : ''}
            </div>
            <div class="flex items-center gap-3">
                <span class="text-xs font-semibold px-2.5 py-1 bg-brand-50 text-brand-700 rounded-full">${escapeHTML(year)}</span>
                <button class="delete-btn text-slate-400 hover:text-red-500 p-1" title="Eliminar del DOM">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
            </div>
        `;

        eduContainer.appendChild(newEdu);
        if (typeof lucide !== 'undefined') lucide.createIcons();

        formEdu.reset();
        formEdu.classList.add('hidden');
    });

    // 4. AGREGAR EXPERIENCIA AL DOM
    const workContainer = document.getElementById('work-list');

    formWork.addEventListener('submit', (e) => {
        e.preventDefault();

        const role = document.getElementById('work-role').value.trim();
        const company = document.getElementById('work-company').value.trim();
        const period = document.getElementById('work-period').value.trim();
        const desc = document.getElementById('work-desc').value.trim();

        if (!role || !company || !period || !desc) return;

        const newWork = document.createElement('div');
        newWork.className = 'work-item border-l-2 border-brand-500 pl-4 space-y-1 relative dom-enter-animation';
        newWork.innerHTML = `
            <div class="flex justify-between items-start gap-2">
                <div>
                    <h4 class="text-sm font-bold text-slate-900">${escapeHTML(role)}</h4>
                    <p class="text-xs font-semibold text-brand-600">${escapeHTML(company)}</p>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-medium">${escapeHTML(period)}</span>
                    <button class="delete-btn text-slate-400 hover:text-red-500 p-1" title="Eliminar del DOM">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed">${escapeHTML(desc)}</p>
        `;

        workContainer.prepend(newWork);
        if (typeof lucide !== 'undefined') lucide.createIcons();

        formWork.reset();
        formWork.classList.add('hidden');
    });

    // 5. DELEGACIÓN DE EVENTOS PARA ELIMINAR ELEMENTOS DEL DOM
    document.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.delete-btn');
        if (deleteBtn) {
            const item = deleteBtn.closest('.edu-item, .work-item');
            if (item) {
                item.style.opacity = '0';
                item.style.transition = 'opacity 0.25s ease';
                setTimeout(() => item.remove(), 250);
            }
        }
    });

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, tag => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
        }[tag] || tag));
    }
});