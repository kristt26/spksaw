angular.module('adminctrl', [])
    .controller('homeController', homeController)
    .controller('loginController', loginController)
    .controller('profileController', profileController)
    .controller('petugasController', petugasController)
    .controller('wajibPajakController', wajibPajakController)
    .controller('contentWajibPajakController', contentWajibPajakController)
    ;
function homeController($scope) {
    $scope.Title = "Page Header";
    $scope.$emit("SendUp", "Home");
}
function loginController($scope, AuthService, helperServices) {
    $scope.model = {};

    AuthService.login($scope.modal).then(x => {
        location.href = helperServices.url + "/home";
    })

}
function profileController($scope) {
    $scope.title = "Profile Header";
}

function petugasController($scope, helperServices, PetugasServices) {
    $scope.itemHeader = { title: "Petugas", breadcrumb: "Petugas", header: "Petugas" };
    $scope.$emit("SendUp", $scope.itemHeader);
    $scope.datas = [];
    $scope.model = {};
    $scope.simpan = true;
    PetugasServices.get().then(x => {
        $scope.datas = x;
    })
    $scope.edit = (item) => {
        $scope.model = angular.copy(item);
        $scope.simpan = false;
    }
    $scope.save = () => {
        $scope.model.roles = helperServices.roles;
        if ($scope.model.id) {
            PetugasServices.put($scope.model).then(result => {

            })
        } else {
            PetugasServices.post($scope.model).then(result => {

            })
        }
    }
}

function wajibPajakController($scope, helperServices, WajibPajakServices) {
    $scope.itemHeader = { title: "Wajib Pajak", breadcrumb: "Wajib Pajak", header: "Wajib Pajak" };
    $scope.$emit("SendUp", $scope.itemHeader);
    $scope.datas = [];
    $scope.model = {};
    $scope.simpan = true;
    WajibPajakServices.get().then(x => {
        $scope.datas = x;
    })
    $scope.edit = (item) => {
        $scope.model = angular.copy(item);
        $scope.simpan = false;
    }
    $scope.save = () => {
        $scope.model.roles = helperServices.roles;
        if ($scope.model.id) {
            WajibPajakServices.put($scope.model).then(result => {

            })
        } else {
            WajibPajakServices.post($scope.model).then(result => {

            })
        }
    }
}
function contentWajibPajakController($scope, helperServices, WajibPajakServices, KategoriServices) {
    $scope.itemHeader = { title: "Wajib Pajak", breadcrumb: "Wajib Pajak", header: "Wajib Pajak" };
    $scope.sexs = helperServices.sex;
    $scope.distriks = helperServices.distrik;
    $scope.$emit("SendUp", $scope.itemHeader);
    $scope.datas = [];
    $scope.model = {};
    $scope.model.usaha = {};
    $scope.kategoris = [];
    $scope.simpan = true;
    var akhir = { lat: -2.585888, lng: 140.668497 };
    googleMap = new GoogleMap(12, akhir);
    if (parseInt(helperServices.getParam())) {
        WajibPajakServices.getDetail(helperServices.getParam()).then(x => {
            $scope.model = x;
            console.log(x);
        })
    }
    $scope.edit = (item) => {
        $scope.model = angular.copy(item);
        $scope.simpan = false;
    }
    $scope.save = () => {
        if ($scope.model.id) {
            WajibPajakServices.put($scope.model).then(result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Proses Berhasil'
                })
            })
        } else {
            WajibPajakServices.post($scope.model).then(result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Proses Berhasil'
                })
            })
        }
    }
    $scope.showMap = () => {
        $("#modal-map").modal("show");
    }
    $scope.Init = () => {
        // googleMap.setMarker(akhir);
        googleMap.showdata = $scope.show;
        KategoriServices.get().then(x => {
            $scope.kategoris = x;
        })
    };
    // $scope.Init = () => {
    //     googleMap.showdata = $scope.show;
    // };

    $scope.show = (item) => {
        $scope.$apply(x => {
            $scope.model.usaha.alamat = item.alamat;
            $scope.model.usaha.lat = item.location.lat;
            $scope.model.usaha.long = item.location.lng;
            $("#modal-map").modal('hide');
        })
    }
}