<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Kategori_model extends CI_Model
{

    public function select($id = null)
    {
        if ($id == null) {
            return $this->db->get('kategori')->result();
        } else {
            return $this->db->get_where('kategori', ['id' => $id])->row_array();
        }
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

}

/* End of file Kategori_model.php */
