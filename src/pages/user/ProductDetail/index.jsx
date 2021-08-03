import { Button } from 'antd';
import history from '../../../utils/history';
import { productList } from '../../../constants/product';

function ProductDetailPage(props) {
  const { match } = props;
  const productId = parseInt(match.params.id);

  const productDetail = productList.find((product) => product.id === productId);

  return (
    <>
      <Button onClick={() => history.goBack()}>
        Quay lại
      </Button>
      <div>{productDetail.name}</div>
      <div>{productDetail.price.toLocaleString()}</div>
      <Button onClick={() => history.push('/login')}>
        Đăng nhập để mua
      </Button>
    </>
  );
}

export default ProductDetailPage;
