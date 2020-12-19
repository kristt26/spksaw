angular.module('adminctrl', [])
    .controller('homeController', homeController)
    .controller('loginController', loginController)
    .controller('profileController', profileController)
    .controller('petugasController', petugasController)
    .controller('pelangganController', pelangganController)
    .controller('permintaanController', permintaanController)
    .controller('prosesPermintaanController', prosesPermintaanController)
    .controller('laporanController', laporanController)
    ;
function homeController($scope, HomeServices) {
    
    $scope.itemHeader = { title: "Home", breadcrumb: "Home", header: "Home" };
    $scope.$emit("SendUp", $scope.itemHeader);
    $scope.datas = {};
    HomeServices.get().then(x=>{
        $scope.datas = x;
        $.LoadingOverlay("hide");
    })
    
}
function loginController($scope, AuthService, helperServices) {
    $scope.model = {};

    AuthService.login($scope.modal).then(x => {
        $.LoadingOverlay("hide");
        location.href = helperServices.url + "/home";
    })

}
function profileController($scope) {
    $scope.title = "Profile Header";
    $.LoadingOverlay("hide");
}

function petugasController($scope, helperServices, PetugasServices) {
    $scope.itemHeader = { title: "Petugas", breadcrumb: "Petugas", header: "Petugas" };
    $scope.sexs = helperServices.sex;
    $scope.$emit("SendUp", $scope.itemHeader);
    $scope.datas = [];
    $scope.model = {};
    $scope.simpan = true;
    PetugasServices.get().then(x => {
        $scope.datas = x;
        $.LoadingOverlay("hide");
    })
    $scope.edit = (item) => {
        $scope.model = angular.copy(item);
        $scope.simpan = false;
    }
    $scope.clear = ()=>{
        $scope.simpan = true;
        $scope.model = {};
    }
    $scope.save = () => {
        $.LoadingOverlay("show");
        if ($scope.model.id) {
            PetugasServices.put($scope.model).then(result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Proses Berhasil'
                })
                $scope.model={};
                $scope.simpan = true;
                $.LoadingOverlay("hide");
            })
        } else {
            $scope.model.roles = helperServices.roles;
            PetugasServices.post($scope.model).then(result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Proses Berhasil'
                })
                $scope.model={};
                $.LoadingOverlay("hide");
            })
        }
    }
}

function pelangganController($scope, helperServices, PelangganServices) {
    $scope.itemHeader = { title: "Pelanggan", breadcrumb: "Pelanggan", header: "Pelanggan" };
    $scope.$emit("SendUp", $scope.itemHeader);
    $scope.datas = [];
    $scope.model = {};
    $scope.simpan = true;
    PelangganServices.get().then(x => {
        $scope.datas = x;
        $.LoadingOverlay("hide");
    })
    $scope.edit = (item) => {
        $scope.model = angular.copy(item);
        $scope.simpan = false;
    }
    $scope.save = () => {
        $.LoadingOverlay("show");
        // $scope.model.roles = helperServices.roles;
        if ($scope.model.id) {
            PelangganServices.put($scope.model).then(result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Proses Berhasil'
                })
                $scope.model = {};
                $.LoadingOverlay("hide");
            })
        } else {
            PelangganServices.post($scope.model).then(result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Proses Berhasil'
                })
                $scope.model = {};
                $.LoadingOverlay("hide");
            })
        }
    }
}
function permintaanController($scope, helperServices, PermintaanServices, PelangganServices) {
    $scope.itemHeader = { title: "Permohonan", breadcrumb: "Permohonan", header: "Permohonan" };
    $scope.distriks = helperServices.distrik;
    $scope.$emit("SendUp", $scope.itemHeader);
    $scope.datas = [];
    $scope.pelanggans = [];
    $scope.model = {};
    $scope.items = helperServices;
    $scope.model.noregister = $scope.items.randid();
    $scope.simpan = true;
    PermintaanServices.get().then(x => {
        $scope.datas = x;
        PelangganServices.get().then(pelanggan=>{
            $scope.pelanggans = pelanggan;
            $.LoadingOverlay("hide");
        })
    })
    $scope.edit = (item) => {
        $scope.model = angular.copy(item);
        $scope.simpan = false;
    }
    $scope.save = () => {
        $.LoadingOverlay("show");
        if ($scope.model.id) {
            PermintaanServices.put($scope.model).then(result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Proses Berhasil'
                })
                $scope.model = {};
                $.LoadingOverlay("hide");
            })
        } else {
            $scope.model.karyawan = null;
            $scope.model.karyawanid = null;
            PermintaanServices.post($scope.model).then(result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Proses Berhasil'
                })
                $scope.model = {};
                $.LoadingOverlay("hide");
            })
        }
    }
    $scope.detail = (item)=>{
        if(item.status=='Proses' || item.status=='Pending')
            location.href = helperServices.url + "/csr/proses/index/" + item.id;
    }
    
}
function prosesPermintaanController($scope, helperServices, PermintaanServices) {
    $scope.itemHeader = { title: "Proses Permohonan", breadcrumb: "Proses Permohonan", header: "Proses Permohonan" };
    $scope.$emit("SendUp", $scope.itemHeader);
    $scope.model = {};
    PermintaanServices.getDetail().then(x => {
        $scope.model = x;
        $.LoadingOverlay("hide");
    })
    $scope.save = () => {
        $.LoadingOverlay("show");
        PermintaanServices.proses($scope.model).then(x=>{
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Proses Berhasil'
            })
            location.href = helperServices.url + "/csr/permintaan";
        })
    }
    $scope.message = ()=>{
        $('#pesan').modal('show');
    }
    $scope.pending = ()=>{
        $.LoadingOverlay("show");
        PermintaanServices.pending($scope.model).then(x=>{
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Proses Berhasil'
            })
            location.href = helperServices.url + "/csr/permintaan";
        })
    }
}
function laporanController($scope, helperServices, LaporanServices, PelangganServices) {
    $scope.itemHeader = { title: "Laporan", breadcrumb: "Laporan", header: "Laporan" };
    $scope.$emit("SendUp", $scope.itemHeader);
    $scope.model = {};
    $scope.datas = [];
    $scope.a = [];
    setTimeout((x) => {
        $.LoadingOverlay("hide");
    }, 1000);
    $scope.tampil = (item) => {
        $.LoadingOverlay("show");
        var a = item.split(' - ');
        if(a[0]!==a[1]){
            $scope.model.awal = a[0];
            $scope.model.akhir = a[1];
            LaporanServices.get($scope.model).then(x=>{
                $scope.datas = x;
                $.LoadingOverlay("hide");
            })
        }
        $.LoadingOverlay("hide");
    }
    $scope.print = () => {
        $("#print").printArea();
    }
}