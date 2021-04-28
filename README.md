# Microserviço de clientes

Microserviço de clientes para a unidade curricular da USJT de sistemas distribuidos.

## API Reference

#### Cadastro e retorno do cliente cadastrado

```http:4000
  POST /clientes
```

| Parameter  | Type     | Description                       |
| :--------- | :------- | :-------------------------------- |
| `nome`     | `string` | **Required**. Nome do cliente     |
| `endereco` | `string` | **Required**. Endereço do cliente |
| `idade`    | `int`    | **Required**. idade do cliente    |

#### Lista todos clientes

```http
  GET /clientes
```

#### Atualiza um cliente

```http
  PUT /clientes/${id}
```

| Parameter  | Type     | Description                                |
| :--------- | :------- | :----------------------------------------- |
| `id`       | `int`    | **Required**. Id do cliente a ser alterado |
| `nome`     | `string` | Nome do cliente                            |
| `endereco` | `string` | Endereço do cliente                        |
| `idade`    | `int`    | idade do cliente                           |

#### Deleta um cliente

```http
  DELETE /clientes/${id}
```

| Parameter | Type  | Description                                |
| :-------- | :---- | :----------------------------------------- |
| `id`      | `int` | **Required**. Id do cliente a ser deletado |
