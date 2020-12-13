<?php

defined('BASEPATH') or exit('No direct script access allowed');

class wajibpajak extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Wajibpajak_model');

    }

    public function index()
    {
        $data['content'] = $this->load->view('wajibpajak/index', '', true);
        $this->load->view('_shared/layout', $data);
    }

    public function get($id = null)
    {
        $result = $this->Wajibpajak_model->select($id);
        echo json_encode($result);
    }

    public function content($id = null)
    {
        $data['content'] = $this->load->view('wajibpajak/addupdate', '', true);
        $this->load->view('_shared/layout', $data);
    }

    public function getdetail($id = null)
    {

    }

    public function add()
    {
        $data = json_decode($this->security->xss_clean($this->input->raw_input_stream), true);
        $result = $this->Wajibpajak_model->insert($data);
        echo json_encode($result);
    }

    public function update()
    {
        $data = json_decode($this->security->xss_clean($this->input->raw_input_stream), true);
        $result = $this->Wajibpajak_model->update($data);
        echo json_encode($result);
    }

    public function delete($id)
    {
        $result = $this->Wajibpajak_model->delete($id);
        echo json_encode($result);
    }
}

/* End of file Staff.php */
