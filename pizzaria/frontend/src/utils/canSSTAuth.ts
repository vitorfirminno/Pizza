import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies, destroyCookie } from 'nookies'
import { parse } from 'path'
import { AuthtokenError } from '../services/errors/AuthTokenError';


//funcao para paginas só user logados terão acesso

export function canSSRAuth<P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> =>{

        const cookies = parseCookies(ctx);

        const token = cookies['@nextauth.token'];

        if(!token){
            return{
                redirect:{
                    destination: '/',
                    permanent: false,
                }
            }
        }


        try{
            return await fn(ctx);
        }catch(err){
            if(err instanceof AuthtokenError){
                destroyCookie(ctx, '@nextauth.token')

                return{
                    redirect:{
                        destination:'/',
                        permanent: false,
                    }
                }

            }
        }
    }
}