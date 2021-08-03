import { Row, Col, Card } from 'antd';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

function HomePage({ productList }) {
  function renderProductList() {
    return productList.map((productItem, productIndex) => {
      return (
        <Col span={6} key={productIndex}>
          <Link to={`/product/${productItem.id}`}>
            <Card
              size="small"
              title={productItem.name}
            >
              <div>{productItem.price.toLocaleString()}</div>
            </Card>
          </Link>
        </Col>
      )
    })
  }

  return (
    <div>
      <div>Home Page</div>
      <div style={{ padding: 16 }}>
        <Row gutter={[16, 16]}>
          {renderProductList()}
        </Row>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { productList } = state.productReducer;
  return {
    productList: productList,
  };
}

export default connect(mapStateToProps)(HomePage);
