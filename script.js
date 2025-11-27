// ==================================================
// CONFIGURAÇÃO (SUA URL DO API GATEWAY)
// ==================================================
const API_URL = "https://111mfgz0x4.execute-api.us-east-1.amazonaws.com/prod/gerar-site";

// ==================================================
// ELEMENTOS
// ==================================================
const editorMode = document.getElementById('editor-mode');
const previewMode = document.getElementById('preview-mode');
const toggleBtn = document.getElementById('toggle-btn');
const btnGerar = document.getElementById('btn-gerar-site');

const inputs = {
    nome: document.getElementById('nome'),
    profissao: document.getElementById('profissao'),
    bio: document.getElementById('bio'),
    fotoUpload: document.getElementById('foto-upload'),
    temaBase: document.getElementById('tema-base'), // Hidden input
    corDestaque: document.getElementById('cor-destaque'),
    fonteEstilo: document.getElementById('fonte-estilo'), // Hidden input
    linkedin: document.getElementById('linkedin'),
    github: document.getElementById('github'),
    instagram: document.getElementById('instagram'),
    ctaTexto: document.getElementById('cta-texto'),
    ctaLink: document.getElementById('cta-link')
};
const corValorTxt = document.getElementById('cor-valor');

// Elementos do Seletor de Fonte
const fonteTrigger = document.getElementById('fonte-trigger');
const fonteOptions = document.getElementById('fonte-options');
const allFonteOptions = document.querySelectorAll('.custom-option');

const preview = {
    foto: document.getElementById('preview-foto'),
    nome: document.getElementById('preview-nome'),
    profissao: document.getElementById('preview-profissao'),
    bio: document.getElementById('preview-bio'),
    container: document.getElementById('site-preview'),
    social: document.getElementById('preview-social'),
    cta: document.getElementById('preview-cta')
};

const modal = {
    overlay: document.getElementById('modal-overlay'),
    iconContainer: document.getElementById('modal-icon-container'),
    iconShape: document.getElementById('modal-icon-shape'),
    title: document.getElementById('modal-title'),
    message: document.getElementById('modal-message'),
    actionsSuccess: document.getElementById('modal-actions-success'),
    actionsError: document.getElementById('modal-actions-error'),
    linkFinal: document.getElementById('link-final-site'),
    btnFechar: document.querySelectorAll('.btn-fechar-modal')
};

let isPreview = false;
let fotoBase64 = "";
const MAX_FILE_SIZE = 4.5 * 1024 * 1024;

// ==================================================
// FUNÇÕES DO MODAL
// ==================================================
function mostrarModalSucesso(url) {
    modal.iconContainer.className = "modal-icon success";
    modal.iconShape.className = "ri-checkbox-circle-fill";
    modal.title.innerText = "Site Criado!";
    modal.message.innerText = "Seu portfólio profissional está online.";
    modal.linkFinal.href = url;
    modal.actionsSuccess.style.display = "flex";
    modal.actionsError.style.display = "none";
    modal.overlay.classList.add('active');
}

function mostrarModalErro(titulo, mensagem) {
    modal.iconContainer.className = "modal-icon error";
    modal.iconShape.className = "ri-error-warning-fill";
    modal.title.innerText = titulo;
    modal.message.innerText = mensagem;
    modal.actionsSuccess.style.display = "none";
    modal.actionsError.style.display = "flex";
    modal.overlay.classList.add('active');
}

function fecharModal() {
    modal.overlay.classList.remove('active');
}

// ==================================================
// FUNÇÕES AUXILIARES
// ==================================================
inputs.fotoUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        if (file.size > MAX_FILE_SIZE) {
            mostrarModalErro("Foto Muito Grande", `Sua imagem é muito pesada (${(file.size / 1024 / 1024).toFixed(1)}MB). Por favor, use uma foto com menos de 4.5MB.`);
            inputs.fotoUpload.value = "";
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            fotoBase64 = reader.result;
            preview.foto.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
});

function atualizarPreview() {
    preview.nome.innerText = inputs.nome.value || "Seu Nome";
    preview.profissao.innerText = inputs.profissao.value || "Sua Profissão";
    preview.bio.innerText = inputs.bio.value || "Sua biografia aparecerá aqui.";
    preview.cta.innerText = inputs.ctaTexto.value || "Entre em Contato";

    const cor = inputs.corDestaque.value;
    corValorTxt.innerText = cor;
    preview.container.style.fontFamily = inputs.fonteEstilo.value;
    preview.nome.style.color = cor;
    preview.cta.style.backgroundColor = cor;

    preview.container.className = "preview-content";
    preview.container.classList.add(inputs.temaBase.value === 'dark' ? 'theme-dark' : 'theme-light');
    const layoutSelecionado = document.querySelector('input[name="layout"]:checked').value;
    preview.container.classList.add(layoutSelecionado === 'split' ? 'layout-split' : 'layout-center');

    preview.social.innerHTML = "";
    const corIcone = inputs.temaBase.value === 'dark' ? '#ffffff' : '#1a1a1a';
    if (inputs.linkedin.value) adicionarIconeSocial('ri-linkedin-fill', inputs.linkedin.value, corIcone);
    if (inputs.github.value) adicionarIconeSocial('ri-github-fill', inputs.github.value, corIcone);
    if (inputs.instagram.value) adicionarIconeSocial('ri-instagram-line', inputs.instagram.value, corIcone);
}

