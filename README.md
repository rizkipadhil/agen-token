# Voucher Shop API
## Usage

to start, simply

```sh
$ npm i
$ npm run dev
$ npm test
```


Database : Mysql <br>
Name : vocuhershop <br>

## Configuration

Edit file ```config/index.js``` & ```config/config.json``` as you please.

#Doc URL
Simple Case (Topup & Buy Voucher) : <br>
*Register (/Register) Post (firstName: String, lastName: String, email: string, password: string)<br>
*Login (/login) POST (email: String, password: String)<br>
*Topup (/topup) POST (userId: Integer, nominal: Integer) (Headers Authorization: Bearer Token)<br>
*Topup Send Confirmation POST (/topup/konfirmasi/:id) (banknumber: String, nama: String) (Headers Authorization: Bearer Token)<br>
*Topup Confirmation (Must be admin) PUT (/topup/:id/konfirmasi/:status) (Status : diterima/ditolak) (Headers Authorization: Bearer TokenAdmin)<br>
*List Voucher GET (/voucher) <br>
*Order Voucher POST (/order) (voucherId: Integer) (Headers Authorization: Bearer Token)<br>
*List Ordered Voucher GET (/order/user) (Headers Authorization: Bearer Token)<br>
