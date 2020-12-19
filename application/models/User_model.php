<?php

defined('BASEPATH') or exit('No direct script access allowed');

class User_model extends CI_Model
{

    public function select($data)
    {
        $data['password'] = md5($data['password']);
        return $this->db->get_where('user', $data);
    }
    public function insert($data)
    {
        $result = $this->db->insert('kategori', $data);
        $data['id'] = $this->db->insert_id();
        if ($result) {
            return $data;
        } else {
            return false;
        }

    }
    public function update($data)
    {
        $item = [
            'kategori' => $data['kategori'],
        ];
        $this->db->where('id', $data['id']);
        $this->db->update('kategori', $item);
        return $item;
    }
    public function delete($id)
    {
        $this->db->where('id', $id);
        return $this->db->delete('kategori');
    }

    public function login($data)
    {
        $user = $data['username'];
        $password = md5($data['password']);
        $string = "";
        if(filter_var($user, FILTER_VALIDATE_EMAIL)) {
            $string = "karyawan.email = '$user' AND user.password='$password'";
        }else{
            $string = "user.username = '$user' AND user.password='$password'";
        }
        $datauser = $this->db->query("SELECT
            `karyawan`.`id`,
            `karyawan`.`nama`,
            `karyawan`.`alamat`,
            `karyawan`.`sex`,
            `karyawan`.`kontak`,
            `karyawan`.`userid`,
            `karyawan`.`email`,
            `user`.`username`,
            `user`.`status`,
            `role`.`role`
        FROM
            `karyawan`
            LEFT JOIN `user` ON `user`.`id` = `karyawan`.`userid`
            LEFT JOIN `userrole` ON `userrole`.`userid` = `user`.`id`
            LEFT JOIN `role` ON `role`.`id` = `userrole`.`roleid` WHERE $string")->row_array();
        return $datauser;
    }

}

/* End of file Kategori_model.php */
