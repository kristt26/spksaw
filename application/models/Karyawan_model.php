<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Karyawan_model extends CI_Model
{
    public function select($id = null)
    {
        if ($id == null) {
            $data = $this->db->query("SELECT
                `karyawan`.`id`,
                `karyawan`.`nama`,
                `karyawan`.`alamat`,
                `karyawan`.`sex`,
                `karyawan`.`kontak`,
                `karyawan`.`email`,
                `karyawan`.`userid`,
                `user`.`username`,
                `user`.`status`
            FROM
                `karyawan`
                LEFT JOIN `user` ON `user`.`id` = `karyawan`.`userid`")->result();
            foreach ($data as $key => $value) {
                $value->roles = $this->db->query("SELECT
                    `role`.`id`,
                    `role`.`role`
                FROM
                    `user`
                    LEFT JOIN `userrole` ON `userrole`.`userid` = `user`.`id`
                    LEFT JOIN `role` ON `role`.`id` = `userrole`.`roleid` WHERE user.id = $value->userid")->row_array();
            }
            return $data;
        } else {
            $data = $this->db->query("SELECT
                `karyawan`.`id`,
                `karyawan`.`nama`,
                `karyawan`.`alamat`,
                `karyawan`.`sex`,
                `karyawan`.`kontak`,
                `karyawan`.`email`,
                `karyawan`.`userid`,
                `user`.`status`
            FROM
                `karyawan`
                LEFT JOIN `user` ON `user`.`id` = `karyawan`.`userid` WHERE karyawan.id = '$id'")->row_array();
            $userid = $data['userid'];
            $data['roles'] = $this->db->query("SELECT
                `role`.`id`,
                `role`.`role`
            FROM
                `user`
                LEFT JOIN `userrole` ON `userrole`.`userid` = `user`.`id`
                LEFT JOIN `role` ON `role`.`id` = `userrole`.`roleid` WHERE user.id = $userid")->row_array();

            return $data;
        }
    }
    public function insert($data)
    {
        $this->db->trans_begin();
        $user = [
            'username' => $data['username'],
            'password' => md5($data['password']),
            'status' => 1,
        ];
        $this->db->insert('user', $user);
        $userid = $this->db->insert_id();
        $role = [
            'userid' => $userid,
            'roleid' => $data['roles']['id'],
        ];
        $this->db->insert('userrole', $role);
        $karyawan = [
            'nama' => $data['nama'],
            'alamat' => $data['alamat'],
            'sex' => $data['sex'],
            'kontak' => $data['kontak'],
            'email' => $data['email'],
            'userid' => $userid,
        ];
        $this->db->insert('karyawan', $karyawan);
        $data['id'] = $this->db->insert_id();
        $data['userid'] = $userid;
        if ($this->db->trans_status()) {
            $this->db->trans_commit();
            return $data;
        } else {
            $this->db->trans_rollback();
            return false;
        }
    }
    public function update($data)
    {
        $this->db->trans_begin();
        $karyawan = [
            'nama' => $data['nama'],
            'alamat' => $data['alamat'],
            'sex' => $data['sex'],
            'kontak' => $data['kontak'],
            'email' => $data['email'],
        ];
        $this->db->where('id', $data['id']);
        $this->db->update('karyawan', $karyawan);
        $user=[
            'username'=> $data['username']
        ];
        $this->db->where('id', $data['userid']);
        $this->db->update('user', $user);
        if ($this->db->trans_status()) {
            $this->db->trans_commit();
            return $data;
        } else {
            $this->db->trans_rollback();
            return false;
        }
    }
    public function delete($id)
    {
        $data = $this->db->get_where("karyawan", ['id' => $id])->row_array();
        $this->db->where('id', $data['userid']);
        return $this->db->delete('user');
    }

}

/* End of file ModelName.php */
