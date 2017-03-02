<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class DailyController extends BaseController
{
    /**
     * 显示列表.
     *
     * @return Response
     */
    public function index(Request $request)
    {
        $params = array(
            'cmd' => 'list',
            'token' => Session::get('user.token'),
            'pagesize' => 24,
            'pagenum' => $request->input('pagenum', 1),
        );

        $result = $this->request('daily', $params);
        if (!empty($result['data']['list'])) {
            foreach ($result['data']['list'] as &$value) {
                $pathArr = explode('/', $value['imgPath']);
                $WH = explode('X', $pathArr[3]);
                $value['weight'] = $WH[0];
                $value['height'] = $WH[1];
                $value['seo_tag'] = implode(',', $value['seo_label']);
            }
        }
        if ($request->input('ajax')) {
            return $result;
        }

        //banner
        $banner = $this->request("banner", ['cmd' => 'bannerList']);
        return View('daily.index', ['list' => $result['data']['list'], 'banner' => $banner['data']]);
    }

    public function banner(Request $request)
    {
        $banner = $this->request("banner", ['cmd' => 'bannerList']);
        return $banner;
    }

    /**
     * 显示
     *
     * @param int $id
     * @return Response
     */
    public function show(Request $request, $idTitle)
    {
        $id = "";
        $params = array();
        if(!is_numeric($idTitle)){
            $titleArray = explode("-", $idTitle);
            end($titleArray);
            $id = current($titleArray);
        }else{
            $id = $idTitle;
        }
        $params = array(
            'cmd' => 'topic',
            'id' => $id
        );

        $result = $this->request("topicf", $params);
        if (empty($result['data'])) {
            abort(404);
        }
        
        //设置topic分享主图
        foreach ($result['data']['infos'] as $value){
            if($value['imgPath']){
                $result['data']['mainImg'] = $value['imgPath'];
                break;
            }
        }

        foreach($result['data']['spuInfos'] as &$product){
            $titleArray = explode(" ", $product['spuBase']['main_title']);
            $titleArray[] = $product['spuBase']['spu'];
            $product['spuBase']['seo_link'] = implode("-", $titleArray);
        }

        $titleArray = explode(" ", $result['data']['title']);
        $titleArray[] = $id;
        $result['data']['seo_link'] = implode("-", $titleArray);

        if ($request->input('ajax')) {
            return $result;
        }
        if(is_numeric($idTitle)) {
            $params = $request->all();
            $url = "/topic/" . $result['data']['seo_link'];
            if (!empty($params)) {
                $url = "/topic/" . $result['data']['seo_link'] . "?" . http_build_query($params);
            }
            return redirect($url);
        }

        return View('daily.topic', ['topic' => $result['data'], 'topicID' => $id, 'shareFlag' => true]);
    }

    /**
     * 商品详情服务模版
     *
     * @param int $id
     * @return Response
     */
    public function service(Request $request, $id)
    {
        $params = array(
            'cmd' => 'template',
            'id' => $id
        );

        $result = $this->request("topicf", $params);
        if ($request->input('template')) {
            return View('daily.topic', ['topic' => $result['data']]);
        }
        return $result;
    }

    public function staticShow($id)
    {
        $result = $this->service($id);

        return View('daily.topic', ['topic' => $result['data'], 'topicID' => $id, 'shareFlag' => false]);
    }

    public function subscribe(Request $request)
    {
        $email = $request->input('email');
        $name = $request->input('name');
        $success = Storage::append('email.txt', $name . " : " . $email);
        $result = array();
        $result['success'] = $success;
        return $result;
    }

    public function home(Request $request)
    {
        $banner = $this->banner($request);
        return View('daily.home', ['banner' => $banner['data']]);
    }

    public function empowered()
    {
        return redirect('/topic/280');
    }

}
