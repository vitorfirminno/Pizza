import { useContext, FormEvent, useState, use } from "react"
import Head from "next/head"
import Image from "next/image"
import firmasLogoPizza from '../../public/firmasLogoPizza.png'
import styles from '../../styles/home.module.scss'

import { Input } from '../components/ui/Input'
import { Button } from "../components/ui/Button"

import { AuthContext } from "../contexts/AuthContext"

import Link from "next/link"

import { GetServerSideProps} from 'next';

import { setegid } from "process"
import { toast } from "react-toastify"

import { canSSRGuest } from "../utils/canSSRGuest"


export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if(email === '' || password === ''){
      toast.warning("Preencha todos os campos")
      return;
    }

    setLoading(true);


      let data = {
      email,
      password,
    }

    await signIn(data)

    setLoading(false);
  }

  return (
    <>
        <Head>
            <title>Sujeito Pizza - Faça seu login</title>
        </Head>
        
        <div className={styles.containerCenter}>
          <Image src={firmasLogoPizza} alt="Logo Sujeito Pizzaria"/>  
          <div className={styles.login}>
            <form onSubmit={handleLogin}>

              <Input placeholder="Digite seu email"
              type="text"
              value={email}
              onChange={ (e)=> setEmail(e.target.value)}
              />
              <Input placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={ (e)=> setPassword(e.target.value)}
              />
              <Button
                type="submit"
                loading ={loading}
              >
                Acessar
                </Button>
            </form>
            <Link className={styles.text} href="/signup">
              Não possui uma conta? Cadastre-se
            </Link>
            </div>         
        </div>
    </>
        
  )
}

// lado do servidor
export const getServerSideProps = canSSRGuest(async (ctx) => {
  
  return {
    props: {}
  }
})