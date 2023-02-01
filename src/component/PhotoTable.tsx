/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    PaginationState,
} from '@tanstack/react-table'
import { GET_PHOTOS } from '../query/GetPhotos';
import SearchBar from './Searchbar';
import Modal from './Modal';
import Paginator from './Paginator';
import { FaSpinner } from 'react-icons/fa';

type Photo = {
    id: number
    title: string
    thumbnailUrl: string
}

type PhotoQuery = {
    photos: {
        data: Photo[],
        links: {
            first: {
                limit: number,
                page: number,
            },
            last: {
                limit: number,
                page: number,
            },
            next: {
                limit: number,
                page: number,
            },
        },
        meta: {
            totalCount: number,
        }
    }
}

const empty: Photo[] = [];

const Photos: React.FC = () => {
    const [search, setSearch] = useState<string>('');
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    })

    const options = {
        "options": {
            "search": {
                "q": search
            },
            "paginate": {
                "limit": pageSize,
                "page": pageIndex + 1
            },
        },
    };

    const { loading, error, data } = useQuery<PhotoQuery>(GET_PHOTOS, { variables: options });

    // cache the previous data and only update the data if loading finished
    const [cachedData, setCachedData] = useState<Photo[]>(empty);
    const photosData = useMemo(() => {
        if (loading) return cachedData;
        setCachedData(data?.photos?.data || empty);
        return data?.photos?.data || empty;
    }, [data, loading, cachedData]);
    

    const [selectedImage, setSelectedImage] = useState<string | undefined>();

    const columnHelper = createColumnHelper<Photo>()
    const columns = useMemo(() => [
        columnHelper.accessor('id', {
            header: () => 'ID',
            cell: info => <button className="font-bold" onClick={() => setSelectedImage(info.row.original.thumbnailUrl)}>{info.getValue()}</button>,
        }),
        columnHelper.accessor('title', {
            header: () => 'Title',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('thumbnailUrl', {
            header: () => 'Image',
            cell: info => <button onClick={() => setSelectedImage(info.row.original.thumbnailUrl)}>
                <img src={info.getValue()} alt="photo" className='max-h-[80px]' />
            </button>,
        }),
    ], [columnHelper]);

    const table = useReactTable<Photo>({
        data: photosData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    if (error) return <p>Error :(</p>;

    return (
        <>
            <Modal
                image={selectedImage}
                onClose={() => setSelectedImage(undefined)}
            />
            <div className="p-2 max-w-screen-lg flex flex-col justify-center m-auto relative">
                <SearchBar onSubmit={setSearch} />
                {(loading || !data) && (
                    <div className="bg-white/75 absolute inset-0 flex justify-center items-center flex-row">
                        Loading...
                        <FaSpinner className="animate-spin"/>
                    </div>
                )}
                <table className="my-3 table-auto w-full text-left">
                    <thead className="bg-green-500 text-white">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="p-2 font-bold">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row, index) => (
                            <tr key={row.id} className={`${index % 2 === 0 ? 'bg-green-100' : 'bg-white'}`}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="border p-2">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    Total {data?.photos?.meta.totalCount || 0} results
                </div>
                <Paginator
                    total={data?.photos?.meta.totalCount || 0}
                    current={pageIndex}
                    pageSize={pageSize}
                    onPageClick={(page) => setPagination({ pageIndex: page, pageSize })}
                />
            </div>
        </>
    )
}

export default Photos;
