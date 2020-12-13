angular.module('services', [])
    .factory('UserServices', UserServices)
    .factory('PetugasServices', PetugasServices)
    .factory('WajibPajakServices', WajibPajakServices)
    .factory('KategoriServices', KategoriServices)
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
    var controller = helperServices.url + '/petugas/';
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
function WajibPajakServices($http, $q, helperServices, AuthService) {
    var controller = helperServices.url + '/wajibpajak/';
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
            url: helperServices.url + 'update',
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
function KategoriServices($http, $q, helperServices, AuthService) {
    var controller = helperServices.url + '/kategori/';
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
            url: helperServices.url + 'update',
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

