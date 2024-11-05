import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Layout,
  Menu,
  Modal,
  Table,
  theme,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createAction } from "../../redux/actions/createAction";
import { deleteAction } from "../../redux/actions/deleteAction";
import { updateAction } from "../../redux/actions/updateAction";
import { getAction } from "../../redux/actions/readAction";
import {
  CREATE_GROUP,
  DELETE_GROUP,
  GET_GROUP,
  UPDATE_GROUP,
} from "../../redux/actions/types";
import { MdAddBox, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { FieldHelpers } from "../../utilities/Helpers";
const { Header, Sider, Content } = Layout;

export const Group = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [createVisible, setCreateVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [selectedEditID, setselectedEditID] = useState(null);
  const [name, setName] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { data } = useSelector((state) => state.groupReducer);
  const myData = data?.object;

  useEffect(() => {
    dispatch(getAction("group/get/all/admin", GET_GROUP));
  }, [dispatch]);

  const onChange1 = (date, dateString) => {
    setNewEndDate(dateString);
  };
  const onChange2 = (date, dateString) => {
    setNewStartDate(dateString);
  };

  const showModal = (id) => {
    setVisible(true);
    setSelectedID(id);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    dispatch(deleteAction("group/delete", DELETE_GROUP, selectedID));
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      dispatch(getAction("group/get/all/admin", GET_GROUP));
    }, 1000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const showEditModal = (id) => {
    setEditVisible(true);
    setselectedEditID(id);
    setName(id.name);
    setStartDate(id.startDate);
    setEndDate(id.endDate);
  };

  const editHandleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setEditVisible(false);
        dispatch(
          updateAction("group/update", UPDATE_GROUP, {
            ...values,
            id: selectedEditID.id,
            creatorId: 0,
          })
        );
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const editHandleCancel = () => {
    setEditVisible(false);
  };

  const showCreateModal = () => {
    setCreateVisible(true);
  };

  console.log(newEndDate)

  const createHandleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setCreateVisible(false);
        dispatch(
          createAction("group/create", CREATE_GROUP, {
            ...values,
            endDate: String(newEndDate).substring(0,10),
            startDate: String(newStartDate).substring(0,10),
            creatorId: 2,
          })
        );
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const createHandleCancel = () => {
    setCreateVisible(false);
  };

  const columns = [
    { title: "Id", dataIndex: "id", key: "id" },
    { title: "Nom", dataIndex: "name", key: "name" },
    { title: "Start Date", dataIndex: "startDate", key: "startDate" },
    { title: "End Date", dataIndex: "endDate", key: "endDate" },
    {
      title: (
        <>
          <Button type="primary" onClick={showCreateModal}>
            <MdAddBox />
          </Button>
          <Modal
            title={"Yaratish"}
            open={createVisible}
            onOk={createHandleOk}
            onCancel={createHandleCancel}
            okText={"yaratish"}
            cancelText={"bekor qilish"}
            htmlType="submit"
          >
            <Form
              form={form}
              layout="vertical"
              name="form_in_modal"
              initialValues={{
                modifier: "public",
              }}
            >
              <FieldHelpers
                label="Nom"
                name="name"
                message="Iltimos Nom qatorini yo'ldiring!"
              />
    
              <Form.Item
                label={"Start Date"}
                name={'startDate'}
                rules={[
                  {
                    required: true,
                    message: "message",
                  },
                ]}
              >
                <DatePicker onChange={onChange1} />
              </Form.Item>
              <Form.Item
                label={"End Date"}
                name={'endDate'}
                rules={[
                  {
                    required: true,
                    message: "message",
                  },
                ]}
              >
                <DatePicker onChange={onChange2} />
              </Form.Item>
            </Form>
          </Modal>
        </>
      ),
      dataIndex: "",
      key: "x",
      render: (text) => (
        <>
          <Button type="danger" onClick={(e) => showModal(text.id)}>
            <MdOutlineDelete />
          </Button>
          <Button type="primary" onClick={(e) => showEditModal(text)}>
            <MdOutlineEdit />
          </Button>
          <Modal
            title={"O'chirish"}
            open={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText={"o'chirish"}
            okType={"danger"}
            cancelText={"bekor qilish"}
          >
            <h2>Haqiqatan ham bu ma'lumotni o'chirib tashlamoqchimisiz?</h2>
            <p>
              Agar siz ushbu ma'lumotlarni o'chirib tashlasangiz, qayta
              tiklanmaydi
            </p>
          </Modal>
          <Modal
            title={"Tahrirlash"}
            open={editVisible}
            onOk={editHandleOk}
            onCancel={editHandleCancel}
            okText={"tahrirlash"}
            cancelText={"bekor qilish"}
          >
            <Form
              form={form}
              layout="vertical"
              name="name"
              initialValues={{
                modifier: "public",
              }}
              fields={[
                {
                  name: ["name"],
                  value: name,
                },
                {
                  name: ["startDate"],
                  value: startDate,
                },
                {
                  name: ["endDate"],
                  value: endDate,
                },
              ]}
            >
              <FieldHelpers
                label="Nom"
                name="name"
                message="Iltimos Nom qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Start Date"
                name="startDate"
                message="Iltimos Start Date qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="End Date"
                name="endDate"
                message="Iltimos End Date qatorini yo'ldiring!"
              />
            </Form>
          </Modal>
        </>
      ),
    },
  ];

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Group",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Table dataSource={myData} columns={columns} />;
        </Content>
      </Layout>
    </Layout>
  );
};
