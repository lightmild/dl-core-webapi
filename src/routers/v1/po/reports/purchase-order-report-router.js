var Router = require('restify-router').Router;
var router = new Router();
var db = require("../../../../db");
var resultFormatter = require("../../../../result-formatter");
const apiVersion = '1.0.0';
var PurchaseOrderManager= require("dl-module").managers.purchasing.PurchaseOrderManager;


router.get("/v1/po/poreport?dateFrom=:sdate&dateTo=:edate", function(request, response, next) {
    db.get().then(db => {
            var manager = new PurchaseOrderManager(db, {
                username: 'router'
            });
            var sdate = request.params.dateFrom;
            var edate = request.params.dateTo;
            manager.getDataPOUnit(sdate,edate)
            .then(docs => {
                    var result = resultFormatter.ok(apiVersion, 200, docs);
                    response.send(200, result);
                })
                .catch(e => {
                    response.send(500, "gagal ambil data");
                })
        })
        .catch(e => {
            var error = resultFormatter.fail(apiVersion, 400, e);
            response.send(400, error);
        })
});

router.get("/v1/po/poreport/:unit?dateFrom=:sdate&dateTo=:edate", function(request, response, next) {
    db.get().then(db => {
            var manager = new PurchaseOrderManager(db, {
                username: 'router'
            });
            var sdate = request.params.dateFrom;
            var edate = request.params.dateTo;
            var unit = request.params.unit;
            manager.getDataPODetailUnit(sdate,edate,unit)
            .then(docs => {
                    var result = resultFormatter.ok(apiVersion, 200, docs);
                    response.send(200, result);
                })
                .catch(e => {
                    response.send(500, "gagal ambil data");
                })
        })
        .catch(e => {
            var error = resultFormatter.fail(apiVersion, 400, e);
            response.send(400, error);
        })
});

router.get("/v1/po/poreportcategory?dateFrom=:sdate&dateTo=:edate", function(request, response, next) {
    db.get().then(db => {
            var manager = new PurchaseOrderManager(db, {
                username: 'router'
            });
            var sdate = request.params.dateFrom;
            var edate = request.params.dateTo;
            manager.getDataPOCategory(sdate,edate)
            .then(docs => {
                    var result = resultFormatter.ok(apiVersion, 200, docs);
                    response.send(200, result);
                })
                .catch(e => {
                    response.send(500, "gagal ambil data");
                })
        })
        .catch(e => {
            var error = resultFormatter.fail(apiVersion, 400, e);
            response.send(400, error);
        })
});

module.exports = router;