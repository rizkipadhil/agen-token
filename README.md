# Voucher Shop API
Database : vouchershop
## Usage

to start, simply

```sh
$ npm i
$ npm run dev
$ npm test
```

## Configuration

Edit file ```config/index.js``` & ```config/config.json``` as you please.

#Doc URL
Simple Case (Topup & Buy Voucher) : <br>
*Register (/Register) Post (firstName: String, lastName: String, email: string, password: string)<br>
*Login (/login) POST (email: String, password: String)<br>
*Topup (/topup) POST (userId: Integer, nominal: Integer)<br>
*Topup Send Confirmation POST (/topup/konfirmasi/:id) (banknumber: String, nama: String)<br>
*Topup Confirmation (Must be admin) PUT (/topup/:id/konfirmasi/:status) (Status : diterima/ditolak)<br>
*List Voucher GET (/voucher) <br>
*Order Voucher POST (/order) (voucherId: Integer)<br>
*List Ordered Voucher GET (/order/user)<br>