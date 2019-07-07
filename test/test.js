var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3000");

describe("Test / & /Login", function () {
    it("/", function (done) {
        server
            .get("/")
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                done();
            });
    });
    it("/login", function (done) {
        server
            .post("/login")
            .send({email:"hello123@admin.com",password:"admin123"})
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                 res.body.status.should.equal(200);
                 done();
            });
    });
});

describe("List Voucher & List Voucher User", function () {
    it("/voucher", function (done) {
        server
            .get("/voucher")
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.body.status.should.equal(200);
                res.status.should.equal(200);
                done();
            });
    });
    it("/order/user", function (done) {
        server
            .get("/order/user")
            .expect("Content-type", /json/)
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMTIzQGFkbWluLmNvbSIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE1NjI1MjE2MTF9.L3EOJjoKkVeLrG_McxtflxVCKOjveoOHPSspKuBGBek')
            .expect(200)
            .end(function (err, res) {
                res.body.status.should.equal(200);
                done();
            });
    });
});

describe("Topup & Send Confirmation", function () {
    it("/topup", function (done) {
        server
            .post("/topup")
            .send({
                userId: 3,
                nominal: 10000
            })
            .expect("Content-type", /json/)
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMTIzQGFkbWluLmNvbSIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE1NjI1MjE2MTF9.L3EOJjoKkVeLrG_McxtflxVCKOjveoOHPSspKuBGBek')
            .expect(200)
            .end(function (err, res) {
                res.body.status.should.equal(200);
                res.status.should.equal(200);
                done();
            });
    });
    it("/topup/konfirmasi/:id", function (done) {
        server
            .post("/topup/konfirmasi/1")
            .send({
                banknumber: "123456",
                nama: "Hello"
            })
            .expect("Content-type", /json/)
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMTIzQGFkbWluLmNvbSIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE1NjI1MjE2MTF9.L3EOJjoKkVeLrG_McxtflxVCKOjveoOHPSspKuBGBek')
            .expect(200)
            .end(function (err, res) {
                res.body.status.should.equal(200);
                res.status.should.equal(200);
                done();
            });
    });
});
describe("Topup Confirmation from Admin & buy Voucher", function () {
    it("/topup/:id/konfirmasi/:status", function (done) {
        server
            .put("/topup/1/konfirmasi/diterima")
            .expect("Content-type", /json/)
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU2MjUwNDQyNX0.i-6KTRR1D54_EOWI8ElUvtUC1uRP4FGKlkRnzcjHgWY') // token admin
            .expect(200)
            .end(function (err, res) {
                res.body.status.should.equal(200);
                res.status.should.equal(200);
                done();
            });
    });
    it("/order", function (done) {
        server
            .post("/order")
            .send({
                voucherId: 2
            })
            .expect("Content-type", /json/)
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU2MjUwNDQyNX0.i-6KTRR1D54_EOWI8ElUvtUC1uRP4FGKlkRnzcjHgWY') // token admin
            .expect(200)
            .end(function (err, res) {
                res.body.status.should.equal(200);
                res.status.should.equal(200);
                done();
            });
    });
});