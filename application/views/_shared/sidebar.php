<div class="sidebar">
  <!-- Sidebar user (optional) -->
  <div class="user-panel mt-3 pb-3 mb-3 d-flex">
    <div class="image">
      <img src="<?=base_url()?>favicon.ico" class="img-circle elevation-2" alt="User Image">
    </div>
    <div class="info">
      <a href="#" class="d-block">Admin</a>
    </div>
  </div>

  <!-- Sidebar Menu -->
  <nav class="mt-2">
    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
      <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
      <li class="nav-item">
        <a href="<?=base_url('home')?>" ng-class="{'nav-link active': header=='Home', 'nav-link': header!='Home'}">
          <i class="nav-icon fas fa-home"></i>
          <p>
            Home
          </p>
        </a>
      </li>
      <li class="nav-item">
        <a href="<?=base_url('petugas')?>"
          ng-class="{'nav-link active': header=='Petugas', 'nav-link': header!='Petugas'}">
          <i class="nav-icon fas fa-users"></i>
          <p>
            Petugas
          </p>
        </a>
      </li>
      <li class="nav-item">
        <a href="<?=base_url('wajibpajak')?>"
          ng-class="{'nav-link active': header=='Wajib Pajak', 'nav-link': header!='Wajib Pajak'}">
          <i class="nav-icon fas fa-address-card"></i>
          <p>
            Wajib Pajak
          </p>
        </a>
      </li>
      <li class="nav-item">
        <a href="<?=base_url('wajibpajak')?>"
          ng-class="{'nav-link active': header=='Laporan', 'nav-link': header!='Laporan'}">
          <i class="nav-icon fas fa-file"></i>
          <p>
            Laporan
          </p>
        </a>
      </li>
    </ul>
  </nav>
  <!-- /.sidebar-menu -->
</div>