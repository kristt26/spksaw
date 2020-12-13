<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Petugas_model extends CI_Model
{
    public function select($id = null)
    {
        if ($id == null) {
            $data = $this->db->query("SELECT
                `petugas`.`id`,
                `petugas`.`nip`,
                `petugas`.`nama`,
                `petugas`.`alamat`,
                `petugas`.`kontak`,
                `petugas`.`email`,
                `petugas`.`userid`,
                `user`.`status`
            FROM
                `petugas`
                LEFT JOIN `user` ON `user`.`id` = `petugas`.`userid`")->result();
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
                `petugas`.`id`,
                `petugas`.`nip`,
                `petugas`.`nama`,
                `petugas`.`alamat`,
                `petugas`.`kontak`,
                `petugas`.`email`,
                `petugas`.`userid`,
                `user`.`status`
            FROM
                `petugas`
                LEFT JOIN `user` ON `user`.`id` = `petugas`.`userid` WHERE petugas.id = '$id'")->row_array();
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
            'username' => $data['email'],
            'password' => md5($data['email']),
            'status' => 'true',
        ];
        $this->db->insert('user', $user);
        $userid = $this->db->insert_id();
        $role = [
            'userid' => $userid,
            'roleid' => $data['roles']['id'],
        ];
        $this->db->insert('userrole', $role);
        $petugas = [
            'nip' => $data['nip'],
            'nama' => $data['nama'],
            'alamat' => $data['alamat'],
            'kontak' => $data['kontak'],
            'email' => $data['email'],
            'userid' => $userid,
        ];
        $this->db->insert('petugas', $petugas);
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
        $this->db->where('userid', $data['userid']);
        $this->db->delete('userrole');
        $role = [
            'userid' => $data['userid'],
            'roleid' => $data['roles']['id'],
        ];
        $this->db->insert('userrole', $role);
        $petugas = [
            'nip' => $data['nip'],
            'nama' => $data['nama'],
            'alamat' => $data['alamat'],
            'kontak' => $data['kontak'],
            'email' => $data['email'],
        ];
        $this->db->where('id', $data['id']);
        $this->db->update('petugas', $petugas);
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
        $data = $this->db->get_where("petugas", ['id' => $id])->row_array();
        $this->db->where('id', $data['userid']);
        return $this->db->delete('user');
    }

}

/* End of file ModelName.php */
