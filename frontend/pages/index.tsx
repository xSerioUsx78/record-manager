import type { NextPage, GetServerSideProps } from 'next';
import IndexComponent from '../components/Index';
import authAxios from '../utils/axios';
import requests from '../utils/requests';
import { useState } from 'react';
import { recordItemsInterface } from '../interfaces/record';
import { wrapper } from '../redux/store';
import { loginRequiredSSR } from '../hooks/loginRequired';


interface propsInterface {
  record: recordItemsInterface
};

const Home: NextPage<propsInterface> = ({ record }) => {

  const [recordState, setRecordState] = useState<recordItemsInterface>(record);

  return (
    <IndexComponent
    record={recordState}
    setRecord={setRecordState}
    />
  )
};

export const getServerSideProps: GetServerSideProps = loginRequiredSSR(
  wrapper.getServerSideProps(store => async (ctx) => {
  let record;
  try {
    const state = store.getState();
    const res = await authAxios(state.auth.token!).get(requests.record, {
      params: {
        offset: 0,
        limit: 15
      }
    });
    record = res.data;
  } catch(e) {
    console.log(e);
    record = {};
  };
  return {
    props: {
      record
    }
  }
}));

export default Home;