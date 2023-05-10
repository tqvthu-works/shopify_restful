# Shopify App Backend API

This is a backend API project built with Node.js and TypeScript. It is used as the backend for a Shopify app.

## Prerequisites

- Node.js 16 or greater
- TypeScript

## Getting Started

##### To install the project, run:
- clone ```.env.example to .env```
- ```npm install```
##### Migration:
- Make new migration
```npx sequelize migration:create --name=<name>```
- Migrate DB
```npm run sequelize db:migrate```
- Help
```npx sequelize --help```
##### To start the web server for local development, run:
```npm run local```
##### To run a command line, use:
```npm run cmd```
##### To get into console, use:
```npm run tinker```
##### To run a worker, use:
- Production: ```npm run queue:work --queue={queueName}```
- Local: ```npm run queue:listen --queue={queueName}```
- or specific connection ```npm run queue:work <connection_name> --queue={queueName}```

## Some Utils
- Use lodash: ```_.get(object, <field_name>)```
- Use container to get instance: ```container.get(<BoundClass>)```
## Dispatch job
- Dispatch: ``` new <JobClass>()
            .setJobData({
                field_1: 'filed_1',
                field_n: 'filed_n',
            })
            .dispatch();```
- Delayed Dispatching ``` new <JobClass>()
            .setJobData({
                field_1: 'filed_1',
                field_n: 'filed_n'
            }).delay(moment().add(5, 'minutes'))
            .dispatch();```

## Resource for building RESTful API

- [Express.js](https://expressjs.com/)
- [Sequelize ORM](https://sequelize.org/)
- [Inversify](https://inversify.io/)
- [Commander](https://www.npmjs.com/package/commander)
- [RESTful API Design - Resource Naming](https://restfulapi.net/resource-naming/)