<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends BaseController
{
    public function product(Request $request, $spu)
    {
        $result = $this->getProductDetail($spu);
        if ($request->input('ajax')) {
            return $result;
        }
        $recommended = $this->recommended($spu, current($result['data']['front_category_ids']));
        //return $result;
        return View('product.product', ['jsonResult' => json_encode($result['data']), 'data' => $result['data'], 'recommended' => $recommended['data']]);
    }

    public function recommended($spu, $cid)
    {
        $params = array(
            'recid' => '100002',
            'uuid' => $_COOKIE['uid'],
            'pagenum' => 1,
            'pagesize' => 20,
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
        if ($result['success'] && isset($result['data']['spuAttrs'])) {
            //$result['data']['spuAttrs'] = $this->getSpuAttrsStockStatus($result['data']['spuAttrs'], $result['data']['skuExps']);
            $result['data']['spuAttrs'] = $this->findSkuStatus($result['data']);
        }
        return $result;
    }

    private function findSkuStatus($result)
    {
        foreach ($result['spuAttrs'] as $k1 => $spuAttrs) {
            foreach ($spuAttrs['skuAttrValues'] as $k2 => $skuAttrValues) {
                foreach ($skuAttrValues['skus'] as $k3 => $sku) {
                    foreach ($result['skuExps'] as $skuExp) {
                        if ($skuExp['sku'] == $sku) {
                            if ($skuExp['stock_qtty'] < 1) {
                                array_splice($result['spuAttrs'][$k1]['skuAttrValues'][$k2]['skus'],$k3,1);
                            }
                            break;
                        }
                    }
                }
            }
        }
        return $result['spuAttrs'];
    }

    private function getSpuAttrsStockStatus(Array $spuAttrs, Array $skuExps)
    {
        $spuAttrsCopy = array();
        foreach ($spuAttrs as $spuAttr) {
            $skuAttrsValues = array();
            foreach ($spuAttr['skuAttrValues'] as $skuAttrValue) {
                $skuAttrValue['stock'] = $this->getSkuStockStatus($skuAttrValue['skus'], $skuExps);
                $skuAttrsValues[] = $skuAttrValue;
            }
            $spuAttr['skuAttrValues'] = $skuAttrsValues;
            $spuAttrsCopy[] = $spuAttr;
        }
        return $spuAttrsCopy;
    }

    private function getSkuStockStatus($skus, $skuExps)
    {
        $flag = false;
        foreach ($skus as $key => $sku) {
            foreach ($skuExps as $k => $skuExp) {
                echo $key . ':::' . $k . ':::' . $sku . ':::' . $skuExp['sku'] . ':::' . $skuExp['stock_qtty'] . '<br>';
                if ($sku == $skuExp['sku']) {
                    if ($skuExp['stock_qtty'] > 0) {
                        $flag = true;
                        break;
                    }
                }
            }
        }
        return $flag;
    }

}