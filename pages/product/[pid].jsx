//domain,com/product/
import Button from '@mui/material/Button';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import NavBar from "../component/NavBar/NavBar";
import LoadingSpinner from "../component/ui/LoadingSpinner";
import UserPage from "../user/UserPage";
import ProductDetail from "./ProductDetail";
export default function Product() {

  const router = useRouter();

 // const [id, setId] = useState("");
  const {data: session} = useSession()
  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState();

  useEffect(() => {
    async function getProductInfo(pid) {
      setLoading(true);
      const res = await fetch('/api/product/getProduct', {
        method: 'POST',
        body: JSON.stringify({productId: pid}),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      setProduct(data.product);
      //console.log(data.product);
      setLoading(false);

    }
    if (router.isReady) {
      // console.log(router.query.pid)
      // setId(router.query.pid.toString());
      // console.log(id);
      getProductInfo(router.query.pid).then().catch(); //PUT PRODUCT ID
    }
  }, [router.isReady]);
  return loading ? (
    <LoadingSpinner text='Loading...' />
  ) : (
    <React.Fragment>

      <ProductDetail product={product}/>

    </React.Fragment>
  );

}
