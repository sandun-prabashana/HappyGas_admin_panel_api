export default class SellerServices{

    baseUrl = 'https://happygas.herokuapp.com';


    async deleteSeller(nic) {
        console.log('props data ', nic);
        return fetch(this.baseUrl + '/api/v1/adminRoute/deleteSellers', {
            method: 'delete',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                nic: nic,
            },
        });
    }

    async getQty(nic) {
        console.log('props data ', nic);
        return fetch(this.baseUrl + '/api/v1/adminRoute/getQty', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                nic: nic,
            },
        });
    }

    async addSeller(nic,name,email,area,contact,password) {
        console.log('Callling AddSeller Action');
        console.log(nic)
        console.log(name)
        console.log(email)
        console.log(area)
        console.log(contact)
        console.log(password)

        var date = new Date().getDate();
        var month = new Date().getMonth()+1;
        var year = new Date().getFullYear();
        var fulldate = year+'/'+month+'/'+date

        return fetch(this.baseUrl + '/api/v1/adminRoute/addSellers', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nic  : nic,
                name  : name,
                email : email,
                area : area,
                contact:contact,
                password:password,
                date:fulldate,
            }),
        });
    }

    async updateQty(nic,newQty,qty,aQty) {
        console.log('Callling updateQty Action');
        console.log("new "+newQty)
        console.log("old "+qty)
        console.log("adminQty "+aQty)

        var adminQty = parseInt(aQty);

        var a = parseInt(newQty);
        var b = parseInt(qty);
        var c = a+b

        var newQty = adminQty - a
        console.log(c);

        var date = new Date().getDate();
        var month = new Date().getMonth()+1;
        var year = new Date().getFullYear();
        var fulldate = year+'/'+month+'/'+date

        return fetch(this.baseUrl + '/api/v1/adminRoute/updateQty', {
            method: 'put',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nic  : nic,
                qty  : c,
                newAdminQty : newQty,
                date : fulldate,
            }),
        });
    }

    async addSellerRecord(nic,qty) {

        var date = new Date().getDate();
        var month = new Date().getMonth()+1;
        var year = new Date().getFullYear();
        var fulldate = year+'/'+month+'/'+date

        return fetch(this.baseUrl + '/api/v1/adminRoute/addRecord', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nic  : nic,
                qty  : qty,
                date : fulldate
            }),
        });
    }


    async getPickUpOrders(area) {
        console.log('props data ', area);
        return fetch(this.baseUrl + '/api/v1/adminRoute/getAllPickUpOrders', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                city: area,
            },
        });
    }

    async updateStatus(oid,status) {

        console.log(typeof status)
        var string = status.toString();
        console.log(typeof string)

        return fetch(this.baseUrl + '/api/v1/adminRoute/updateStatus', {
            method: 'put',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                oid  : oid,
                status  : string,
            }),
        });
    }

    async updatenewStatus(nic,qty) {


        return fetch(this.baseUrl + '/api/v1/adminRoute/updateSellerQty', {
            method: 'put',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                qty:qty,
                nic:nic,
            }
        });
    }
}
