# Cloudflare dynamic DNS
Small script that keeps your cloudflare dns up to date.
### Installation
Add these environment variables. Domain to be watched will be DOMAIN environment variable if SUBDOMAIN isn't set.
 - CLOUDFLARE_EMAIL=dev@example.com
 - CLOUDFLARE_TOKEN=1234567
 - DOMAIN=example.com
 - SUBDOMAIN=sub.example.com [optional]

Install dependencies & run.

```sh
$ npm install
$ node dynamic-dns-cf.js
```
