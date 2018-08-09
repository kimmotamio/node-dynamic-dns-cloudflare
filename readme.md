# Cloudflare dynamic DNS
Small script that keeps your cloudflare dns up to date.
### Installation
Add these environment variables
 - CLOUDFLARE_EMAIL=dev@example.com
 - CLOUDFLARE_TOKEN=1234567
 - DOMAIN=example.com
 - SUBDOMAIN=sub.example.com [optional]

Install dependencies & run.

```sh
$ npm install
$ node dynamic-dns-cf.js
```
