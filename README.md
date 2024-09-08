# Projeto ACUEM
 
Neste repositório estão contidos tanto o projeto do frontend quanto o do backend.

### Estrutura de pastas:

#### Server
Nesta pasta está o projeto do backend, que foi construido utilizando o Framework
[Nestjs](https://nestjs.com/), como ORM utilizamos o [MikroORM](https://mikro-orm.io/) e como banco de dados [PostgreSQL](https://www.postgresql.org/)

#### Web
Nesta pasta está contido o projeto do frontend, que foi construido
utilizando o framework [NextJS](https://nextjs.org/) e a biblioteca
[ReactJS](https://pt-br.react.dev/), bem como [TailwindCSS](https://tailwindui.com/) para estilização e [NextUI](https://nextui.org/) para Componentes de UI.

### Manual de Instalação:

Para rodar o projeto, inicialmente vamos precisar realizar algumas instalações:

- Node (Versão mais recente) (https://nodejs.org/en/download/package-manager) 
- Yarn (https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)  
OBS: Ao instalar o node, será instalado também o NPM, portanto, a instalação do yarn pode ser feita utilizando o mesmo.
- Banco de dados [Postgres](https://www.postgresql.org/)(Versão mais recente)

#### Iniciando o Servidor

##### OBS: Procure sempre rodar os comandos no CMD, pois o powershell pode dar erros de permissão.

O primeiro passo, é acessar a pasta **server** e rodar o comando **yarn**, aguarde enquanto as dependencias são instaladas.

Após isso, crie um banco de dados postgresql local na sua máquina, utilizando qualquer SGBD, Guarde as credenciais pois utilizaremos nos próximos passos.

Assim que as dependencias forem instaladas, acesse o a pasta **src** e o arquivo: **mikro-orm.config.ts**, você vai encontrar, no fim do arquivo, a seguinte estrutura:

```
dbName: 'acuem', // Nome do banco de dados
password: 'admin', // Senha do banco de dados
user: 'postgres', // Usuário do banco de dados
// host: 'seuhost', // Host do banco de dados (Opcional Para banco de dados local, se utilizar o default)
// port: 'suaporta', // Porta do banco de dados (Opcional Para banco de dados local, se utilizar a default)
```

Substituia os dados com as credenciais do seu banco de dados.
Os atributos **host** e **port** estão comentados, portanto para altera-los, retire as duas barras iniciais.

Por fim, utilizando o comando **yarn start:dev**, o projeto irá iniciar localmente.

Você finalmente verá no console a escrita: **Nest application successfully started**

Após isso, seu servidor estará rodando na porta **3030** do localhost
A Porta pode ser modificada acessando **/src/main.ts**, e executando o projeto novamente.

Nesse ponto, desejamos agora popular o nosso banco de dados com alguns dados inicias, como universidades, cantinas e funcionários das cantinas.

Para tal, você pode abrir um novo terminal(na mesma pasta), ou parar o servidor e executar o comando a seguir: **npx mikro-orm migration:fresh --seed**, lembre se de iniciar o servidor novamente caso tenha parado a execução.

Após isso, siga as instruções e alguns dados de acesso serão criados para acessar as cantinas.


#### Iniciando o WEB

Antes disso, é importante criar um arquivo .env (dentro da pasta web, caso esse arquivo não exista) e copiar o conteúdo do arquivo .env.example para dentro dele

Considerando que você já realizou os passos anteriores, agora, para rodar o servidor web acesse a pasta **web**, abra o terminal e execute o comando: **yarn**, aguarde a instalação das dependencias e depois execute o comando: **yarn dev**, acompanhe o terminal e a aplicação irá rodar na porta disponível, e tudo será informado via terminal.

## Acessando o sistema

Para acessar o sistema na visão de **Estudante**, acesse a página inicial, **/**, **VIA DISPOSITIVO MOVEL**, ou diminua a tela do navegador até a resolução de um dispositivo móvel, a partir disso você poderá criar uma conta e utilizar o app.

Para acessar o sistema na visão de **Cantina**, **Acesse um novo navegador, ou uma aba anônima, para que as sessões de usuário sejam diferentes** acesse a página **/adm**, e utilize o login para a cantina desejada, (esses acessos foram obtidos na etapa de popular o banco de dados).

### Pronto! Em caso de dúvidas ou problemas na instalação, basta entrar em contato: ra123959@uem.br
