<p align="center">
  <h3 align="center"><strong>Server - NodeJS</strong></h3>
  <p align="center">
    Api desenvolvida com o objetivo de realizar uma exportação de dados complexos, utilizando rotinas diárias (cron), descompactação de arquivos e inserção em um banco de dados noSQL. Após isso é possível listar/editar/excluir dados.
  </p>
</p>

https://api-coodesh-challenge.herokuapp.com/api/v1/products

## Começando

Para obter uma cópia local e funcional, siga essas etapas

### Instalação

1. Clone o repositório
```sh
git clone https://github.com/kevynrocha/mongo-typescript-heroku.git
```
2. Entre na pasta do projeto
```sh
cd server/
```
3. Instale as dependências
```sh
yarn add
```
## Utilização

1. Inicie o servidor
```sh
yarn dev
```

### GET
`http://localhost:3333`

```
{
  "message": "Fullstack Challenge 20201030"
}
```

`http://localhost:3333/products`

```
{
  "total": 100,
  "page": 0,
  "pageSize": 30,
  "products": [
    {
      "status": "published",
      "_id": "5fdbe7e20cb9e52154a2de61",
      "code": 2603300000701,
      "barcode": "2603300000701(EAN / EAN-13)",
      "imported_t": "2020-12-17T23:19:20.371Z",
      "url": "https://world.openfoodfacts.org/product/2603300000701",
      "product_name": "Napolitana jamon y queso",
      "quantity": "",
      "categories": "",
      "packaging": "",
      "brands": "Consum",
      "image_url": "https://static.openfoodfacts.org/images/products/260/330/000/0701/1.jpg",
      "__v": 0
    }
  ]
}
```

`http://localhost:3333/products/:code`
```

{
	"status": "published",
	"_id": "5fdbe7e20cb9e52154a2de61",
	"code": 2603300000701,
	"barcode": "2603300000701(EAN / EAN-13)",
	"imported_t": "2020-12-17T23:19:20.371Z",
	"url": "https://world.openfoodfacts.org/product/2603300000701",
	"product_name": "Napolitana jamon y queso",
	"quantity": "",
	"categories": "",
	"packaging": "",
	"brands": "Consum",
	"image_url": "https://static.openfoodfacts.org/images/products/260/330/000/0701/1.jpg",
      "__v": 0
}
```

### PUT
`http://localhost:3333/products/:code`

```
{
  "success": true
}
```

### DELETE
`http://localhost:3333/products/:code`

```
{
  "success": true
}
```

## Contato

Kevyn Rocha - kevyn_oliver@hotmail.com

