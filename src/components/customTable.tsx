'use client';

import React from 'react';
import { IOptionType } from '@/@types/optionType';
import { Loader } from './loader';

interface CustomTableProps<T> {
  data : T[];
  columns : Array<{
    key : keyof T;
    header : string;
    render ?: (item : T) => React.ReactNode;
  }>;
  onAddItem : () => void;
  onEditItem : (item : T) => void;
  caption ?: string;
  isLoading ?: boolean;
}

const isOptionType = (obj : unknown) : obj is IOptionType => {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'value' in obj &&
    'label' in obj && typeof (obj as IOptionType).label === 'string'
  );
};

// recursively get object children from dot separated path 
const getObject =  (key : string , object : { [key : string] : string 
    | number 
    | { [key : string] : string | number }; 
    }) => {

  // no sub-key, just return the value
  if (!key.includes('.')) {
    return String(object[key]);
  }

  // string or number, just return the value
  if (typeof object === 'string' || typeof object === 'number') {
    return String(object[key]);
  }

  const [firstKey, ...restKeys] = key.split('.');

  if (object && typeof object === 'object' && firstKey in object) {
    // check if we have more sub-keys
    if (restKeys.length > 1) {
      if (firstKey in object) {
        return getObject(restKeys.join('.'), (object[firstKey] as { [key : string] : string | number }));
      }
      return String(object[key]);
    }
    // no more subkeys, return value
    return ((object as { [key : string] : { [key : string] : string } })[firstKey] as { [key : string] : string })[restKeys[0]];
  }

  // not an object, return value
  return String(object[key]);
}; 

export const CustomTable = <T extends { id : number }>({
  data,
  columns,
  onAddItem,
  onEditItem,
  caption,
  isLoading,
} : CustomTableProps<T>) => {
  return (
    <div className='overflow-x-auto shadow-md sm:rounded-lg' suppressHydrationWarning>
        <Loader isLoading={!!isLoading} />
      <div className='flex justify-end p-4 bg-white dark:bg-gray-800' suppressHydrationWarning>
        <button
          onClick={onAddItem}
          disabled={isLoading}
          className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-800'
        >
          Add New Item
        </button>
      </div>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        {caption && (
          <caption className='p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800'>
            {caption}
          </caption>
        )}
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th key={'actions_header'} scope='col' className='px-6 py-3'>
              {'Actions'}
            </th>
            {columns.map((col) => (
              <th key={String(col.key)} scope='col' className='px-6 py-3'>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
              <td
                colSpan={columns.length + 1}
                className='px-6 py-4 text-center text-gray-500 dark:text-gray-400'
              >
                {isLoading ? 'Loading...' : 'No data available.'}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={item.id}
                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
              >
                <td key={`edit_${item.id}`} className='px-6 py-4'>
                  <button
                    disabled={isLoading}
                    onClick={() => onEditItem(item)}
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    Edit
                  </button>
                </td>
                {columns.map((col) => (
                  <td key={`${item.id}-${String(col.key)}`} className='px-6 py-4'>
                    {col.render ? (
                      col.render(item)
                    ) : (
                      // check for option types and objects
                      isOptionType(item[col.key])
                        ? (item[col.key] as IOptionType).label
                        : String(getObject(col.key.toString(), item))
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
