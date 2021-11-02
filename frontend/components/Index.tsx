import React, { useState, useCallback, Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import { recordItemsInterface } from '../interfaces/record';
import authAxios from '../utils/axios';
import requests from '../utils/requests';
import { Toast, CustomSwal } from '../utils/messages';
import { useAppSelector } from '../redux/store';


interface propsInterface {
  record: recordItemsInterface,
  setRecord: Dispatch<SetStateAction<recordItemsInterface>>
};


const Index: React.FC<propsInterface> = ({ record, setRecord }) => {

  const { token } = useAppSelector(state => state.auth);

  const [hasMore, setHasMore] = useState<boolean>(true);

  const deleteRecordCallback = useCallback( async (id) => {
    try {
      authAxios(token!).delete(requests.recordDetail(id));
      setRecord((prevRecord) => ({
        ...prevRecord,
        results: prevRecord.results.filter(record => record.id !== id)
      }));
      Toast.fire({
        title: 'success!',
        text: 'Record deleted successfully!',
        icon: 'success'
      });
    } catch(e) {
      console.log(e);
      Toast.fire({
        title: 'error',
        text: 'There was a problem please try again!',
        icon: 'error'
      });
    };
  }, [setRecord, token]);

  const handleDelete = (id: number): void => {
    CustomSwal.fire({
      title: 'Are you sure?',
      text: "The record will be deleted forever!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecordCallback(id);
      };
    });  
  };

  const handleFetchMoreData = async () => {
    if ( record.next ) {
      const { data }: any = await authAxios(token).get(record.next);
      setRecord((prevValues) => ({
        ...prevValues,
        next: data.next,
        previous: data.previous,
        count: data.count,
        results: prevValues.results.concat(data.results)
      }));
    } else {
      setHasMore(false);
    };
  };

  return (
    <div className="container mt-4 m-auto">
      <div
        className="overflow-auto"
        id="scrollableDiv"
        style={{maxHeight: 580}}
        >
        <InfiniteScroll
          dataLength={record.results.length}
          next={handleFetchMoreData}
          hasMore={hasMore}
          loader={<h4 className="text-center">Loading...</h4>}
          scrollableTarget="scrollableDiv"
          style={{overflow: 'hidden'}}
          className="pb-4"
          >
          <div className="flex flex-col">
            <div 
            className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Created
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Delete</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {record && record.results && record.results.map(record => (
                        <tr key={record.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-gray-900">{record.user.username}</div>
                            <div className="text-sm font-medium text-gray-500">{record.user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{record.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{record.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{record.created}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link href={`/record/${record.id}/edit`}>
                              <a className="text-indigo-600 hover:text-indigo-900">
                                Edit
                              </a>
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a
                              onClick={() => handleDelete(record.id)}
                              className="text-red-600 hover:text-red-900 cursor-pointer">
                              Delete
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </InfiniteScroll>
      </div>
  </div>
)};

export default Index;