import { React ,useState ,useEffect , useContext} from 'react';
import {io} from 'socket.io-client'
import Header from '../Header'
import approve from '../../img/approve.svg'
import cancel from '../../img/cancel.svg'
import { Wrapper ,Head ,Tab ,Special ,TwoB} from './TransactionPage.styled';
import {UserContext} from '../../Context/userContext'



let socket;
const TransactionPage = () => {
    const { state, dispatch } = useContext(UserContext)
    const [transaction, setTransaction] = useState([])
    // const [refresh,setRefresh] = useState(false)
    useEffect(() => {
        socket = io('http://localhost:5000', {
            auth: {
                token: localStorage.getItem("token") 
            },
            query: {
                id: state.user.id
            }
        })
        socket.on('connect', () => {
            console.log(socket);
        })
        
        socket.on('toOrder', (x) => {
            console.log(x)
            // setRefresh(!refresh)
            
        })
        socket.on("connect_error", (err) => {
            console.error(err.message); 
        });
        Transaction()
        return () => {
            socket.disconnect()
        }
    }, [transaction])
    
    const Approve = (x) => {
        // socket.emit('otw')
        socket.emit('accept', x)
    }
    const Cancel = (x) => {
        socket.emit('cancel', x)
    }

    const Transaction = () => {
        socket.emit('transaction')
        socket.emit('newTransaction')
        socket.on('transactionData', (data) => {
            setTransaction(data)
            console.log(data)
        })
    }
    let count = 0
    return (
        <>
            <Header noTroll />
            <Wrapper>
                <h1>Income Transaction</h1>
                <Tab>
                    <tr>
                        <Head n>No</Head>
                        <Head n2>Name</Head>
                        <Head a>Address</Head>
                        <Head p>Products Order</Head>
                        <Head s>Status</Head>
                        <Head m p>Action</Head>
                    </tr>
                    {/* TC~REPEAT */}
                    {transaction.map((_) => {
                        count = count + 1
                        return (
                            <tr>
                            <Special>{count}</Special>
                            <Special>{_.name}</Special>
                            <Special>{_.address}</Special>
                            <Special>{_.product.map((x) => {
                                return(x.title+',')
                            })}</Special>
                            {_.status === `Waiting Approve`? <Special w>{_.status}</Special> : null}
                            {_.status === `Success`? <Special s>{_.status}</Special> : null}
                            {_.status === `Cancel`? <Special c>{_.status}</Special> : null}
                            {_.status === `On The Way`? <Special o>{_.status}</Special> : null}
                            <Special bt>
                                {_.status === `Waiting Approve` ?
                                <>
                                <TwoB onClick={() => {Cancel(_.id)}}a>Cancel</TwoB>
                                <TwoB onClick={() => {Approve(_.id)}}>Aprove</TwoB>
                                </>
                                : <>
                                {_.status === `Cancel`? <img src={cancel} alt={`${cancel}`} /> :<img src={approve} alt={`${approve}`} /> }
                                </> 
                                }
                            </Special>
                            </tr>
                        )
                    })}
                </Tab>
            </Wrapper>
        </>
    )
}

export default TransactionPage