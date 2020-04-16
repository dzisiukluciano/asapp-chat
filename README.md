# LDZ chat backend

## Overview
LDZ chat backend that allows message exchange between users

![Components](https://github.com/dzisiukluciano/ldz-chat/blob/master/ldz-chat-components.png)

## Requirements

- docker-compose version 1.23.x

### Configuration

#### Configuration file

Sensitive configuration vars should be defined in the environment of the container/instance.

For testing, you can use the file: `env-local.yml`
That file is read when you run the application through docker-compose
or through `npm run local`, but doesn't override any environment variable

#### Configuration Varibles

Required Variables in configuration file:

```
PORT: Port where the app will be running, example: 8080.
PREFIX: Prefix path for the app, example: `ldz-chat-backend`.
PG_CONNECTION: Connection string for the DB.
```

For more information take a look to the file `eny-local.yml`

## Run the application

### Docker compose

- Run:

```docker-compose up```

### NPM

#### Requirements

- node v10.x
- postgres 9.6
- redis 3.2.x

- Install dependencies

```
$ cd ldz-chat

$ npm i
```

- Run locally

```$ npm run local```

- Run tests

```$ npm run test```

- Measure coverage

```$ npm run coverage```
```
=============================== Coverage summary ===============================
Statements   : 69.06% ( 221/320 )
Branches     : 49.49% ( 49/99 )
Functions    : 40.32% ( 25/62 )
Lines        : 73.04% ( 214/293 )
================================================================================
```

## Stress tests

- Benchmark: post 5000 messages with 50 concurrent users
`ab -p postMessage.json -T application/json -H 'Authorization: Bearer XXX' -c 50 -n 5000 http://localhost:8080/messages`
```
Requests per second:    498.90 [#/sec] (mean)
Time per request:       100.220 [ms] (mean)
Time per request:       2.004 [ms] (mean, across all concurrent requests)
Transfer rate:          128.03 [Kbytes/sec] received
                        633.86 kb/s sent
                        761.89 kb/s total

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   1.6      0      74
Processing:    17   99  26.8     92     368
Waiting:       11   98  26.6     91     368
Total:         17  100  26.9     93     370

Percentage of the requests served within a certain time (ms)
  50%     93
  66%     99
  75%    107
  80%    111
  90%    119
  95%    140
  98%    181
  99%    204
 100%    370 (longest request)
```

- Benchmark: get 10000 messages with 100 concurrent users
`ab -T application/json -H 'Authorization: Bearer XXX' -c 100 -n 10000 http://localhost:8080/messages?recipient=2&start=1&limit=20`
```
Requests per second:    1643.38 [#/sec] (mean)
Time per request:       60.850 [ms] (mean)
Time per request:       0.609 [ms] (mean, across all concurrent requests)
Transfer rate:          462.20 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    2   2.1      2      20
Processing:    12   58  15.6     53     141
Waiting:        5   50  13.0     46     137
Total:         17   60  15.6     55     144

Percentage of the requests served within a certain time (ms)
  50%     55
  66%     62
  75%     67
  80%     71
  90%     79
  95%     95
  98%    108
  99%    117
 100%    144 (longest request)
```

## API DOC and UI

http://localhost:8080/api/ldz-chat-backend/api-docs/#/
