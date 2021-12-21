import { useEffect, useState } from 'react'
import { InputNumber, Typography, Space, Button } from 'antd';
import { HeartTwoTone } from '@ant-design/icons'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import calculateScore from './calculateScore'

const App = () => {

    const [result, setResult] = useState('')
    const [error, setError] = useState(false)
    const [remainingMatch, setRemainingMatch] = useState(20)
    const [totalPoints, setTotalPoints] = useState(0)

    const handleCalculateScore = (resultCallback = '') => {
        const { wins, loss, error } = calculateScore(remainingMatch, totalPoints)
        if (!error) {
            setResult(`Vittorie: ${wins}. Sconfitte: ${loss}`)
            setError(error)
        } else {
            setResult(resultCallback)
            setError(error)
        }
    }

    useEffect(() => {
        handleCalculateScore('Finisci di inserire i dati. Se credi di aver terminato, i valori non sono corretti. ')
    }, [remainingMatch, totalPoints])

    const onFinish = (values) => {
        handleCalculateScore('I valori inseriti non possono essere corretti. ')
    };

    return (
        <div>
            <div style={bodyStyle}>
                <Space direction='vertical' style={{ maxWidth: '100%', width: '450px' }}>
                    <Typography.Title>Calcolatore punteggio WL</Typography.Title>
                    <Space align='end' style={{ marginTop: 40, width: '100%' }}>
                        <label htmlFor="remainingMatches">
                            Match rimasti <br />
                            <InputNumber
                                id="remainingMatches"
                                style={{ width: '100%' }}
                                placeholder='Match rimasti'
                                min={0}
                                max={20}
                                onChange={e => setRemainingMatch(e)}
                            ></InputNumber>
                        </label>
                        <label htmlFor="totalPoints">
                            Punti totali <br />
                            <InputNumber
                                id="totalPoints"
                                style={{ width: '100%' }}
                                placeholder='Punti totali'
                                min={0}
                                max={80}
                                onChange={e => setTotalPoints(e)}
                            ></InputNumber>
                        </label>
                        <Button style={{ width: '100%' }} type="primary" onClick={onFinish}>Invia</Button>
                    </Space>
                    <Typography.Text>{result}</Typography.Text>
                    {
                        !error && totalPoints > 0
                            ? <div style={disclaimerStyle}><Typography.Text>Ricordati di regalare sempre le partite in eccesso. <HeartTwoTone twoToneColor="#ff0000" /></Typography.Text></div>
                            : false}
                </Space>
            </div>
            <div style={footerStyle}>
                <Typography.Text>Fatto con <HeartTwoTone twoToneColor="#eb2f96" /> a Livorno da Marco Giannini</Typography.Text>
            </div>
        </div>
    );
};

const bodyStyle = {
    padding: '50px 10px',
    backgroundColor: '#fafafa',
    height: 'calc( 100vh - 40px )',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center'
}

const footerStyle = {
    height: 40,
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const disclaimerStyle = {
    padding: 10,
    backgroundColor: '#f1f1f1',
    marginTop: 10
}

export default App