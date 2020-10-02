
<h1 align="center"> Labook </h1>
<p><b>Status: </b>concluído  :star2: </p>

<p align="justify"> O Labook é uma api desenvolvida para simular os processos de uma rede social. Com ele podemos criar novos usuários, fazer logins, criar amizades, posts e muito mais!</p>

<h3>Funcionalidades</h3>
<p>:heavy_check_mark: Cadastrar </p>
<p>:heavy_check_mark: Logar </p>
<p>:heavy_check_mark: Criar post</p>
<p>:heavy_check_mark: Visualizar feed </p>
<p>:heavy_check_mark: Filtrar tipos específicos de post </p>
<p>:heavy_check_mark: Curtir e descurtir posts </p>
<p>:heavy_check_mark: Comentar posts </p>

<h3> Algumas das tecnologias e ferramentas utilizadas:</h3> 
<li> :heavy_minus_sign: Node </p>
<li> :heavy_minus_sign: Typescript </p>
<li> :heavy_minus_sign: Arquitura MVC</p>
<li> :heavy_minus_sign: MySQL (para construção do banco de dados)</p>
<li> :heavy_minus_sign: Knex (para conexão com o banco de dados)</p>
<li> :heavy_minus_sign: Express (para integração do código através do protocolo HTTP)</p>
<li> :heavy_minus_sign: Dotenv (para acessar informações sensíveis por meio de variáveis de ambiente)</p>
<li> :heavy_minus_sign: UUID (para geraração de id)</p>
<li> :heavy_minus_sign: Bcryptjs (para criptografar senhas)</p>
<li> :heavy_minus_sign: Jsonwebtoken (para gerar tokens de autenticação)</p>


## Time: 

### Ana Irala

### Ana Zimerer

### Renan Takeshi

---

## Modelagem:

```sql
CREATE TABLE labook_user(
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

---

```sql
CREATE TABLE labook_user_relationship(
    user_id VARCHAR(255),
    friend_id VARCHAR(255),
        PRIMARY KEY (user_id, friend_id),
        FOREIGN KEY (user_id) REFERENCES labook_user(id),
        FOREIGN KEY (friend_id) REFERENCES labook_user(id)
);
```

---

```sql
CREATE TABLE labook_post(
    post_id VARCHAR(255) PRIMARY KEY,
    url_photo VARCHAR(255) NOT NULL,
    description TEXT,
    creation_date TIMESTAMP DEFAULT (current_timestamp),
    type ENUM('NORMAL', 'EVENT') DEFAULT ('NORMAL'),
    user_creator_id VARCHAR(255) NOT NULL,
        FOREIGN KEY (user_creator_id) REFERENCES labook_user(id)
);
```

---

```sql
CREATE TABLE post_like(
    post_id VARCHAR(255),
    user_id VARCHAR(255),
        PRIMARY KEY (post_id,user_id),
        FOREIGN KEY (post_id) REFERENCES labook_post(post_id),
    	FOREIGN KEY (user_id) REFERENCES labook_user(id)
);
```

---

```sql
CREATE TABLE post_comment(
    comment_id VARCHAR(255) PRIMARY KEY,
    post_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    creation_date TIMESTAMP DEFAULT (current_timestamp),
    text TEXT NOT NULL,
        FOREIGN KEY (post_id) REFERENCES labook_post(post_id),
	FOREIGN KEY (user_id) REFERENCES labook_user(id)
);
```
