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
            $result['data']['spuAttrs'] = $this->getSpuAttrsStockStatus($result['data']['spuAttrs'], $result['data']['skuExps']);
        }
        return $result;
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
        foreach ($skus as $sku) {
            foreach ($skuExps as $skuExp) {
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