angular.module('services', [])
    .factory('UserServices', UserServices)
    .factory('PetugasServices', PetugasServices)
    .factory('PelangganServices', PelangganServices)
    .factory('PermintaanServices', PermintaanServices)
    .factory('LaporanServices', LaporanServices)
    .factory('HomeServices', HomeServices)
    ;

function UserServices($http, $q, helperServices) {
    var controller = helperServices.url + 'users';
    var service = {};
    service.data = [];
    service.instance = false;
    return {
        get: get, post: post, put: put
    };

    function get() {
        var def = $q.defer();
        if (service.instance) {
            def.resolve(service.data);
        } else {
            $http({
                method: 'get',
                url: controller,
                headers: AuthService.getHeader()
            }).then(
                (res) => {
                    service.instance = true;
                    service.data = res.data;
                    def.resolve(res.data);
                },
                (err) => {
                    def.reject(err);
                    message.error(err);
                }
            );
        }
        return def.promise;
    }
    function post(param) {
        var def = $q.defer();
        $http({
            method: 'post',
            url: helperServices.url + 'administrator/createuser/' + param.roles,
            data: param,
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                service.data.push(res.data);
                def.resolve(res.data);
            },
            (err) => {
                def.reject(err);
                message.error(err);
            }
        );
        return def.promise;
    }
    function put(param) {
        var def = $q.defer();
        $http({
            method: 'put',
            url: helperServices.url + 'administrator/updateuser/' + param.id,
            data: param,
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                var data = service.data.find(x => x.id == param.id);
                if (data) {
                    data.firstName = param.firstName;
                    data.lastName = param.lastName;
                    data.userName = param.userName;
                    data.email = param.email;
                }
                def.resolve(res.data);
            },
            (err) => {
                def.reject(err);
                message.error(err);
            }
        );
        return def.promise;
    }

}
function PetugasServices($http, $q, helperServices, AuthService) {
    var controller = helperServices.url + '/karyawan/';
    var service = {};
    service.data = [];
    service.instance = false;
    return {
        get: get, post: post, put: put, hapus: hapus
    };

    function get() {
        var def = $q.defer();
        if (service.instance) {
            def.resolve(service.data);
        } else {
            $http({
                method: 'get',
                url: controller + 'get',
                headers: AuthService.getHeader()
            }).then(
                (res) => {
                    service.instance = true;
                    service.data = res.data;
                    def.resolve(res.data);
                },
                (err) => {
                    console.log(err.data);
                    def.reject(err);

                }
            );
        }
        return def.promise;
    }
    function post(param) {
        var def = $q.defer();
        $http({
            method: 'post',
            url: controller + 'add',
            data: param,
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                service.data.push(res.data);
                def.resolve(res.data);
            },
            (err) => {
                def.reject(err);
                message.error(err);
            }
        );
        return def.promise;
    }

    function put(param) {
        var def = $q.defer();
        $http({
            method: 'put',
            url: controller + 'update',
            data: param,
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                var data = service.data.find(x => x.id == param.id);
                if (data) {
                    data.nip = param.nip;
                    data.nama = param.nama;
                    data.alamat = param.alamat;
                    data.kontak = param.kontak;
                    data.email = param.email;
                    data.username = param.username;
                }
                def.resolve(res.data);
            },
            (err) => {
                def.reject(err);
                message.error(err);
            }
        );
        return def.promise;
    }

    function hapus(param) {
        var def = $q.defer();
        $http({
            method: 'delete',
            url: helperServices.url + 'delete/' + param.id,
            data: param,
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                var index = service.data.indexOf(param)
                service.data.splice(index, 1);
                def.resolve(res.data);
            },
            (err) => {
                def.reject(err);
            }
        );
        return def.promise;
    }

}
function PelangganServices($http, $q, helperServices, AuthService) {
    var controller = helperServices.url + '/csr/pelanggan/';
    var service = {};
    service.data = [];
    service.instance = false;
    return {
        get: get, post: post, put: put, getDetail: getDetail
    };

    function get() {
        var def = $q.defer();
        if (service.instance) {
            def.resolve(service.data);
        } else {
            $http({
                method: 'get',
                url: controller + 'get',
                headers: AuthService.getHeader()
            }).then(
                (res) => {
                    service.instance = true;
                    service.data = res.data;
                    def.resolve(res.data);
                },
                (err) => {
                    console.log(err.data);
                    def.reject(err);

                }
            );
        }
        return def.promise;
    }
    function getDetail(id) {
        var def = $q.defer();
        $http({
            method: 'get',
            url: controller + 'get/' + id,
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                def.resolve(res.data);
            },
            (err) => {
                console.log(err.data);
                def.reject(err);

            }
        );
        return def.promise;
    }
    function post(param) {
        var def = $q.defer();
        $http({
            method: 'post',
            url: controller + 'add',
            data: param,
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                service.data.push(res.data);
                def.resolve(res.data);
            },
            (err) => {
                def.reject(err);
                message.error(err);
            }
        );
        return def.promise;
    }

    function put(param) {
        var def = $q.defer();
        $http({
            method: 'put',
            url: controller + 'update',
            data: param,
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                var data = service.data.find(x => x.id == param.id);
                if (data) {
                    data.kodepelanggan = param.kodepelanggan;
                    data.nama = param.nama;
                    data.kontak = param.kontak;
                    data.alamat = param.alamat;
                    data.email = param.email;
                }
                def.resolve(res.data);
            },
            (err) => {
                def.reject(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.data
                })
            }
        );
        return def.promise;
    }

}

