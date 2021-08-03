import { useState } from "react";
import {
  Row,
  Button,
  Table,
  Space,
  Popconfirm,
} from "antd";
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import ModifyProductModal from './components/ModifyProductModal';

import {
  createProductAction,
  editProductAction,
  deleteProductAction,
} from '../../../redux/actions';

function ProductListHocPage({
  productList,
  createProduct,
  editProduct,
  deleteProduct,
  ...props
}) {
  // "", "create", "edit"
  const [isShowModifyModal, setIsShowModifyModal] = useState('');
  const [modifyProductData, setModifyProductData] = useState({});

  function handleSubmitForm(values) {
    if (isShowModifyModal === 'create') {
      createProduct({
        id: uuidv4(),
        ...values,
      });
    } else {
      editProduct({
        id: modifyProductData.id,
        ...values,
      });
    }
    setIsShowModifyModal('');
  }

  const tableColumn = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (value) => value.toLocaleString(),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space>
            <Button
              type="primary"
              ghost
              onClick={() => {
                setIsShowModifyModal('edit');
                setModifyProductData(record);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure to delete this product?"
              onConfirm={() => deleteProduct({ id: record.id })}
              onCancel={() => null}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        )
      }
    },
  ];

  const tableData = productList.map((productItem, productIndex) => {
    return {
      key: productIndex,
      ...productItem,
    }
  })

  return (
    <div>
      <div style={{ padding: 16 }}>
        <div>Product Manage</div>
        <Row justify="end" style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={() => {
              setIsShowModifyModal('create');
              setModifyProductData({ name: '', price: 0 });
            }}
          >
            Add Product
          </Button>
        </Row>
        <Table columns={tableColumn} dataSource={tableData} />
      </div>
      <ModifyProductModal
        isShowModifyModal={isShowModifyModal}
        setIsShowModifyModal={setIsShowModifyModal}
        handleSubmitForm={handleSubmitForm}
        modifyProductData={modifyProductData}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  const { productList, productDetail } = state.productReducer;
  return {
    productList: productList,
    productDetail: productDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProduct: (params) => dispatch(createProductAction(params)),
    editProduct: (params) => dispatch(editProductAction(params)),
    deleteProduct: (params) => dispatch(deleteProductAction(params)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListHocPage);
