<div class="row" ng-controller="wajibPajakController">
  <div class="col-md-12">
    <div class="card card-warning">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-th-list"></i>&nbsp;&nbsp; List Wajib Pajak</h3>
          <div class="card-tools">
                        <a href="<?=base_url('wajibpajak/content')?>" class="btn btn-info btn-sm">Tambah</a>
                    </div>
      </div>
      <!-- /.card-header -->
      <div class="card-body table-responsive p-0" style="height: 200px;">
        <table class="table table-sm table-hover table-head-fixed text-nowrap">
          <thead>
            <tr>
              <th>No</th>
              <th>NIP</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Telepon</th>
              <th>Email</th>
              <th><i class="fas fa-cog"></i></th>
            </tr>
          </thead>
          <tbody>
            <tr ng-repeat="item in datas">
              <td>{{$index+1}}</td>
              <td>{{item.nip}}</td>
              <td>{{item.nama}}</td>
              <td><span class="tag tag-success">{{item.alamat}}</span></td>
              <td>{{item.kontak}}</td>
              <td>{{item.email}}</td>
              <td>
                <button type="button" class="btn btn-warning btn-sm" ng-click ="edit(item)"><i class="fas fa-edit"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- /.card-body -->
    </div>
  </div>
</div>
