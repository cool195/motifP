<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Cache;

class ProductController extends BaseController
{
    public function product(Request $request, $spu)
    {
        $result = $this->getProductDetail($spu);


        if ($result['success'] == false) {
            abort(404);
        } else {
            $category = Cache::remember('category',60, function () {
                $params = array(
                    'cmd' => 'categorylist',
                );
                return $this->request('product', $params);
            });
            $categoryName = '';
            foreach ($category['data']['list'] as $value) {
                if ($value['category_id'] == $result['data']['front_category_ids'][0]) {
                    $categoryName = $value['category_name'];
                    $result['data']['category_id'] = $result['data']['front_category_ids'][0];
                    break;
                }
            }
            $result['data']['category_name'] = $categoryName;

        }



        if ($request->input('ajax')) {
            return $result;
        }
        $recommended = $this->recommended($spu, current($result['data']['front_category_ids']));
        return View('product.product', ['jsonResult' => json_encode($result['data']), 'data' => $result['data'], 'recommended' => $recommended['data']]);
    }

    public function proTest(Request $request, $spu)
    {
        $result = $this->getProductDetail($spu);


        if ($result['success'] == false) {
            abort(404);
        } else {
            $category = Cache::remember('category',60, function () {
                $params = array(
                    'cmd' => 'categorylist',
                );
                return $this->request('product', $params);
            });
            $categoryName = '';
            foreach ($category['data']['list'] as $value) {
                if ($value['category_id'] == $result['data']['front_category_ids'][0]) {
                    $categoryName = $value['category_name'];
                    $result['data']['category_id'] = $result['data']['front_category_ids'][0];
                    break;
                }
            }
            $result['data']['category_name'] = $categoryName;
        }
        if ($request->input('ajax')) {
            return $result;
        }
        $recommended = $this->recommended($spu, current($result['data']['front_category_ids']));
        return View('product.protest', ['jsonResult' => json_encode($result['data']), 'data' => $result['data'], 'recommended' => $recommended['data']]);
    }

    public function proSelect(Request $request, $spu)
    {
        $result = $this->getProductDetail($spu);


        if ($result['success'] == false) {
            abort(404);
        } else {
            $category = Cache::remember('category',60, function () {
                $params = array(
                    'cmd' => 'categorylist',
                );
                return $this->request('product', $params);
            });
            $categoryName = '';
            foreach ($category['data']['list'] as $value) {
                if ($value['category_id'] == $result['data']['front_category_ids'][0]) {
                    $categoryName = $value['category_name'];
                    $result['data']['category_id'] = $result['data']['front_category_ids'][0];
                    break;
                }
            }
            $result['data']['category_name'] = $categoryName;
        }
        if ($request->input('ajax')) {
            return $result;
        }
        $recommended = $this->recommended($spu, current($result['data']['front_category_ids']));
        return View('product.proselect', ['jsonResult' => json_encode($result['data']), 'data' => $result['data'], 'recommended' => $recommended['data']]);
    }

    public function recommended($spu, $cid)
    {
        $params = array(
            'recid' => '100012',
            'uuid' => $_COOKIE['uid'],
            'pagenum' => 1,
            'pagesize' => 8,
            'spu' => $spu,
        );
        $params['cid'] = isset($cid) ? $cid : -1;
        $result = $this->request("rec", $params);
        return $result;
    }

    public function getProductDetail($spu)
    {
        $params = array(
            'cmd' => 'productdetail',
            'spu' => $spu,
        );
        $result = $this->request('product', $params);
        if ($result['success']) {
            //$result['data']['spuAttrs'] = $this->getSpuAttrsStockStatus($result['data']['spuAttrs'], $result['data']['skuExps']);
            if (isset($result['data']['spuAttrs'])) {
                $result['data']['spuAttrs'] = $this->findSkuStatus($result['data']);
            }
            $result['data']['sale_status'] = true;
            if (1 == $result['data']['sale_type']) {
                $result['data']['sale_status'] = $this->getSaleStatus($result['data']);
            }

        }
        return $result;
    }

    private function getSaleStatus(Array $data)
    {
        $flag = true;
        if (1 == $data['sale_type'] && !isset($data['skuPrice']['skuPromotion'])) {
            $flag = false;
        } elseif (!empty($data['spuStock']) && $data['spuStock']['stock_qtty'] == $data['spuStock']['saled_qtty']) {
            $flag = false;
        } elseif (0 == $data['skuPrice']['skuPromotion']['remain_time']) {
            $flag = false;
        } else {

        }
        return $flag;
    }


    private function findSkuStatus($result)
    {
        foreach ($result['spuAttrs'] as $k1 => $spuAttrs) {
            foreach ($spuAttrs['skuAttrValues'] as $k2 => $skuAttrValues) {
                $tempSkus = array();
                foreach ($skuAttrValues['skus'] as $k3 => $sku) {
                    foreach ($result['skuExps'] as $skuExp) {
                        if ($skuExp['sku'] == $sku) {
                            if ($skuExp['stock_qtty'] > 0) {
                                $tempSkus[] = $sku;
                            }
                        }
                    }
                }
                $result['spuAttrs'][$k1]['skuAttrValues'][$k2]['skus'] = $tempSkus;
            }
        }
        return $result['spuAttrs'];
    }

}