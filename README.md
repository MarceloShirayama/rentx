# Requisitos do Sistema

### Cadastro de Carro

#### - **RF** => Requisitos Funcionais

- Deve ser possível cadastrar um novo carro.

#### - **RNF** => Requisitos Não Funcionais

#### - **RN** => Regra de Negócio

- Não deve ser possível cadastrar um carro com uma placa já existente.
- Não deve ser possível alterar a placa de um carro existente.
- O carro deve ser cadastrado, por padrão, como disponível.
- O usuário responsável pelo cadastro deve ser um usuário administrado.

---

### Listagem de Carros

#### - **RF** => Requisitos Funcionais

- Deve ser possível listar todos os carros.
- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros por nome.
- Deve ser possível listar todos os carros por marca.
- Deve ser possível listar todos os carros por categoria.

#### - **RNF** => Requisitos Não Funcionais

#### - **RN** => Regra de Negócio
- O usuário não precisa estar logado no sistema.

---

### Cadastro de Especificação de Carro

#### - **RF** => Requisitos Funcionais

- Deve ser possível cadastrar uma especificação para um carro.
- Deve ser possível lista todas as especificações.

#### - **RNF** => Requisitos Não Funcionais

#### - **RN** => Regra de Negócio

- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrado.

---

### Cadastro de Imagens de Carro

#### - **RF** => Requisitos Funcionais

- Deve ser possível cadastrar a imagem do carro.

#### - **RNF** => Requisitos Não Funcionais

- Utilizar o multer para upload dos arquivos.

#### - **RN** => Regra de Negócio

- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrado.


---

### Aluguel de Carro

#### - **RF** => Requisitos Funcionais

- Deve ser possível cadastrar um aluguel de carro.

#### - **RNF** => Requisitos Não Funcionais

#### - **RN** => Regra de Negócio

- O aluguel de carro deve ter duração minima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.

---