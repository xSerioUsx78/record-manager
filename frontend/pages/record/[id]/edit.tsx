import type { NextPage, GetServerSideProps } from "next";
import { useState } from "react";
import EditComponent from "../../../components/record/Edit";
import axios from "../../../utils/axios";
import requests from "../../../utils/requests";
import { recordResultsItemInterface } from "../../../interfaces/record";
import { wrapper } from "../../../redux/store";
import { loginRequiredSSR } from "../../../hooks/loginRequired";

interface propsInterface {
  record: recordResultsItemInterface;
}

interface responseDate {
  data: recordResultsItemInterface;
}

const Edit: NextPage<propsInterface> = ({ record }) => {
  // Because setting new value to state it is not necessary so i just tooked
  // the value of the useState hook
  const [recordState] = useState<recordResultsItemInterface>(record);

  return <EditComponent record={recordState} />;
};

export const getServerSideProps: GetServerSideProps = loginRequiredSSR(
  wrapper.getServerSideProps((store) => async (context: any) => {
    const id = context.params.id;
    let record!: recordResultsItemInterface | {};
    try {
      const state = store.getState();
      const res: responseDate = await axios().get(requests.recordDetail(id));
      record = res.data;
    } catch (e) {
      console.log(e);
      record = {};
    }
    return {
      props: {
        record,
      },
    };
  })
);

export default Edit;
