import type { NextPage, GetServerSideProps } from 'next';
import AddComponent from '../../components/record/Add';
import { loginRequiredSSR } from '../../hooks/loginRequired';


const Add: NextPage = () => {
  return (
    <AddComponent />
  )
};

export const getServerSideProps: GetServerSideProps = loginRequiredSSR(async () => {
  return {props: {}};
});


export default Add;