function adicionarIconeSocial(iconeClass, link, cor) {
    const a = document.createElement('a');
    a.href = link;
    a.className = "social-icon";
    a.style.color = cor;
    a.innerHTML = `<i class="${iconeClass}"></i>`;
    preview.social.appendChild(a);
}

// ==================================================
// EVENT LISTENERS
// ==================================================

// Lógica para o seletor de fonte customizado
fonteTrigger.addEventListener('click', () => {
    fonteOptions.classList.toggle('active');
    fonteTrigger.classList.toggle('active');
});

allFonteOptions.forEach(option => {
    option.addEventListener('click', () => {
        allFonteOptions.forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        inputs.fonteEstilo.value = option.dataset.value;
        fonteTrigger.querySelector('span').innerText = option.innerText;
        fonteOptions.classList.remove('active');
        fonteTrigger.classList.remove('active');
        atualizarPreview();
    });
});

// NOVO: Lógica para o seletor de TEMA customizado
document.querySelectorAll('.theme-option input').forEach(radio => {
    radio.addEventListener('click', (e) => {
        inputs.temaBase.value = e.target.value; // Atualiza o input hidden
        atualizarPreview(); // Dispara a atualização do preview
    });
});

// Fecha o menu de fontes se clicar fora
window.addEventListener('click', (e) => {
    if (!fonteTrigger.contains(e.target) && !fonteOptions.contains(e.target)) {
        fonteOptions.classList.remove('active');
        fonteTrigger.classList.remove('active');
    }
});
// --- Fim da lógica dos seletores customizados ---


Object.values(inputs).forEach(input => {
    // Ignora os inputs que são controlados por JS (file, hidden)
    if (input.type !== 'file' && input.type !== 'hidden') {
        input.addEventListener('input', atualizarPreview);
    }
});
// Listener para os radios de Layout
document.querySelectorAll('input[name="layout"]').forEach(radio => {
    radio.addEventListener('change', atualizarPreview);
});

toggleBtn.addEventListener('click', () => {
    if (!isPreview) {
        atualizarPreview();
        editorMode.style.display = 'none';
        previewMode.style.display = 'flex';
        toggleBtn.innerHTML = '<i class="ri-pencil-line"></i> <span>Voltar ao Editor</span>';
        isPreview = true;
    } else {
        editorMode.style.display = 'block';
        previewMode.style.display = 'none';
        toggleBtn.innerHTML = '<i class="ri-eye-line"></i> <span>Ver Preview</span>';
        isPreview = false;
    }
});

modal.btnFechar.forEach(btn => btn.addEventListener('click', fecharModal));
modal.overlay.addEventListener('click', (e) => {
    if (e.target === modal.overlay) fecharModal();
});

// ==================================================
// GERAR SITE
// ==================================================
btnGerar.addEventListener('click', async (e) => {
    e.preventDefault();
    const btnHTMLOriginal = btnGerar.innerHTML;
    btnGerar.innerHTML = fotoBase64 ?
        '<i class="ri-upload-cloud-2-line ri-spin"></i> <span>Subindo foto e gerando...</span>' :
        '<i class="ri-loader-4-line ri-spin"></i> <span>Gerando site...</span>';
    btnGerar.disabled = true;

    const dadosCompletos = {
        nome: inputs.nome.value,
        profissao: inputs.profissao.value,
        bio: inputs.bio.value,
        fotoBase64: fotoBase64,
        tema: inputs.temaBase.value, // Lê do input hidden
        cor: inputs.corDestaque.value,
        fonte: inputs.fonteEstilo.value, // Lê do input hidden
        layout: document.querySelector('input[name="layout"]:checked').value,
        links: {
            linkedin: inputs.linkedin.value,
            github: inputs.github.value,
            instagram: inputs.instagram.value
        },
        cta: {
            texto: inputs.ctaTexto.value,
            link: inputs.ctaLink.value
        }
    };

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosCompletos)
        });

        if (!res.ok) {
            if (res.status === 413) {
                throw new Error("PayloadTooLarge");
            }
            throw new Error(`Erro desconhecido: ${res.status}`);
        }

        const json = await res.json();
        mostrarModalSucesso(json.url);

    } catch (err) {
        console.error(err);
        if (err.message === "PayloadTooLarge") {
            mostrarModalErro("Foto Muito Grande", "Sua imagem é muito pesada e o servidor recusou (ultrapassou 6MB). Tente uma com menos de 4.5MB.");
        } else {
            mostrarModalErro(
                "Ops, algo deu errado",
                "Não foi possível gerar seu site. Verifique sua conexão. Se o erro persistir, verifique se sua foto tem realmente menos de 4.5MB."
            );
        }
    } finally {
        btnGerar.innerHTML = btnHTMLOriginal;
        btnGerar.disabled = false;
    }
});

// Inicia
atualizarPreview();