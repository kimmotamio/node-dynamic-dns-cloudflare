const request = require('request-promise');
const dotenv = require('dotenv').config();
const CronJob = require('cron').CronJob;

console.log('Starting cronjob, running every minute...');

const job = new CronJob({
	cronTime: '* * * * *',
	onTick: () => {
		const cfBaseUrl = 'https://api.cloudflare.com/client/v4';
		const cfParams = {
			url: `${cfBaseUrl}/zones?name=${process.env.DOMAIN}&status=active`,
			headers: {
				'X-AUTH-KEY': process.env.CLOUDFLARE_TOKEN,
				'X-AUTH-EMAIL': process.env.CLOUDFLARE_EMAIL
			}
		};
		const ipRequest = request('https://canihazip.com/s');
		const cloudflareIpRequest = request(cfParams);

		Promise.all([ipRequest, cloudflareIpRequest]).then((data) => {
			const ip = data[0];
			const cloudflare = JSON.parse(data[1]);
			const domainId = cloudflare.result[0].id;
			const name = process.env.SUBDOMAIN !== undefined ? process.env.SUBDOMAIN : process.env.DOMAIN;
			cfParams.url = `${cfBaseUrl}/zones/${domainId}/dns_records?type=A&name=${name}`;

			request(cfParams).then((dnsRecords) => {
				dnsRecords = JSON.parse(dnsRecords).result[0];
				const dnsRecordId = dnsRecords.id

				if (dnsRecords.content !== ip) {
					console.log('IP updated! Updating cloudflare...');
					cfParams.url = `${cfBaseUrl}/zones/${domainId}/dns_records/${dnsRecordId}`;
					cfParams.method = 'PUT';
					cfParams.headers['Content-Type'] = 'application/json';
					cfParams.json = {
						type: 'A',
						name: name,
						content: ipinfo.ip
					};

					request(cfParams).then((updatedDns) => {
						console.dir(updatedDns);
					});
				} else {
					console.log('IP hasn\'t changed.');
				}
			});
		}).catch(err => console.error(err));
	}
});
job.start();
