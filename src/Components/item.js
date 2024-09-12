import { Link } from "react-router-dom"
const ProductItem=({data})=>{
    return(
              <div className='col-4 p-3 border'>
                <img className="productlistimage" src={data.images}></img>
                <p>Name:{data.name}</p>
                <p>Brand:  {data.brand}</p>
                <p>Rating:{data.rating}</p>
                <p>cutoff_price:{data.cutoff_price}</p>
                <div><Link to={"/product/"+data.product_id}>view details</Link></div>
              <button>Add To Cart</button>
              </div>
    )
}
export default ProductItem