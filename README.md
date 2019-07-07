# Voucher Shop API

## Usage

to start, simply

```sh
$ npm i
$ npm run dev
```

## Configuration

Edit file ```config/index.js``` & ```config/config.json``` as you please.

#Doc URL
Simple Case (Topup & Buy Voucher) : <br>
*Login (/login) POST (email: String, password: String)<br>
*Register (/Register) Post (firstName: String, lastName: String, email: string, password: string)<br>
*Topup (/topup) POST (userId: Integer, nominal: Integer)<br>
*Topup Send Konfirmasi POST (/topup/konfirmasi/:id) <br>
*Topup Konfirmasi (Must be admin) PUT (/topup/:id/konfirmasi/:status) (Status : diterima/ditolak)<br>
*List Voucher GET (/voucher) <br>
*Order Voucher POST (/order) (voucherId: Integer)<br>
*List Ordered Voucher GET (/order/user)<br>