CloudPortfolio – Geração Automática de Portfólios em Arquitetura Serverless

O CloudPortfolio é uma aplicação web desenvolvida no modelo SaaS (Software as a Service) com o objetivo de eliminar a barreira técnica normalmente associada à criação e hospedagem de sites pessoais. Em vez de exigir que o usuário entenda conceitos como DNS, servidores HTTP, hospedagem ou deploy, o sistema automatiza todo o processo de geração, customização e publicação de um portfólio profissional.

A solução permite que qualquer pessoa — mesmo sem conhecimento técnico — crie um site completo em segundos, apenas preenchendo um formulário com seus dados e enviando uma imagem de perfil. Todo o restante é tratado pela arquitetura serverless implementada na AWS.

🚀 Principais Funcionalidades

Geração automática de sites profissionais a partir de um formulário.

Criação dinâmica de HTML/CSS com base nos dados enviados pelo usuário.

Upload e gerenciamento de imagem de perfil.

Hospedagem estática automática com entrega via HTTPS.

Retorno de uma URL pública pronta para uso.

Arquitetura altamente escalável e sem custos ociosos (100% Serverless).

☁️ Arquitetura em Nuvem (AWS)

A solução foi desenvolvida adotando serviços gerenciados, com foco em simplicidade operacional, segurança e escalabilidade.

🔹 Amazon S3 — Armazenamento

Usado tanto para hospedar sites estáticos quanto para armazenar os arquivos gerados (HTML, CSS e imagens).

Alta durabilidade (11 9s) e escalabilidade praticamente infinita.

Ideal para servir conteúdo estático com baixa latência.

🔹 AWS Lambda — Camada de Computação

Responsável por toda a lógica de geração do portfólio.

Executa sob demanda, sem necessidade de provisionamento de servidores.

Cobrança baseada no tempo de execução, tornando o sistema economicamente eficiente.

🔹 Amazon API Gateway — Interface de Comunicação

Porta de entrada segura do back-end.

Roteamento de requisições HTTP/REST.

Gerenciamento de CORS e integração direta com funções Lambda.

Conecta o front-end à lógica de processamento de forma completamente desacoplada.

🏗️ Arquitetura da Solução

O fluxo funcional segue um pipeline simples e otimizado:

Usuário acessa o front-end e preenche o formulário com seus dados profissionais.

O front-end envia as informações para a API Gateway.

A API invoca uma função AWS Lambda, que:

Processa os dados enviados,

Gera dinamicamente os arquivos HTML e CSS,

Faz upload dos arquivos e imagem para o Amazon S3.

O sistema gera uma URL pública e segura (HTTPS) apontando para o portfólio recém-criado.

O usuário recebe a URL final, pronta para compartilhamento.

(Um diagrama pode ser adicionado posteriormente na seção abaixo.)

📊 Diagrama da Arquitetura

(Inserir “Figura 1” aqui quando disponível — recomendável usar draw.io, Excalidraw ou arquitetura exportada da AWS Console.)

📦 Tecnologias Utilizadas

Front-end: HTML, CSS, JavaScript (ou framework utilizado)

Cloud: AWS (S3, Lambda, API Gateway)

Linguagem Back-end: [inserir linguagem utilizada]

Infraestrutura: Arquitetura Serverless + Infraestrutura como Código (opcional se você incluir Terraform/SAM/CDK)

🛠️ Como Executar o Projeto Localmente

Observação crítica: um sistema serverless depende de serviços AWS, então a execução local é limitada. Aqui vão instruções mínimas que façam sentido sem criar expectativas falsas.

Clone o repositório:

git clone https://github.com/seu-usuario/cloudportfolio.git
cd cloudportfolio


Instale dependências do back-end (caso existam):

npm install


Execute simulação local da Lambda (opcional e dependente do framework usado):

npm run local


Abra o front-end no navegador:

open index.html


Para testes completos, é necessário configurar credenciais AWS e recursos correspondentes.

📚 Aprendizados e Justificativas Técnicas

O uso de arquitetura serverless elimina custos ociosos e simplifica a manutenção.

A separação entre API Gateway, Lambda e S3 melhora a segurança e modularidade.

O sistema prioriza baixo acoplamento e alta escalabilidade.

A escolha de S3 como hospedagem é coerente com a natureza estática dos portfólios gerados.

📝 Licença

Este projeto está sob a licença [escolha sua licença].
Recomenda-se utilizar MIT para projetos educacionais ou experimentais.