function PermintaanServices($http, $q, helperServices, AuthService) {
    var controller = helperServices.url + '/csr/permintaan/';
    var service = {};
    service.data = [];
    service.instance = false;
    return {
        get: get, post: post, put: put, getDetail: getDetail, proses:proses, pending:pending
    };

    function get() {
        var def = $q.defer();
        if (service.instance) {
            def.resolve(service.data);
        } else {
            $http({
                method: 'get',
                url: controller + 'get',
                headers: AuthService.getHeader()
            }).then(
                (res) => {
                    service.instance = true;
                    service.data = res.data;
                    def.resolve(res.data);
                },
                (err) => {
                    console.log(err.data);
                    def.reject(err);

                }
            );
        }
        return def.promise;
    }
    function getDetail() {
        var def = $q.defer();
        id = helperServices.absUrl.split('/');
		id = id[id.length - 1];
        $http({
            method: 'get',
            url: controller + 'get/' + id,
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                def.resolve(res.data);
            },
            (err) => {
                def.reject(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.data
                })
            }
        );
        return def.promise;
    }
    function post(param) {
        var def = $q.defer();
        $http({
            method: 'post',
            url: controller + 'add',
            data: param,
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                service.data.push(res.data);
                def.resolve(res.data);
            },
            (err) => {
                def.reject(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.data
                })
            }
        );
        return def.promise;
    }
    function proses(param) {
        var def = $q.defer();
        $http({
            method: 'post',
            url: controller + 'proses',
            data: param,
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                def.resolve(res.data);
            },
            (err) => {
                def.reject(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.data
                })
            }
        );
        return def.promise;
    }
    function pending(param) {
        var def = $q.defer();
        $http({
            method: 'post',
            url: controller + 'pending',
            data: param,
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                def.resolve(res.data);
            },
            (err) => {
                def.reject(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.data
                })
            }
        );
        return def.promise;
    }

    function put(param) {
        var def = $q.defer();
        $http({
            method: 'put',
            url: controller + 'update',
            data: param,
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                var data = service.data.find(x => x.id == param.id);
                if (data) {
                    data.firstName = param.firstName;
                    data.lastName = param.lastName;
                    data.userName = param.userName;
                    data.email = param.email;
                }
                def.resolve(res.data);
            },
            (err) => {
                def.reject(err);
                message.error(err);
            }
        );
        return def.promise;
    }

}
function LaporanServices($http, $q, helperServices, AuthService) {
    var controller = helperServices.url + '/laporan/';
    var service = {};
    service.data = [];
    service.instance = false;
    return {
        get: get
    };

    function get(item) {
        var def = $q.defer();
        $http({
            method: 'post',
            url: controller + 'get',
            data: item,
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                def.resolve(res.data);
            },
            (err) => {
                console.log(err.data);
                def.reject(err.data);
            }
        );
        return def.promise;
    }

}
function HomeServices($http, $q, helperServices, AuthService) {
    var controller = helperServices.url + '/home/';
    var service = {};
    service.data = [];
    service.instance = false;
    return {
        get: get
    };

    function get(item) {
        var def = $q.defer();
        $http({
            method: 'get',
            url: controller + 'get',
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                def.resolve(res.data);
            },
            (err) => {
                console.log(err.data);
                def.reject(err.data);
            }
        );
        return def.promise;
    }

}

