import React, { useEffect, useState } from 'react';
import { UserOutlined, BarsOutlined } from '@ant-design/icons';
import { Checkbox, Input, DatePicker, Dropdown, Space, Divider, Button, theme } from 'antd';

import dayjs from 'dayjs';
import axios from "axios";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import './Filter.scss'
dayjs.extend(customParseFormat);

const apiUrl = "http://127.0.0.1:8000/api/rt-images/";


function Filter() {
  const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY-MM-DD';
  const { useToken } = theme;
  const [uploader, setuploader] = useState();
  const [modifier, setmodifier] = useState();
  const [Expertcheck, setExpertcheck] = useState([]);
  const [startDateString, setStartDateString] = useState('');
  const [endDateString, setEndDateString] = useState('');
  const [open, setOpen] = useState(false);
  const { token } = useToken();
  const checkboxOptions = [
    { label: 'Yes', value: 'true' },
    { label: 'No', value: 'false' },
  ];

  // useEffect(() => {

  // }, [uploader, modifier, startDateString, endDateString]);

  const onCalendarChange = (dates, dateStrings) => {
    console.log('Selected Dates:', dates);
    console.log('Formatted Date Strings:', dateStrings);
    setStartDateString(dateStrings[0]);
    setEndDateString(dateStrings[1]);
  };

  const onChange = (checkedValues) => {
    setExpertcheck(checkedValues)
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
          onChange={({ target: uploader }) =>
            setuploader(uploader.value)
          }
        />
      ),
    },
    {
      key: '3',
      label: (
        <Input Input size="large" placeholder="modifier" prefix={<UserOutlined />}
          onChange={({ target: modifier }) =>
            setmodifier(modifier.value)
          }
        />
      ),
    },
    {
      key: '4',
      label: (
        <div>
          <p className='checkbox'>
            Expert Check
          </p>
          <Checkbox.Group options={checkboxOptions} value={Expertcheck} onChange={onChange}>Expert Check</Checkbox.Group>
        </div>
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

  const handleOpenChange = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpen(nextOpen);
    }
  };

  const filterRequest = () => {
    console.log(uploader);
    axios.get(apiUrl, {
      params: {
        upload_date_after: startDateString,
        upload_date_before: endDateString,
        uploader: uploader,
        modifier: modifier,
        expert_check: Expertcheck.length === 2 ? null : Expertcheck[0]
      },
      withCredentials: true
    },
    ).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.log(error.response);
    });
  };

  return (
    <Dropdown
      trigger={['click']}
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
            <Button type="primary" onClick={filterRequest}>Search</Button>
          </Space>
        </div>
      )}
    >
      <Button className='button' type="primary"
        style={{
          marginLeft: "90%",
          marginTop: "1%"
        }}
      >
        <BarsOutlined />Filter
      </Button>
    </Dropdown>
  );
}
export default Filter;