import React, { useState } from 'react';
import { UserOutlined, BarsOutlined } from '@ant-design/icons';
import { Checkbox , Input, DatePicker, Dropdown, Space, Divider, Button, theme } from 'antd';
import dayjs from 'dayjs';
import Axios from "axios";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import './Filter.scss'
dayjs.extend(customParseFormat);

const apiUrl = "http://127.0.0.1:8000/api/rt-images/";


function Filter() {
  const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY/MM/DD';
  const { useToken } = theme;
  const [uploader, setuploader] = React.useState();
  const [modifier, setmodifier] = React.useState();
  const [open, setOpen] = useState(false);
  const { token } = useToken();
  const onCalendarChange = (dates, dateStrings) => {
    console.log('Selected Dates:', dates);
    console.log('Formatted Date Strings:', dateStrings);
  };
  const onChange = (e) => {
    console.log('checked = ${e.target.checked}');
  };

  const onClick = (e) => {
    console.log('click', e);
  };

  const items = [
    {
      key: '1',
      label: (
        <Space direction="vertical" size={12}>
        <RangePicker
        format={dateFormat}
        onCalendarChange={onCalendarChange}

      />
    </Space>
      ),
    },
    {
      key: '2',
      label: (
        <Input Input size="large" placeholder="uploader" prefix={<UserOutlined />} 
          onChange={({ target: uploader  }) =>
          setuploader(uploader)
          }
        />
      ),
    },
    {
      key: '3',
      label: (
        <Input Input size="large" placeholder="modifier" prefix={<UserOutlined />} 
          onChange={({ target: modifier  }) =>
          setmodifier(modifier)
        }
        />
      ),
    },
    {
      key: '4',
      label: (
        <Checkbox onChange={onChange}>Expert Check</Checkbox>
      ),
    },
  ];

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: 'none',
  };
  console.log(uploader,modifier);

  const handleOpenChange = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpen(nextOpen);
    }
  };

  //   React.useEffect(() => {
  //   setValues(initialValues);
  // }, [initialValues]);
  
  return (
    <form
      // onSubmit={(event) => {
      //   event.preventDefault();
      //   onSubmit(values);
      // }}
    >
    <Dropdown
      onClick={onClick}
      menu={{
        items,
      }}
      onOpenChange={handleOpenChange}
      open={open}
      dropdownRender={(menu) => (
        <div style={contentStyle}>
          {React.cloneElement(menu, {
            style: menuStyle,
          })}
          <Divider
            style={{
              margin: 0,
            }}
          />
          <Space
            style={{
              padding: 8,
            }}
          >
            <Button type="primary" >Search</Button>
          </Space>
        </div>
      )}
    >        
    <Space>
      <Button>
        <BarsOutlined  style={{ fontSize: '100%'}} /> Filter
      </Button>
    </Space>
    </Dropdown>
  </form>
  );
}
export default Filter;