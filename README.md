# Requisitos do Sistema

### Cadastro de Carro

#### - **RF** => Requisitos Funcionais

- [x] Deve ser possível cadastrar um novo carro.

#### - **RNF** => Requisitos Não Funcionais

#### - **RN** => Regra de Negócio

- [x] Não deve ser possível cadastrar um carro com uma placa já existente.
- [x] O carro deve ser cadastrado, por padrão, como disponível.
- [x] O usuário responsável pelo cadastro deve ser um usuário administrador.

---

### Listagem de Carros

#### - **RF** => Requisitos Funcionais

- [x] Deve ser possível listar todos os carros.
- [ ] Deve ser possível listar todos os carros por nome.
- [ ] Deve ser possível listar todos os carros por marca.
- [ ] Deve ser possível listar todos os carros por categoria.
- [x] Deve ser possível listar todos os carros disponíveis.
- [x] Deve ser possível listar todos os carros disponíveis por nome.
- [x] Deve ser possível listar todos os carros disponíveis por marca.
- [x] Deve ser possível listar todos os carros disponíveis por categoria.

#### - **RNF** => Requisitos Não Funcionais

#### - **RN** => Regra de Negócio
- [ ] O usuário não precisa estar logado no sistema.

---

### Cadastro de Especificação de Carro

#### - **RF** => Requisitos Funcionais

- [x] Deve ser possível cadastrar uma especificação para um carro.
- [ ] Deve ser possível lista todas as especificações.

#### - **RNF** => Requisitos Não Funcionais

#### - **RN** => Regra de Negócio

- [x] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- [ ] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- [x] O usuário responsável pelo cadastro deve ser um usuário administrador.

---

### Cadastro de Imagens de Carro

#### - **RF** => Requisitos Funcionais

- [x] Deve ser possível cadastrar a imagem do carro.

#### - **RNF** => Requisitos Não Funcionais

- [x] Utilizar o multer para upload dos arquivos.

#### - **RN** => Regra de Negócio

- [x] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- [x] O usuário responsável pelo cadastro deve ser um usuário administrado.


---

### Aluguel de Carro

#### - **RF** => Requisitos Funcionais

- [x] Deve ser possível cadastrar um aluguel de carro.

#### - **RNF** => Requisitos Não Funcionais

#### - **RN** => Regra de Negócio

- [ ] O aluguel de carro deve ter duração minima de 24 horas.
- [x] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- [x] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.

---
