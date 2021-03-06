import { useState, useEffect } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import styles from "../styles/Login.module.css";
import * as BiIcons from "react-icons/bi";
import * as FiIcons from "react-icons/fi";



function Login({username}) {
    const [ready, setReady] = useState(false)

    const [displaySaldo, setDisplaySaldo] = useState({ value: 0 })
    const [displayMeta, setDisplayMeta] = useState({ value: 0 })
    const [displayUltimo, setDisplayUltimo] = useState( null )
    const [displayPoupanca, setDisplayPoupanca] = useState({ value: 0 })
    const [id, setId] = useState("")

    const location = useLocation();
    const history = useHistory();

    function mudarCaminho(string) {
        const { pathname } = location;
        // console.log(pathname)
        
        const newPath = pathname.replace(pathname, string)
        return `/${newPath}`
    }

    function irObjetivos() {
        history.push(mudarCaminho("objetivo"))
    }

    function irCompras() {
        history.push(mudarCaminho("lista"))
    }

    function irCarteira() {
        history.push(mudarCaminho("saldo"))
    }

    async function fetchSaldo() {
        const res = await fetch("/saldo")
        if (res.status === 404){
            criarCarteira()
        } else {
            const resBody = await res.json();
            // console.log(resBody)
            setDisplaySaldo(resBody.carteira.saldo)
            if (resBody.carteira.ultimoMovimento){
                setDisplayUltimo(resBody.carteira.ultimoMovimento)
            }
            setReady(true)

        }
    }

    async function criarCarteira() {
        const res = await fetch("/saldo", {
            method: "POST"
        })
        if (res.status === 201) {
            fetchSaldo();
            fetchUltimo();
            setReady(true)
        } else return "Não tem carteira"
    }

    async function fetchMeta() {
        const res = await fetch("/objetivos/total")
        const resBody = await res.json();
        console.log(resBody)
        setDisplayMeta(resBody.valorTotal)
        setDisplayPoupanca(resBody.percentagemPoupada)
    }

    async function fetchUltimo() {
        const res = await fetch("/saldo")
        const resBody = await res.json();
        console.log(resBody)
        setDisplayUltimo(resBody.carteira)
    }

    // async function fetchPoupanca() {
    //     const res = await fetch("/objetivo")
    //     const resBody = await res.json();
    //     setDisplayPoupanca(resBody.objetivo)
    // }
   


    useEffect(() => fetchSaldo(), [])
    useEffect(() => fetchMeta(), [])
    // useEffect(() => fetchPoupanca(), [])

    if (ready) {
        return (
            <>
                <div className={styles.telaInicial}>
                    
                    <div className={styles.logo}>
                        <img src="../docs/imagens/big_logo_ss.png" />
                    </div>
                    <div className={styles.content}>
                        <h1> Olá {username},</h1>
                        <div className={styles.card}>
                            <p className={styles.saldo}>
                                {
                                   `${displaySaldo}€`
                                }
                                <div className={styles.iconCard}><BiIcons.BiEuro /></div></p>
                            <p className={styles.ultimo}>
                                {
                                    displayUltimo ? ` ${displayUltimo}€` : `0€`
                                }
                                <div className={styles.iconCard}><BiIcons.BiSelectMultiple /></div></p>
                            <p className={styles.meta}>
                                {
                                    `${displayMeta}€`
                                }
                                <div className={styles.iconCard}><BiIcons.BiTrophy /></div></p>
                            <p className={styles.poupanca}>
                                {
                                    displayPoupanca ? `${displayPoupanca}%` : "0%"
                                }
                                <div className={styles.iconCard}><BiIcons.BiLineChart /></div></p>

                        </div>
                        <div className={styles.buttons}>    
                            <button onClick={irCarteira}>
                                <BiIcons.BiWallet size="30px" />
                            </button><br />
                            <button onClick={irObjetivos}>
                                <FiIcons.FiTarget size="30px" />
                            </button> <br />
                            <button onClick={irCompras}>
                                <BiIcons.BiListCheck size="30px" />
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    } else return <LoadingScreen />
}

export default Login

