# Descrição do Backend

Neste projeto de backend, utilizei diversas tecnologias para construir uma arquitetura sólida e padronizada.

## Arquitetura

- **DDD (Domain Driven Design)**: A arquitetura tem como base os princípios do Domain Driven Design, proporcionando uma estrutura organizada e voltada para o domínio do negócio.

- **DDP (Domain Design Pattern)**: Utilizei o conceito de DDP para criar uma estrutura mais solida e padronizacional, garantindo a consistência no design e implementação.

- **Query Builder do PG**: Para interações com o banco de dados, optei por utilizar um query builder específico para PostgreSQL. As querys SQL estão organizadas na pasta `sql` na raiz do projeto.

- **Módulo para Transações**: Desenvolvi um módulo personalizado para ler os arquivos SQL e executar o query builder do PG, centralizando as transações do banco de dados e mantendo a solidez na execução.

Esta abordagem foi escolhida para garantir uma estrutura coesa, seguindo boas práticas de desenvolvimento e proporcionando robustez na comunicação e transações do backend.
