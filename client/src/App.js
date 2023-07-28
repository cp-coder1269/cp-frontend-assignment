import { useEffect, useState } from "react";
import { DatePicker, Space, Button, Table } from 'antd';
import dayjs from 'dayjs';
import axios from 'axios'

const columns = [
	{
	  title: 'Open',
	  dataIndex: 'open',
	  key: 'open',
	},
	{
	  title: 'Close',
	  dataIndex: 'close',
	  key: 'close',
	},
	{
	  title: 'High',
	  dataIndex: 'high',
	  key: 'high',
	},
	{
		title: "Low",
		dataIndex: "low",
		key: "low"
	}, 
	{
		title: "Volume",
		dataIndex: "volume",
		key: "volume"
	}
  ]
function App() {
	const [userInput, setUserInput] = useState("");
	const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
	const [stockData, setStockData] = useState(undefined);

	return (
		<Space direction="vertical">
			<input type="text" id={"stockname"} value={userInput} onChange={(e) => setUserInput(e.target.value) }/>
			<DatePicker onChange={(v) => {
				setSelectedDate(dayjs(new Date(v)))
			}}  defaultValue={dayjs(new Date())}/>
			<Button onClick={(e) => {
				if(userInput && selectedDate){
					console.log('good input', userInput, selectedDate.format('YYYY-MM-DD'));
					const data = {name: userInput, date: selectedDate.format('YYYY-MM-DD')}
					let config = {
						method: 'post',
						maxBodyLength: Infinity,
						url: 'http://localhost:5000/api/fetchStockData',
						headers: { 
						  'Content-Type': 'application/x-www-form-urlencoded'
						},
						data : data
					  };
					  
					  axios.request(config)
					  .then((response) => {
						console.log(JSON.stringify(response.data));
						setStockData(response.data);
					  })
					  .catch((error) => {
						console.log(error);
					  });
					  
				}else{
					console.error('please fill the form')
				}
			}}>Submit</Button>
			{stockData ? <div><Table dataSource={[stockData.data]} columns={columns} rowKey={"symbol"}></Table></div> : null}
		</Space>
			
	);
}

export default App;